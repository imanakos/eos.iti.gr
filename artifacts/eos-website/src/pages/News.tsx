import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { newsArticles } from "../data/newsData";
import { newsBodyText } from "../data/newsBodyData";

const PAGE_SIZE = 12;

function getNewsId(originalUrl: string): string {
  const match = originalUrl.match(/#(news\d+)$/);
  return match ? match[1] : "";
}

export default function News() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = newsArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (getNewsId(a.originalUrl) && (newsBodyText[getNewsId(a.originalUrl)] || "").toLowerCase().includes(search.toLowerCase()))
  );
  const shown = filtered.slice(0, visible);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">News</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Latest updates, publications, events and activities from the EOS Remote Sensing team.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={e => { setSearch(e.target.value); setVisible(PAGE_SIZE); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No results for "{search}".</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((article, i) => {
            const newsId = getNewsId(article.originalUrl);
            const body = newsId ? newsBodyText[newsId] : undefined;
            const excerpt = body ? body.slice(0, 200).replace(/\s\S*$/, "") + "…" : undefined;
            return (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="aspect-video overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = "/images/structure/Plot_Final.png";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {article.date && (
                    <span className="text-xs font-medium text-primary mb-2 block">{article.date}</span>
                  )}
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2">
                    {article.title}
                  </h3>
                  {excerpt && (
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {excerpt}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {visible < filtered.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8">
          Showing {shown.length} of {filtered.length} articles
        </p>
      </div>
    </div>
  );
}
