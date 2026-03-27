import { ExternalLink, Layers } from "lucide-react";

const links = [
  { label: "Official Website", url: "https://ecopotential-project.eu/" },
  { label: "Implementation", url: "https://www.grida.no/resources/12227" },
  { label: "Short Presentation & Video", url: "https://ecopotential-project.eu/results/deliverables" },
  { label: "Related Publication", url: "https://www.mdpi.com/2072-4292/9/10/1065" },
];

export default function LandCoverMaps() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-700 dark:text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-widest">Services &amp; Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Land Cover Maps (EODESM)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Earth Observation Data for Ecosystem Monitoring (EODESM) tool — a Horizon 2020 ECOPOTENTIAL project outcome for automated land cover classification and environmental change detection.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">About EODESM</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The <strong className="text-foreground">EODESM tool</strong> ('Earth Observation Data for Ecosystem Monitoring') is a tool developed under the Horizon 2020{" "}
              <a href="https://ecopotential-project.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                ECOPOTENTIAL project
              </a>
              .
            </p>
            <p>
              This tool automatically classifies land cover from environmental variables, enabling users to detect changes in hydroperiod, changes in vegetation and soil moisture, and other environmental variables.
            </p>
            <p>
              EODESM supports detailed land cover classification and change mapping using multi-source Earth Observation data, and is designed to be scalable across different protected areas and ecosystem types.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all group"
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        <div className="bg-muted/50 rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-3">Source</h3>
          <p className="text-muted-foreground text-sm">
            EODESM was developed in the context of the ECOPOTENTIAL Horizon 2020 project (Grant Agreement No. 641762). The tool and its documentation are referenced at{" "}
            <a href="https://www.grida.no" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.grida.no</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
