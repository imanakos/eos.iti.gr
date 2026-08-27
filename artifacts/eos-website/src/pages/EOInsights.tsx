import { BookOpen, CheckCircle2, Compass, SearchCheck } from "lucide-react";
import { EOInsightCard } from "@/components/eo-insights/EOInsightCard";
import { eoInsightsData, sortedEOInsights } from "@/data/eoInsightsData";
import { SITE_URL, usePageMetadata } from "@/lib/seo";

const pageMetadata = {
  title: "EO Analysis Notes | EOS",
  description: eoInsightsData.seriesDescription,
  path: "/eo-insights/",
  type: "website" as const,
  image: {
    path: "/images/eo-insights/eo-analysis-notes.jpg",
    alt: "Three concept illustrations, not satellite data, of vegetation, water and Earth Observation data analysis.",
    width: 1200,
    height: 630,
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: eoInsightsData.seriesTitle,
      description: eoInsightsData.seriesDescription,
      url: `${SITE_URL}/eo-insights/`,
      author: {
        "@type": "Person",
        name: eoInsightsData.author.name,
        url: `${SITE_URL}${eoInsightsData.author.profilePath}`,
      },
      primaryImageOfPage: `${SITE_URL}/images/eo-insights/eo-analysis-notes.jpg`,
      hasPart: sortedEOInsights.map((insight) => ({
        "@type": "BlogPosting",
        headline: insight.title,
        url: `${SITE_URL}/eo-insights/${insight.slug}/`,
        image: `${SITE_URL}${insight.image}`,
      })),
    },
  ],
};

const editorialPrinciples = [
  {
    icon: Compass,
    title: "Interpret, do not decorate",
    text: "Every visual signal is connected to the physical observation behind it.",
  },
  {
    icon: SearchCheck,
    title: "State the limits",
    text: "Useful interpretation includes uncertainty, validation needs and possible confusion.",
  },
  {
    icon: CheckCircle2,
    title: "Trace the evidence",
    text: "Selected links lead to authoritative missions, datasets and research programmes.",
  },
];

export default function EOInsights() {
  usePageMetadata(pageMetadata);

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <section className="relative overflow-hidden bg-[hsl(222_56%_13%)] py-20 text-white">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-12 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-black/15 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
              <BookOpen className="h-4 w-4 text-[hsl(37_80%_62%)]" />
              EO Analysis Notes
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              EO Analysis Notes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {eoInsightsData.seriesDescription} Concise enough to explore quickly, rigorous enough
              to reveal where confident interpretation begins - and where caution is needed.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(30_75%_34%)]">
              Latest notes
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Satellite image analysis, explained
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Notes by {eoInsightsData.author.name}, with selected institutional references for
            readers who wish to explore each subject further.
          </p>
        </div>

        <p className="mb-8 max-w-3xl rounded-xl border border-border bg-muted/35 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Visual note:</span>{" "}
          {eoInsightsData.visualDisclosure}
        </p>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {sortedEOInsights.map((insight) => (
            <EOInsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/35 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {editorialPrinciples.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
