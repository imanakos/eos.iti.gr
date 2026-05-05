import { ExternalLink } from "lucide-react";
import { projects } from "../data/projectsData";
import { assetUrl } from "@/lib/utils";

export default function Projects() {
  const recent = projects.filter(p => p.status === "recent");
  const past = projects.filter(p => p.status === "past");

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Research projects led and co-led by the EOS team, spanning national, European, and international funding programmes.
          </p>
        </div>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-8">Recent Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((project, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="h-40 overflow-hidden bg-muted flex items-center justify-center p-4">
                  <img
                    src={assetUrl(project.img)}
                    alt={project.name}
                    className="max-h-full max-w-full object-contain"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      More information <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Past Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {past.map((project, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                  <img src={assetUrl(project.img)} alt={project.name} className="max-h-full max-w-full object-contain p-1"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-muted rounded-2xl border border-border">
            <h3 className="font-semibold text-foreground mb-3">Additional past contributions</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>FP7: MOVESMART 'Renewable Mobility Services in Smart Cities', 2013–2016</li>
              <li>FP7: INERTIA 'Integrating Active, Flexible and Responsive Tertiary Prosumers into a Smart Distribution Grid', 2012–2015</li>
              <li>FP7: NEMESYS 'Enhanced NETwork Security for Seamless Service Provisioning in the Smart Mobile EcoSystem', 2012–2015</li>
              <li>IPA Cross-Border Cooperation: AITOLOS 'Cross border collaboration to fight illegal logging and timber trade', 2012–2014</li>
              <li>FP7: eCOMPASS 'eCO-friendly urban Multi-modal route PlAnning Services for mobile uSers', 2011–2014</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
