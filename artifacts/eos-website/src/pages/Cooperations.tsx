import { ExternalLink } from "lucide-react";
import { Link } from "wouter";


const cooperations = [
  {
    name: "NASA LCLUC",
    img: "/images/cooperation/projects/lcluc.png",
    description: "Land-Cover/Land-Use Change program. Joint workshops co-organized since 2014 on land use, land cover change, and sustainability within the Water-Energy-Food Nexus.",
    url: "https://lcluc.umd.edu/",
  },
  {
    name: "EARSeL",
    img: "/images/cooperation/projects/earsel-logo.gif",
    description: "European Association of Remote Sensing Laboratories. Dr. Manakos served as Chairman of the Special Interest Group 'Remote Sensing in Land Use & Land Cover' (2011–2020) and Chairman of EARSeL (2012–2014).",
    url: "http://lulc.earsel.org/",
  },
  {
    name: "Copernicus Academy",
    img: "/images/cooperation/projects/cop-academy1.jpg",
    description: "Member of the Copernicus Academy Network, contributing to education and training in Earth Observation under the EU Copernicus programme.",
    url: "https://www.copernicus.eu/en/opportunities/education/copernicus-academy",
  },
  {
    name: "MEDRIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description: "Mediterranean Regional Information Network — a regional network supporting land cover monitoring and Earth Observation capacity building in the Mediterranean area.",
    url: "https://gofcgold.org/regional-networks/mediterranean-regional-information-network-medrin",
  },
  {
    name: "SCERIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description: "South Central and Eastern European Regional Information Network (GOFC-GOLD / GTOS). Dr. Manakos serves as Lead for 'Global/Continental land cover products validation and intercomparison in the SCERIN area'.",
    url: "https://csebr.cz/scerin2018/about.html",
  },
  {
    name: "CIHEAM Chania",
    img: "/images/cooperation/projects/ciheam.png",
    description: "International Centre for Advanced Mediterranean Agronomic Studies. Dr. Manakos is an Adjunct Professor in Remote Sensing and led the Geoinformation in Environmental Management Department for 7 years.",
    url: "https://www.iamc.ciheam.org/",
  },
  {
    name: "GEO ECO",
    img: "/images/cooperation/projects/project.jpg",
    description: "Group on Earth Observations Ecosystems Community of Practice. Contributing to Earth observation-based biodiversity and ecosystem monitoring frameworks.",
    url: "https://www.earthobservations.org/",
  },
  {
    name: "GEOBON ECOFUN",
    img: "/images/cooperation/projects/geobon.jpg",
    description: "Global Biodiversity Observation Network — Ecosystem Functioning working group. Dr. Manakos serves as a member of the GEOBON Flagship within the Group on Earth Observations.",
    url: "https://geobon.org/",
  },
  {
    name: "EnCeladus Hellenic Supersite",
    img: "/images/cooperation/projects/geo.png",
    description: "Hellenic Supersite for Earth Observation and environmental monitoring in the EnCeladus framework.",
    url: "https://www.earthobservations.org/",
  },
];

export default function Cooperations() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cooperations</h1>
          <p className="text-xl text-muted-foreground">
            Ongoing international cooperations and network memberships of the EOS team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooperations.map((coop, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="h-32 bg-muted flex items-center justify-center p-6">
                <img
                  src={coop.img}
                  alt={coop.name}
                  className="max-h-full max-w-full object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">{coop.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{coop.description}</p>
                <a
                  href={coop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  More information <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          … and many others. <Link href="/contact" className="text-primary hover:underline">Contact us</Link> for more information on cooperations.
        </p>

      </div>
    </div>
  );
}
