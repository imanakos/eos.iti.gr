import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectDirectory, "dist", "public");
const siteUrl = (process.env.BASE_URL || "https://imanakos.github.io/eos.iti.gr").replace(
  /\/$/,
  ""
);

const data = JSON.parse(
  await readFile(path.join(projectDirectory, "src", "data", "eoInsights.json"), "utf8")
);

async function loadTypeScriptData(relativePath) {
  const sourcePath = path.join(projectDirectory, relativePath);
  const source = await readFile(sourcePath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );

  if (errors.length > 0) {
    const message = ts.formatDiagnostics(errors, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => projectDirectory,
      getNewLine: () => "\n",
    });
    throw new Error(`Unable to load static content from ${relativePath}:\n${message}`);
  }

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`;
  return import(moduleUrl);
}

const [newsDataModule, newsBodyModule, projectCaseStudiesModule, eoEvidenceModule] =
  await Promise.all([
    loadTypeScriptData("src/data/newsData.ts"),
    loadTypeScriptData("src/data/newsBodyData.ts"),
    loadTypeScriptData("src/data/projectCaseStudiesData.ts"),
    loadTypeScriptData("src/data/eoEvidenceData.ts"),
  ]);
const newsArticles = newsDataModule.newsArticles;
const newsBodyText = newsBodyModule.newsBodyText;
const projectCaseStudies = projectCaseStudiesModule.projectCaseStudies;
const eosEvidence = eoEvidenceModule.eosEvidence;

if (
  !Array.isArray(newsArticles) ||
  !Array.isArray(projectCaseStudies) ||
  typeof eosEvidence !== "object" ||
  eosEvidence === null
) {
  throw new Error("The news, project case-study, or EO evidence data could not be loaded.");
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function addNewsSlugs(articles) {
  const baseSlugs = articles.map(
    (article, index) => slugify(article.title) || `news-item-${index + 1}`
  );
  const baseSlugCounts = new Map();
  const usedSlugs = new Map();

  for (const slug of baseSlugs) {
    baseSlugCounts.set(slug, (baseSlugCounts.get(slug) || 0) + 1);
  }

  return articles.map((article, index) => {
    const baseSlug = baseSlugs[index];
    const candidate =
      (baseSlugCounts.get(baseSlug) || 0) > 1
        ? `${baseSlug}-${slugify(article.newsId) || index + 1}`
        : baseSlug;
    const occurrence = (usedSlugs.get(candidate) || 0) + 1;
    usedSlugs.set(candidate, occurrence);

    return {
      ...article,
      slug: occurrence === 1 ? candidate : `${candidate}-${occurrence}`,
    };
  });
}

const newsEntries = addNewsSlugs(newsArticles);
const sortedArticles = [...data.articles].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt)
);
const latestModifiedAt = sortedArticles.reduce(
  (latest, article) => (article.modifiedAt > latest ? article.modifiedAt : latest),
  sortedArticles[0]?.modifiedAt || new Date().toISOString().slice(0, 10)
);
const defaultSocialImage = {
  path: "/images/eo-insights/eo-analysis-notes.jpg",
  alt: "Three concept illustrations, not satellite data, of vegetation, water and Earth Observation data analysis.",
  width: 1200,
  height: 630,
};
const shell = await readFile(path.join(outputDirectory, "index.html"), "utf8");

const metadataPattern = /<!-- eos:metadata:start -->[\s\S]*?<!-- eos:metadata:end -->/;

if (!metadataPattern.test(shell)) {
  throw new Error("The metadata markers are missing from the generated HTML shell.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeXml(value) {
  return escapeHtml(value);
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function metadataBlock({
  title,
  description,
  pathname,
  type = "website",
  publishedAt,
  modifiedAt,
  keywords = [],
  image = defaultSocialImage,
  jsonLd = [],
}) {
  const canonicalUrl = `${siteUrl}${pathname}`;
  const socialImageUrl = `${siteUrl}${image.path}`;
  const articleMetadata =
    type === "article"
      ? [
          publishedAt
            ? `<meta data-route-meta property="article:published_time" content="${escapeHtml(publishedAt)}" />`
            : "",
          modifiedAt
            ? `<meta data-route-meta property="article:modified_time" content="${escapeHtml(modifiedAt)}" />`
            : "",
        ]
          .filter(Boolean)
          .map((tag) => `\n    ${tag}`)
          .join("")
      : "";
  const keywordMetadata = keywords.length
    ? `
    <meta data-route-meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />`
    : "";
  const structuredData = jsonLd
    .map(
      (item) =>
        `
    <script data-route-meta type="application/ld+json">${safeJson(item)}</script>`
    )
    .join("");

  return `<title>${escapeHtml(title)}</title>
    <meta id="meta-description" name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="${escapeHtml(data.author.name)}" />
    <link id="canonical-url" rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <link rel="alternate" type="application/rss+xml" title="EO Analysis Notes" href="${siteUrl}/eo-insights.xml" />
    <meta id="og-type" property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:site_name" content="EOS - Earth Observation Services" />
    <meta id="og-title" property="og:title" content="${escapeHtml(title)}" />
    <meta id="og-description" property="og:description" content="${escapeHtml(description)}" />
    <meta id="og-url" property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta id="og-image" property="og:image" content="${escapeHtml(socialImageUrl)}" />
    <meta id="og-image-width" property="og:image:width" content="${escapeHtml(image.width || 1200)}" />
    <meta id="og-image-height" property="og:image:height" content="${escapeHtml(image.height || 630)}" />
    <meta id="og-image-alt" property="og:image:alt" content="${escapeHtml(image.alt)}" />${articleMetadata}${keywordMetadata}
    <meta name="twitter:card" content="summary_large_image" />
    <meta id="twitter-title" name="twitter:title" content="${escapeHtml(title)}" />
    <meta id="twitter-description" name="twitter:description" content="${escapeHtml(description)}" />
    <meta id="twitter-image" name="twitter:image" content="${escapeHtml(socialImageUrl)}" />
    <meta id="twitter-image-alt" name="twitter:image:alt" content="${escapeHtml(image.alt)}" />${structuredData}`;
}

async function writeRoute(pathname, metadata, bodyHtml = "") {
  const relativePath = pathname.replace(/^\//, "").replace(/\/$/, "");
  const routeDirectory = path.join(outputDirectory, relativePath);
  await mkdir(routeDirectory, { recursive: true });
  let html = shell.replace(metadataPattern, metadataBlock(metadata));
  if (bodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="true">${bodyHtml}</div>`
    );
  }
  await writeFile(path.join(routeDirectory, "index.html"), html);
}

function internalUrl(pathname) {
  return `${siteUrl}${pathname}`;
}

function webpPath(imagePath) {
  return /\.(?:jpe?g|png)$/i.test(imagePath)
    ? imagePath.replace(/\.(?:jpe?g|png)$/i, ".webp")
    : null;
}

function renderSimplePageBody({ eyebrow, title, description, paragraphs = [], links = [] }) {
  const supportingCopy = paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
  const navigation = links.length
    ? `<nav aria-label="Related pages">
        <h2>Explore EOS</h2>
        <ul>
          ${links
            .map(
              (link) =>
                `<li><a href="${escapeHtml(
                  link.href.startsWith("/") ? internalUrl(link.href) : link.href
                )}">${escapeHtml(link.label)}</a>${
                  link.description ? ` - ${escapeHtml(link.description)}` : ""
                }</li>`
            )
            .join("\n")}
        </ul>
      </nav>`
    : "";

  return `<main>
      <header>
        ${eyebrow ? `<p>${escapeHtml(eyebrow)}</p>` : ""}
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
      </header>
      ${supportingCopy}
      ${navigation}
    </main>`;
}

const monthNumbers = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function getNewsDateIso(date) {
  const match = date
    .trim()
    .match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s*[–-]\s*\d{1,2}(?:st|nd|rd|th)?)?,?\s+(\d{4})$/i
    );

  if (!match) return undefined;

  const month = monthNumbers[match[1].toLowerCase()];
  const day = Number(match[2]);
  const year = Number(match[3]);

  if (!month || day < 1 || day > 31 || year < 1900 || year > 2100) return undefined;

  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

function plainText(value) {
  return value
    .replace(/https?:\/\/[^\s<>"]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getNewsExcerpt(article, maximumLength = 190) {
  const source = plainText(newsBodyText[article.newsId] || article.title);

  if (source.length <= maximumLength) return source;

  const shortened = source.slice(0, maximumLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const endpoint = lastSpace > maximumLength * 0.6 ? lastSpace : maximumLength;

  return `${shortened.slice(0, endpoint).trim()}…`;
}

function linkifyHtml(value) {
  const urlPattern = /https?:\/\/[^\s<>"')]+/g;
  let output = "";
  let cursor = 0;

  for (const match of value.matchAll(urlPattern)) {
    const start = match.index || 0;
    const rawUrl = match[0];
    const url = rawUrl.replace(/[.,;:!?]+$/, "");
    const trailingPunctuation = rawUrl.slice(url.length);
    output += escapeHtml(value.slice(cursor, start)).replaceAll("\n", "<br />");
    output += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`;
    output += escapeHtml(trailingPunctuation);
    cursor = start + rawUrl.length;
  }

  output += escapeHtml(value.slice(cursor)).replaceAll("\n", "<br />");
  return output;
}

function renderNewsCollectionBody() {
  return `<main>
      <header>
        <p>EOS archive</p>
        <h1>News and Activities</h1>
        <p>News, publications, events and activities from the EOS CERTH/ITI Remote Sensing Research Team.</p>
      </header>
      <section aria-labelledby="news-archive-heading">
        <h2 id="news-archive-heading">All news</h2>
        ${newsEntries
          .map(
            (article) => `<article>
          <h3><a href="${escapeHtml(internalUrl(`/news/${article.slug}/`))}">${escapeHtml(article.title)}</a></h3>
          ${article.date ? `<p><time${getNewsDateIso(article.date) ? ` datetime="${escapeHtml(getNewsDateIso(article.date))}"` : ""}>${escapeHtml(article.date)}</time></p>` : ""}
          <p>${escapeHtml(getNewsExcerpt(article))}</p>
        </article>`
          )
          .join("\n")}
      </section>
    </main>`;
}

function renderNewsArticleBody(article) {
  const body = newsBodyText[article.newsId];
  const publishedAt = getNewsDateIso(article.date);
  const optimizedImage = webpPath(article.img);
  const articleCopy = body
    ? body
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim())
        .map((paragraph) => `<p>${linkifyHtml(paragraph)}</p>`)
        .join("\n")
    : "<p>No archived article text is available for this entry.</p>";

  return `<main>
      <article>
        <header>
          <p><a href="${escapeHtml(internalUrl("/news/"))}">EOS News</a></p>
          <h1>${escapeHtml(article.title)}</h1>
          ${
            article.date
              ? `<p><time${publishedAt ? ` datetime="${escapeHtml(publishedAt)}"` : ""}>${escapeHtml(article.date)}</time></p>`
              : ""
          }
          <figure>
            ${
              optimizedImage
                ? `<picture><source srcset="${escapeHtml(internalUrl(optimizedImage))}" type="image/webp" /><img src="${escapeHtml(internalUrl(article.img))}" alt="${escapeHtml(article.title)}" loading="eager" /></picture>`
                : `<img src="${escapeHtml(internalUrl(article.img))}" alt="${escapeHtml(article.title)}" loading="eager" />`
            }
          </figure>
        </header>
        ${articleCopy}
        ${
          article.url
            ? `<p><a href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">Visit the official page</a></p>`
            : ""
        }
        <nav aria-label="News article navigation">
          <a href="${escapeHtml(internalUrl("/news/"))}">Return to all news</a>
        </nav>
      </article>
    </main>`;
}

function renderProjectCaseStudyBody(caseStudy) {
  return `<main>
      <article>
        <header>
          <p><a href="${escapeHtml(internalUrl("/research/"))}">EOS project case study</a></p>
          <h1>${escapeHtml(caseStudy.projectName)}</h1>
          <p><strong>${escapeHtml(caseStudy.fullName)}</strong></p>
          <p>${escapeHtml(caseStudy.summary)}</p>
          <figure>
            <img src="${escapeHtml(internalUrl(caseStudy.image.src))}" alt="${escapeHtml(caseStudy.image.alt)}" loading="eager" />
          </figure>
          <dl>
            <dt>Programme</dt><dd>${escapeHtml(caseStudy.programme)}</dd>
            <dt>Status</dt><dd>${escapeHtml(caseStudy.periodLabel)}</dd>
          </dl>
          <p><a href="${escapeHtml(caseStudy.officialProjectUrl)}" target="_blank" rel="noopener noreferrer">Official project source</a></p>
        </header>
        <section aria-labelledby="project-challenge-heading">
          <h2 id="project-challenge-heading">The challenge</h2>
          <p>${escapeHtml(caseStudy.challenge)}</p>
        </section>
        <section aria-labelledby="eos-contribution-heading">
          <h2 id="eos-contribution-heading">The EOS contribution</h2>
          ${caseStudy.eosContribution
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("\n")}
        </section>
        <section aria-labelledby="methods-data-heading">
          <h2 id="methods-data-heading">Methods and data</h2>
          <ul>${caseStudy.methodsAndData
            .map((method) => `<li>${escapeHtml(method)}</li>`)
            .join("\n")}</ul>
        </section>
        <section aria-labelledby="outputs-outcomes-heading">
          <h2 id="outputs-outcomes-heading">Outputs and outcomes</h2>
          ${caseStudy.outputsAndOutcomes
            .map(
              (outcome) => `<article>
            <p>${escapeHtml(outcome.status)}</p>
            <h3>${escapeHtml(outcome.title)}</h3>
            <p>${escapeHtml(outcome.detail)}</p>
          </article>`
            )
            .join("\n")}
        </section>
        <section aria-labelledby="beneficiaries-heading">
          <h2 id="beneficiaries-heading">Who this work serves</h2>
          <ul>${caseStudy.beneficiaries
            .map((beneficiary) => `<li>${escapeHtml(beneficiary)}</li>`)
            .join("\n")}</ul>
        </section>
        <section aria-labelledby="project-evidence-heading">
          <h2 id="project-evidence-heading">Evidence and project material</h2>
          <ul>${caseStudy.evidenceLinks
            .map(
              (evidence) =>
                `<li><a href="${escapeHtml(evidence.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(evidence.label)}</a> - ${escapeHtml(evidence.publisher)}, ${escapeHtml(evidence.kind)}</li>`
            )
            .join("\n")}</ul>
        </section>
        <nav aria-labelledby="continue-eos-heading">
          <h2 id="continue-eos-heading">Continue through EOS work</h2>
          <ul>${caseStudy.relatedInternalTargets
            .map(
              (target) =>
                `<li><a href="${escapeHtml(internalUrl(target.path))}">${escapeHtml(target.label)}</a> - ${escapeHtml(target.description)}</li>`
            )
            .join("\n")}</ul>
        </nav>
      </article>
    </main>`;
}

function renderCollectionBody() {
  return `<main>
      <header>
        <p>Earth Observation</p>
        <h1>${escapeHtml(data.seriesTitle)}</h1>
        <p>${escapeHtml(data.seriesDescription)}</p>
        <p><strong>Visual note:</strong> ${escapeHtml(data.visualDisclosure)}</p>
      </header>
      <section aria-labelledby="latest-notes-heading">
        <h2 id="latest-notes-heading">Latest notes</h2>
        ${sortedArticles
          .map(
            (article) => `<article>
          <img src="${escapeHtml(`${siteUrl}${article.image}`)}" alt="${escapeHtml(article.imageAlt)}" width="1200" height="630" />
          <h3><a href="${escapeHtml(`${siteUrl}/eo-insights/${article.slug}/`)}">${escapeHtml(article.title)}</a></h3>
          <time datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(article.publishedAt)}</time>
          <p>${escapeHtml(article.summary)}</p>
        </article>`
          )
          .join("\n")}
      </section>
    </main>`;
}

function renderArticleBody(article) {
  const evidence = eosEvidence[article.slug] || [];

  return `<main>
      <article>
        <header>
          <p><a href="${escapeHtml(`${siteUrl}/eo-insights/`)}">${escapeHtml(data.seriesTitle)}</a></p>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.summary)}</p>
          <time datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(article.publishedAt)}</time>
          <p>By <a href="${escapeHtml(`${siteUrl}${data.author.profilePath}/`)}">${escapeHtml(data.author.name)}</a>, ${escapeHtml(data.author.role)}</p>
          <figure>
            <img src="${escapeHtml(`${siteUrl}${article.image}`)}" alt="${escapeHtml(article.imageAlt)}" width="1200" height="630" />
            <figcaption>${escapeHtml(data.visualDisclosure)}</figcaption>
          </figure>
        </header>
        ${article.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
        <aside>
          <h2>Key point</h2>
          <p>${escapeHtml(article.keyPoint)}</p>
        </aside>
        ${
          evidence.length
            ? `<section aria-labelledby="eos-practice-heading">
          <h2 id="eos-practice-heading">EOS evidence in practice</h2>
          <p>The relationship between this topic and selected EOS work, outcomes, and publications is stated explicitly.</p>
          <ul>${evidence
            .map((item) => {
              const label = escapeHtml(item.label);
              const kind = escapeHtml(item.kind);
              const description = escapeHtml(item.description);

              if (!item.href) {
                return `<li><strong>${kind}: ${label}</strong> - ${description}</li>`;
              }

              const isExternal = item.href.startsWith("http");
              const href = isExternal ? item.href : internalUrl(item.href);
              const externalAttributes = isExternal
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";

              return `<li><strong>${kind}:</strong> <a href="${escapeHtml(href)}"${externalAttributes}>${label}</a> - ${description}</li>`;
            })
            .join("\n")}</ul>
        </section>`
            : ""
        }
        <section aria-labelledby="references-heading">
          <h2 id="references-heading">International and independent references</h2>
          <p>Authoritative sources from missions, international institutions and standards bodies, kept separate from EOS work above.</p>
          <ul>
            ${article.sources
              .map(
                (source) =>
                  `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a> - ${escapeHtml(source.publisher)}</li>`
              )
              .join("\n")}
          </ul>
        </section>
      </article>
    </main>`;
}

const staticRoutes = [
  {
    pathname: "/about/",
    title: "About Dr Ioannis Manakos | EOS",
    description:
      "Research profile, international engagement and Earth Observation expertise of Dr Ioannis Manakos and the CERTH/ITI Remote Sensing Research Team.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: "Ioannis Manakos",
          honorificPrefix: "Dr",
          jobTitle: "Director of Research in Remote Sensing",
          url: "https://www.iti.gr/iti/en/people/ioannis-manakos/",
          sameAs: [
            "https://www.linkedin.com/in/eoservices",
            "https://www.iti.gr/iti/en/people/ioannis-manakos/",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Information Technologies Institute, CERTH",
            url: "https://www.iti.gr/iti/en/",
          },
        },
      },
    ],
    bodyHtml: renderSimplePageBody({
      eyebrow: "About EOS",
      title: "Dr Ioannis Manakos and the EOS team",
      description:
        "Research profile, international engagement and Earth Observation expertise of Dr Ioannis Manakos and the CERTH/ITI Remote Sensing Research Team.",
      links: [
        {
          label: "Research projects and publications",
          href: "/research/",
          description: "Explore the research portfolio and its documented outputs.",
        },
        {
          label: "Earth Observation tools and data",
          href: "/tools/",
          description: "Explore services, software modules and learning resources.",
        },
        {
          label: "Contact EOS",
          href: "/contact/",
          description: "Find institutional and professional contact routes.",
        },
      ],
    }),
  },
  {
    pathname: "/research/",
    title: "Research Projects and Publications | EOS",
    description:
      "Explore EOS Earth Observation projects, publications, special issues, workshops and international research cooperation.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS research",
      title: "Earth Observation research",
      description:
        "Explore EOS Earth Observation projects, publications, special issues, workshops and international research cooperation.",
      links: [
        ...projectCaseStudies.map((caseStudy) => ({
          label: `${caseStudy.projectName} project case study`,
          href: `/research/projects/${caseStudy.slug}/`,
          description: caseStudy.summary,
        })),
        {
          label: "Publications",
          href: "/research/publications/",
          description: "Research publications and scholarly outputs.",
        },
        {
          label: "Special issues",
          href: "/research/issues/",
          description: "Journal special issues connected with EOS research themes.",
        },
        {
          label: "Workshops",
          href: "/research/workshops/",
          description: "Workshops and research-community activities.",
        },
        {
          label: "Cooperations",
          href: "/research/cooperations/",
          description: "International and institutional research cooperation.",
        },
      ],
    }),
  },
  {
    pathname: "/research/publications/",
    title: "Earth Observation Publications and Media | EOS",
    description:
      "Browse EOS journal papers, books, conference work, posters, videos and press material in Earth Observation and environmental monitoring.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS research",
      title: "Publications",
      description:
        "Browse EOS journal articles, conference publications, books, presentations and other Earth Observation research outputs.",
      links: [
        { label: "Research projects", href: "/research/" },
        { label: "Special issues", href: "/research/issues/" },
        { label: "Workshops", href: "/research/workshops/" },
        { label: "Cooperations", href: "/research/cooperations/" },
      ],
    }),
  },
  {
    pathname: "/research/issues/",
    title: "Earth Observation Special Issues | EOS",
    description:
      "Explore scientific special issues edited or supported by EOS in remote sensing, land cover change and analysis-ready satellite data.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS research",
      title: "Special issues",
      description:
        "Explore journal special issues connected with EOS work in remote sensing, land cover, ecosystems and environmental monitoring.",
      links: [
        { label: "Research projects", href: "/research/" },
        { label: "Publications", href: "/research/publications/" },
        { label: "Workshops", href: "/research/workshops/" },
        { label: "Cooperations", href: "/research/cooperations/" },
      ],
    }),
  },
  {
    pathname: "/research/workshops/",
    title: "Earth Observation Workshops | EOS",
    description:
      "Review EOS and EARSeL workshops on land use, land cover, sustainable cities and Earth Observation applications.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS research",
      title: "Workshops",
      description:
        "Explore EOS workshops, training activities and research-community events in Earth Observation and environmental monitoring.",
      links: [
        { label: "Research projects", href: "/research/" },
        { label: "Publications", href: "/research/publications/" },
        { label: "Special issues", href: "/research/issues/" },
        { label: "Cooperations", href: "/research/cooperations/" },
      ],
    }),
  },
  {
    pathname: "/research/cooperations/",
    title: "International Earth Observation Cooperation | EOS",
    description:
      "Explore EOS cooperation with international Earth Observation, biodiversity, land monitoring and training networks.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS research",
      title: "Research cooperation",
      description:
        "Explore EOS participation in international networks, institutional partnerships and Earth Observation research cooperation.",
      links: [
        { label: "Research projects", href: "/research/" },
        { label: "Publications", href: "/research/publications/" },
        { label: "Special issues", href: "/research/issues/" },
        { label: "Workshops", href: "/research/workshops/" },
      ],
    }),
  },
  {
    pathname: "/tools/",
    title: "Earth Observation Tools and Data | EOS",
    description:
      "Explore Earth Observation tools, data products, maps, training resources and environmental monitoring services from EOS.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "Tools and data",
      title: "Earth Observation services",
      description:
        "Explore Earth Observation tools, data products, maps, training resources and environmental monitoring services from EOS.",
      links: [
        {
          label: "Software modules",
          href: "/tools/modules/",
          description: "Explore downloadable and reusable EOS software modules.",
        },
        {
          label: "E-learning",
          href: "/tools/elearning/",
          description: "Explore Earth Observation learning and training resources.",
        },
        {
          label: "Project case studies",
          href: "/research/",
          description: "See how EOS capabilities connect to documented project work.",
        },
      ],
    }),
  },
  {
    pathname: "/tools/modules/",
    title: "Earth Observation Processing Modules | EOS",
    description:
      "Explore EOS processing modules for water, land, vegetation, habitats, biodiversity, radar and phenology analysis.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "Tools and data",
      title: "Software modules",
      description:
        "Explore EOS software modules for satellite image processing, mapping, environmental monitoring and spatial analysis.",
      links: [
        { label: "Earth Observation services", href: "/tools/" },
        { label: "E-learning", href: "/tools/elearning/" },
        { label: "Research projects", href: "/research/" },
      ],
    }),
  },
  {
    pathname: "/tools/elearning/",
    title: "Earth Observation e-Learning and Training | EOS",
    description:
      "Open Earth Observation learning modules and project training resources for environmental monitoring and remote sensing.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "Tools and data",
      title: "Earth Observation e-learning",
      description:
        "Explore EOS Earth Observation e-learning platforms, introductory modules and training resources.",
      links: [
        { label: "Earth Observation services", href: "/tools/" },
        { label: "Software modules", href: "/tools/modules/" },
        {
          label: "EEOBSS education case study",
          href: "/research/projects/eeobss-earth-observation-education/",
        },
      ],
    }),
  },
  {
    pathname: "/news/",
    title: "News and Activities | EOS",
    description:
      "News, publications, events and activities from the EOS CERTH/ITI Remote Sensing Research Team.",
    bodyHtml: renderNewsCollectionBody(),
  },
  {
    pathname: "/contact/",
    title: "Contact | EOS",
    description:
      "Contact Dr Ioannis Manakos and the EOS CERTH/ITI Remote Sensing Research Team for research, services, training and collaboration.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "Contact EOS",
      title: "Research, services, training and collaboration",
      description:
        "Contact Dr Ioannis Manakos and the EOS CERTH/ITI Remote Sensing Research Team for research, services, training and collaboration.",
      links: [
        { label: "About Dr Ioannis Manakos and EOS", href: "/about/" },
        { label: "Research projects", href: "/research/" },
        { label: "Tools and data", href: "/tools/" },
      ],
    }),
  },
  {
    pathname: "/privacy/",
    title: "Privacy and Analytics Choices | EOS",
    description:
      "Learn how the EOS website handles optional aggregate analytics, privacy preferences, hosting and external media.",
    bodyHtml: renderSimplePageBody({
      eyebrow: "EOS website",
      title: "Privacy and analytics choices",
      description:
        "Learn how the EOS website handles optional aggregate analytics, privacy preferences, hosting and external media.",
      links: [
        { label: "Return to the EOS homepage", href: "/" },
        { label: "Contact EOS", href: "/contact/" },
      ],
    }),
  },
];

await writeRoute(
  "/",
  {
    title: "EOS - Earth Observation Services",
    description:
      "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
    pathname: "/",
    image: {
      path: "/images/hero-bg.webp",
      alt: "Earth seen from orbit with a connected Earth Observation data network.",
      width: 1408,
      height: 768,
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "EOS - Earth Observation Services",
        url: `${siteUrl}/`,
        description:
          "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
        publisher: {
          "@type": "Organization",
          name: "EOS - CERTH/ITI Remote Sensing Research Team",
          url: `${siteUrl}/`,
        },
      },
    ],
  },
  renderSimplePageBody({
    eyebrow: "Earth Observation Services",
    title: "Interfacing Earth Observation to the public",
    description:
      "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
    links: [
      { label: "Research projects and publications", href: "/research/" },
      { label: "Earth Observation tools and data", href: "/tools/" },
      { label: "EO Analysis Notes", href: "/eo-insights/" },
      { label: "News and activities", href: "/news/" },
      { label: "About EOS", href: "/about/" },
      { label: "Contact EOS", href: "/contact/" },
    ],
  })
);

for (const route of staticRoutes) {
  const { bodyHtml, ...metadata } = route;
  await writeRoute(route.pathname, metadata, bodyHtml);
}

const collectionPath = "/eo-insights/";
const collectionUrl = `${siteUrl}${collectionPath}`;
await writeRoute(
  collectionPath,
  {
    title: `${data.seriesTitle} | EOS`,
    description: data.seriesDescription,
    pathname: collectionPath,
    image: defaultSocialImage,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: data.seriesTitle,
        description: data.seriesDescription,
        url: collectionUrl,
        primaryImageOfPage: `${siteUrl}${defaultSocialImage.path}`,
        author: {
          "@type": "Person",
          name: data.author.name,
          url: `${siteUrl}${data.author.profilePath}`,
        },
        hasPart: sortedArticles.map((article) => ({
          "@type": "BlogPosting",
          headline: article.title,
          url: `${siteUrl}/eo-insights/${article.slug}/`,
          image: `${siteUrl}${article.image}`,
        })),
      },
    ],
  },
  renderCollectionBody()
);

for (const article of sortedArticles) {
  const pathname = `/eo-insights/${article.slug}/`;
  const canonicalUrl = `${siteUrl}${pathname}`;
  await writeRoute(
    pathname,
    {
      title: `${article.title} | EO Analysis Notes`,
      description: article.seoDescription,
      pathname,
      type: "article",
      publishedAt: article.publishedAt,
      modifiedAt: article.modifiedAt,
      keywords: article.tags,
      image: {
        path: article.image,
        alt: article.imageAlt,
        width: 1200,
        height: 630,
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.seoDescription,
          datePublished: article.publishedAt,
          dateModified: article.modifiedAt,
          mainEntityOfPage: canonicalUrl,
          url: canonicalUrl,
          image: `${siteUrl}${article.image}`,
          author: {
            "@type": "Person",
            name: data.author.name,
            url: `${siteUrl}${data.author.profilePath}`,
          },
          publisher: {
            "@type": "Organization",
            name: "EOS - CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/images/logo/logoeos_clean.svg`,
            },
          },
          keywords: article.tags.join(", "),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: data.seriesTitle,
              item: collectionUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
    renderArticleBody(article)
  );
}

for (const article of newsEntries) {
  const pathname = `/news/${article.slug}/`;
  const canonicalUrl = internalUrl(pathname);
  const publishedAt = getNewsDateIso(article.date);
  const description = getNewsExcerpt(article, 155);
  await writeRoute(
    pathname,
    {
      title: `${article.title} | EOS News`,
      description,
      pathname,
      type: "article",
      publishedAt,
      image: {
        path: article.img,
        alt: article.title,
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description,
          ...(publishedAt ? { datePublished: publishedAt } : {}),
          mainEntityOfPage: canonicalUrl,
          url: canonicalUrl,
          image: internalUrl(article.img),
          author: {
            "@type": "Organization",
            name: "EOS - CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "EOS - CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/images/logo/logoeos_clean.svg`,
            },
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "News",
              item: internalUrl("/news/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
    renderNewsArticleBody(article)
  );
}

for (const caseStudy of projectCaseStudies) {
  const pathname = `/research/projects/${caseStudy.slug}/`;
  const canonicalUrl = internalUrl(pathname);
  await writeRoute(
    pathname,
    {
      title: caseStudy.metadata.title,
      description: caseStudy.metadata.description,
      pathname,
      type: "article",
      publishedAt: caseStudy.metadata.modifiedAt,
      modifiedAt: caseStudy.metadata.modifiedAt,
      keywords: caseStudy.metadata.keywords,
      image: {
        path: caseStudy.image.src,
        alt: caseStudy.image.alt,
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ResearchProject",
          "@id": `${canonicalUrl}#project`,
          name: caseStudy.fullName,
          alternateName: caseStudy.projectName,
          description: caseStudy.summary,
          url: caseStudy.officialProjectUrl,
          image: internalUrl(caseStudy.image.src),
          keywords: caseStudy.themes.join(", "),
          participant: {
            "@type": "Organization",
            name: "EOS, CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
          },
          subjectOf: caseStudy.evidenceLinks.map((evidence) => ({
            "@type": "CreativeWork",
            name: evidence.label,
            url: evidence.url,
            publisher: {
              "@type": "Organization",
              name: evidence.publisher,
            },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${caseStudy.projectName}: an EOS project case study`,
          description: caseStudy.metadata.description,
          datePublished: caseStudy.metadata.modifiedAt,
          dateModified: caseStudy.metadata.modifiedAt,
          mainEntityOfPage: canonicalUrl,
          url: canonicalUrl,
          image: internalUrl(caseStudy.image.src),
          author: {
            "@type": "Organization",
            name: "EOS, CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "EOS, CERTH/ITI Remote Sensing Research Team",
            url: siteUrl,
          },
          about: {
            "@id": `${canonicalUrl}#project`,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Research",
              item: internalUrl("/research/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Projects",
              item: internalUrl("/research/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: caseStudy.projectName,
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
    renderProjectCaseStudyBody(caseStudy)
  );
}

const latestNewsDate = newsEntries
  .map((article) => getNewsDateIso(article.date))
  .filter(Boolean)
  .sort()
  .at(-1);
const lastModifiedByPath = new Map([
  [collectionPath, latestModifiedAt],
  ["/news/", latestNewsDate],
  ...sortedArticles.map((article) => [`/eo-insights/${article.slug}/`, article.modifiedAt]),
  ...newsEntries
    .map((article) => [`/news/${article.slug}/`, getNewsDateIso(article.date)])
    .filter(([, lastModified]) => Boolean(lastModified)),
  ...projectCaseStudies.map((caseStudy) => [
    `/research/projects/${caseStudy.slug}/`,
    caseStudy.metadata.modifiedAt,
  ]),
]);

const sitemapPaths = [
  "/",
  ...staticRoutes.map((route) => route.pathname),
  collectionPath,
  ...sortedArticles.map((article) => `/eo-insights/${article.slug}/`),
  ...newsEntries.map((article) => `/news/${article.slug}/`),
  ...projectCaseStudies.map((caseStudy) => `/research/projects/${caseStudy.slug}/`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map((pathname) => {
    const lastModified = lastModifiedByPath.get(pathname);
    return `  <url>
    <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>${
      lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ""
    }
  </url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(data.seriesTitle)}</title>
    <link>${escapeXml(collectionUrl)}</link>
    <atom:link href="${escapeXml(`${siteUrl}/eo-insights.xml`)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(data.seriesDescription)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${latestModifiedAt}T12:00:00Z`).toUTCString()}</lastBuildDate>
${sortedArticles
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(`${siteUrl}/eo-insights/${article.slug}/`)}</link>
      <guid isPermaLink="true">${escapeXml(`${siteUrl}/eo-insights/${article.slug}/`)}</guid>
      <pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
      <author>imanakos@iti.gr (${escapeXml(data.author.name)})</author>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;
await writeFile(path.join(outputDirectory, "eo-insights.xml"), rss);

process.stdout.write(
  `Generated ${data.articles.length} EO insight pages, ${newsEntries.length} news pages, ${projectCaseStudies.length} project case studies, sitemap.xml and eo-insights.xml.\n`
);
