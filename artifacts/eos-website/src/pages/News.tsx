import { useState } from "react";
import { ExternalLink, Search, ChevronDown } from "lucide-react";
import { newsArticles } from "../data/newsData";

const PAGE_SIZE = 24;

export default function News() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = newsArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shown.map((article, i) => (
            <a
              key={i}
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    (e.target as HTMLImageElement).src = "https://eos.iti.gr/images/structure/Plot_Final.png";
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs text-muted-foreground mb-2">{article.date}</span>
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors flex-1">
                  {article.title}
                </h3>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">
                  Read more <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
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
          Showing {shown.length} of {filtered.length} articles ·{" "}
          <a href="https://eos.iti.gr/by_our_team.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            View all on original site
          </a>
        </p>
      </div>
    </div>
  );
}
