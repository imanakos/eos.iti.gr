import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
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
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import eoResources from "@/data/eoResourcesData.json";

const TABS = [
  {
    id: "services",
    label: "Data & Services",
    href: "/tools",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: "modules",
    label: "EO Modules",
    href: "/tools/modules",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: "elearning",
    label: "e-Learning",
    href: "/tools/elearning",
    icon: <GraduationCap className="w-4 h-4" />,
  },
] as const;

function toolsSectionFromLocation(location: string) {
  const pathname = location.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";

  if (pathname === "/tools") {
    const legacyTab =
      typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("tab");
    if (legacyTab && TABS.some((tab) => tab.id === legacyTab)) return legacyTab;
    return "services";
  }

  return TABS.find((tab) => tab.href === pathname)?.id ?? "services";
}

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
    desc: "Browse deposited datasets, training materials and research outputs. Each record provides its own citation and reuse terms.",
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

type ResourceSection = "services" | "modules" | "elearning";

const catalogueHeadings: Record<ResourceSection, { title: string; intro: string }> = {
  services: {
    title: "Explore the data behind the research",
    intro:
      "Find a dataset or notebook by topic, place or project. Related products are grouped together, with observation periods kept separate from publication dates.",
  },
  modules: {
    title: "Historical EO software",
    intro:
      "Documented implementations and examples from ECOPOTENTIAL, with their purpose and contributors. Contact the team for questions about these historical modules.",
  },
  elearning: {
    title: "Courses and practical reading",
    intro:
      "Go directly to course deposits and project guides. The cards distinguish public learning materials from course outlines and show the contribution and reuse terms for each resource.",
  },
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function ResourceCatalogue({ section }: { section: ResourceSection }) {
  const [query, setQuery] = useState("");
  const [project, setProject] = useState("all");

  useEffect(() => {
    const resourceIds = new Set(
      eoResources.filter((resource) => resource.section === section).map((resource) => resource.id)
    );
    let firstFrame = 0;
    let secondFrame = 0;

    const revealLinkedResource = () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);

      let resourceId: string;
      try {
        resourceId = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!resourceIds.has(resourceId)) return;

      setQuery("");
      setProject("all");
      // Wait for filter rendering and the layout's route-change scroll/focus reset.
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          const target = document.getElementById(resourceId);
          if (!target) return;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: "start", behavior: "auto" });
        });
      });
    };

    // Wouter dispatches these history events, including for hash-only links.
    const events = ["hashchange", "popstate", "pushState", "replaceState"] as const;
    events.forEach((event) => window.addEventListener(event, revealLinkedResource));
    revealLinkedResource();

    return () => {
      events.forEach((event) => window.removeEventListener(event, revealLinkedResource));
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [section]);

  const resources = eoResources.filter((resource) => resource.section === section);
  const projects = [...new Set(resources.map((resource) => resource.project))].sort();
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  const filtered = resources.filter((resource) => {
    const searchableText = normalizeSearch(
      [
        resource.title,
        resource.type,
        resource.project,
        resource.summary,
        resource.coverage,
        resource.creators,
        resource.contribution,
        resource.published,
        ...resource.links.map((link) => `${link.label} ${"doi" in link ? link.doi : ""}`),
      ].join(" ")
    );
    return (
      (project === "all" || resource.project === project) &&
      terms.every((term) => searchableText.includes(term))
    );
  });
  const heading = catalogueHeadings[section];
  const hasFilters = query.trim().length > 0 || project !== "all";

  return (
    <section className="mb-14" aria-labelledby={`resources-heading-${section}`}>
      <h2
        id={`resources-heading-${section}`}
        className="mb-3 text-2xl font-display font-bold text-foreground"
      >
        {heading.title}
      </h2>
      <p className="mb-6 max-w-3xl text-base text-muted-foreground leading-relaxed">
        {heading.intro}
      </p>
      <div className="mb-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div>
          <label
            htmlFor={`resource-search-${section}`}
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Search these resources
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id={`resource-search-${section}`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Topic, place, creator or DOI"
              aria-controls={`resource-results-${section}`}
              className="min-h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>
        </div>
        {projects.length > 1 && (
          <div className="sm:min-w-44">
            <label
              htmlFor={`resource-project-${section}`}
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Project
            </label>
            <select
              id={`resource-project-${section}`}
              value={project}
              onChange={(event) => setProject(event.target.value)}
              aria-controls={`resource-results-${section}`}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <option value="all">All projects</option>
              {projects.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-muted-foreground"
        >
          {filtered.length} of {resources.length} resource groups shown
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setProject("all");
            }}
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Clear filters
          </button>
        )}
      </div>
      <div id={`resource-results-${section}`} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered.map((resource) => (
          <article
            key={resource.id}
            id={resource.id}
            tabIndex={-1}
            aria-labelledby={`${resource.id}-title`}
            className="min-w-0 scroll-mt-40 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                {resource.type}
              </span>
              <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                {resource.project}
              </span>
            </div>
            <h3
              id={`${resource.id}-title`}
              className="mb-3 text-lg font-display font-bold text-foreground"
            >
              {resource.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-foreground">{resource.summary}</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Coverage: </span>
              {resource.coverage}
            </p>
            {resource.links.length > 0 && (
              <ul className="space-y-1.5" aria-label={`${resource.title}: public resource links`}>
                {resource.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-md py-1 text-sm font-semibold text-primary underline underline-offset-4 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span>{link.label}</span>
                      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <details className="mt-4 border-t border-border pt-3">
              <summary className="min-h-11 cursor-pointer rounded-md py-2 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Credits, access and reuse
                <span className="sr-only"> for {resource.title}</span>
              </summary>
              <dl className="mt-2 space-y-3 text-sm leading-relaxed">
                {[
                  ["Publication", resource.published],
                  ["Credits", resource.creators],
                  ["Contribution", resource.contribution],
                  ["Access", resource.access],
                  ["Reuse", resource.reuse],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-semibold text-foreground">{label}</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
                {resource.links.some((link) => "doi" in link) && (
                  <div>
                    <dt className="font-semibold text-foreground">Persistent identifiers</dt>
                    <dd className="space-y-1 text-muted-foreground">
                      {resource.links
                        .filter((link) => "doi" in link)
                        .map((link) => (
                          <p key={link.url} className="break-words">
                            {link.label}: {"doi" in link ? link.doi : ""}
                          </p>
                        ))}
                    </dd>
                  </div>
                )}
              </dl>
            </details>
            {resource.relatedNotes.length > 0 && (
              <div className="mt-4 border-t border-border pt-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Related EO analysis
                </p>
                {resource.relatedNotes.map((note) => (
                  <Link
                    key={note.href}
                    href={note.href}
                    className="inline-block min-h-11 rounded-md py-2 text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {note.label}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-6 text-muted-foreground">
          No resources match these filters. Try a broader term or clear the filters above.
        </p>
      )}
      <p className="mt-5 text-sm text-muted-foreground">
        {section === "modules"
          ? "These summaries describe earlier research software; current compatibility and support have not been assessed."
          : "Files stay with their public repositories. Consult each record for its citation, metadata and reuse terms."}
      </p>
    </section>
  );
}

function ServicesTab() {
  return (
    <div>
      <ResourceCatalogue section="services" />
      <h2 className="mb-6 text-xl font-display font-bold text-foreground">
        Platforms and team services
      </h2>
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
    </div>
  );
}

function ModulesTab() {
  return (
    <div>
      <ResourceCatalogue section="modules" />
      <h2 className="mb-3 text-xl font-display font-bold text-foreground">
        Earth Observation processing modules
      </h2>
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
            <h3 className="font-display font-bold text-foreground mb-2 text-sm">{m.name}</h3>
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
      <ResourceCatalogue section="elearning" />
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
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0 opacity-70 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
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
  const [location] = useLocation();
  const activeTab = toolsSectionFromLocation(location);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Page header */}
      <div className="bg-[hsl(222_56%_14%)] pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Tools &amp; Data
          </h1>
          <p className="text-white/65 text-lg max-w-xl">
            Datasets, notebooks, processing tools and learning resources from EOS research and
            collaborations. Find the products, their context and the people behind them.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex overflow-x-auto scrollbar-none gap-1 py-1"
            aria-label="Tools and data sections"
          >
            {TABS.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                aria-current={activeTab === tab.id ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {tab.icon}
                {tab.label}
              </Link>
            ))}
          </nav>
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
