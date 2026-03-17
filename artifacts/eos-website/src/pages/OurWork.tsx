import { BookOpen, Users, Briefcase, FileText, GraduationCap, ExternalLink, ArrowRight } from "lucide-react";

const sections = [
  {
    id: "projects",
    title: "Research Projects",
    icon: <Briefcase className="w-6 h-6" />,
    description: "We lead and participate in numerous national and European research projects focusing on Earth Observation applications.",
    items: [
      "WQeMS - Water Quality Emergency Monitoring Service (H2020)",
      "EcoSense - Earth Observation for Protected Areas (ESA)",
      "PONTOS - Copernicus based services for the Black Sea basin (ENI CBC)",
      "eLTER PLUS - European Long-Term Ecosystem Research (H2020)",
      "DigiCotton - Digital solutions for cotton crop monitoring",
      "MONALISA - Land Degradation Neutrality monitoring",
    ],
    link: { label: "View All Projects", href: "https://eos.iti.gr/projects.php" },
  },
  {
    id: "cooperations",
    title: "Cooperations",
    icon: <Users className="w-6 h-6" />,
    description: "Strong partnerships with academic institutions, space agencies, and industry leaders worldwide.",
    items: [
      "European Space Agency (ESA)",
      "NASA / USGS",
      "Aristotle University of Thessaloniki",
      "Karlsruhe Institute of Technology (KIT)",
      "BioSense Institute, Serbia",
      "Democritus University of Thrace",
    ],
    link: { label: "View All Cooperations", href: "https://eos.iti.gr/cooperation.php" },
  },
  {
    id: "publications",
    title: "Publications",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Our team regularly publishes in high-impact peer-reviewed journals in the fields of remote sensing, environmental science, and geospatial analysis.",
    link: { label: "View Full Publication List", href: "https://eos.iti.gr/publishing.php" },
  },
  {
    id: "special-issues",
    title: "Special Issues",
    icon: <FileText className="w-6 h-6" />,
    description: "We frequently guest-edit special issues in prominent scientific journals regarding novel Earth Observation techniques and methodologies for environmental monitoring.",
    link: { label: "Browse Special Issues", href: "https://eos.iti.gr/special-issues.php" },
  },
  {
    id: "workshops",
    title: "Workshops & Training",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Organizing knowledge transfer events, capacity building workshops, and e-learning modules for students, researchers, and professionals in Earth Observation.",
    link: { label: "View Workshops", href: "https://eos.iti.gr/workshops.php" },
    extraLinks: [
      { label: "Earth Observation Training (e-Learning)", href: "https://eos.iti.gr/e-learning.php" },
      { label: "Waste Water Treatment Training", href: "https://etraining-aquacycle.eu/" },
      { label: "Water Utilities Training", href: "https://training.wqems.eu/group/4?type=catalog" },
    ],
  },
];

export default function OurWork() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Work</h1>
          <p className="text-xl text-muted-foreground">
            The EOS team is dedicated to advancing Earth Observation science through rigorous research, strategic cooperations, and continuous knowledge dissemination.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {section.description}
              </p>

              {section.items && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-4 mt-2">
                {section.link && (
                  <a
                    href={section.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
                  >
                    {section.link.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {section.extraLinks?.map((el) => (
                  <a
                    key={el.label}
                    href={el.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-medium text-sm hover:bg-secondary/20 hover:text-secondary transition-colors"
                  >
                    {el.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
