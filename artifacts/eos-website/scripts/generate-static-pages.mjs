import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

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

function absoluteAssetUrl(value) {
  const assetPath = String(value);
  if (!assetPath.startsWith("/") || assetPath.startsWith("//")) {
    throw new Error(`Expected a local site asset path, received: ${assetPath}`);
  }
  return `${siteUrl}${assetPath}`;
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
      ? `
    <meta data-route-meta property="article:published_time" content="${escapeHtml(publishedAt)}" />
    <meta data-route-meta property="article:modified_time" content="${escapeHtml(modifiedAt)}" />`
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

function renderArticleMedia(article) {
  if (!article.animation) {
    return `<figure>
            <img src="${escapeHtml(`${siteUrl}${article.image}`)}" alt="${escapeHtml(article.imageAlt)}" width="1200" height="630" />
            <figcaption>${escapeHtml(data.visualDisclosure)}</figcaption>
          </figure>`;
  }

  const descriptionId = `animation-description-${article.slug}`;
  const webmUrl = absoluteAssetUrl(article.animation.webm);
  const mp4Url = absoluteAssetUrl(article.animation.mp4);
  const posterUrl = absoluteAssetUrl(article.animation.poster);

  return `<figure>
            <video controls playsinline preload="metadata" poster="${escapeHtml(posterUrl)}" aria-describedby="${escapeHtml(descriptionId)}" width="1200" height="672">
              <source src="${escapeHtml(webmUrl)}" type="video/webm" />
              <source src="${escapeHtml(mp4Url)}" type="video/mp4" />
              <a href="${escapeHtml(mp4Url)}">View the MP4 animation</a>
            </video>
            <p id="${escapeHtml(descriptionId)}" class="sr-only">${escapeHtml(article.animation.description)}</p>
            <figcaption>${escapeHtml(article.animation.caption)}</figcaption>
          </figure>`;
}

function renderArticleBody(article) {
  return `<main>
      <article>
        <header>
          <p><a href="${escapeHtml(`${siteUrl}/eo-insights/`)}">${escapeHtml(data.seriesTitle)}</a></p>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.summary)}</p>
          <time datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(article.publishedAt)}</time>
          <p>By <a href="${escapeHtml(`${siteUrl}${data.author.profilePath}/`)}">${escapeHtml(data.author.name)}</a>, ${escapeHtml(data.author.role)}</p>
          ${renderArticleMedia(article)}
        </header>
        ${article.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
        <aside>
          <h2>Key point</h2>
          <p>${escapeHtml(article.keyPoint)}</p>
        </aside>
        <section aria-labelledby="references-heading">
          <h2 id="references-heading">Explore the evidence</h2>
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
  },
  {
    pathname: "/research/",
    title: "Research Projects and Publications | EOS",
    description:
      "Explore EOS Earth Observation projects, publications, special issues, workshops and international research cooperation.",
  },
  {
    pathname: "/tools/",
    title: "Earth Observation Tools and Data | EOS",
    description:
      "Explore Earth Observation tools, data products, maps, training resources and environmental monitoring services from EOS.",
  },
  {
    pathname: "/news/",
    title: "News and Activities | EOS",
    description:
      "News, publications, events and activities from the EOS CERTH/ITI Remote Sensing Research Team.",
  },
  {
    pathname: "/contact/",
    title: "Contact | EOS",
    description:
      "Contact Dr Ioannis Manakos and the EOS CERTH/ITI Remote Sensing Research Team for research, services, training and collaboration.",
  },
];

const rootMetadata = metadataBlock({
  title: "EOS - Earth Observation Services",
  description:
    "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
  pathname: "/",
});
await writeFile(
  path.join(outputDirectory, "index.html"),
  shell.replace(metadataPattern, rootMetadata)
);

for (const route of staticRoutes) {
  await writeRoute(route.pathname, {
    ...route,
    path: route.pathname,
  });
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
            name: "EOS – CERTH/ITI Remote Sensing Research Team",
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

const sitemapPaths = [
  "/",
  ...staticRoutes.map((route) => route.pathname),
  collectionPath,
  ...sortedArticles.map((article) => `/eo-insights/${article.slug}/`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map((pathname) => {
    const article = sortedArticles.find((item) => `/eo-insights/${item.slug}/` === pathname);
    const lastModified =
      article?.modifiedAt || (pathname === collectionPath ? latestModifiedAt : null);
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
  `Generated ${data.articles.length} EO insight pages, sitemap.xml and eo-insights.xml.\n`
);
