import { useState } from "react";
import {
  ExternalLink,
  Layers,
  Map,
  Database,
  Box,
  Server,
  Droplet,
  TreePine,
  Plane,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "services", label: "Live Services & Tools", icon: <Wrench className="w-4 h-4" /> },
  { id: "modules", label: "EO Modules", icon: <Layers className="w-4 h-4" /> },
  { id: "elearning", label: "e-Learning", icon: <GraduationCap className="w-4 h-4" /> },
];

const liveServices = [
  {
    title: "Vegetation Indices",
    desc: "Regional vegetation index calculation from Sentinel-2 imagery for plant health and agricultural monitoring. Regional results updated regularly.",
    icon: <TreePine className="w-7 h-7 text-[hsl(140_50%_42%)]" />,
    category: "Monitoring",
    url: null,
    note: "Contact team for access",
  },
  {
    title: "Inundation Maps",
    desc: "Flood inundation mapping from Sentinel-2 imagery for water resource management and flood assessment. Regional results updated regularly.",
    icon: <Map className="w-7 h-7 text-primary" />,
    category: "Monitoring",
    url: null,
    note: "Contact team for access",
  },
  {
    title: "Land Cover Maps (EODESM)",
    desc: "Detailed land cover classification and change mapping platform using multi-source EO data, developed under the ECOPOTENTIAL H2020 project.",
    icon: <Layers className="w-7 h-7 text-[hsl(16_62%_50%)]" />,
    category: "Mapping",
    url: null,
    note: "Contact team for access",
  },
  {
    title: "UAV Services",
    desc: "Unmanned Aerial Vehicle services for high-resolution localized remote sensing, precision agriculture, and environmental surveys.",
    icon: <Plane className="w-7 h-7 text-muted-foreground" />,
    category: "Services",
    url: null,
    note: "Contact team for access",
  },
  {
    title: "Zenodo Products",
    desc: "Open datasets, training materials, and research outputs published on Zenodo under open licences.",
    icon: <Database className="w-7 h-7 text-[hsl(222_70%_55%)]" />,
    category: "Open Data",
    url: "https://zenodo.org/search?q=manakos&sort=bestmatch",
    note: null,
  },
  {
    title: "crocoTile",
    desc: "eLTER platform for spatial data tiling and processing in long-term ecosystem research contexts.",
    icon: <Box className="w-7 h-7 text-orange-500" />,
    category: "Tools",
    url: "https://elter-crocotile.datalabs.ceh.ac.uk/",
    note: null,
  },
  {
    title: "Irrigation WebGIS",
    desc: "WebGIS tool for agricultural water management and irrigation planning.",
    icon: <Server className="w-7 h-7 text-emerald-600" />,
    category: "Tools",
    url: "http://web-gis-irrigation.iti.gr/",
    note: null,
  },
  {
    title: "EO-4-WaterUtilities (WQeMS)",
    desc: "WQeMS portal providing Earth Observation services for water quality monitoring and emergency response for water utilities.",
    icon: <Droplet className="w-7 h-7 text-[hsl(199_80%_45%)]" />,
    category: "Platforms",
    url: "https://wqems.eu/",
    note: null,
  },
];

const eoModules = [
  {
    name: "HydroMap",
    desc: "Generates HydroMaps from series of water masks falling within the desired time-period (hydroperiod estimation).",
  },
  {
    name: "WaterMasks",
    desc: "Generates inland free water surface masks from Sentinel-2 satellite imagery using an unsupervised local thresholding approach.",
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
    desc: "Estimates abrupt changes in NDVI-approximated phenological cycles over a range of years from time-series GeoTiff files (BFAST CRAN package).",
  },
  {
    name: "PhenologyMetrics",
    desc: "Calculates Greenup, Senescence and Max NDVI day from NDVI GeoTiff collections within a season using the phenex R package. Detects multiple phenological cycles.",
  },
  {
    name: "Vegetation Height Classification",
    desc: "Delineation of height categories for vegetated areas through texture analysis of very high spatial resolution multispectral imagery, using machine learning algorithms.",
  },
  {
    name: "Habitat Characterization",
    desc: "Characterization of habitats based on land cover properties using spectral, texture, topological, morphological, and height features classified in General Habitat Categories.",
  },
  {
    name: "Biodiversity Indicators",
    desc: "Extraction of biodiversity indicators adopted by the European Union and international organisations through the use of remote sensing data.",
  },
];

const seosModules = [
  {
    num: 1,
    title: "A World of Images",
    url: "https://seos-project.eu/world-of-images/world-of-images-start-c00-p00.html",
  },
  {
    num: 2,
    title: "Introduction to Remote Sensing",
    url: "https://seos-project.eu/remotesensing/remotesensing-c00-p01.html",
  },
  {
    num: 3,
    title: "Natural and Cultural Heritages",
    url: "https://seos-project.eu/heritage-conservation/heritage-conservation-c00-p01.html",
  },
  {
    num: 4,
    title: "Coral Reefs",
    url: "https://seos-project.eu/coralreefs/coralreefs-c00-p01.html",
  },
  {
    num: 5,
    title: "Land Use and Land Use Change",
    url: "https://seos-project.eu/landuse/landuse-c00-p01.html",
  },
  {
    num: 6,
    title: "Remote Sensing and GIS in Agriculture",
    url: "https://seos-project.eu/agriculture/agriculture-c00-p01.html",
  },
  {
    num: 7,
    title: "Natural Resources Management",
    url: "https://seos-project.eu/resources/resources-c00-p01.html",
  },
  {
    num: 8,
    title: "Ocean Currents",
    url: "https://seos-project.eu/oceancurrents/oceancurrents-c00-p01.html",
  },
  {
    num: 9,
    title: "Ocean Colour",
    url: "https://seos-project.eu/oceancolour/oceancolour-c00-p01.html",
  },
  {
    num: 10,
    title: "Marine Pollution",
    url: "https://seos-project.eu/marinepollution/marinepollution-c00-p00.html",
  },
  {
    num: 11,
    title: "Understanding Spectra from the Earth",
    url: "https://seos-project.eu/earthspectra/earthspectra-c00-p01.html",
  },
  {
    num: 12,
    title: "Remote Sensing Using Lasers",
    url: "https://seos-project.eu/laser-rs/laser-rs-c00-p01.html",
  },
  { num: 13, title: "3D Models", url: "https://seos-project.eu/3d-models/3d-models-c00-p01.html" },
  {
    num: 14,
    title: "Modelling of Environmental Processes",
    url: "https://seos-project.eu/modelling/modelling-c00-p01.html",
  },
  {
    num: 15,
    title: "Classification",
    url: "https://seos-project.eu/classification/classification-c00-p01.html",
  },
  {
    num: 16,
    title: "Satellite Navigation with GPS",
    url: "https://seos-project.eu/GPS/GPS-c00-p01.html",
  },
];

const otherPlatforms = [
  {
    name: "EOTiST Training",
    desc: "Standard and advanced courses on Remote Sensing, Ecosystem Research, Modelling and Computer Science. Produced within the EU EOTiST Twinning project.",
    url: "https://eotist.cbk.waw.pl/",
  },
  {
    name: "AQUACYCLE e-Learning",
    desc: "e-Learning platform for waste water treatment operators, developed within the AQUACYCLE project.",
    url: "https://etraining-aquacycle.eu/",
  },
  {
    name: "Water Utilities Training (WQeMS)",
    desc: "Training handbook, reports, and supporting resources for water utility professionals, developed within the WQeMS project.",
    url: "https://cordis.europa.eu/project/id/101004157/results",
    linkLabel: "View training resources",
  },
];

function ServicesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {liveServices.map((svc, i) => (
        <div
          key={i}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-muted rounded-xl">{svc.icon}</div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-background border border-border rounded-full text-muted-foreground uppercase tracking-wider">
              {svc.category}
            </span>
          </div>
          <h3 className="font-display font-bold text-foreground mb-2">{svc.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
          <div className="mt-5">
            {svc.url ? (
              <a
                href={svc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Open <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href="mailto:imanakos@iti.gr"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {svc.note}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ModulesTab() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        Indicative EO-based processing modules developed by the EOS team. Contact the team for
        details on availability, inputs, and outputs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eoModules.map((m, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-5 hover:border-primary/20 transition-colors"
          >
            <h4 className="font-display font-bold text-foreground mb-2 text-sm">{m.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-muted/40 rounded-2xl border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Need a custom EO module or workflow for your use case?
        </p>
        <a
          href="mailto:imanakos@iti.gr"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Contact the team
        </a>
      </div>
    </div>
  );
}

function ELearningTab() {
  return (
    <div>
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold text-foreground">
            SEOS e-Learning Modules (English)
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
          These modules were developed within the EU{" "}
          <a
            href="https://cordis.europa.eu/project/rcn/85228/factsheet/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            SEOS FP6 Space project
          </a>{" "}
          (Grant agreement ID: 30849). Also available in{" "}
          <a
            href="https://seos-project.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            other languages
          </a>
          .
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seosModules.map((mod) => (
            <a
              key={mod.num}
              href={mod.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors tabular-nums">
                {mod.num}
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                {mod.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-6">
          Other Training Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {otherPlatforms.map((p, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col"
            >
              <h3 className="font-display font-bold text-foreground mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                {"linkLabel" in p ? p.linkLabel : "Go to platform"}{" "}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Tools() {
  const [activeTab, setActiveTab] = useState(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab && TABS.find((t) => t.id === tab) ? tab : "services";
  });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Page header */}
      <div className="bg-[hsl(222_56%_14%)] pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Tools &amp; Data
          </h1>
          <p className="text-white/65 text-lg max-w-xl">
            Operational EO platforms, processing modules, open datasets, and training resources
            developed by the EOS team.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none gap-1 py-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "modules" && <ModulesTab />}
        {activeTab === "elearning" && <ELearningTab />}
      </div>
    </div>
  );
}
