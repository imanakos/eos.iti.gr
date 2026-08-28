import { useState } from "react";
import { ExternalLink, Calendar, BookOpen, FileText, Users, Microscope, Play } from "lucide-react";
import { cn, assetUrl } from "@/lib/utils";
import { projects } from "@/data/projectsData";
import {
  journalPubs,
  bookPubs,
  conferencePubs,
  networkingPubs,
  pressItems,
  posterItems,
  videoItems,
} from "@/data/publicationsData";

const TABS = [
  { id: "projects", label: "Projects", icon: <Microscope className="w-4 h-4" /> },
  { id: "publications", label: "Publications", icon: <BookOpen className="w-4 h-4" /> },
  { id: "issues", label: "Special Issues", icon: <FileText className="w-4 h-4" /> },
  { id: "workshops", label: "Workshops", icon: <Calendar className="w-4 h-4" /> },
  { id: "cooperations", label: "Cooperations", icon: <Users className="w-4 h-4" /> },
];

const recentProjects = projects.filter((p) => p.status === "recent");
const pastProjects = projects.filter((p) => p.status === "past");

const specialIssues = [
  {
    title: "Remote Sensing in Ecosystem Modelling",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "/images/special-issues/remote-sensing.png",
    impact: "Impact Factor: 4.118; 5-Year IF: 4.740; JCR rank Q1 in 'Remote Sensing'.",
    links: [
      {
        label: "Special issue @ MDPI",
        url: "https://www.mdpi.com/journal/remotesensing/special_issues/ecosystem_modelling_RS",
      },
    ],
  },
  {
    title: "Monitoring Land Cover Change: Towards Sustainability",
    journal: "Land | ISSN 2073-445X",
    img: "/images/special-issues/earsel-banner2.15.png",
    impact:
      "CiteScore 2018 (Scopus): 2.15 - rank 37/140 (Q2) in Nature and Landscape Conservation.",
    links: [
      {
        label: "Special issue @ MDPI",
        url: "https://www.mdpi.com/journal/land/special_issues/EARSeL",
      },
    ],
  },
  {
    title: "Sentinel Analysis Ready Data (Sentinel ARD)",
    journal: "Remote Sensing | ISSN 2072-4292",
    img: "/images/special-issues/remote_sensing_si_banner_h.jpg",
    impact: "A special issue of Remote Sensing dedicated to Sentinel ARD methodologies.",
    links: [
      {
        label: "Special issue @ MDPI",
        url: "https://www.mdpi.com/journal/remotesensing/special_issues/ARD",
      },
    ],
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
    subtitle:
      "Land-Use/Cover Change Drivers, Impacts and Sustainability within the Water-Energy-Food Nexus",
    date: "11–12 July, 2018",
    location: "Chania, Greece",
    url: "http://lulc.earsel.org/workshop/2018-lulc-ws/",
    reportUrl:
      "http://lulc.earsel.org/wp-content/uploads/2018/09/Report_EARSeL-NASA_LCLUC_WS_Chania2018_f.pdf",
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
    reportUrl:
      "http://old.earsel.org/SIG/LULC/data/EARSeL_NASA_1stjointLULC_Workshop_Report_Berlin.pdf",
  },
];

const cooperations = [
  {
    name: "NASA LCLUC",
    img: "/images/cooperation/projects/lcluc.png",
    description:
      "Land-Cover/Land-Use Change program. Joint workshops co-organized since 2014 on land use, land cover change, and sustainability within the Water-Energy-Food Nexus.",
    url: "https://lcluc.umd.edu/",
  },
  {
    name: "EARSeL",
    img: "/images/cooperation/projects/earsel-logo.gif",
    description:
      "European Association of Remote Sensing Laboratories. Dr. Manakos served as Chairman of the SIG 'Remote Sensing in Land Use & Land Cover' (2011–2021) and Chairman of EARSeL (2012–2014).",
    url: "http://lulc.earsel.org/",
  },
  {
    name: "Copernicus Academy",
    img: "/images/cooperation/projects/cop-academy1.jpg",
    description:
      "Member of the Copernicus Academy Network, contributing to education and training in Earth Observation under the EU Copernicus programme.",
    url: "https://www.copernicus.eu/en/opportunities/education",
  },
  {
    name: "MEDRIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description:
      "Mediterranean Regional Information Network - a regional network supporting land cover monitoring and Earth Observation capacity building in the Mediterranean area.",
    url: "https://gofcgold.org/regional-networks/mediterranean-regional-network-medrin",
  },
  {
    name: "SCERIN",
    img: "/images/cooperation/projects/sherin-medrin.png",
    description:
      "South Central and Eastern European Regional Information Network (GOFC-GOLD / GTOS). Dr. Manakos serves as Lead for 'Global/Continental land cover products validation and intercomparison in the SCERIN area'.",
    url: "https://gofcgold.org/regional-networks/south-central-european-regional-information-network-scerin",
  },
  {
    name: "CIHEAM Chania",
    img: "/images/cooperation/projects/ciheam.png",
    description:
      "International Centre for Advanced Mediterranean Agronomic Studies. Dr. Manakos is an Adjunct Professor in Remote Sensing and led the Geoinformation in Environmental Management Department for 7 years.",
    url: "https://www.ciheam.org/",
  },
  {
    name: "GEO Ecosystems",
    img: "/images/cooperation/projects/project.jpg",
    description:
      "Group on Earth Observations Ecosystems Community of Practice. Contributing to Earth observation-based biodiversity and ecosystem monitoring frameworks.",
    url: "https://www.earthobservations.org/",
  },
  {
    name: "GEOBON ECOFUN",
    img: "/images/cooperation/projects/geobon.jpg",
    description:
      "Global Biodiversity Observation Network - Ecosystem Functioning working group. Dr. Manakos serves as a member of the GEOBON Flagship within the Group on Earth Observations.",
    url: "https://geobon.org/ebvs/working-groups/ecosystem-function/",
  },
  {
    name: "EnCeladus Hellenic Supersite",
    img: "/images/cooperation/projects/geo.png",
    description:
      "Historical GEO Hellenic Supersite for Earth Observation and environmental monitoring. The supersite concluded in 2024 and is retained here as a legacy cooperation.",
    url: "https://geo-gsnl.org/supersites/permanent-supersites/enceladus-hellenic-supersite/",
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
            <span className="w-2 h-6 rounded-full bg-muted-foreground/40 inline-block" /> Past
            Projects
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
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      Visit project record <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const PUB_SUB_TABS = [
  { id: "journal", label: "Journal" },
  { id: "books", label: "Books" },
  { id: "conference", label: "Conference" },
  { id: "networking", label: "Networking" },
  { id: "posters", label: "Posters" },
  { id: "videos", label: "Videos" },
  { id: "press", label: "Press" },
];

function PubList({
  pubs,
  label,
}: {
  pubs: { text: string; link: string | null }[];
  label: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-5">
        {pubs.length} {label} entries
      </p>
      <ol className="space-y-4">
        {pubs.map((pub, i) => (
          <li key={i} className="flex gap-4 group">
            <span className="text-xs font-bold text-primary/60 w-7 shrink-0 tabular-nums pt-0.5 text-right">
              {pubs.length - i}
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
    </div>
  );
}

function PosterGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posterItems.map((item, i) => (
        <a
          key={i}
          href={assetUrl(item.img)}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          aria-label={`Open full-size poster: ${item.caption}`}
        >
          <div className="bg-muted h-52 flex items-center justify-center p-3">
            <img
              src={assetUrl(item.thumb)}
              alt={item.caption}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-4 flex items-start justify-between gap-2">
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.caption}</p>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          </div>
        </a>
      ))}
    </div>
  );
}

function VideoGrid() {
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(() => new Set());

  const loadVideo = (index: number) => {
    setLoadedVideos((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {videoItems.map((item, i) => {
        const youtubeId =
          item.type === "youtube" ? item.url.match(/\/embed\/([^?]+)/)?.[1] : undefined;
        const vimeoId =
          item.type === "vimeo" ? item.url.match(/\/video\/([0-9]+)/)?.[1] : undefined;
        const watchUrl =
          item.type === "local"
            ? assetUrl(item.url)
            : item.type === "youtube" && youtubeId
              ? `https://www.youtube.com/watch?v=${youtubeId}`
              : item.type === "vimeo" && vimeoId
                ? `https://vimeo.com/${vimeoId}`
                : item.url;
        const serviceName =
          item.type === "youtube" ? "YouTube" : item.type === "vimeo" ? "Vimeo" : "video";
        const embedUrl =
          item.type === "youtube"
            ? item.url.replace("www.youtube.com", "www.youtube-nocookie.com")
            : item.type === "vimeo"
              ? `${item.url}${item.url.includes("?") ? "&" : "?"}dnt=1`
              : item.url;
        const externalVideoLoaded = loadedVideos.has(i);

        return (
          <div
            key={i}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm flex flex-col"
          >
            {item.type === "local" ? (
              <div className="relative bg-muted aspect-video flex items-center justify-center">
                {item.thumb ? (
                  <img
                    src={assetUrl(item.thumb)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Play className="w-10 h-10 text-muted-foreground" />
                )}
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                  aria-label={`Open video: ${item.title}`}
                >
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                  </div>
                </a>
              </div>
            ) : externalVideoLoaded ? (
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title={item.title}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center bg-[hsl(222_56%_14%)] px-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-5 w-5 fill-white text-white" />
                </div>
                <p className="text-sm font-semibold text-white">External {serviceName} video</p>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-white/60">
                  The player connects to {serviceName} only after you choose to load it.
                </p>
                <button
                  type="button"
                  onClick={() => loadVideo(i)}
                  className="mt-4 rounded-lg border border-white/35 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(222_56%_14%)]"
                >
                  Load {serviceName} video
                </button>
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
              {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline w-fit"
              >
                {item.type === "local" ? "Open video" : `Watch on ${serviceName}`}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PressGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {pressItems.map((item, i) => {
        const articleUrl = item.url.startsWith("/") ? assetUrl(item.url) : item.url;
        const inner = (
          <>
            <div className="bg-muted h-48 flex items-center justify-center p-3">
              <img
                src={assetUrl(item.thumb)}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  const image = e.currentTarget;
                  if (image.dataset.originalFallback !== "true") {
                    image.dataset.originalFallback = "true";
                    image.src = assetUrl(item.img);
                  }
                }}
              />
            </div>
            <div className="p-4 flex items-start justify-between gap-2">
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.caption}</p>
              {item.url && (
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              )}
            </div>
          </>
        );
        return item.url ? (
          <a
            key={i}
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all block"
          >
            {inner}
          </a>
        ) : (
          <div
            key={i}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function PublicationsTab() {
  const [activePubTab, setActivePubTab] = useState("journal");

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
        Peer-reviewed articles, books, conference proceedings, networking events, posters, videos,
        and press items authored or co-authored by the EOS team.{" "}
        <a
          href="https://www.iti.gr/iti/en/people/ioannis-manakos/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Full profile at ITI
        </a>{" "}
        ·{" "}
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

      <div className="flex flex-wrap gap-1.5 mb-8 border-b border-border pb-4">
        {PUB_SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePubTab(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
              activePubTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-border"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activePubTab === "journal" && <PubList pubs={journalPubs} label="journal publication" />}
      {activePubTab === "books" && <PubList pubs={bookPubs} label="book / book chapter" />}
      {activePubTab === "conference" && (
        <PubList pubs={conferencePubs} label="conference publication" />
      )}
      {activePubTab === "networking" && (
        <PubList pubs={networkingPubs} label="networking / communication" />
      )}
      {activePubTab === "posters" && <PosterGrid />}
      {activePubTab === "videos" && <VideoGrid />}
      {activePubTab === "press" && <PressGrid />}
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
  const [activeTab, setActiveTab] = useState(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab && TABS.find((t) => t.id === tab) ? tab : "projects";
  });

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
