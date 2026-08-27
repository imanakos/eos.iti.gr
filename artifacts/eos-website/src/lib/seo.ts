import { useEffect } from "react";

export const SITE_URL = "https://imanakos.github.io/eos.iti.gr";
const DEFAULT_TITLE = "EOS - Earth Observation Services";
const DEFAULT_DESCRIPTION =
  "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.";
export const DEFAULT_SOCIAL_IMAGE = {
  path: "/images/eo-insights/eo-analysis-notes.jpg",
  alt: "Three concept illustrations, not satellite data, of vegetation, water and Earth Observation data analysis.",
  width: 1200,
  height: 630,
};

export interface PageSocialImage {
  path: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
  keywords?: string[];
  image?: PageSocialImage;
  jsonLd?: Record<string, unknown>[];
}

function setMetaContent(id: string, content: string) {
  const element = document.getElementById(id);
  if (element instanceof HTMLMetaElement) {
    element.content = content;
  }
}

export function usePageMetadata(metadata: PageMetadata | null) {
  useEffect(() => {
    if (!metadata) return;

    const canonical = `${SITE_URL}${metadata.path}`;
    const socialImage = metadata.image ?? DEFAULT_SOCIAL_IMAGE;
    const socialImageUrl = `${SITE_URL}${socialImage.path}`;
    const canonicalElement = document.getElementById("canonical-url");

    document.querySelectorAll("[data-route-meta]").forEach((element) => element.remove());

    document.title = metadata.title;
    setMetaContent("meta-description", metadata.description);
    setMetaContent("og-title", metadata.title);
    setMetaContent("og-description", metadata.description);
    setMetaContent("og-url", canonical);
    setMetaContent("og-type", metadata.type ?? "website");
    setMetaContent("og-image", socialImageUrl);
    setMetaContent("og-image-width", String(socialImage.width ?? 1200));
    setMetaContent("og-image-height", String(socialImage.height ?? 630));
    setMetaContent("og-image-alt", socialImage.alt);
    setMetaContent("twitter-title", metadata.title);
    setMetaContent("twitter-description", metadata.description);
    setMetaContent("twitter-image", socialImageUrl);
    setMetaContent("twitter-image-alt", socialImage.alt);

    if (canonicalElement instanceof HTMLLinkElement) {
      canonicalElement.href = canonical;
    }

    const dynamicElements: HTMLElement[] = [];
    const addMeta = (property: string, content: string, useName = false) => {
      const element = document.createElement("meta");
      element.setAttribute(useName ? "name" : "property", property);
      element.content = content;
      document.head.appendChild(element);
      dynamicElements.push(element);
    };

    if (metadata.publishedAt) {
      addMeta("article:published_time", metadata.publishedAt);
    }
    if (metadata.modifiedAt) {
      addMeta("article:modified_time", metadata.modifiedAt);
    }
    if (metadata.keywords?.length) {
      addMeta("keywords", metadata.keywords.join(", "), true);
    }

    for (const data of metadata.jsonLd ?? []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data).replace(/</g, "\\u003c");
      document.head.appendChild(script);
      dynamicElements.push(script);
    }

    return () => {
      dynamicElements.forEach((element) => element.remove());
      document.title = DEFAULT_TITLE;
      setMetaContent("meta-description", DEFAULT_DESCRIPTION);
      setMetaContent("og-title", DEFAULT_TITLE);
      setMetaContent("og-description", DEFAULT_DESCRIPTION);
      setMetaContent("og-url", `${SITE_URL}/`);
      setMetaContent("og-type", "website");
      setMetaContent("og-image", `${SITE_URL}${DEFAULT_SOCIAL_IMAGE.path}`);
      setMetaContent("og-image-width", String(DEFAULT_SOCIAL_IMAGE.width));
      setMetaContent("og-image-height", String(DEFAULT_SOCIAL_IMAGE.height));
      setMetaContent("og-image-alt", DEFAULT_SOCIAL_IMAGE.alt);
      setMetaContent("twitter-title", DEFAULT_TITLE);
      setMetaContent("twitter-description", DEFAULT_DESCRIPTION);
      setMetaContent("twitter-image", `${SITE_URL}${DEFAULT_SOCIAL_IMAGE.path}`);
      setMetaContent("twitter-image-alt", DEFAULT_SOCIAL_IMAGE.alt);
      if (canonicalElement instanceof HTMLLinkElement) {
        canonicalElement.href = `${SITE_URL}/`;
      }
    };
  }, [metadata]);
}
