import { ExternalLink, Play } from "lucide-react";
import type { EOInsight } from "@/data/eoInsightsData";
import { formatVideoDuration, getEOArticleVideos } from "@/data/eoVideosData";
import { assetUrl } from "@/lib/utils";

export function EOInsightVideos({ insight }: { insight: EOInsight }) {
  const videos = getEOArticleVideos(insight.slug);
  if (!videos) return null;

  return (
    <section
      aria-labelledby="watch-explanation-heading"
      className="mb-10 overflow-hidden rounded-2xl border border-primary/15 bg-muted/35"
    >
      <div className="grid gap-5 p-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:p-6">
        {insight.image && (
          <img
            src={assetUrl(insight.image)}
            alt=""
            width={1200}
            height={630}
            loading="lazy"
            className="aspect-[1200/630] w-full rounded-xl object-contain"
          />
        )}
        <div>
          <h2 id="watch-explanation-heading" className="text-xl font-bold text-foreground">
            Watch this explanation
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A quick introduction or the full explanation, narrated by Dr Ioannis Manakos.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {(
              [
                ["Watch the Short", videos.short],
                ["Watch the full explanation", videos.long],
              ] as const
            ).map(([label, video]) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary/20 bg-card px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Play className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {label}{" "}
                  <span className="font-normal">
                    ({formatVideoDuration(video.durationSeconds)})
                  </span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="sr-only"> on YouTube (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Opens on YouTube. No YouTube player loads on this page.
          </p>
        </div>
      </div>
    </section>
  );
}
