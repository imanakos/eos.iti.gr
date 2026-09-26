import rawData from "./eoVideos.json";

interface EOVideo {
  url: string;
  durationSeconds: number;
}

export interface EOArticleVideos {
  short: EOVideo;
  long: EOVideo;
}

interface EOVideoCollection {
  channelName: string;
  channelUrl: string;
  articles: Record<string, EOArticleVideos | undefined>;
}

export const eoVideoData = rawData as EOVideoCollection;

export function getEOArticleVideos(slug: string): EOArticleVideos | undefined {
  return eoVideoData.articles[slug];
}

export function formatVideoDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
