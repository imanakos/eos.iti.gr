import type { EOInsightAnimation } from "@/data/eoInsightsData";
import { assetUrl } from "@/lib/utils";

export function InsightAnimation({
  animation,
  descriptionId,
}: {
  animation: EOInsightAnimation;
  descriptionId: string;
}) {
  return (
    <figure className="flex flex-col self-center">
      <video
        controls
        playsInline
        preload="none"
        poster={assetUrl(animation.poster)}
        aria-label="Thessaly optical, radar and flood extent animation"
        aria-describedby={descriptionId}
        className="aspect-video w-full rounded-3xl bg-black object-contain shadow-xl"
      >
        <source src={assetUrl(animation.mp4)} type="video/mp4" />
        <a href={assetUrl(animation.mp4)}>View the MP4 animation</a>
      </video>
      <p id={descriptionId} className="sr-only">
        {animation.description}
      </p>
      <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
        {animation.caption}
      </figcaption>
    </figure>
  );
}
