import { ExternalLink, Users } from "lucide-react";

const currentPersonnel = [
  {
    name: "Ioannis Manakos, Dr.",
    role: "Director of Research in Remote Sensing",
    img: "/images/structure/imanakos.jpg",
    bio: "Director of Research in 'Remote Sensing' at the Information Technologies Institute (ITI) of the Centre for Research and Technology Hellas (CERTH). Cooperating with academics and researchers from Europe, America, Asia and Africa in subjects relevant to research and development in Remote Sensing since 1996.",
    url: "https://www.iti.gr/iti/en/people/ioannis-manakos/",
  },
  {
    name: "Afroditi Kita, PhD Candidate",
    role: "PhD Candidate",
    img: "/images/structure/afro_kita.png",
    bio: "PhD Candidate co-supervised by the Information Technologies Institute (ITI) of the Centre for Research and Technology Hellas (CERTH). Research focus on Earth Observation data for aquatic vegetation and water body monitoring.",
    url: null,
  },
  {
    name: "Rizos-Theodoros Chadoulis, PhD Candidate",
    role: "PhD Candidate",
    img: "/images/structure/hadoulis.jpg",
    bio: "PhD Candidate co-supervised by the Information Technologies Institute (ITI) of the Centre for Research and Technology Hellas (CERTH). Research focus on hyperspectral imaging, plant disease detection, and deep learning for remote sensing applications.",
    url: null,
  },
];

const collaboratingCategories = [
  {
    label: "PhD Candidates / Fellows",
    anchor: "#phd",
    description: "Detection of aquatic pollutants, signal processing, land cover classification with deep learning, and more."
  },
  {
    label: "MSc Candidates / Fellows",
    anchor: "#msc",
    description: "Remote sensing applications, environmental monitoring, and geoinformatics research."
  },
  {
    label: "Diploma Thesis Candidates / Fellows",
    anchor: "#diploma",
    description: "Undergraduate theses in Earth Observation, satellite data processing, and GIS."
  },
];

export default function Team() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Team</h1>
          <p className="text-xl text-muted-foreground">
            Since 2012, 48 personnel units have been engaged in EOS team's activities. Gender equality target is almost achieved (52% male and 48% female research assistants).
          </p>
        </div>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-8">Current Personnel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPersonnel.map((person, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground text-base mb-1">{person.name}</h3>
                  <span className="text-xs font-medium text-primary mb-3">{person.role}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{person.bio}</p>
                  {person.url && (
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Profile page <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Personnel Statistics</h2>
            </div>
            <div className="flex items-center justify-center py-4">
              <img
                src="/images/structure/Plot_Final.png"
                alt="EOS team personnel chart"
                className="max-w-full rounded-xl"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Personnel engaged in EOS team activities since 2012.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Collaborating Personnel</h2>
          <p className="text-muted-foreground mb-6">
            In the framework of direct cooperation within research lines coupled with EOS team's main activities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collaboratingCategories.map((cat, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-bold text-foreground mb-2">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
