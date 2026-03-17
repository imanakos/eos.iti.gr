import { ExternalLink, BookOpen } from "lucide-react";

const journalPubs = [
  {
    text: "C. Beierkuhnlein et al., Towards a comprehensive geodiversity - Biodiversity nexus in terrestrial ecosystems, 2025, Earth-Science Reviews, 105075.",
    doi: "https://doi.org/10.1016/j.earscirev.2025.105075",
  },
  {
    text: "R.-T. Chadoulis, I. Livieratos, I. Manakos et al., 3D-CNN detection of systemic symptoms induced by different Potexvirus infections in four Nicotiana benthamiana genotypes using leaf hyperspectral imaging, 2025, Plant Methods 21(15).",
    doi: "https://link.springer.com/article/10.1186/s13007-025-01337-0",
  },
  {
    text: "L. Alagialoglou, I. Manakos et al., Machine Learning for Identifying Emergent and Floating Aquatic Vegetation from Space: A Case Study in the Dniester Delta, Ukraine, 2024, SN Computer Science.",
    doi: "https://link.springer.com/article/10.1007/s42979-024-02873-7",
  },
  {
    text: "F. Lokmen, I. Manakos, G. Sylaios, C. Kalaitzidis, A modified version of the Direct Sampling method for filling gaps in Landsat 7 and Sentinel 2 satellite imagery in the coastal area of Rhone River, 2023, Remote Sensing.",
    doi: "https://www.mdpi.com/2072-4292/15/21/5122",
  },
  {
    text: "L. Alagialoglou, I. Manakos et al., Mapping underwater aquatic vegetation using foundation models with air- and space-borne images: the case of Polyphytos Lake, 2023, Remote Sensing.",
    doi: "https://www.mdpi.com/2072-4292/15/16/4001",
  },
  {
    text: "A. Kita, I. Manakos et al., Land–Water Transition Zone Monitoring in Support of Drinking Water Production, 2023, Water MDPI.",
    doi: "https://www.mdpi.com/2073-4441/15/14/2596",
  },
  {
    text: "M. Milczarek et al., Object- Versus Pixel-Based Unsupervised Fire Burn Scar Mapping under Different Biogeographical Conditions in Europe, 2023, Land MDPI.",
    doi: "https://www.mdpi.com/2073-445X/12/5/1087",
  },
];

const categories = [
  { id: "journal", label: "Journal Publications", url: "https://eos.iti.gr/publishing.php#journal" },
  { id: "book", label: "Books / Book Chapters", url: "https://eos.iti.gr/publishing.php#book" },
  { id: "conference", label: "Conference Publications", url: "https://eos.iti.gr/publishing.php#conference" },
  { id: "speeches", label: "Networking / Communication", url: "https://eos.iti.gr/publishing.php#speeches" },
  { id: "posters", label: "Poster Corner", url: "https://eos.iti.gr/publishing.php#posters" },
  { id: "videos", label: "Video Corner", url: "https://eos.iti.gr/publishing.php#videos" },
  { id: "press", label: "Press Corner", url: "https://eos.iti.gr/publishing.php#press" },
];

export default function Publications() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Publications</h1>
          <p className="text-xl text-muted-foreground">
            Scientific output of the EOS research team spanning journal articles, books, conference papers, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {categories.map(cat => (
            <a
              key={cat.id}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
              {cat.label}
            </a>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Journal Publications</h2>
          <ol className="space-y-4">
            {journalPubs.map((pub, i) => (
              <li key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pub.text}</p>
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  View publication <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6 text-center">
          <h3 className="font-bold text-foreground mb-2">Full publication list</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View the complete bibliography including books, conference papers, networking activities, posters, videos, and press coverage.
          </p>
          <a
            href="https://eos.iti.gr/publishing.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            View all publications <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
