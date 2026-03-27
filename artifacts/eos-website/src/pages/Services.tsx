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
    desc: "Regional vegetation index calculation from Sentinel-2 imagery for plant health and agricultural monitoring. Regional results updated regularly.",
    icon: <TreePine className="w-8 h-8 text-secondary" />,
    href: "/services/vegetation-indices",
    category: "Monitoring",
  },
  {
    title: "Inundation Maps",
    desc: "Flood inundation mapping from Sentinel-2 imagery for water resource management and flood assessment. Regional results updated regularly.",
    icon: <Map className="w-8 h-8 text-primary" />,
    href: "/services/inundation-maps",
    category: "Monitoring",
  },
  {
    title: "Land Cover Maps (EODESM)",
    desc: "Detailed land cover classification and change mapping platform using multi-source EO data. Developed under the ECOPOTENTIAL H2020 project.",
    icon: <Layers className="w-8 h-8 text-accent" />,
    href: "/services/land-cover-maps",
    category: "Mapping",
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
  {
    title: "LTER Products",
    desc: "Long-term ecosystem research products, including hydroperiod datasets and related EO outputs, published via the EUDAT B2Share repository.",
    icon: <Database className="w-8 h-8 text-teal-600" />,
    href: "https://b2share.eudat.eu/records/?q=hydroperiod&sort=-&page=1&size=10",
    category: "Data",
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

        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Indicative Applications</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-3xl">
            Indicative applications include, but are not limited to, the following EO-based workflows and analysis modules developed by the EOS team. You may find more information for each module by contacting the team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "HydroMap",
                desc: "Generates HydroMaps from series of water masks, falling within the desired time-period (hydroperiod estimation).",
              },
              {
                name: "WaterMasks",
                desc: "Generates inland free water surface masks from Sentinel-2 satellite imagery, using an unsupervised local thresholding approach.",
              },
              {
                name: "LandMetrics",
                desc: "Calculates landscape fragmentation measures (landscape metrics) used as indicators of fragmentation and connectivity of land cover or habitat classes.",
              },
              {
                name: "SpeckleRemoval",
                desc: "Suppresses speckle noise in Sentinel-1 SAR GRD products using guided image filtering.",
              },
              {
                name: "PhenologyChanges",
                desc: "Estimates abrupt changes in NDVI-approximated phenological cycles over a range of years from time-series GeoTiff files. Uses the BFAST CRAN package.",
              },
              {
                name: "PhenologyMetrics",
                desc: "Calculates Greenup, Senescence and Max NDVI day from NDVI GeoTiff collections within a season, using the phenex R package. Detects multiple phenological cycles.",
              },
              {
                name: "Vegetation Height Classification",
                desc: "Delineation of height categories for vegetated areas through texture analysis of very high spatial resolution multispectral imagery, using machine learning algorithms.",
              },
              {
                name: "Habitat Characterization",
                desc: "Characterization of habitats based on land cover properties, using spectral, texture, topological, morphological, and height features classified in General Habitat Categories.",
              },
              {
                name: "Biodiversity Indicators",
                desc: "Extraction of biodiversity indicators adopted by the European Union and international organizations through the use of remote sensing data.",
              },
            ].map((module, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
                <h4 className="font-bold text-foreground mb-2 text-sm">{module.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
