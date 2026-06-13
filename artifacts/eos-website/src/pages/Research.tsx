import { useState, useEffect } from "react";
import { ExternalLink, Calendar, BookOpen, FileText, Users, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projectsData";
import { assetUrl } from "@/lib/utils";

const TABS = [
  { id: "projects", label: "Projects", icon: <Microscope className="w-4 h-4" /> },
  { id: "publications", label: "Publications", icon: <BookOpen className="w-4 h-4" /> },
  { id: "issues", label: "Special Issues", icon: <FileText className="w-4 h-4" /> },
  { id: "workshops", label: "Workshops", icon: <Calendar className="w-4 h-4" /> },
  { id: "cooperations", label: "Cooperations", icon: <Users className="w-4 h-4" /> },
];

const recentProjects = projects.filter((p) => p.status === "recent");
const pastProjects = projects.filter((p) => p.status === "past");

const journalPubs = [
  { text: "C. Beierkuhnlein et al. incl. I. Manakos, Towards a comprehensive geodiversity–Biodiversity nexus in terrestrial ecosystems, 2025, Earth-Science Reviews, 105075.", link: "https://doi.org/10.1016/j.earscirev.2025.105075" },
  { text: "R.-T. Chadoulis, I. Manakos et al., 3D-CNN detection of systemic symptoms induced by Potexvirus infections in Nicotiana benthamiana using leaf hyperspectral imaging, 2025, Plant Methods 21(15).", link: "https://link.springer.com/article/10.1186/s13007-025-01337-0" },
  { text: "L. Alagialoglou, I. Manakos et al., Machine Learning for Identifying Emergent and Floating Aquatic Vegetation from Space: A Case Study in the Dniester Delta, Ukraine, 2024, SN Computer Science.", link: "https://link.springer.com/article/10.1007/s42979-024-02873-7" },
  { text: "F. Lokmen, I. Manakos et al., A modified version of the Direct Sampling method for filling gaps in Landsat 7 and Sentinel 2 imagery in the coastal area of Rhone River, 2023, Remote Sensing.", link: "https://www.mdpi.com/2072-4292/15/21/5122" },
  { text: "L. Alagialoglou, I. Manakos et al., Mapping underwater aquatic vegetation using foundation models with air- and space-borne images: the case of Polyphytos Lake, 2023, Remote Sensing.", link: "https://www.mdpi.com/2072-4292/15/16/4001" },
  { text: "A. Kita, I. Manakos et al., Land–Water Transition Zone Monitoring in Support of Drinking Water Production, 2023, Water MDPI.", link: "https://www.mdpi.com/2073-4441/15/14/2596" },
  { text: "M. Milczarek, S. Aleksandrowicz, A. Kita, R.-T. Chadoulis, I. Manakos et al., Object- vs Pixel-Based Unsupervised Fire Burn Scar Mapping under Different Biogeographical Conditions in Europe, 2023, Land, 12(5), 1087.", link: "https://www.mdpi.com/2073-445X/12/5/1087" },
  { text: "M. Sismanis, R-T. Chadoulis, I. Manakos, A. Drosou, An Unsupervised Burned Area Mapping Approach Using Sentinel-2 Images, 2023, Land, 12(2), 379.", link: "https://www.mdpi.com/2073-445X/12/2/379" },
  { text: "R. M. Lucas et al. incl. I. Manakos, A globally relevant change taxonomy and evidence-based change framework for land monitoring, 2022, Global Change Biology.", link: "https://onlinelibrary.wiley.com/doi/10.1111/gcb.16346" },
  { text: "L. Alagialoglou, I. Manakos et al., A learnable model with calibrated uncertainty quantification for estimating canopy height from spaceborne sequential imagery, 2022, IEEE TGRS.", link: "https://ieeexplore.ieee.org/document/9768161" },
  { text: "L. Filchev, I. Manakos et al., A Review of Earth Observation Resources for Secondary School Education - Part II, 2021, Aerospace Research in Bulgaria.", link: "http://journal.space.bas.bg/arhiv/n%2033/Articles/18_Filchev.pdf" },
  { text: "I. Manakos, G. Gutman, C. Kalaitzidis, Monitoring Land Cover Change: Towards Sustainability, 2021, Land, DOI: 10.3390/land10121356.", link: "https://www.mdpi.com/2073-445X/10/12/1356" },
  { text: "C. Boutsoukis, I. Manakos et al., Canopy height estimation from single multispectral 2D airborne imagery using texture analysis and machine learning in structurally rich temperate forests, 2019, Remote Sensing.", link: null },
  { text: "G. Kordelas, I. Manakos et al., Automatic Inundation Mapping Using Sentinel-2 Data Applicable to Both Camargue and Doñana Biosphere Reserves, 2019, Remote Sensing, 11(19), 2251.", link: "https://www.mdpi.com/2072-4292/11/19/2251" },
  { text: "I. Manakos, G. Kordelas, K. Marini, Fusion of Sentinel-1 data with Sentinel-2 products to overcome non-favourable atmospheric conditions for the delineation of inundation maps, 2019, European Journal of Remote Sensing.", link: "https://www.tandfonline.com/doi/full/10.1080/22797254.2019.1596757" },
  { text: "I. Manakos et al., Comparison of Global and Continental Land Cover Products for selected study areas in South Central and Eastern European Region, 2018, Remote Sensing, 10(12), 1967.", link: "https://www.mdpi.com/2072-4292/10/12/1967" },
  { text: "G. Kordelas, I. Manakos et al., Fast and automatic data-driven thresholding for inundation mapping with Sentinel-2 data, 2018, Remote Sensing, 10, 910.", link: "https://www.mdpi.com/2072-4292/10/6/910" },
  { text: "D. Pasetto et al. incl. I. Manakos, Integration of satellite remote sensing data in ecosystem modelling at local scales: practices and trends, 2018, Methods in Ecology and Evolution, 9, 1810–1821.", link: "https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.13018" },
  { text: "Z. Petrou, I. Manakos et al., Discrimination of vegetation height categories with passive satellite sensor imagery using texture analysis, 2015, IEEE JSTARS, 8(4), 1442–1455.", link: "https://ieeexplore.ieee.org/document/7061969" },
  { text: "I. Manakos et al., Globalland30 Mapping Capacity of Land Surface Water in Thessaly, Greece, 2015, Land 4(1), 1-18.", link: "https://www.mdpi.com/2073-445X/4/1/1" },
  { text: "R. Lucas et al. incl. I. Manakos, The Earth Observation Data for Habitat Monitoring (EODHAM) System, 2015, IJAEOG 37, 17–28.", link: "https://www.sciencedirect.com/science/article/pii/S0303243414002347" },
  { text: "I. Manakos, M. Braun (Eds.), Land Use & Land Cover Mapping in Europe – Practices and Trends, 2014, Springer Verlag, Remote Sensing and Digital Image Processing, 18, p. 441.", link: "https://www.springer.com/us/book/9789400779686" },
  { text: "C.G. Karydas, M. Petriolis, I. Manakos, Evaluating alternative methods of soil erodibility mapping in the Mediterranean island of Crete, 2013, Journal of Agriculture, 3(3), 362–380.", link: "https://www.mdpi.com/2077-0472/3/3/362" },
];

const specialIssues = [
  {
    title: "Remote Sensing in Ecosystem Modelling",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "/images/special-issues/remote-sensing.png",
    impact: "Impact Factor: 4.118; 5-Year IF: 4.740; JCR rank Q1 in 'Remote Sensing'.",
    links: [{ label: "Special issue @ MDPI", url: "https://www.mdpi.com/journal/remotesensing/special_issues/ecosystem_modelling_RS" }],
  },
  {
    title: "Monitoring Land Cover Change: Towards Sustainability",
    journal: "Land | ISSN 2073-445X",
    img: "/images/special-issues/earsel-banner2.15.png",
    impact: "CiteScore 2018 (Scopus): 2.15 — rank 37/140 (Q2) in Nature and Landscape Conservation.",
    links: [{ label: "Special issue @ MDPI", url: "https://www.mdpi.com/journal/land/special_issues/EARSeL" }],
  },
  {
    title: "Sentinel Analysis Ready Data (Sentinel ARD)",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "/images/special-issues/remote_sensing_si_banner_h.jpg",
    impact: "A special issue of Remote Sensing dedicated to Sentinel ARD methodologies.",
    links: [{ label: "Special issue @ MDPI", url: "https://www.mdpi.com/journal/remotesensing/special_issues/ARD" }],
  },
];

const workshops = [
  {
    title: "EARSeL Joint Workshop 2021",
    subtitle: "Earth Observation for sustainable cities and communities",
    date: "30 March – 1 April, 2021",
    location: "Liège, Belgium",
    note: "A combination of: 4th joint EARSeL LULC & NASA LCLUC Workshop; 6th EARSeL Joint Workshop Urban Remote Sensing; 1st EARSeL RS for UN SDGs Workshop.",
    url: "http://liege2020.earsel.org/",
  },
  {
    title: "3rd EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Land-Use/Cover Change Drivers, Impacts and Sustainability within the Water-Energy-Food Nexus",
    date: "11–12 July, 2018",
    location: "Chania, Greece",
    url: "http://lulc.earsel.org/workshop/2018-lulc-ws/",
    reportUrl: "http://lulc.earsel.org/wp-content/uploads/2018/09/Report_EARSeL-NASA_LCLUC_WS_Chania2018_f.pdf",
  },
  {
    title: "2nd EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Advancing horizons for land cover services entering the big data era",
    date: "6–7 May, 2016",
    location: "Prague, Czech Republic",
    url: "https://web.natur.cuni.cz/gis/lucc/",
    reportUrl: "http://old.earsel.org/SIG/LULC/data/LCLUC_WS_Prague_finalReport_sub.pdf",
  },
  {
    title: "1st EARSeL LULC & NASA LCLUC Workshop",
    subtitle: "Frontiers in Earth Observation for Land System Science",
    date: "17–18 March, 2014",
    location: "Berlin, Germany",
    url: "https://www.geographie.hu-berlin.de/en/professorships/geomatics/backup-old-files/congress/earsel-en/workshop/home",
    reportUrl: "http://old.earsel.org/SIG/LULC/data/EARSeL_NASA_1stjointLULC_Workshop_Report_Berlin.pdf",
  },
];

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
    description: "European Association of Remote Sensing Laboratories. Dr. Manakos served as Chairman of the SIG 'Remote Sensing in Land Use & Land Cover' (2011–2021) and Chairman of EARSeL (2012–2014).",
    url: "http://lulc.earsel.org/",
  },
  {
    name: "Copernicus Academy",
    img: "/images/cooperation/projects/cop-academy1.jpg",
    description: "Member of the Copernicus Academy Network, contributing to education and training in Earth Observation under the EU Copernicus programme.",
    url: "https://www.copernicus.eu/en/opportunities/education",
  },
  {
    name: "MEDRIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description: "Mediterranean Regional Information Network — a regional network supporting land cover monitoring and Earth Observation capacity building in the Mediterranean area.",
    url: "https://www.earthobservations.org/",
  },
  {
    name: "SCERIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description: "South Central and Eastern European Regional Information Network (GOFC-GOLD / GTOS). Dr. Manakos serves as Lead for 'Global/Continental land cover products validation and intercomparison in the SCERIN area'.",
    url: "https://www.earthobservations.org/",
  },
  {
    name: "CIHEAM Chania",
    img: "/images/cooperation/projects/ciheam.png",
    description: "International Centre for Advanced Mediterranean Agronomic Studies. Dr. Manakos is an Adjunct Professor in Remote Sensing and led the Geoinformation in Environmental Management Department for 7 years.",
    url: "https://www.ciheam.org/",
  },
  {
    name: "GEO Ecosystems",
    img: "/images/cooperation/projects/project.jpg",
    description: "Group on Earth Observations Ecosystems Community of Practice. Contributing to Earth observation-based biodiversity and ecosystem monitoring frameworks.",
    url: "https://www.earthobservations.org/",
  },
  {
    name: "GEOBON ECOFUN",
    img: "/images/cooperation/projects/geobon.jpg",
    description: "Global Biodiversity Observation Network — Ecosystem Functioning working group. Dr. Manakos serves as a member of the GEOBON Flagship within the Group on Earth Observations.",
    url: "https://geobon.org/ebvs/working-groups/ecosystem-function/",
  },
  {
    name: "EnCeladus Hellenic Supersite",
    img: "/images/cooperation/projects/geo.png",
    description: "Hellenic Supersite for Earth Observation and environmental monitoring in the EnCeladus framework.",
    url: "https://www.earthobservations.org/",
  },
];

function ProjectsTab() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-2 h-6 rounded-full bg-primary inline-block" /> Recent &amp; Ongoing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentProjects.map((proj) => (
            <div
              key={proj.name}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col"
            >
              <div className="h-28 bg-muted flex items-center justify-center p-5">
                <img
                  src={assetUrl(proj.img)}
                  alt={proj.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-display font-bold text-foreground mb-2">{proj.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {proj.description}
                </p>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Visit project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {pastProjects.length > 0 && (
        <div>
          <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-6 rounded-full bg-muted-foreground/40 inline-block" /> Past Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pastProjects.map((proj) => (
              <div
                key={proj.name}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col opacity-80 hover:opacity-100"
              >
                <div className="h-28 bg-muted flex items-center justify-center p-5">
                  <img
                    src={assetUrl(proj.img)}
                    alt={proj.name}
                    className="max-h-full max-w-full object-contain grayscale"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-display font-bold text-foreground mb-2">{proj.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PublicationsTab() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        Peer-reviewed journal articles, book chapters, and conference proceedings authored or
        co-authored by the EOS team.{" "}
        <a
          href="https://www.iti.gr/iti/en/people/ioannis-manakos/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Full list at ITI
        </a>{" "}
        and on{" "}
        <a
          href="https://zenodo.org/search?q=manakos&l=list&p=1&s=bestmatch&sort=bestmatch"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Zenodo
        </a>
        .
      </p>

      <h3 className="font-display font-bold text-foreground mb-5 text-lg border-b border-border pb-3">
        Journal Publications
      </h3>
      <ol className="space-y-4 mb-12">
        {journalPubs.map((pub, i) => (
          <li key={i} className="flex gap-4 group">
            <span className="text-xs font-bold text-primary/60 w-6 shrink-0 tabular-nums pt-0.5">
              {journalPubs.length - i}
            </span>
            <div className="flex-1">
              <p className="text-sm text-foreground/80 leading-relaxed">{pub.text}</p>
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="bg-muted/50 rounded-2xl border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          For the complete publication list including books, book chapters, conference proceedings,
          networking events, posters, videos, and press items:
        </p>
        <a
          href="https://www.iti.gr/iti/en/people/ioannis-manakos/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Full profile at ITI <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function SpecialIssuesTab() {
  return (
    <div className="space-y-6">
      {specialIssues.map((issue, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="md:flex">
            <div className="md:w-52 flex-shrink-0 bg-muted flex items-center justify-center p-6">
              <img
                src={assetUrl(issue.img)}
                alt={issue.title}
                className="max-w-full max-h-28 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {issue.journal}
                </span>
                <h3 className="text-xl font-display font-bold text-foreground mt-1 mb-3">
                  {issue.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{issue.impact}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {issue.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    {link.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkshopsTab() {
  return (
    <div className="space-y-5">
      {workshops.map((ws, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-foreground mb-1">{ws.title}</h3>
              <p className="text-sm font-medium text-primary mb-2 italic">"{ws.subtitle}"</p>
              <p className="text-sm text-muted-foreground mb-1">
                <span className="font-medium">Date:</span> {ws.date}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-medium">Location:</span> {ws.location}
              </p>
              {ws.note && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ws.note}</p>
              )}
              <div className="flex flex-wrap gap-3">
                {ws.url && (
                  <a
                    href={ws.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    Workshop website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {ws.reportUrl && (
                  <a
                    href={ws.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-xs font-medium hover:bg-border transition-colors"
                  >
                    Workshop report <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CooperationsTab() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cooperations.map((coop, i) => (
          <div
            key={i}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="h-28 bg-muted flex items-center justify-center p-5">
              <img
                src={assetUrl(coop.img)}
                alt={coop.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display font-bold text-foreground mb-2">{coop.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {coop.description}
              </p>
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
        … and many others.{" "}
        <a href="mailto:imanakos@iti.gr" className="text-primary hover:underline">
          Contact us
        </a>{" "}
        for more information on cooperations.
      </p>
    </div>
  );
}

export default function Research() {
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && TABS.find((t) => t.id === tab)) setActiveTab(tab);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Page header */}
      <div className="bg-[hsl(222_56%_14%)] pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">Research</h1>
          <p className="text-white/65 text-lg max-w-xl">
            Projects, publications, scientific events, and international collaborations of the EOS
            team.
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
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "publications" && <PublicationsTab />}
        {activeTab === "issues" && <SpecialIssuesTab />}
        {activeTab === "workshops" && <WorkshopsTab />}
        {activeTab === "cooperations" && <CooperationsTab />}
      </div>
    </div>
  );
}
