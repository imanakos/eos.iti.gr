import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argumentsList = process.argv.slice(2);
assert(
  argumentsList.every((argument) => argument === "--production"),
  "Only --production is supported."
);
const production = argumentsList.includes("--production");

const readJson = (relativePath) =>
  JSON.parse(readFileSync(path.join(projectDirectory, relativePath), "utf8"));
const videos = readJson("src/data/eoVideos.json");
const notes = readJson("src/data/eoInsights.json");
const expected = {
  "can-earth-observation-describe-ecological-condition": {
    short: "https://www.youtube.com/shorts/LoLXs8Zghgk",
    long: "https://www.youtube.com/watch?v=x2GEcokBLZ8",
  },
  "can-satellites-reveal-forest-structure-beyond-canopy-greenness": {
    short: "https://www.youtube.com/shorts/W4H5YiqsHyI",
    long: "https://www.youtube.com/watch?v=1irzsFv0U2w",
  },
  "can-geoai-replace-the-earth-observation-expert": {
    short: "https://www.youtube.com/shorts/7nq3q647X3o",
    long: "https://www.youtube.com/watch?v=upDWzgNqEtY",
  },
};

assert.equal(videos.channelName, "Earth Observation Explained");
assert.equal(videos.channelUrl, "https://www.youtube.com/@EOexplained");
assert.deepEqual(
  Object.keys(videos.articles).sort(),
  Object.keys(expected).sort(),
  "Video metadata must cover exactly the three approved notes."
);

const noteSlugs = new Set(notes.articles.map((article) => article.slug));
const videoUrls = new Set();
for (const [slug, formats] of Object.entries(videos.articles)) {
  assert(noteSlugs.has(slug), `Video metadata references an unknown note: ${slug}`);
  assert.deepEqual(
    Object.keys(formats).sort(),
    ["long", "short"],
    `${slug} must have both video formats.`
  );
  for (const format of ["short", "long"]) {
    const video = formats[format];
    assert.equal(
      video.url,
      expected[slug][format],
      `${slug} ${format} does not match its approved public video.`
    );
    const url = new URL(video.url);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "www.youtube.com");
    assert(
      !url.username && !url.password && !url.hash && !url.port,
      "Video URLs must not contain credentials, fragments or ports."
    );
    assert(!videoUrls.has(video.url), `Duplicate video URL: ${video.url}`);
    videoUrls.add(video.url);
    assert(
      Number.isFinite(video.durationSeconds) && video.durationSeconds > 0,
      `${slug} ${format} needs a positive duration in seconds.`
    );
    assert(video.durationSeconds < 3600, `${slug} ${format} duration is unexpectedly long.`);
    if (format === "short")
      assert(video.durationSeconds <= 180, `${slug} Short exceeds three minutes.`);
  }
  assert(
    formats.long.durationSeconds > formats.short.durationSeconds,
    `${slug} full explanation should be longer than the Short.`
  );
}
assert.equal(videoUrls.size, 6);
process.stdout.write(
  "PASS: three existing notes, six unique approved YouTube links and valid durations.\n"
);

function decodeHtml(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function links(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    attributes: match[1],
    href: decodeHtml(match[1].match(/\bhref="([^"]*)"/)?.[1] ?? ""),
    label: decodeHtml(match[2].replace(/<[^>]*>/g, "")).trim(),
  }));
}

function assertExternalLink(html, href, label, context) {
  const matches = links(html).filter((link) => link.href === href && link.label === label);
  assert.equal(matches.length, 1, `${context}: expected one ${label} link.`);
  assert(
    /\btarget="_blank"/.test(matches[0].attributes),
    `${context}: YouTube should open in a new tab.`
  );
  const rel = matches[0].attributes.match(/\brel="([^"]*)"/)?.[1].split(/\s+/) ?? [];
  assert(
    rel.includes("noopener") && rel.includes("noreferrer"),
    `${context}: external link needs safe rel attributes.`
  );
}

function durationLabel(seconds) {
  const roundedSeconds = Math.round(seconds);
  return `${Math.floor(roundedSeconds / 60)}:${String(roundedSeconds % 60).padStart(2, "0")}`;
}

if (production) {
  const readPage = (relativePath) =>
    readFileSync(path.join(projectDirectory, "dist", "public", relativePath, "index.html"), "utf8");
  const collection = readPage("eo-insights");
  assertExternalLink(
    collection,
    videos.channelUrl,
    "EO explained on YouTube",
    "EO Insights collection"
  );
  assert(
    collection.includes("Prefer to watch?"),
    "Collection is missing the video channel introduction."
  );
  for (const article of notes.articles) {
    const html = readPage(`eo-insights/${article.slug}`);
    const formats = videos.articles[article.slug];
    const videoSection = html.match(
      /<section\b[^>]*aria-labelledby="watch-explanation-heading"[^>]*>([\s\S]*?)<\/section>/
    );
    const collectionCard = [...collection.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].find(
      (match) => links(match[1]).some((link) => link.href.endsWith(`/eo-insights/${article.slug}/`))
    );
    assert(collectionCard, `${article.slug}: collection card is missing.`);
    assert.equal(
      collectionCard[1].includes("Short + full video available"),
      Boolean(formats),
      `${article.slug}: collection video label does not match availability.`
    );
    if (!formats) {
      assert(
        !videoSection && !html.includes("Watch this explanation"),
        `${article.slug}: unlinked note must not show a video section.`
      );
      continue;
    }
    assert(videoSection, `${article.slug}: video section is missing.`);
    assert(
      videoSection[1].includes("Watch this explanation"),
      `${article.slug}: video heading is missing.`
    );
    assertExternalLink(
      videoSection[1],
      formats.short.url,
      `Watch the Short (${durationLabel(formats.short.durationSeconds)})`,
      article.slug
    );
    assertExternalLink(
      videoSection[1],
      formats.long.url,
      `Watch the full explanation (${durationLabel(formats.long.durationSeconds)})`,
      article.slug
    );
    assert.equal(
      links(videoSection[1]).length,
      2,
      `${article.slug}: expected only the Short and full video links.`
    );
    assert(
      videoSection[1].includes("Opens on YouTube. No YouTube player loads on this page."),
      `${article.slug}: privacy note is missing.`
    );
    assert(
      !/<(?:iframe|img|video|audio|script)\b/i.test(videoSection[1]),
      `${article.slug}: video links must not embed or load external media.`
    );
    const articleStart = html.indexOf("<article>");
    const headerEnd = html.indexOf("</header>", articleStart);
    const firstParagraph = decodeHtml(html).indexOf(article.paragraphs[0]);
    assert(
      headerEnd >= 0 && videoSection.index > headerEnd && firstParagraph > 0,
      `${article.slug}: video section must follow the article header.`
    );
    const beforeVideo = decodeHtml(html.slice(0, videoSection.index));
    assert(
      !beforeVideo.includes(article.paragraphs[0]),
      `${article.slug}: video section must precede the article body.`
    );
  }
  process.stdout.write(
    "PASS: production collection/channel link, six labelled video links, duration text, privacy notice and unaffected-note coverage.\n"
  );
}
