import { ExternalLink, Layers, Map, Database, Box, Server, Droplet, TreePine, Plane } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type ServiceItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  category: string;
  external?: boolean;
  contactOnly?: boolean;
};

const services: ServiceItem[] = [
  {
    title: "Vegetation Indices",
    desc: "Regional vegetation index calculation from Sentinel-2 imagery for plant health and agricultural monitoring. Available upon request.",
    icon: <TreePine className="w-8 h-8 text-secondary" />,
    href: "/contact",
    category: "Monitoring",
    contactOnly: true,
  },
  {
    title: "Inundation Maps",
    desc: "Flood inundation mapping from Sentinel-2 imagery for water resource management and flood assessment. Available upon request.",
    icon: <Map className="w-8 h-8 text-primary" />,
    href: "/contact",
    category: "Monitoring",
    contactOnly: true,
  },
  {
    title: "Land Cover Maps (EODESM)",
    desc: "Detailed land cover classification and change mapping platform using multi-source EO data. Available upon request.",
    icon: <Layers className="w-8 h-8 text-accent" />,
    href: "/contact",
    category: "Mapping",
    contactOnly: true,
  },
  {
    title: "UAV Services",
    desc: "Unmanned Aerial Vehicle services for high-resolution localized remote sensing, precision agriculture, and environmental surveys.",
    icon: <Plane className="w-8 h-8 text-slate-500" />,
    href: "/services/uav",
    category: "Services",
  },
  {
    title: "Zenodo Products",
    desc: "Open datasets, training materials, and research outputs published on Zenodo.",
    icon: <Database className="w-8 h-8 text-blue-400" />,
    href: "/services/zenodo",
    category: "Data",
  },
  {
    title: "crocoTile",
    desc: "eLTER platform for spatial data tiling and processing in long-term ecosystem research.",
    icon: <Box className="w-8 h-8 text-orange-500" />,
    href: "https://elter-crocotile.datalabs.ceh.ac.uk/",
    category: "Tools",
    external: true,
  },
  {
    title: "WebGIS Tool",
    desc: "Irrigation WebGIS tool for agricultural water management and planning.",
    icon: <Server className="w-8 h-8 text-emerald-500" />,
    href: "http://web-gis-irrigation.iti.gr/",
    category: "Tools",
    external: true,
  },
  {
    title: "Greek Data Cubes",
    desc: "Efficient satellite data cubes for monitoring land changes over time across Greece.",
    icon: <Database className="w-8 h-8 text-indigo-500" />,
    href: "http://datacube.iti.gr/",
    category: "Data",
    external: true,
  },
  {
    title: "EO-4-WaterUtilities",
    desc: "WQeMS portal providing Earth Observation services for water quality monitoring and emergency response.",
    icon: <Droplet className="w-8 h-8 text-cyan-500" />,
    href: "https://portal-wqems.iti.gr/",
    category: "Platforms",
    external: true,
  },
  {
    title: "EO-4-ProtectedAreas",
    desc: "EcoSense platform for monitoring and managing protected natural areas using Earth Observation.",
    icon: <TreePine className="w-8 h-8 text-green-600" />,
    href: "https://ecosense.biosense.rs/#/home",
    category: "Platforms",
    external: true,
  },
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

              {service.external ? (
                <a href={service.href} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button variant="outline" className="w-full justify-between group">
                    Open Service
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Button>
                </a>
              ) : service.contactOnly ? (
                <Link href={service.href} className="mt-auto">
                  <Button variant="outline" className="w-full justify-between group">
                    Request Access
                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">→</span>
                  </Button>
                </Link>
              ) : (
                <Link href={service.href} className="mt-auto">
                  <Button variant="outline" className="w-full justify-between group">
                    Learn More
                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">→</span>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
