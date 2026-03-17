import { ExternalLink } from "lucide-react";

const issues = [
  {
    title: "Remote Sensing in Ecosystem Modelling",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "https://eos.iti.gr/images/special-issues/remote-sensing.png",
    impact: "Current Impact Factor: 4.118; 5-Year Impact Factor: 4.740; JCR category rank: 7/30 (Q1) in 'Remote Sensing'",
    links: [
      { label: "Special issue @ mdpi.com", url: "https://www.mdpi.com/journal/remotesensing/special_issues/ecosystem_modelling_RS" },
      { label: "News post", url: "https://eos.iti.gr/by_our_team.php#news2" },
    ],
  },
  {
    title: "Monitoring Land Cover Change: Towards Sustainability",
    journal: "Land | ISSN 2073-445X",
    img: "https://eos.iti.gr/images/special-issues/EARSel-banner2.15.png",
    impact: "CiteScore 2018 (Scopus): 2.15 — rank 37/140 (Q2) in 'Nature and Landscape Conservation' and 90/336 (Q2) in 'Ecology'",
    links: [
      { label: "Special issue @ mdpi.com", url: "https://www.mdpi.com/journal/land/special_issues/EARSeL" },
      { label: "News post", url: "https://eos.iti.gr/by_our_team.php#news3" },
    ],
  },
  {
    title: "Sentinel Analysis Ready Data (Sentinel ARD)",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "https://eos.iti.gr/images/special-issues/2019-08-26_Remote%20Sensing_SI%20Banner_H.jpg",
    impact: "A special issue of Remote Sensing dedicated to Sentinel Analysis Ready Data methodologies.",
    links: [
      { label: "Special issue @ mdpi.com", url: "https://www.mdpi.com/journal/remotesensing/special_issues/ARD" },
      { label: "News post", url: "https://eos.iti.gr/by_our_team.php#news18" },
    ],
  },
];

export default function SpecialIssues() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Special Issues</h1>
          <p className="text-xl text-muted-foreground">
            Guest-edited special issues of international peer-reviewed scientific journals, organized and co-organized by the EOS team.
          </p>
        </div>

        <div className="space-y-8">
          {issues.map((issue, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="md:flex">
                <div className="md:w-56 flex-shrink-0 bg-muted flex items-center justify-center p-6">
                  <img
                    src={issue.img}
                    alt={issue.title}
                    className="max-w-full max-h-32 object-contain"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{issue.journal}</span>
                    <h2 className="text-xl font-bold text-foreground mt-1 mb-3">{issue.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{issue.impact}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {issue.links.map((link, j) => (
                      <a
                        key={j}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                      >
                        {link.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
