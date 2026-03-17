import { ExternalLink, GraduationCap } from "lucide-react";

const seosModules = [
  { num: 1, title: "A World of Images", url: "https://seos-project.eu/world-of-images/world-of-images-start-c00-p00.html" },
  { num: 2, title: "Introduction to Remote Sensing", url: "https://seos-project.eu/remotesensing/remotesensing-c00-p01.html" },
  { num: 3, title: "Natural and Cultural Heritages", url: "https://seos-project.eu/heritage-conservation/heritage-conservation-c00-p01.html" },
  { num: 4, title: "Coral Reefs", url: "https://seos-project.eu/coralreefs/coralreefs-c00-p01.html" },
  { num: 5, title: "Land Use and Land Use Change", url: "https://seos-project.eu/landuse/landuse-c00-p01.html" },
  { num: 6, title: "Remote Sensing and GIS in Agriculture", url: "https://seos-project.eu/agriculture/agriculture-c00-p01.html" },
  { num: 7, title: "Natural Resources Management", url: "https://seos-project.eu/resources/resources-c00-p01.html" },
  { num: 8, title: "Ocean Currents", url: "https://seos-project.eu/oceancurrents/oceancurrents-c00-p01.html" },
  { num: 9, title: "Ocean Colour", url: "https://seos-project.eu/oceancolour/oceancolour-c00-p01.html" },
  { num: 10, title: "Marine Pollution", url: "https://seos-project.eu/marinepollution/marinepollution-c00-p00.html" },
  { num: 11, title: "Understanding Spectra from the Earth", url: "https://seos-project.eu/earthspectra/earthspectra-c00-p01.html" },
  { num: 12, title: "Remote Sensing Using Lasers", url: "https://seos-project.eu/laser-rs/laser-rs-c00-p01.html" },
  { num: 13, title: "3D Models", url: "https://seos-project.eu/3d-models/3d-models-c00-p01.html" },
  { num: 14, title: "Modelling of Environmental Processes", url: "https://seos-project.eu/modelling/modelling-c00-p01.html" },
  { num: 15, title: "Classification", url: "https://seos-project.eu/classification/classification-c00-p01.html" },
  { num: 16, title: "Satellite Navigation with GPS", url: "https://seos-project.eu/GPS/GPS-c00-p01.html" },
];

const otherPlatforms = [
  {
    name: "Earth Observation Training (EOTiST)",
    desc: "Standard and Advanced courses on Remote Sensing, Ecosystem Research, Modelling and Computer Science. Developed within the EU EOTiST project and available on Zenodo.",
    url: "https://eos.iti.gr/e-learning.php",
  },
  {
    name: "Waste Water Treatment Training",
    desc: "e-Learning platform for waste water treatment operators developed within the AQUACYCLE project.",
    url: "https://etraining-aquacycle.eu/",
  },
  {
    name: "Water Utilities Training (WQeMS)",
    desc: "Training catalogue for water utility professionals in the context of the WQeMS (Water Quality Emergency Monitoring Service) project.",
    url: "https://training.wqems.eu/group/4?type=catalog",
  },
];

export default function ELearning() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">e-Learning</h1>
          <p className="text-xl text-muted-foreground">
            Free educational resources on Earth Observation, Remote Sensing, and environmental science, developed and supported by the EOS team.
          </p>
        </div>

        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">SEOS e-Learning Modules (English)</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            These modules were developed within the EU{" "}
            <a href="https://cordis.europa.eu/project/rcn/85228/factsheet/en" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              SEOS FP6 Space project
            </a>{" "}
            (Grant agreement ID: 30849). Also available in{" "}
            <a href="https://www.seos-project.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">other languages</a>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {seosModules.map(mod => (
              <a
                key={mod.num}
                href={mod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {mod.num}
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{mod.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Other Training Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherPlatforms.map((platform, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col">
                <h3 className="font-bold text-foreground mb-2">{platform.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{platform.desc}</p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  Go to platform <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
