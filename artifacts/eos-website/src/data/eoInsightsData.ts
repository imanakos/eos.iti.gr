import rawData from "./eoInsights.json";

export type InsightVisual = "vegetation" | "water" | "geoai";

export interface EOInsightSource {
  label: string;
  url: string;
  publisher: string;
}

export interface EOInsight {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  seoDescription: string;
  publishedAt: string;
  modifiedAt: string;
  readingMinutes: number;
  visual: InsightVisual;
  image: string;
  imageAlt: string;
  tags: string[];
  keyPoint: string;
  paragraphs: string[];
  sources: EOInsightSource[];
}

interface EOInsightsCollection {
  seriesTitle: string;
  seriesDescription: string;
  visualDisclosure: string;
  author: {
    name: string;
    role: string;
    profilePath: string;
  };
  articles: EOInsight[];
}

export const eoInsightsData = rawData as EOInsightsCollection;
export const eoInsights = eoInsightsData.articles;
export const sortedEOInsights = [...eoInsights].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt)
);

export function getEOInsight(slug: string): EOInsight | undefined {
  return eoInsights.find((insight) => insight.slug === slug);
}

export function formatInsightDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
