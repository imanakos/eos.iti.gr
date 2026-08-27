import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import type { EOInsight } from "@/data/eoInsightsData";
import { formatInsightDate } from "@/data/eoInsightsData";
import { cn } from "@/lib/utils";
import { InsightVisual } from "./InsightVisual";

export function EOInsightCard({
  insight,
  compact = false,
}: {
  insight: EOInsight;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/eo-insights/${insight.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Read ${insight.title}`}
    >
      <InsightVisual visual={insight.visual} className={cn("w-full", compact ? "h-44" : "h-48")} />
      <div className={cn("flex flex-1 flex-col", compact ? "p-5" : "p-6")}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {insight.readingMinutes} min read
          </span>
        </div>
        <h3
          className={cn(
            "font-display font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
            compact ? "text-lg" : "text-xl"
          )}
        >
          {insight.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {insight.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read the note
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
