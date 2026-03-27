import { useState } from "react";
import { Search, ChevronDown, X, Calendar } from "lucide-react";
import { newsArticles } from "../data/newsData";
import { newsBodyText } from "../data/newsBodyData";

const PAGE_SIZE = 12;

type Article = typeof newsArticles[number];

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const body = article.newsId ? newsBodyText[article.newsId] : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full my-8 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {article.date && (
            <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-5">
            {article.title}
          </h2>
          {body ? (
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {body}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-sm">
              No article text is available for this entry.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Article | null>(null);

  const filtered = newsArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.newsId && (newsBodyText[a.newsId] || "").toLowerCase().includes(search.toLowerCase()))
  );
  const shown = filtered.slice(0, visible);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}

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
            const body = article.newsId ? newsBodyText[article.newsId] : undefined;
            const excerpt = body ? body.slice(0, 200).replace(/\s\S*$/, "") + "…" : undefined;
            return (
              <button
                key={i}
                onClick={() => setSelected(article)}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:border-primary/30 transition-all text-left cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parent = img.parentElement;
                      if (parent && !parent.querySelector(".img-fallback")) {
                        const fb = document.createElement("div");
                        fb.className = "img-fallback w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center";
                        fb.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';
                        parent.appendChild(fb);
                      }
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {article.date && (
                    <span className="text-xs font-medium text-primary mb-2 block">{article.date}</span>
                  )}
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {excerpt ? (
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {excerpt}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 italic">
                      Click to read more
                    </p>
                  )}
                  <span className="mt-3 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </span>
                </div>
              </button>
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
