import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type NavSubItem = {
  label: string;
  href: string;
  external?: boolean;
};

type NavItem = {
  label: string;
  href?: string;
  isDropdown?: boolean;
  items?: NavSubItem[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Work",
    isDropdown: true,
    items: [
      { label: "Projects", href: "https://eos.iti.gr/projects.php", external: true },
      { label: "Cooperations", href: "https://eos.iti.gr/cooperation.php", external: true },
      { label: "Publications", href: "https://eos.iti.gr/publishing.php", external: true },
      { label: "Special Issues", href: "https://eos.iti.gr/special-issues.php", external: true },
      { label: "Workshops", href: "https://eos.iti.gr/workshops.php", external: true },
    ]
  },
  {
    label: "Services & Products",
    isDropdown: true,
    items: [
      { label: "Overview", href: "/services" },
      { label: "Vegetation Indices", href: "https://eos.iti.gr/regions-vegetation.php", external: true },
      { label: "Inundation Maps", href: "https://eos.iti.gr/regions-inundation.php", external: true },
      { label: "Land Cover Maps", href: "https://eos.iti.gr/eodesm.php", external: true },
      { label: "crocoTile", href: "https://elter-crocotile.datalabs.ceh.ac.uk/", external: true },
      { label: "Zenodo Products", href: "https://eos.iti.gr/zenodo.php", external: true },
      { label: "Hyperspectral Cubes", href: "https://eos.iti.gr/images/services/spectral-presentation.pdf", external: true },
      { label: "WebGIS Tool", href: "http://web-gis-irrigation.iti.gr/", external: true },
      { label: "LTER Products", href: "https://b2share.eudat.eu/records/?q=hydroperiod&sort=-&page=1&size=10", external: true },
      { label: "EO-4-WaterUtilities", href: "https://portal-wqems.iti.gr/", external: true },
      { label: "EO-4-ProtectedAreas", href: "https://ecosense.biosense.rs/#/home", external: true },
      { label: "UAV Services", href: "https://eos.iti.gr/uav.php", external: true },
    ]
  },
  {
    label: "Online Data Finder",
    isDropdown: true,
    items: [
      { label: "PONTOS Web GIS", href: "http://labecolftp.env.duth.gr/PONTOS/", external: true },
      { label: "EcoSense", href: "https://ecosense.biosense.rs/#/home", external: true },
      { label: "Openforis (On-Site)", href: "http://www.openforis.org/", external: true },
      { label: "Gap Light Analysis", href: "https://www.sci.muni.cz/botany/glama/", external: true },
    ]
  },
  {
    label: "e-Learning",
    isDropdown: true,
    items: [
      { label: "Earth Observation Training", href: "https://eos.iti.gr/e-learning.php", external: true },
      { label: "Waste Water Treatment", href: "https://etraining-aquacycle.eu/", external: true },
      { label: "Water Utilities Training", href: "https://training.wqems.eu/group/4?type=catalog", external: true },
    ]
  },
  { label: "News", href: "/news" },
  {
    label: "About Us",
    isDropdown: true,
    items: [
      { label: "Team", href: "https://eos.iti.gr/team.php", external: true },
      { label: "Background", href: "https://eos.iti.gr/background.php", external: true },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "https://eos.iti.gr/privacy-policy.php", external: true },
    ]
  },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-border shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="EOS Logo"
                className="w-full h-full object-cover p-1"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-bold text-xl leading-tight tracking-tight", isScrolled ? "text-foreground" : "text-foreground md:text-white")}>
                EOS
              </span>
              <span className={cn("text-[10px] font-medium tracking-widest uppercase opacity-80", isScrolled ? "text-muted-foreground" : "text-muted-foreground md:text-white/80")}>
                CERTH / ITI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.isDropdown && openDropdown(item.label)}
                onMouseLeave={() => item.isDropdown && closeDropdown()}
              >
                {item.isDropdown ? (
                  <button className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors duration-200 whitespace-nowrap",
                    isScrolled ? "text-foreground hover:bg-muted" : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}>
                    {item.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 opacity-60 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                  </button>
                ) : (
                  <Link href={item.href!} className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                    location === item.href
                      ? (isScrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white")
                      : (isScrolled ? "text-foreground hover:bg-muted" : "text-white/90 hover:bg-white/10 hover:text-white")
                  )}>
                    {item.label}
                  </Link>
                )}

                {item.isDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={closeDropdown}
                        className="absolute top-full left-0 mt-1 min-w-[220px] bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-50"
                      >
                        <div className="p-1.5 flex flex-col gap-0.5">
                          {item.items?.map((subItem) => (
                            subItem.external ? (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-primary/8 hover:text-primary transition-colors flex items-center justify-between group"
                              >
                                <span>{subItem.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0 ml-2" />
                              </a>
                            ) : (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-primary/8 hover:text-primary transition-colors block"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn("lg:hidden p-2 rounded-lg transition-colors", isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.isDropdown ? (
                    <MobileDropdown item={item} onClose={() => setIsMobileMenuOpen(false)} />
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium",
                        location === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileDropdown({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown className={cn("w-4 h-4 opacity-50 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-1 flex flex-col gap-0.5">
              {item.items?.map((subItem) =>
                subItem.external ? (
                  <a
                    key={subItem.label}
                    href={subItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 flex items-center gap-2"
                    onClick={onClose}
                  >
                    {subItem.label}
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  </a>
                ) : (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 block"
                    onClick={onClose}
                  >
                    {subItem.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
