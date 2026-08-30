import { useLocation } from "wouter";
import { type PageMetadata, usePageMetadata } from "@/lib/seo";

const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "EOS - Earth Observation Services",
    description:
      "Earth Observation research, services and environmental monitoring from the CERTH/ITI Remote Sensing Research Team.",
    path: "/",
    image: {
      path: "/images/hero-bg.webp",
      alt: "Earth seen from orbit with a connected Earth Observation data network.",
      width: 1408,
      height: 768,
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "EOS - Earth Observation Services",
        url: "https://imanakos.github.io/eos.iti.gr/",
        publisher: {
          "@type": "Organization",
          name: "EOS - CERTH/ITI Remote Sensing Research Team",
          url: "https://imanakos.github.io/eos.iti.gr/",
        },
      },
    ],
  },
  "/about": {
    title: "About Dr Ioannis Manakos | EOS",
    description:
      "Research profile, international engagement and Earth Observation expertise of Dr Ioannis Manakos and the CERTH/ITI Remote Sensing Research Team.",
    path: "/about/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: "Ioannis Manakos",
          honorificPrefix: "Dr",
          jobTitle: "Director of Research in Remote Sensing",
          url: "https://www.iti.gr/iti/en/people/ioannis-manakos/",
          sameAs: [
            "https://www.linkedin.com/in/eoservices",
            "https://www.iti.gr/iti/en/people/ioannis-manakos/",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Information Technologies Institute, CERTH",
            url: "https://www.iti.gr/iti/en/",
          },
        },
      },
    ],
  },
  "/research": {
    title: "Research Projects and Publications | EOS",
    description:
      "Explore EOS Earth Observation projects, publications, special issues, workshops and international research cooperation.",
    path: "/research/",
  },
  "/research/publications": {
    title: "Earth Observation Publications and Media | EOS",
    description:
      "Browse EOS journal papers, books, conference work, posters, videos and press material in Earth Observation and environmental monitoring.",
    path: "/research/publications/",
  },
  "/research/issues": {
    title: "Earth Observation Special Issues | EOS",
    description:
      "Explore scientific special issues edited or supported by EOS in remote sensing, land cover change and analysis-ready satellite data.",
    path: "/research/issues/",
  },
  "/research/workshops": {
    title: "Earth Observation Workshops | EOS",
    description:
      "Review EOS and EARSeL workshops on land use, land cover, sustainable cities and Earth Observation applications.",
    path: "/research/workshops/",
  },
  "/research/cooperations": {
    title: "International Earth Observation Cooperation | EOS",
    description:
      "Explore EOS cooperation with international Earth Observation, biodiversity, land monitoring and training networks.",
    path: "/research/cooperations/",
  },
  "/tools": {
    title: "Earth Observation Tools and Data | EOS",
    description:
      "Explore Earth Observation tools, data products, maps, training resources and environmental monitoring services from EOS.",
    path: "/tools/",
  },
  "/tools/modules": {
    title: "Earth Observation Processing Modules | EOS",
    description:
      "Explore EOS processing modules for water, land, vegetation, habitats, biodiversity, radar and phenology analysis.",
    path: "/tools/modules/",
  },
  "/tools/elearning": {
    title: "Earth Observation e-Learning and Training | EOS",
    description:
      "Open Earth Observation learning modules and project training resources for environmental monitoring and remote sensing.",
    path: "/tools/elearning/",
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
