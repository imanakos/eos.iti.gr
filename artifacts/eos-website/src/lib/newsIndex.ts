import { newsArticles, type NewsArticle } from "@/data/newsData";

export interface NewsEntry extends NewsArticle {
  slug: string;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const baseSlugs = newsArticles.map(
  (article, index) => slugify(article.title) || `news-item-${index + 1}`
);
const baseSlugCounts = new Map<string, number>();

for (const slug of baseSlugs) {
  baseSlugCounts.set(slug, (baseSlugCounts.get(slug) ?? 0) + 1);
}

const usedSlugs = new Map<string, number>();

export const newsEntries: NewsEntry[] = newsArticles.map((article, index) => {
  const baseSlug = baseSlugs[index];
  const candidate =
    (baseSlugCounts.get(baseSlug) ?? 0) > 1
      ? `${baseSlug}-${slugify(article.newsId) || index + 1}`
      : baseSlug;
  const occurrence = (usedSlugs.get(candidate) ?? 0) + 1;
  usedSlugs.set(candidate, occurrence);

  return {
    ...article,
    slug: occurrence === 1 ? candidate : `${candidate}-${occurrence}`,
  };
});

const newsBySlug = new Map(newsEntries.map((article) => [article.slug, article]));

export function getNewsEntry(slug: string) {
  return newsBySlug.get(slug);
}

export function getNewsYear(date: string) {
  return date.match(/\b(?:19|20)\d{2}\b/)?.[0];
}

export const newsYears = Array.from(
  new Set(
    newsEntries
      .map((article) => getNewsYear(article.date))
      .filter((newsYear): newsYear is string => Boolean(newsYear))
  )
).sort((a, b) => Number(b) - Number(a));

const monthNumbers: Record<string, string> = {
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

export function getNewsDateIso(date: string) {
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
