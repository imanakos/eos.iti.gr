import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

// Run from any directory; --production additionally checks an existing local build.
const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arguments_ = process.argv.slice(2);
assert(
  arguments_.every((argument) => argument === "--production"),
  "Only --production is supported."
);
const data = JSON.parse(
  readFileSync(path.join(projectDirectory, "src/data/eoInsights.json"), "utf8")
);
// Private exclusions may be supplied at runtime; no private names belong in this file.
const excludedTerms = (process.env.EO_NOTES_EXCLUDED_TERMS || "")
  .split(",")
  .map((term) => term.trim().toLowerCase())
  .filter(Boolean);
const originalSlugs = [
  "can-radar-satellites-see-through-clouds",
  "can-satellites-identify-urban-heat-islands",
  "how-do-satellites-map-wildfire-damage",
  "why-does-healthy-vegetation-appear-red",
  "can-satellites-detect-water-pollution",
  "can-geoai-replace-the-earth-observation-expert",
  "when-has-the-land-really-changed",
  "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity",
  "why-does-a-global-land-change-taxonomy-matter",
];
const newImages = new Map([
  ["can-satellites-reveal-forest-structure-beyond-canopy-greenness", "forest-structure.jpg"],
  ["why-do-shorelines-move-between-satellite-observations", "shoreline-dynamics.jpg"],
  ["can-earth-observation-describe-ecological-condition", "ecological-condition.jpg"],
  ["how-can-we-separate-seasonal-forest-change-from-disturbance", "seasonal-forest-change.jpg"],
  ["when-is-a-water-quality-indicator-ready-to-support-management", "water-quality-management.jpg"],
  ["what-should-an-eo-model-do-when-the-evidence-is-insufficient", "model-uncertainty.jpg"],
]);
const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const noDraftStamps =
  /local draft|local review only|drafts for review|not published|unpublished drafts?/i;
const allCitationUrls = new Set();

function nonemptyString(value, context) {
  assert.equal(typeof value, "string", `${context} must be a string.`);
  assert(value.trim(), `${context} must not be empty.`);
}

function validLink(value, context, allowLocal = true) {
  nonemptyString(value, context);
  assert(!/[\s\\]/.test(value), `${context} contains whitespace or a backslash.`);
  if (allowLocal && value.startsWith("/") && !value.startsWith("//"))
    return value.replace(/\/$/, "");
  const parsed = new URL(value);
  assert.equal(parsed.protocol, "https:", `${context} must use HTTPS or a root-relative path.`);
  assert(!parsed.username && !parsed.password, `${context} must not contain credentials.`);
  assert(
    !/(^|\.)(example\.(com|org|net)|localhost|invalid)$/.test(parsed.hostname),
    `${context} uses a placeholder host.`
  );
  parsed.hash = "";
  return parsed.href.replace(/\/$/, "");
}

function inspectStrings(value, context) {
  if (typeof value === "string") {
    assert(!/[\u2013\u2014]/u.test(value), `${context} contains an en or em dash.`);
    assert(
      !excludedTerms.some((term) => value.toLowerCase().includes(term)),
      `${context} contains a runtime-excluded term.`
    );
    assert(
      !/\b(?:lorem ipsum|TODO|TBD|FIXME|your name|example company)\b/i.test(value),
      `${context} contains placeholder content.`
    );
    assert(!noDraftStamps.test(value), `${context} contains a draft stamp.`);
  } else if (Array.isArray(value))
    value.forEach((item, index) => inspectStrings(item, `${context}[${index}]`));
  else if (value && typeof value === "object")
    Object.entries(value).forEach(([key, item]) => inspectStrings(item, `${context}.${key}`));
}

function checkJpeg(file) {
  assert(existsSync(file), `Missing figure: ${file}`);
  const bytes = readFileSync(file);
  assert(
    bytes.length > 1024 &&
      bytes.readUInt16BE(0) === 0xffd8 &&
      bytes.readUInt16BE(bytes.length - 2) === 0xffd9,
    `Not a complete JPEG: ${file}`
  );
  for (let offset = 2; offset < bytes.length; ) {
    assert.equal(bytes[offset++], 0xff, `Malformed JPEG marker: ${file}`);
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) continue;
    const length = bytes.readUInt16BE(offset);
    assert(length >= 2 && offset + length <= bytes.length, `Malformed JPEG segment: ${file}`);
    if (
      [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(
        marker
      )
    ) {
      assert.deepEqual(
        [bytes.readUInt16BE(offset + 5), bytes.readUInt16BE(offset + 3)],
        [1200, 630],
        `Figure must be 1200x630: ${file}`
      );
      return;
    }
    offset += length;
  }
  assert.fail(`JPEG dimensions not found: ${file}`);
}

assert(Array.isArray(data.articles), "Articles must be an array.");
assert.equal(data.articles.length, 15, "The release must contain all 15 notes.");
const knownSlugs = new Set(data.articles.map(({ slug }) => slug));
assert.equal(knownSlugs.size, 15, "All note slugs must be unique.");
assert.deepEqual(
  [...knownSlugs].sort(),
  [...originalSlugs, ...newImages.keys()].sort(),
  "Unexpected note membership."
);
assert.equal(
  hash(originalSlugs.map((slug) => data.articles.find((article) => article.slug === slug))),
  "36d188533921e50c81282b95bee067c76924f6efe68de87aef03c2dc05164fc0",
  "The original nine article records must remain unchanged."
);

for (const article of data.articles.filter(({ slug }) => newImages.has(slug))) {
  const context = article.slug;
  inspectStrings(article, context);
  assert.notEqual(article.status, "draft", `${context}: remove draft status before release.`);
  for (const key of Object.keys(article))
    assert(
      !/^(?:publishedAt|modifiedAt|publicationDate|datePublished|dateModified|publishedDate|publishDate|date)$/i.test(
        key
      ),
      `${context}: do not invent a publication or modification date (${key}).`
    );
  for (const field of [
    "title",
    "shortTitle",
    "summary",
    "seoDescription",
    "keyPoint",
    "visual",
    "imageAlt",
  ])
    nonemptyString(article[field], `${context}.${field}`);
  assert.equal(
    article.image,
    `/images/eo-insights/${newImages.get(context)}`,
    `${context}: wrong figure asset path.`
  );
  checkJpeg(path.join(projectDirectory, "public", article.image));
  assert(
    Array.isArray(article.paragraphs) && article.paragraphs.length,
    `${context}: body paragraphs are required.`
  );
  for (const paragraph of article.paragraphs) {
    nonemptyString(paragraph, `${context}: paragraph`);
    assert(
      !/(?:!?\[[^\]]+\]\([^)]*\)|\*\*|__|`|^\s{0,3}#{1,6}\s|^\s*[-*+]\s|<\/?[a-z][^>]*>)/m.test(
        paragraph
      ),
      `${context}: body contains unrendered markup.`
    );
  }
  const wordCount = article.paragraphs.join(" ").trim().split(/\s+/u).length;
  assert(
    wordCount >= 400 && wordCount <= 600,
    `${context}: body has ${wordCount} words; expected 400-600.`
  );
  assert(Array.isArray(article.paragraphLinks), `${context}: paragraphLinks must be an array.`);
  for (const link of article.paragraphLinks) {
    assert(
      Number.isInteger(link.paragraphIndex) &&
        link.paragraphIndex >= 0 &&
        link.paragraphIndex < article.paragraphs.length,
      `${context}: citation paragraph index is out of range.`
    );
    nonemptyString(link.label, `${context}: citation label`);
    validLink(link.url, `${context}: citation URL`);
    allCitationUrls.add(link.url);
  }
  assert(
    Array.isArray(article.sources) && article.sources.length,
    `${context}: independent sources are required.`
  );
  const sourceUrls = new Set();
  for (const source of article.sources) {
    nonemptyString(source.label, `${context}: source label`);
    nonemptyString(source.publisher, `${context}: source publisher`);
    const url = validLink(source.url, `${context}: source URL`, false);
    assert(!sourceUrls.has(url), `${context}: duplicate independent source URL.`);
    sourceUrls.add(url);
    allCitationUrls.add(source.url);
  }
  assert(
    Array.isArray(article.evidence) && article.evidence.length,
    `${context}: EOS evidence is required.`
  );
  for (const evidence of article.evidence) {
    for (const field of ["kind", "label", "description"])
      nonemptyString(evidence[field], `${context}: evidence ${field}`);
    const links = [
      { label: evidence.label, url: evidence.href },
      ...(evidence.additionalLinks ?? []),
    ];
    for (const link of links) {
      nonemptyString(link.label, `${context}: evidence link label`);
      const url = validLink(link.url, `${context}: evidence URL`);
      assert(!sourceUrls.has(url), `${context}: EOS evidence duplicates an independent source.`);
      allCitationUrls.add(link.url);
    }
  }
  assert(
    Array.isArray(article.relatedSlugs) && article.relatedSlugs.length,
    `${context}: related notes are required.`
  );
  assert.equal(
    new Set(article.relatedSlugs).size,
    article.relatedSlugs.length,
    `${context}: duplicate related notes.`
  );
  for (const slug of article.relatedSlugs)
    assert(knownSlugs.has(slug) && slug !== context, `${context}: invalid related note ${slug}.`);
  process.stdout.write(
    `PASS ${context}: ${wordCount} words; figure, citations and EOS evidence verified.\n`
  );
}
assert.equal(allCitationUrls.size, 35, "All 35 distinct approved reference URLs must be retained.");
assert.equal(
  hash([...allCitationUrls].sort()),
  "7a94ca1b58fdf614f8f656b231d72ffc09fafb22d422807de1dcab3d1ece09a7",
  "The approved reference URL set changed."
);

function decodeEntities(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function assertCleanOutput(content, context) {
  assert(
    !/\b(?:undefined|NaN|Invalid Date)\b/.test(content),
    `${context}: invalid or missing value leaked into output.`
  );
  assert(!noDraftStamps.test(content), `${context}: a draft stamp remains.`);
  assert(
    !/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(content),
    `${context}: must be indexable.`
  );
}

function jsonLd(html) {
  return [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((match) => JSON.parse(match[1]));
}

function section(html, heading) {
  const result = html.match(
    new RegExp(`<section\\b[^>]*aria-labelledby="${heading}"[^>]*>([\\s\\S]*?)<\\/section>`)
  );
  assert(result, `Missing static section: ${heading}`);
  return result[1];
}

function assertLink(html, url, label, context) {
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  assert(
    anchors.some(
      ([, href, body]) =>
        (href === url || (url.startsWith("/") && href.endsWith(url))) && body.includes(label)
    ),
    `${context}: missing static link ${label}.`
  );
}

if (arguments_.includes("--production")) {
  const outputDirectory = path.join(projectDirectory, "dist/public");
  const readOutput = (relative) => {
    const file = path.join(outputDirectory, relative);
    assert(existsSync(file), `Build output is missing: ${relative}`);
    const result = decodeEntities(readFileSync(file, "utf8"));
    assertCleanOutput(result, relative);
    return result;
  };
  const sitemap = readOutput("sitemap.xml");
  const rss = readOutput("eo-insights.xml");
  const items = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
  assert.equal(items.length, 15, "RSS must contain exactly 15 notes.");
  const collection = readOutput("eo-insights/index.html");
  const collectionSchema = jsonLd(collection).find((item) => item["@type"] === "CollectionPage");
  assert.equal(
    collectionSchema?.hasPart?.length,
    15,
    "Collection structured data must contain 15 notes."
  );
  const sitemapNotes = [...sitemap.matchAll(/<loc>[^<]*\/eo-insights\/([^/<]+)\/<\/loc>/g)].map(
    (match) => match[1]
  );
  assert.deepEqual(
    sitemapNotes.sort(),
    [...knownSlugs].sort(),
    "Sitemap must contain exactly the 15 note routes."
  );
  for (const article of data.articles) {
    const route = `/eo-insights/${article.slug}/`;
    const html = readOutput(`eo-insights/${article.slug}/index.html`);
    assertLink(collection, route, article.title, article.slug);
    const posting = jsonLd(html).find((item) => item["@type"] === "BlogPosting");
    assert(posting, `${article.slug}: missing BlogPosting schema.`);
    assert.equal(posting.headline, article.title);
    assert(posting.url.endsWith(route), `${article.slug}: incorrect canonical schema URL.`);
    const siteBase = posting.url.slice(0, -route.length);
    assert.equal(
      posting.image,
      `${siteBase}${article.image}`,
      `${article.slug}: incorrect schema figure URL.`
    );
    assert(
      html.includes(`id="canonical-url" rel="canonical" href="${posting.url}"`),
      `${article.slug}: incorrect canonical link.`
    );
    assert(
      html.includes(`property="og:image" content="${posting.image}"`) &&
        html.includes(`name="twitter:image" content="${posting.image}"`),
      `${article.slug}: missing social image metadata.`
    );
    assert(
      html.includes(`src="${posting.image}" alt="${article.imageAlt}"`),
      `${article.slug}: missing static figure or alternative text.`
    );
    const rssItem = items.find((item) => item.includes(`<link>${posting.url}</link>`));
    assert(rssItem, `${article.slug}: missing RSS item.`);
    if (newImages.has(article.slug)) {
      assert(
        !("datePublished" in posting) && !("dateModified" in posting),
        `${article.slug}: invented schema dates.`
      );
      assert(
        !/<time\b|article:(?:published|modified)_time/.test(html),
        `${article.slug}: invented HTML publication dates.`
      );
      assert(!/<pubDate>/.test(rssItem), `${article.slug}: invented RSS publication date.`);
      const sitemapEntry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((match) =>
        match[1].includes(`<loc>${posting.url}</loc>`)
      );
      assert(
        sitemapEntry && !/<lastmod>/.test(sitemapEntry[1]),
        `${article.slug}: invented sitemap modification date.`
      );
      checkJpeg(path.join(outputDirectory, article.image));
      const evidenceHtml = section(html, "eos-practice-heading");
      const sourcesHtml = section(html, "references-heading");
      for (const reference of article.paragraphLinks)
        assertLink(html, reference.url, reference.label, article.slug);
      for (const source of article.sources)
        assertLink(sourcesHtml, source.url, source.label, article.slug);
      for (const evidence of article.evidence) {
        assertLink(evidenceHtml, evidence.href, evidence.label, article.slug);
        assert(
          evidenceHtml.includes(evidence.description),
          `${article.slug}: missing evidence description.`
        );
        for (const link of evidence.additionalLinks ?? [])
          assertLink(evidenceHtml, link.url, link.label, article.slug);
      }
    } else {
      assert.equal(posting.datePublished, article.publishedAt);
      assert.equal(posting.dateModified, article.modifiedAt);
      assert(
        rssItem.includes(
          `<pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>`
        ),
        `${article.slug}: original RSS date changed.`
      );
    }
  }
  process.stdout.write(
    "PASS production readiness: 15 routes, collection entries, sitemap entries and RSS items; six figures and static evidence links; clean metadata with no invented dates.\n"
  );
}

process.stdout.write("PASS EO note deployment-readiness checks.\n");
