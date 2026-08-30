import { newsBodyText } from "@/data/newsBodyData";
import type { NewsArticle } from "@/data/newsData";
export { getNewsDateIso, getNewsEntry, getNewsYear, newsEntries, newsYears } from "./newsIndex";
export type { NewsEntry } from "./newsIndex";

export function getNewsBody(article: NewsArticle) {
  return article.newsId ? newsBodyText[article.newsId] : undefined;
}

function plainText(value: string) {
  return value
    .replace(/https?:\/\/[^\s<>"]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getNewsExcerpt(article: NewsArticle, maximumLength = 190) {
  const body = getNewsBody(article);
  const source = plainText(body || article.title);

  if (source.length <= maximumLength) return source;

  const shortened = source.slice(0, maximumLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const endpoint = lastSpace > maximumLength * 0.6 ? lastSpace : maximumLength;

  return `${shortened.slice(0, endpoint).trim()}…`;
}
