import rawData from "./eoInsights.json";
import type { EOSEvidenceItem } from "./eoEvidenceData";
import { orderEOInsights } from "./eoInsightOrder";
import type { IllustratedTopic } from "./eoInsightIllustrations";

export type InsightVisual =
  | "radar"
  | "heat"
  | "fire"
  | "vegetation"
  | "water"
  | "geoai"
  | "landcover"
  | "geobiodiversity"
  | "taxonomy"
  | "foreststructure"
  | "shoreline"
  | "condition"
  | "forestchange"
  | "watermanagement"
  | "uncertainty"
  | IllustratedTopic;

export interface EOInsightSource {
  label: string;
  url: string;
  publisher: string;
  description?: string;
}

export interface EOInsight {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  seoDescription: string;
  status?: "draft";
  publishedAt?: string;
  modifiedAt?: string;
  readingMinutes: number;
  visual?: InsightVisual;
  image?: string;
  imageAlt?: string;
  diagram?: { src: string; alt: string; caption: string };
  tags: string[];
  keyPoint: string;
  paragraphs: string[];
  paragraphLinks?: { paragraphIndex: number; label: string; url: string }[];
  sources: EOInsightSource[];
  evidence?: EOSEvidenceItem[];
  relatedSlugs?: string[];
}

interface EOInsightsCollection {
  seriesTitle: string;
  publicTitle: string;
  publicTagline: string;
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
export const sortedEOInsights = orderEOInsights(eoInsights);

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
