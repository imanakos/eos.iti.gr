import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, Share2 } from "lucide-react";
import { Link, type RouteComponentProps } from "wouter";
import { EOInsightCard } from "@/components/eo-insights/EOInsightCard";
import { InsightVisual } from "@/components/eo-insights/InsightVisual";
import {
  eoInsightsData,
  formatInsightDate,
  getEOInsight,
  sortedEOInsights,
} from "@/data/eoInsightsData";
import { SITE_URL, usePageMetadata } from "@/lib/seo";
import NotFound from "./not-found";

type EOSEvidenceKind =
  | "Documented EOS outcome"
  | "Documented EOS workflow"
  | "Peer-reviewed publication"
  | "Applied EOS outcome"
  | "Related EOS project"
  | "Ongoing exploration";

interface EOSEvidenceItem {
  kind: EOSEvidenceKind;
  label: string;
  description: string;
  href?: string;
}

const eosEvidence: Record<string, EOSEvidenceItem[]> = {
  "can-radar-satellites-see-through-clouds": [
    {
      kind: "Documented EOS outcome",
      label: "Quality assessment of Doñana inundation maps",
      description:
        "ECOPOTENTIAL assessed 23 CERTH Sentinel-2 inundation maps. Across seven dates with Landsat reference maps, mean overall accuracy was 97.69% without boundary pixels and 96.40% with them; these figures apply to this site and validation design.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D4.6.pdf",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Radar-optical fusion for inundation mapping",
      description:
        "Manakos, Kordelas and Marini combined Sentinel-1 radar with Sentinel-2 products to delineate inundation when atmospheric conditions limited optical observations.",
      href: "https://doi.org/10.1080/22797254.2019.1596757",
    },
    {
      kind: "Documented EOS workflow",
      label: "SpeckleRemoval workflow",
      description:
        "ECOPOTENTIAL D6.3 documents a CERTH workflow for preparing Sentinel-1 GRD data with guided filtering. It reduces speckle but does not remove the need to interpret moisture, terrain and viewing geometry.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D6.3.pdf",
    },
  ],
  "can-satellites-identify-urban-heat-islands": [
    {
      kind: "Ongoing exploration",
      label: "Urban heat as an emerging direction",
      description:
        "EOS is beginning to examine how thermal observations, land cover and local measurements might support urban-heat assessment. This is exploratory work, not yet a completed EOS service or validated result.",
    },
  ],
  "how-do-satellites-map-wildfire-damage": [
    {
      kind: "Peer-reviewed publication",
      label: "Automatic Sentinel-2 burned-area mapping",
      description:
        "An EOS-co-authored study developed an unsupervised method using pre- and post-fire Sentinel-2 observations, then compared the resulting burn-scar maps with reference information.",
      href: "https://doi.org/10.3390/land12020379",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Object- and pixel-based burn-scar mapping",
      description:
        "EOS researchers helped compare two Sentinel-2 approaches across different European biogeographical settings, documenting the advantages and limitations of each method.",
      href: "https://doi.org/10.3390/land12051087",
    },
  ],
  "why-does-healthy-vegetation-appear-red": [
    {
      kind: "Applied EOS outcome",
      label: "DigiCotton crop-monitoring demonstration",
      description:
        "EOS combined Sentinel-2 observations with UAV surveys and supporting weather and field information to analyse cotton development. Demonstrations covered crop stages, harvest timing and within-field variability in the Nestos valley.",
      href: "/research/projects/digicotton-precision-agriculture/",
    },
    {
      kind: "Applied EOS outcome",
      label: "DigiRyzi rice-monitoring demonstration",
      description:
        "EOS used Sentinel-2 observations supported by UAV, weather and in-situ data to develop rice-field monitoring analyses. Demonstrations covered crop stages, harvest timing and within-field variability in the Axios Delta.",
      href: "/news/digiryzi-platform-supports-rice-farming-in-axios-delta/",
    },
    {
      kind: "Documented EOS workflow",
      label: "PhenologyMetrics and PhenologyChanges",
      description:
        "ECOPOTENTIAL D6.3 documents CERTH workflows for seasonal vegetation timing and abrupt breaks in NDVI time series. They show how spectral signals become measurements over time, rather than simply a coloured display.",
      href: "https://ecopotential-project.eu/wp-content/uploads/2026/07/D6.3.pdf",
    },
  ],
  "can-satellites-detect-water-pollution": [
    {
      kind: "Applied EOS outcome",
      label: "WQeMS water-monitoring platform",
      description:
        "EOS contributed water-monitoring research, service demonstrations and training that connected Copernicus observations with utility workflows and expert interpretation.",
      href: "/research/projects/wqems-water-quality-monitoring/",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Land-water transition monitoring for drinking-water production",
      description:
        "EOS researchers used satellite time series to examine change at the margins of inland waters in support of drinking-water production.",
      href: "https://doi.org/10.3390/w15142596",
    },
    {
      kind: "Peer-reviewed publication",
      label: "WQeMS platform for inland surface waters",
      description:
        "This consortium publication documents how the platform served user communities and supported expert analysis of inland water bodies.",
      href: "https://doi.org/10.1117/12.2680817",
    },
  ],
  "can-geoai-replace-the-earth-observation-expert": [
    {
      kind: "Related EOS project",
      label: "SnapEarth and the EarthPress pilot",
      description:
        "EOS introduced SnapEarth service concepts to journalism communities and gathered feedback on the EarthPress pilot. This is an example of experts shaping how GeoAI is used, not AI replacing them.",
      href: "/research/projects/snapearth-geoai/",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Foundation models for underwater vegetation",
      description:
        "EOS researchers examined foundation-model approaches with aerial and satellite imagery for mapping underwater vegetation, a case where training evidence, scale and domain knowledge remain decisive.",
      href: "https://doi.org/10.3390/rs15164001",
    },
    {
      kind: "Peer-reviewed publication",
      label: "Calibrated uncertainty in canopy-height estimation",
      description:
        "An EOS-co-authored spaceborne time-series model reports calibrated uncertainty alongside canopy-height estimates, making uncertainty part of the result rather than hiding it.",
      href: "https://doi.org/10.1109/TGRS.2022.3171407",
    },
    {
      kind: "Documented EOS outcome",
      label: "Fine-tuned canopy-height mapping",
      description:
        "At GISTAM 2025, EOS reported that fine-tuning reduced mean absolute error from 4.26 m to 2.74 m in the primary Czech test area, while also examining species-specific uncertainty.",
      href: "/news/eos-team-at-gistam-2025-in-porto-portugal/",
    },
  ],
};

function EOSEvidenceCard({ item }: { item: EOSEvidenceItem }) {
  const isExternal = item.href?.startsWith("http") ?? false;
  const cardClassName =
    "rounded-2xl border border-border bg-card p-5 transition-colors " +
    (item.href
      ? "group hover:border-primary/35 hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      : "border-l-4 border-l-secondary");
  const content = (
    <>
      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">
        {item.kind}
      </span>
      <span className="mt-3 flex items-start justify-between gap-3 font-semibold leading-snug text-foreground group-hover:text-primary">
        {item.label}
        {item.href &&
          (isExternal ? (
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ))}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </span>
      {isExternal && <span className="sr-only">Opens in a new tab</span>}
    </>
  );

  if (!item.href) {
    return <div className={cardClassName}>{content}</div>;
  }

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={cardClassName}>
      {content}
    </Link>
  );
}

const relatedInsightSlugs: Record<string, string[]> = {
  "can-radar-satellites-see-through-clouds": [
    "how-do-satellites-map-wildfire-damage",
    "can-satellites-detect-water-pollution",
  ],
  "can-satellites-identify-urban-heat-islands": [
    "why-does-healthy-vegetation-appear-red",
    "how-do-satellites-map-wildfire-damage",
  ],
  "how-do-satellites-map-wildfire-damage": [
    "can-radar-satellites-see-through-clouds",
    "can-geoai-replace-the-earth-observation-expert",
  ],
  "why-does-healthy-vegetation-appear-red": [
    "can-satellites-detect-water-pollution",
    "can-satellites-identify-urban-heat-islands",
  ],
  "can-satellites-detect-water-pollution": [
    "why-does-healthy-vegetation-appear-red",
    "can-radar-satellites-see-through-clouds",
  ],
  "can-geoai-replace-the-earth-observation-expert": [
    "how-do-satellites-map-wildfire-damage",
    "can-radar-satellites-see-through-clouds",
  ],
};

export default function EOInsightArticle({ params }: RouteComponentProps<{ slug: string }>) {
  const insight = getEOInsight(params.slug);
  const canonicalPath = insight ? `/eo-insights/${insight.slug}/` : "/eo-insights/";
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const metadata = insight
    ? {
        title: `${insight.title} | EO Analysis Notes`,
        description: insight.seoDescription,
        path: canonicalPath,
        type: "article" as const,
        publishedAt: insight.publishedAt,
        modifiedAt: insight.modifiedAt,
        keywords: insight.tags,
        image: {
          path: insight.image,
          alt: insight.imageAlt,
          width: 1200,
          height: 630,
        },
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: insight.title,
            description: insight.seoDescription,
            datePublished: insight.publishedAt,
            dateModified: insight.modifiedAt,
            mainEntityOfPage: canonicalUrl,
            url: canonicalUrl,
            image: `${SITE_URL}${insight.image}`,
            author: {
              "@type": "Person",
              name: eoInsightsData.author.name,
              url: `${SITE_URL}${eoInsightsData.author.profilePath}`,
            },
            publisher: {
              "@type": "Organization",
              name: "EOS - CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
            },
            keywords: insight.tags.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "EO Analysis Notes",
                item: `${SITE_URL}/eo-insights/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: insight.title,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  usePageMetadata(metadata);

  if (!insight) {
    return <NotFound />;
  }

  const preferredRelatedSlugs = relatedInsightSlugs[insight.slug] ?? [];
  const relatedInsights = preferredRelatedSlugs
    .map((slug) => sortedEOInsights.find((item) => item.slug === slug))
    .filter((item): item is (typeof sortedEOInsights)[number] => Boolean(item));
  const evidence = eosEvidence[insight.slug] ?? [];
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <article>
        <header className="border-b border-border bg-muted/35">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <Link
              href="/eo-insights/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              All EO Analysis Notes
            </Link>

            <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(30_75%_34%)]">
                  EO Analysis Notes
                </p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                  {insight.title}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {insight.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <time dateTime={insight.publishedAt}>
                      {formatInsightDate(insight.publishedAt)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {insight.readingMinutes} min read
                  </span>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  By{" "}
                  <Link
                    href={eoInsightsData.author.profilePath}
                    className="font-semibold text-primary hover:underline"
                  >
                    {eoInsightsData.author.name}
                  </Link>
                  <span className="sr-only">, </span>
                  <span className="block text-xs sm:ml-1 sm:inline">
                    {eoInsightsData.author.role}
                  </span>
                </p>
              </div>

              <figure className="flex flex-col">
                <InsightVisual
                  visual={insight.visual}
                  imageAlt={insight.imageAlt}
                  className="min-h-72 flex-1 rounded-3xl shadow-xl"
                />
                <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                  {eoInsightsData.visualDisclosure}
                </figcaption>
              </figure>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-6 text-[1.05rem] leading-8 text-foreground/85">
            {insight.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="my-10 rounded-2xl border-l-4 border-secondary bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(30_75%_34%)]">
              Key point
            </p>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-foreground">
              {insight.keyPoint}
            </p>
          </aside>

          {evidence.length > 0 && (
            <section aria-labelledby="eos-practice-heading" className="mt-12">
              <h2 id="eos-practice-heading" className="text-2xl font-bold text-foreground">
                EOS evidence in practice
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The relationship between this topic and selected EOS work, outcomes, and
                publications is stated explicitly.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {evidence.map((item) => (
                  <EOSEvidenceCard key={`${item.kind}-${item.label}`} item={item} />
                ))}
              </div>
            </section>
          )}

          <section
            aria-labelledby="references-heading"
            className="mt-12 border-t border-border pt-10"
          >
            <h2 id="references-heading" className="text-2xl font-bold text-foreground">
              Explore the evidence
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Selected institutional resources providing further context and technical detail.
            </p>
            <ul className="mt-6 space-y-3">
              {insight.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/30 hover:bg-muted/35"
                  >
                    <span>
                      <span className="block font-semibold text-foreground group-hover:text-primary">
                        {source.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {source.publisher}
                      </span>
                    </span>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <div className="flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              <Share2 className="h-4 w-4" />
              Share on LinkedIn
            </a>
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Continue exploring</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedInsights.map((related) => (
              <EOInsightCard key={related.slug} insight={related} compact />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
