import { BookOpen, Users, Briefcase, FileText, GraduationCap, ExternalLink } from "lucide-react";

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
      "eLTER PLUS - European Long-Term Ecosystem Research (H2020)"
    ]
  },
  {
    id: "cooperations",
    title: "Cooperations",
    icon: <Users className="w-6 h-6" />,
    description: "Strong partnerships with academic institutions, space agencies, and industry leaders worldwide.",
    items: [
      "European Space Agency (ESA)",
      "Aristotle University of Thessaloniki",
      "Karlsruhe Institute of Technology (KIT)",
      "BioSense Institute"
    ]
  },
  {
    id: "publications",
    title: "Publications",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Our team regularly publishes in high-impact peer-reviewed journals in the fields of remote sensing and environmental science.",
    link: "View Full Publication List"
  },
  {
    id: "special-issues",
    title: "Special Issues",
    icon: <FileText className="w-6 h-6" />,
    description: "We frequently guest-edit special issues in prominent scientific journals regarding novel EO techniques.",
    link: "Browse Special Issues"
  },
  {
    id: "workshops",
    title: "Workshops & Training",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Organizing knowledge transfer events, capacity building, and e-learning modules for students and professionals.",
    link: "View Training Modules"
  }
];

export default function OurWork() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Our Work</h1>
          <p className="text-xl text-muted-foreground">
            The EOS team is dedicated to advancing Earth Observation science through rigorous research, strategic cooperations, and continuous knowledge dissemination.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section 
              key={section.id} 
              id={section.id}
              className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>
              
              <p className="text-muted-foreground text-lg mb-6">
                {section.description}
              </p>

              {section.items && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.link && (
                <button className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
                  {section.link} <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
