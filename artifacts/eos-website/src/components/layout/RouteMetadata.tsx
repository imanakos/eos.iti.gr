import { useLocation } from "wouter";
import { type PageMetadata, usePageMetadata } from "@/lib/seo";

const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "EOS - Earth Observation Services",
    description:
      "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
    path: "/",
  },
  "/about": {
    title: "About Dr Ioannis Manakos | EOS",
    description:
      "Research profile, international engagement and Earth Observation expertise of Dr Ioannis Manakos and the CERTH/ITI Remote Sensing Research Team.",
    path: "/about/",
  },
  "/research": {
    title: "Research Projects and Publications | EOS",
    description:
      "Explore EOS Earth Observation projects, publications, special issues, workshops and international research cooperation.",
    path: "/research/",
  },
  "/tools": {
    title: "Earth Observation Tools and Data | EOS",
    description:
      "Explore Earth Observation tools, data products, maps, training resources and environmental monitoring services from EOS.",
    path: "/tools/",
  },
  "/news": {
    title: "News and Activities | EOS",
    description:
      "News, publications, events and activities from the EOS CERTH/ITI Remote Sensing Research Team.",
    path: "/news/",
  },
  "/contact": {
    title: "Contact | EOS",
    description:
      "Contact Dr Ioannis Manakos and the EOS CERTH/ITI Remote Sensing Research Team for research, services, training and collaboration.",
    path: "/contact/",
  },
  "/privacy": {
    title: "Privacy and Analytics Choices | EOS",
    description:
      "Learn how the EOS website handles optional aggregate analytics, privacy preferences, hosting and external media.",
    path: "/privacy/",
  },
};

export function RouteMetadata() {
  const [location] = useLocation();
  const pathname = location.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  usePageMetadata(pageMetadata[pathname] ?? null);
  return null;
}
