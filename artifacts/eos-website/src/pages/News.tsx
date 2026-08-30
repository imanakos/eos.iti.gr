import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Link } from "wouter";
import {
  getNewsBody,
  getNewsDateIso,
  getNewsExcerpt,
  getNewsYear,
  newsEntries,
  newsYears,
} from "@/lib/news";
import { NewsImage } from "@/components/news/NewsImage";

const PAGE_SIZE = 12;

export default function News() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return newsEntries.filter((article) => {
      const matchesYear = year === "all" || getNewsYear(article.date) === year;
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        (getNewsBody(article) || "").toLowerCase().includes(query);

      return matchesYear && matchesSearch;
    });
  }, [search, year]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">News</h1>
          <p className="mb-6 mt-4 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Latest updates, publications, events and activities from the EOS Remote Sensing team.
          </p>

          <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search news</span>
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search news"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisible(PAGE_SIZE);
                }}
                className="min-h-11 w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/50">
              <span className="whitespace-nowrap font-medium">Year</span>
              <select
                value={year}
                onChange={(event) => {
                  setYear(event.target.value);
                  setVisible(PAGE_SIZE);
                }}
                className="min-h-11 min-w-32 bg-transparent pr-2 font-semibold text-foreground outline-none"
              >
                <option value="all">All years</option>
                {newsYears.map((newsYear) => (
                  <option key={newsYear} value={newsYear}>
                    {newsYear}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No news matches the selected search and year.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/35"
            >
              <Link
                href={`/news/${article.slug}/`}
                className="flex h-full flex-col rounded-2xl focus:outline-none"
                aria-label={`Read ${article.title}`}
              >
                <div className="aspect-video flex flex-shrink-0 items-center justify-center overflow-hidden bg-muted p-2">
                  <NewsImage
                    article={article}
                    className="h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-95"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {article.date && (
                    <time
                      className="mb-2 block text-xs font-medium text-primary"
                      dateTime={getNewsDateIso(article.date)}
                    >
                      {article.date}
                    </time>
                  )}
                  <h2 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                    {getNewsExcerpt(article, 200)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Read the full story
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisible((current) => current + PAGE_SIZE)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground" aria-live="polite">
          Showing {shown.length} of {filtered.length} articles
        </p>
      </div>
    </div>
  );
}
