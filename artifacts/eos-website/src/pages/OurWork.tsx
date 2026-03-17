import { Link } from "wouter";
import { BookOpen, Users, Briefcase, FileText, GraduationCap, ArrowRight, Satellite } from "lucide-react";

const sections = [
  {
    id: "projects",
    title: "Research Projects",
    icon: <Briefcase className="w-6 h-6" />,
    description: "We lead and participate in numerous national and European research projects focusing on Earth Observation applications — from digital precision agriculture to water quality monitoring and biodiversity conservation.",
    highlights: [
      "MONALISA – Land Degradation Neutrality monitoring (EU Horizon Europe)",
      "DigiCotton – Digital solutions for cotton crop monitoring",
      "DigiRyzi – Smart rice cultivation with EO and IoT",
      "WQeMS – Water Quality Emergency Monitoring Service (H2020)",
      "EcoSense – Earth Observation for Protected Areas (ESA)",
      "PONTOS – Copernicus services for the Black Sea (ENI CBC)",
      "eLTER PLUS – European Long-Term Ecosystem Research (H2020)",
      "EOTiST – Earth Observation Training initiative",
    ],
    href: "/our-work/projects",
    cta: "View All Projects",
  },
  {
    id: "cooperations",
    title: "Cooperations",
    icon: <Users className="w-6 h-6" />,
    description: "Strong and lasting partnerships with space agencies, international networks, and research institutions across Europe, America, Asia, and Africa.",
    highlights: [
      "NASA LCLUC – Land-Cover/Land-Use Change program",
      "EARSeL – European Association of Remote Sensing Labs (SIG Chair 2011–2020)",
      "Copernicus Academy – EU Copernicus programme",
      "SCERIN – South Central & Eastern European Regional Network",
      "MEDRIN – Mediterranean Regional Information Network",
      "CIHEAM Chania – Adjunct Professor in Remote Sensing",
      "GEOBON ECOFUN – GEO Biodiversity Observation Network",
    ],
    href: "/our-work/cooperations",
    cta: "View All Cooperations",
  },
  {
    id: "publications",
    title: "Publications",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Our team regularly publishes in high-impact peer-reviewed journals in remote sensing, environmental science, and geospatial analysis — including Remote Sensing (MDPI), Land, Water, and more.",
    highlights: [
      "Towards a comprehensive geodiversity - Biodiversity nexus (Earth-Science Reviews, 2025)",
      "3D-CNN detection of Potexvirus infections via hyperspectral imaging (Plant Methods, 2025)",
      "Machine Learning for aquatic vegetation identification from space (SN Computer Science, 2024)",
      "Mapping underwater vegetation using foundation models (Remote Sensing, 2023)",
      "Land–Water Transition Zone monitoring for drinking water (Water, 2023)",
    ],
    href: "/our-work/publications",
    cta: "Browse Publications",
  },
  {
    id: "special-issues",
    title: "Special Issues",
    icon: <FileText className="w-6 h-6" />,
    description: "Guest-edited special issues of prominent scientific journals, bringing together leading researchers on targeted topics in Earth Observation.",
    highlights: [
      "Remote Sensing in Ecosystem Modelling (Remote Sensing MDPI, Q1)",
      "Monitoring Land Cover Change: Towards Sustainability (Land MDPI)",
      "Sentinel Analysis Ready Data (Remote Sensing MDPI)",
    ],
    href: "/our-work/special-issues",
    cta: "View Special Issues",
  },
  {
    id: "workshops",
    title: "Workshops",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Co-organizing scientific workshops at major international conferences on land use, land cover change, and sustainability.",
    highlights: [
      "EARSeL Joint Workshop 2021 – Liege, Belgium (with NASA LCLUC & Urban RS)",
      "3rd EARSeL LULC & NASA LCLUC Workshop 2018 – Chania, Greece",
      "2nd EARSeL LULC & NASA LCLUC Workshop 2016 – Prague, Czech Republic",
      "1st EARSeL LULC & NASA LCLUC Workshop 2014 – Berlin, Germany",
    ],
    href: "/our-work/workshops",
    cta: "View Workshops",
  },
];

export default function OurWork() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <Satellite className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Work</h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The EOS team is dedicated to advancing Earth Observation science through rigorous research, strategic cooperations, and continuous knowledge dissemination.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>

              <p className="text-muted-foreground text-lg mb-5 leading-relaxed">
                {section.description}
              </p>

              {section.highlights && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6">
                  {section.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={section.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
              >
                {section.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
