import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, Share2 } from "lucide-react";
import { Link, type RouteComponentProps } from "wouter";
import { EOInsightCard } from "@/components/eo-insights/EOInsightCard";
import { InsightVisual } from "@/components/eo-insights/InsightVisual";
import { eosEvidence, type EOSEvidenceItem } from "@/data/eoEvidenceData";
import {
  eoInsightsData,
  formatInsightDate,
  getEOInsight,
  sortedEOInsights,
} from "@/data/eoInsightsData";
import { SITE_URL, usePageMetadata } from "@/lib/seo";
import NotFound from "./not-found";

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
    "when-has-the-land-really-changed",
    "can-satellites-detect-water-pollution",
  ],
  "can-satellites-identify-urban-heat-islands": [
    "why-does-healthy-vegetation-appear-red",
    "how-do-satellites-map-wildfire-damage",
  ],
  "how-do-satellites-map-wildfire-damage": [
    "when-has-the-land-really-changed",
    "can-radar-satellites-see-through-clouds",
  ],
  "why-does-healthy-vegetation-appear-red": [
    "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity",
    "when-has-the-land-really-changed",
  ],
  "can-satellites-detect-water-pollution": [
    "why-does-healthy-vegetation-appear-red",
    "can-radar-satellites-see-through-clouds",
  ],
  "can-geoai-replace-the-earth-observation-expert": [
    "why-does-a-global-land-change-taxonomy-matter",
    "when-has-the-land-really-changed",
  ],
  "when-has-the-land-really-changed": [
    "why-does-a-global-land-change-taxonomy-matter",
    "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity",
  ],
  "can-satellites-reveal-the-link-between-geodiversity-and-biodiversity": [
    "when-has-the-land-really-changed",
    "why-does-healthy-vegetation-appear-red",
  ],
  "why-does-a-global-land-change-taxonomy-matter": [
    "when-has-the-land-really-changed",
    "can-geoai-replace-the-earth-observation-expert",
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
