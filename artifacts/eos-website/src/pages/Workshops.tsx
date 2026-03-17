import { ExternalLink, Calendar } from "lucide-react";

const workshops = [
  {
    title: "EARSeL Joint Workshop 2021",
    subtitle: "Earth Observation for sustainable cities and communities",
    date: "30 March – 1 April, 2021",
    location: "Liege, Belgium",
    note: "A combination of: 4th joint EARSeL LULC & NASA LCLUC Workshop; 6th EARSeL Joint Workshop Urban Remote Sensing; 1st EARSeL Remote Sensing For UN Sustainable Development Goals Workshop.",
    url: "http://liege2020.earsel.org/",
  },
  {
    title: "3rd EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Land-Use/Cover Change Drivers, Impacts and Sustainability within the Water-Energy-Food Nexus",
    date: "11–12 July, 2018",
    location: "Chania, Greece",
    url: "http://lulc.earsel.org/workshop/2018-lulc-ws/",
    reportUrl: "http://lulc.earsel.org/wp-content/uploads/2018/09/Report_EARSeL-NASA_LCLUC_WS_Chania2018_f.pdf",
  },
  {
    title: "2nd EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Advancing horizons for land cover services entering the big data era",
    date: "6–7 May, 2016",
    location: "Prague, Czech Republic",
    url: "https://web.natur.cuni.cz/gis/lucc/",
    reportUrl: "http://old.earsel.org/SIG/LULC/data/LCLUC_WS_Prague_finalReport_sub.pdf",
  },
  {
    title: "1st EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Frontiers in Earth Observation for Land System Science",
    date: "17–18 March, 2014",
    location: "Berlin, Germany",
    url: "https://www.geographie.hu-berlin.de/en/professorships/geomatics/backup-old-files/congress/earsel-en/workshop/home",
    reportUrl: "http://old.earsel.org/SIG/LULC/data/EARSeL_NASA_1stjointLULC_Workshop_Report_Berlin.pdf",
  },
];

export default function Workshops() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Workshops</h1>
          <p className="text-xl text-muted-foreground">
            Co-organization of scientific workshops at major international remote sensing and GIS conferences.
          </p>
        </div>

        <div className="space-y-6">
          {workshops.map((ws, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">{ws.title}</h2>
                  <p className="text-sm font-medium text-primary mb-2 italic">"{ws.subtitle}"</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Date:</span> {ws.date}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Location:</span> {ws.location}
                  </p>
                  {ws.note && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ws.note}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {ws.url && (
                      <a
                        href={ws.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                      >
                        Workshop website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {ws.reportUrl && (
                      <a
                        href={ws.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-xs font-medium hover:bg-border transition-colors"
                      >
                        Workshop report <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
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
