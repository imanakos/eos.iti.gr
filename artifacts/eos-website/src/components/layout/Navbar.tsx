import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "News", href: "/news" },
  { 
    label: "External Links", 
    isDropdown: true,
    items: [
      { label: "PONTOS Web GIS", href: "http://labecolftp.env.duth.gr/PONTOS/", external: true },
      { label: "EcoSense", href: "https://ecosense.biosense.rs/#/home", external: true },
      { label: "Openforis", href: "http://www.openforis.org/", external: true },
      { label: "Earth Obs Training", href: "https://eos.iti.gr/e-learning.php", external: true },
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-border shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="EOS Logo" 
                className="w-full h-full object-cover p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-display font-bold text-xl leading-tight tracking-tight", isScrolled ? "text-foreground" : "text-foreground md:text-white")}>
                EOS
              </span>
              <span className={cn("text-[10px] font-medium tracking-widest uppercase opacity-80", isScrolled ? "text-muted-foreground" : "text-muted-foreground md:text-white/80")}>
                CERTH / ITI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.isDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.isDropdown && setActiveDropdown(null)}
              >
                {item.isDropdown ? (
                  <button className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors duration-200",
                    isScrolled ? "text-foreground hover:bg-muted" : "text-foreground md:text-white/90 md:hover:bg-white/10 md:hover:text-white"
                  )}>
                    {item.label}
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </button>
                ) : (
                  <Link href={item.href!} className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    location === item.href 
                      ? (isScrolled ? "bg-primary/10 text-primary" : "md:bg-white/20 text-primary md:text-white") 
                      : (isScrolled ? "text-foreground hover:bg-muted" : "text-foreground md:text-white/90 md:hover:bg-white/10 md:hover:text-white")
                  )}>
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.isDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50"
                      >
                        <div className="p-2 flex flex-col gap-1">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              target={subItem.external ? "_blank" : undefined}
                              rel={subItem.external ? "noopener noreferrer" : undefined}
                              className="px-4 py-3 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between group"
                            >
                              {subItem.label}
                              {subItem.external && <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </a>
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
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.isDropdown ? (
                    <div className="flex flex-col gap-1">
                      <div className="px-4 py-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={subItem.external ? "noopener noreferrer" : undefined}
                          className="px-4 py-3 rounded-lg text-sm text-foreground hover:bg-primary/10 flex items-center gap-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                          {subItem.external && <ExternalLink className="w-3.5 h-3.5 opacity-50" />}
                        </a>
                      ))}
                    </div>
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
