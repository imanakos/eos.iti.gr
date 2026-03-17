import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Layers, Map, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredServices = [
  {
    title: "EO-4-WaterUtilities",
    desc: "WQeMS platform providing Earth Observation services for water quality monitoring and early warning for water utilities.",
    icon: <Globe className="w-6 h-6 text-primary" />,
    href: "https://portal-wqems.iti.gr/",
    external: true,
  },
  {
    title: "UAV Services",
    desc: "High-resolution UAV surveys for precision agriculture, environmental monitoring, and field research campaigns.",
    icon: <Layers className="w-6 h-6 text-secondary" />,
    href: "/services/uav",
    external: false,
  },
  {
    title: "Open Data (Zenodo)",
    desc: "Published datasets, training materials, and research outputs freely available through Zenodo.",
    icon: <Map className="w-6 h-6 text-accent" />,
    href: "/services/zenodo",
    external: false,
  }
];

const newsPreview = [
  {
    title: "EOS contributes to land degradation monitoring",
    image: `${import.meta.env.BASE_URL}images/news-1.png`,
    date: "Latest"
  },
  {
    title: "DigiCotton - Producer Information Day",
    image: `${import.meta.env.BASE_URL}images/news-2.png`,
    date: "Recent"
  },
  {
    title: "Satellite Image Analysis Expanded for Hallertau Hop Farms",
    image: `${import.meta.env.BASE_URL}images/news-3.png`,
    date: "Recent"
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Earth Observation Satellite View" 
            className="w-full h-full object-cover"
          />
          {/* Dark Wash Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background dark:to-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6"
          >
            <Satellite className="w-4 h-4" />
            CERTH/ITI Remote Sensing Research Team
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto"
          >
            Interfacing <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Earth Observation</span> to the public.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The EOS team develops innovative research, tools, and Earth Observation services for monitoring biodiversity, habitats, land cover changes, and water resources.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/services">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/our-work">
              <Button size="lg" variant="glass" className="w-full sm:w-auto text-base">
                Discover Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision & Goals Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Vision</h2>
                <div className="w-20 h-1.5 bg-secondary rounded-full mb-6"></div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Earth Observation for peaceful purposes aims at the improvement of human life. Rational usage of natural resources, food security and climate change impacts' mitigation constitute core drivers for the development of sensors by Space Agencies worldwide.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Eos team innovates in this research with the development of Earth Observation based products and services for monitoring and assessment of biodiversity, habitats, cultivations, resources, and land cover/use changes to support decisions, modeling and scenarios towards sustainability.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                Overall Goals
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></div>
                  <span className="text-foreground">Serve societal needs and United Nations Sustainable Development Goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></div>
                  <span className="text-foreground">Act in cooperation and challenge knowledge as 'a pebble in the lake'</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4">Specific Activities</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0"></div>
                  <span className="text-muted-foreground">Establish sustainable supply chains for Earth observation value added products</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0"></div>
                  <span className="text-muted-foreground">Operational land cover change monitoring at various scales</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0"></div>
                  <span className="text-muted-foreground">Incorporation of Earth Observation into Earth System Science modelling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Featured Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our operational modules and tools transforming satellite data into actionable insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, i) => {
              const inner = (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{service.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </>
              );
              const cls = "group bg-card rounded-3xl p-8 shadow-lg shadow-black/5 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col items-start";
              return service.external ? (
                <a key={i} href={service.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={i} href={service.href} className={cls}>{inner}</Link>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">View All Products & Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Latest News</h2>
              <p className="text-lg text-muted-foreground">Updates from our research and deployments.</p>
            </div>
            <Link href="/news" className="hidden md:flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
              All News <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsPreview.map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-border">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {news.date}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <Button variant="outline" className="w-full">View All News</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
