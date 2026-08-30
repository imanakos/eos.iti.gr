import { Link } from "wouter";
import {
  ArrowRight,
  Satellite,
  Droplets,
  TreePine,
  Map,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { NewsImage } from "@/components/news/NewsImage";
import { EOInsightCard } from "@/components/eo-insights/EOInsightCard";
import { sortedEOInsights } from "@/data/eoInsightsData";
import { projects } from "@/data/projectsData";
import { newsEntries } from "@/lib/newsIndex";
import { assetUrl } from "@/lib/utils";

const pillars = [
  {
    icon: <Map className="w-7 h-7" />,
    title: "Land Monitoring & Mapping",
    desc: "Land cover classification, habitat mapping, and change detection at local-to-continental scales using Sentinel and very-high-resolution imagery.",
    color: "text-[hsl(222_56%_55%)]",
    bg: "bg-[hsl(222_56%_20%)]/10",
    href: "/tools/modules",
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Water Quality & Resources",
    desc: "EO-based surface water monitoring for drinking-water utilities, inundation mapping, and hydroperiod estimation across dynamic water bodies.",
    color: "text-[hsl(199_80%_45%)]",
    bg: "bg-[hsl(199_80%_45%)]/10",
    href: "/research/projects/wqems-water-quality-monitoring",
  },
  {
    icon: <TreePine className="w-7 h-7" />,
    title: "Biodiversity & Ecosystems",
    desc: "Biodiversity indicator extraction, ecosystem function monitoring, and habitat characterisation aligned with EU and international policy targets.",
    color: "text-[hsl(140_50%_38%)]",
    bg: "bg-[hsl(140_50%_38%)]/10",
    href: "/research/projects/ecopotential-biodiversity-monitoring",
  },
  {
    icon: <Satellite className="w-7 h-7" />,
    title: "Precision Agriculture",
    desc: "Crop monitoring, yield forecasting, and precision agriculture solutions integrating satellite imagery, telematics, and in-situ measurements.",
    color: "text-[hsl(37_80%_46%)]",
    bg: "bg-[hsl(37_80%_46%)]/10",
    href: "/research/projects/digicotton-precision-agriculture",
  },
];

const stats = [
  { value: "35+", label: "Research Projects", href: "/research" },
  { value: "150+", label: "Publications", href: "/research/publications" },
  { value: "30+", label: "Years of EO research", href: "/about" },
  { value: "4", label: "Continents of cooperation", href: "/research/cooperations" },
];

const partners = [
  {
    name: "Copernicus Ambassador",
    img: "/images/logo/copernicus_ambassador.svg",
    url: "https://www.copernicus.eu/en/opportunities/eu-space-networks",
  },
  {
    name: "NASA LCLUC",
    img: "/images/cooperation/projects/lcluc.png",
    url: "https://lcluc.umd.edu/",
  },
  {
    name: "EARSeL",
    img: "/images/cooperation/projects/earsel-logo.gif",
    url: "http://lulc.earsel.org/",
  },
  {
    name: "Copernicus Academy",
    img: "/images/cooperation/projects/cop-academy1.jpg",
    url: "https://www.copernicus.eu/en/opportunities/education",
  },
  {
    name: "GEOBON",
    img: "/images/cooperation/projects/geobon.jpg",
    url: "https://geobon.org/",
  },
  {
    name: "GEO",
    img: "/images/cooperation/projects/geo.png",
    url: "https://earthobservations.org/",
  },
  {
    name: "CIHEAM",
    img: "/images/cooperation/projects/ciheam.png",
    url: "https://www.ciheam.org/",
  },
];

const featuredProjectSlugs: Record<string, string> = {
  MONALISA: "monalisa-land-degradation",
  DigiCotton: "digicotton-precision-agriculture",
  WQeMS: "wqems-water-quality-monitoring",
};
const featuredProjects = projects.filter((project) => project.name in featuredProjectSlugs);
const featuredInsights = sortedEOInsights.slice(0, 3);

export default function Home() {
  const newsPreview = newsEntries.slice(0, 3);

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[680px] items-center justify-center overflow-hidden pb-12 pt-28 sm:min-h-[700px] sm:pb-10 sm:pt-28 lg:min-h-[660px] lg:h-[82svh]">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.webp`}
            alt="Earth Observation satellite view"
            className="w-full h-full object-cover"
            width={1408}
            height={768}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_56%_10%)]/80 via-[hsl(222_56%_12%)]/60 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/85 text-sm font-medium mb-8">
            <Satellite className="w-4 h-4 text-[hsl(37_80%_65%)]" />
            CERTH/ITI Remote Sensing Research Team
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6">
            Interfacing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(16_62%_65%)] to-[hsl(37_80%_65%)]">
              Earth Observation
            </span>
            <br />
            to the public
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
            Turning satellite observations into practical evidence for land, water, ecosystems, and
            agriculture.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
            <Link
              href="/eo-insights/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[hsl(37_80%_58%)] hover:bg-[hsl(37_80%_66%)] text-[hsl(222_56%_14%)] font-semibold text-sm transition-all shadow-lg shadow-[hsl(37_80%_46%)]/30"
            >
              <BookOpen className="w-4 h-4" /> EO Analysis Notes
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[hsl(222_56%_20%)] hover:bg-[hsl(222_56%_28%)] text-white font-semibold text-sm transition-all shadow-lg shadow-[hsl(222_56%_20%)]/40"
            >
              Explore Research <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[hsl(222_56%_15%)] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Selected indicators, as of 2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="rounded-xl p-3 text-center transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(37_80%_60%)]"
              >
                <p className="text-3xl md:text-4xl font-display font-extrabold text-[hsl(37_80%_60%)]">
                  {s.value}
                </p>
                <p className="text-sm text-white/75 mt-1">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capability pillars ── */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Core Capabilities
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three decades of interdisciplinary Earth Observation research across four thematic
              pillars.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-5 ${p.color}`}
                >
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  See related work <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured projects ── */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Recent European and international research initiatives.
              </p>
            </div>
            <Link
              href="/research"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0"
            >
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <div
                key={proj.name}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col"
              >
                <div className="h-36 bg-muted flex items-center justify-center p-6">
                  <img
                    src={assetUrl(proj.img)}
                    alt={proj.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-foreground mb-2">{proj.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {proj.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    <Link
                      href={`/research/projects/${featuredProjectSlugs[proj.name]}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      View EOS case study <ArrowRight className="w-3 h-3" />
                    </Link>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary hover:underline"
                      >
                        Official project <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── EO Analysis Notes ── */}
      <section className="py-20 bg-[hsl(222_56%_12%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(37_80%_62%)] mb-3">
                Expert briefings
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                EO Analysis Notes
              </h2>
              <p className="text-white/60 leading-relaxed">
                Short, expert-led explanations that connect satellite signals with sound
                environmental interpretation.
              </p>
            </div>
            <Link
              href="/eo-insights/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(37_80%_62%)] hover:text-white shrink-0 transition-colors"
            >
              Explore all notes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {featuredInsights.map((insight) => (
              <EOInsightCard key={insight.slug} insight={insight} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest news ── */}
      {newsPreview.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  Latest News
                </h2>
                <p className="text-muted-foreground">Updates from the EOS team.</p>
              </div>
              <Link
                href="/news"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0"
              >
                All news <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsPreview.map((article, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md hover:border-primary/20 transition-all flex flex-col"
                >
                  {article.img && (
                    <div className="h-44 overflow-hidden bg-muted flex items-center justify-center p-2">
                      <NewsImage article={article} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {article.date && (
                      <p className="text-xs text-muted-foreground mb-2">{article.date}</p>
                    )}
                    <h3 className="font-display font-bold text-foreground mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Read more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Partners strip ── */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-10">
            International networks & memberships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                aria-label={`${p.name} website`}
              >
                <img
                  src={assetUrl(p.img)}
                  alt={p.name}
                  className="max-h-full max-w-[130px] object-contain grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-20 bg-[hsl(222_56%_15%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-10 h-10 text-[hsl(37_80%_60%)] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Let's work together
          </h2>
          <p className="text-white/65 mb-8 leading-relaxed">
            Interested in research collaboration, EO service development, or training? Reach out to
            Dr. Manakos and the EOS team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(37_80%_58%)] hover:bg-[hsl(37_80%_66%)] text-[hsl(222_56%_14%)] font-semibold text-sm transition-all shadow-lg shadow-[hsl(37_80%_46%)]/30"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
