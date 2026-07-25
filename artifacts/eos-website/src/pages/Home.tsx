import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Satellite,
  Droplets,
  TreePine,
  Map,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { newsArticles } from "@/data/newsData";
import { projects } from "@/data/projectsData";
import { assetUrl } from "@/lib/utils";

const pillars = [
  {
    icon: <Map className="w-7 h-7" />,
    title: "Land Monitoring & Mapping",
    desc: "Land cover classification, habitat mapping, and change detection at local-to-continental scales using Sentinel and very-high-resolution imagery.",
    color: "text-[hsl(222_56%_55%)]",
    bg: "bg-[hsl(222_56%_20%)]/10",
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Water Quality & Resources",
    desc: "EO-based surface water monitoring for drinking-water utilities, inundation mapping, and hydroperiod estimation across dynamic water bodies.",
    color: "text-[hsl(199_80%_45%)]",
    bg: "bg-[hsl(199_80%_45%)]/10",
  },
  {
    icon: <TreePine className="w-7 h-7" />,
    title: "Biodiversity & Ecosystems",
    desc: "Biodiversity indicator extraction, ecosystem function monitoring, and habitat characterisation aligned with EU and international policy targets.",
    color: "text-[hsl(140_50%_38%)]",
    bg: "bg-[hsl(140_50%_38%)]/10",
  },
  {
    icon: <Satellite className="w-7 h-7" />,
    title: "Precision Agriculture",
    desc: "Crop monitoring, yield forecasting, and precision agriculture solutions integrating satellite imagery, telematics, and in-situ measurements.",
    color: "text-[hsl(37_80%_46%)]",
    bg: "bg-[hsl(37_80%_46%)]/10",
  },
];

const stats = [
  { value: "35+", label: "Research Projects" },
  { value: "150+", label: "Publications" },
  { value: "30+", label: "Years of EO research" },
  { value: "4", label: "Continents of impact" },
];

const partners = [
  { name: "NASA LCLUC", img: "/images/cooperation/projects/lcluc.png" },
  { name: "EARSeL", img: "/images/cooperation/projects/earsel-logo.gif" },
  { name: "Copernicus Academy", img: "/images/cooperation/projects/cop-academy1.jpg" },
  { name: "GEOBON", img: "/images/cooperation/projects/geobon.jpg" },
  { name: "GEO", img: "/images/cooperation/projects/geo.png" },
  { name: "CIHEAM", img: "/images/cooperation/projects/ciheam.png" },
];

const featuredProjects = projects.filter((p) => p.status === "recent").slice(0, 3);

export default function Home() {
  const newsPreview = newsArticles.slice(0, 3);

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Earth Observation satellite view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_56%_10%)]/80 via-[hsl(222_56%_12%)]/60 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/85 text-sm font-medium mb-8"
          >
            <Satellite className="w-4 h-4 text-[hsl(37_80%_65%)]" />
            CERTH/ITI Remote Sensing Research Team
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6"
          >
            Interfacing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(16_62%_65%)] to-[hsl(37_80%_65%)]">
              Earth Observation
            </span>
            <br />
            to the public.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            The EOS team develops innovative research, tools, and Earth Observation services for
            monitoring biodiversity, habitats, land cover, and water resources.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(222_56%_20%)] hover:bg-[hsl(222_56%_28%)] text-white font-semibold text-sm transition-all shadow-lg shadow-[hsl(222_56%_20%)]/40"
            >
              Explore Research <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm backdrop-blur-md transition-all"
            >
              Tools & Data
            </Link>
          </motion.div>

          <motion.a
            href="https://www.copernicus.eu/en/opportunities/eu-space-networks"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 inline-flex items-center px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white border border-white/60 shadow-lg transition-colors"
          >
            <img
              src={assetUrl("/images/logo/copernicus_ambassador.svg")}
              alt="Copernicus Ambassador"
              className="h-12 w-auto"
            />
          </motion.a>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[hsl(222_56%_15%)] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-extrabold text-[hsl(37_80%_60%)]">
                  {s.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </div>
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
              <div
                key={p.title}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-5 ${p.color}`}
                >
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-foreground mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
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
                    <div className="h-44 overflow-hidden">
                      <img
                        src={assetUrl(article.img)}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.style.display = "none";
                        }}
                      />
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
                      href="/news"
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
              <div
                key={p.name}
                className="h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={assetUrl(p.img)}
                  alt={p.name}
                  className="max-h-full max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(37_80%_46%)] hover:bg-[hsl(37_80%_52%)] text-white font-semibold text-sm transition-all shadow-lg shadow-[hsl(37_80%_46%)]/30"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
