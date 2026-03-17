import { ExternalLink, Database } from "lucide-react";

const zenodoGroups = [
  {
    title: "Training in Earth Observation for Ecosystem Services Monitoring",
    items: [
      {
        name: "EOTiST Standard Course about Remote Sensing, Ecosystem Research, Modelling and Computer Science",
        authors: "C. Domingo-Marimon, L. Pesquer, E. Prat, R.T. Chadoulis, I. Manakos, M. Banti, A. Provenzale, C. Marangi, F. Diele, M. Magnani, N. Julià, A. Zabala, J. Masó, R. López, X. Pons",
        date: "August 1, 2022",
        url: "https://zenodo.org/records/13712172",
      },
      {
        name: "EOTiST Advanced Course about Remote Sensing, Ecosystem Research, Modelling and Computer Science",
        authors: "C. Domingo-Marimon, L. Pesquer, E. Prat, R.T. Chadoulis, I. Manakos, E. Katsikis, A. Provenzale, C. Marangi, F. Diele, J. Masó, A. Batlle-Morera, I. Serra",
        date: "January 24, 2024",
        url: "https://zenodo.org/records/13710888",
      },
    ],
  },
  {
    title: "Phenology",
    items: [
      {
        name: "Phenology metric layers and their classification layers for the NDVI approximated phenological cycle of Doñana (2015–2016)",
        authors: "I. Manakos, G. Kordelas, K. Marini, G. Chantziaras",
        date: "September 10, 2019",
        url: "https://zenodo.org/record/3403798",
      },
      {
        name: "Maps related to the detection of abrupt changes in NDVI approximated phenological cycles of Doñana marshes for 2007–2016",
        authors: "G. Kordelas, I. Manakos, K. Marini, V. Kotsias, M. Papanastasiou",
        date: "September 10, 2019",
        url: "https://zenodo.org/record/3403705",
      },
    ],
  },
  {
    title: "Inundation Maps",
    items: [
      {
        name: "Inundation maps of Camargue for 47 dates within the period 2016/02/09 to 2018/06/19 and their accompanying INSPIRE metadata XML files",
        authors: "EOS Team",
        date: "2019",
        url: "https://zenodo.org/",
      },
    ],
  },
];

export default function ZenodoPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Zenodo Products</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Open data, training courses, and geospatial products produced by the EOS team and published on Zenodo.
          </p>
          <a
            href="https://zenodo.org/search?q=manakos&l=list&p=1&s=10&sort=bestmatch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
          >
            <Database className="w-4 h-4" />
            Search all EOS products on Zenodo
          </a>
        </div>

        <div className="mt-10 space-y-10">
          {zenodoGroups.map((group, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-foreground mb-5 pb-2 border-b border-border">{group.title}</h2>
              <div className="space-y-4">
                {group.items.map((item, j) => (
                  <div key={j} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-2 leading-snug">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{item.authors}</p>
                    <p className="text-xs text-muted-foreground mb-4">Publication date: {item.date}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                    >
                      Go to Zenodo <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
