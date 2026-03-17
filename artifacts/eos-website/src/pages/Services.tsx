import { ExternalLink, Layers, Map, Database, Box, Server, Droplet, TreePine, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Vegetation Indices",
    desc: "A module to calculate vegetation indices from Sentinel-2 images for regional analysis.",
    icon: <TreePine className="w-8 h-8 text-secondary" />,
    href: "https://eos.iti.gr/regions-vegetation.php",
    category: "Monitoring"
  },
  {
    title: "Inundation Maps",
    desc: "A module to estimate inundation maps from Sentinel-2 images for flood assessment.",
    icon: <Map className="w-8 h-8 text-primary" />,
    href: "https://eos.iti.gr/regions-inundation.php",
    category: "Monitoring"
  },
  {
    title: "Land Cover Maps",
    desc: "EODESM platform providing detailed land cover mapping and classification.",
    icon: <Layers className="w-8 h-8 text-accent" />,
    href: "https://eos.iti.gr/eodesm.php",
    category: "Mapping"
  },
  {
    title: "crocoTile",
    desc: "eLTER platform for spatial data tiling and processing.",
    icon: <Box className="w-8 h-8 text-orange-500" />,
    href: "https://elter-crocotile.datalabs.ceh.ac.uk/",
    category: "Tools"
  },
  {
    title: "Zenodo Products",
    desc: "Access our published datasets, code, and research outputs on Zenodo.",
    icon: <Database className="w-8 h-8 text-blue-400" />,
    href: "https://eos.iti.gr/zenodo.php",
    category: "Data"
  },
  {
    title: "Hyperspectral Cubes",
    desc: "Presentations and data regarding hyperspectral imaging capabilities.",
    icon: <Layers className="w-8 h-8 text-purple-500" />,
    href: "https://eos.iti.gr/images/services/spectral-presentation.pdf",
    category: "Data"
  },
  {
    title: "WebGIS Tool",
    desc: "Irrigation WebGIS tool for agricultural water management.",
    icon: <Server className="w-8 h-8 text-emerald-500" />,
    href: "http://web-gis-irrigation.iti.gr/",
    category: "Tools"
  },
  {
    title: "LTER Products",
    desc: "Long-Term Ecosystem Research data products including hydroperiod metrics.",
    icon: <Database className="w-8 h-8 text-indigo-500" />,
    href: "https://b2share.eudat.eu/records/?q=hydroperiod",
    category: "Data"
  },
  {
    title: "EO-4-WaterUtilities",
    desc: "WQeMS portal providing earth observation services for water utilities.",
    icon: <Droplet className="w-8 h-8 text-cyan-500" />,
    href: "https://portal-wqems.iti.gr/",
    category: "Platforms"
  },
  {
    title: "EO-4-ProtectedAreas",
    desc: "EcoSense platform for monitoring and managing protected natural areas.",
    icon: <TreePine className="w-8 h-8 text-green-600" />,
    href: "https://ecosense.biosense.rs/#/home",
    category: "Platforms"
  },
  {
    title: "UAV Services",
    desc: "Unmanned Aerial Vehicle services for high-resolution localized remote sensing.",
    icon: <Plane className="w-8 h-8 text-slate-500" />,
    href: "https://eos.iti.gr/uav.php",
    category: "Services"
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Services & Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We develop operational tools, platforms, and datasets derived from Earth Observation technologies to support environmental monitoring, agriculture, and resource management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-muted rounded-xl">
                  {service.icon}
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-background border border-border rounded-full text-muted-foreground uppercase tracking-wider">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {service.desc}
              </p>
              
              <a 
                href={service.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto"
              >
                <Button variant="outline" className="w-full justify-between group">
                  Open Service
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
