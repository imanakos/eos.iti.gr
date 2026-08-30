import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { NewsArticle } from "@/data/newsData";
import { assetUrl } from "@/lib/utils";

export function NewsImage({
  article,
  className,
  loading = "lazy",
}: {
  article: NewsArticle;
  className: string;
  loading?: "eager" | "lazy";
}) {
  const [unavailable, setUnavailable] = useState(false);
  const webpImage = /\.(?:jpe?g|png)$/i.test(article.img)
    ? article.img.replace(/\.(?:jpe?g|png)$/i, ".webp")
    : null;

  if (unavailable) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4 text-center">
        <ImageOff className="h-9 w-9 text-primary/40" aria-hidden="true" />
        <span className="mt-2 text-xs font-medium text-muted-foreground">
          Archived image unavailable
        </span>
      </div>
    );
  }

  const image = (
    <img
      src={assetUrl(article.img)}
      alt={article.title}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setUnavailable(true)}
    />
  );

  if (!webpImage) {
    return image;
  }

  return (
    <picture className="contents">
      <source srcSet={assetUrl(webpImage)} type="image/webp" />
      {image}
    </picture>
  );
}
