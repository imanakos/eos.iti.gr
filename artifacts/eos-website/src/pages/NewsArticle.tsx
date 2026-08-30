import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Link, type RouteComponentProps } from "wouter";
import { NewsImage } from "@/components/news/NewsImage";
import { getNewsBody, getNewsDateIso, getNewsEntry, getNewsExcerpt } from "@/lib/news";
import { SITE_URL, usePageMetadata } from "@/lib/seo";
import NotFound from "./not-found";
import { NewsBody } from "./NewsShared";

export default function NewsArticlePage({ params }: RouteComponentProps<{ slug: string }>) {
  const article = getNewsEntry(params.slug);
  const canonicalPath = article ? `/news/${article.slug}/` : "/news/";
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const body = article ? getNewsBody(article) : undefined;
  const publishedAt = article ? getNewsDateIso(article.date) : undefined;

  const metadata = article
    ? {
        title: `${article.title} | EOS News`,
        description: getNewsExcerpt(article, 155),
        path: canonicalPath,
        type: "article" as const,
        publishedAt,
        image: {
          path: article.img,
          alt: article.title,
        },
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: getNewsExcerpt(article, 155),
            ...(publishedAt ? { datePublished: publishedAt } : {}),
            mainEntityOfPage: canonicalUrl,
            url: canonicalUrl,
            image: `${SITE_URL}${article.img}`,
            author: {
              "@type": "Organization",
              name: "EOS - CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "EOS - CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/images/logo/logoeos_clean.svg`,
              },
            },
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
                name: "News",
                item: `${SITE_URL}/news/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  usePageMetadata(metadata);

  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <article>
        <header className="border-b border-border bg-muted/35">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <Link
              href="/news/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All news
            </Link>

            <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(30_75%_34%)]">
                  EOS News
                </p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
                  {article.title}
                </h1>
                {article.date && (
                  <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                    <time dateTime={publishedAt}>{article.date}</time>
                  </p>
                )}
              </div>

              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="aspect-video flex items-center justify-center bg-muted p-3">
                  <NewsImage
                    article={article}
                    className="h-full w-full object-contain"
                    loading="eager"
                  />
                </div>
              </figure>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {body ? (
            <div className="text-[1.05rem] leading-8 text-foreground/85">
              <NewsBody body={body} />
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-muted/35 px-5 py-4 text-sm italic text-muted-foreground">
              No archived article text is available for this entry.
            </p>
          )}

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Visit the official page
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}

          <nav aria-label="News article navigation" className="mt-12 border-t border-border pt-8">
            <Link
              href="/news/"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Return to all news
            </Link>
          </nav>
        </div>
      </article>
    </div>
  );
}
