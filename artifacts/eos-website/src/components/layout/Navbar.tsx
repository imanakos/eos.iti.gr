import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, ChevronDown, Menu, Newspaper, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem =
  | { type: "link"; label: string; href: string }
  | {
      type: "group";
      label: string;
      children: Array<{ label: string; href: string; icon: typeof BookOpen }>;
    };

const navItems: NavItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Research", href: "/research" },
  { type: "link", label: "Tools & Data", href: "/tools" },
  {
    type: "group",
    label: "News",
    children: [
      { label: "Latest News", href: "/news", icon: Newspaper },
      { label: "EO Analysis Notes", href: "/eo-insights/", icon: BookOpen },
    ],
  },
  { type: "link", label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    const target = href === "/" ? href : href.replace(/\/$/, "");
    const currentPath = location.split(/[?#]/, 1)[0];
    const current = currentPath === "/" ? currentPath : currentPath.replace(/\/$/, "");
    return target === "/"
      ? current === "/"
      : current === target || current.startsWith(`${target}/`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = isScrolled || !isHomePage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid ? "bg-[hsl(222_56%_14%)] shadow-lg py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}images/logo/logoeos_clean.svg`}
              alt="EOS Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.type === "group") {
                const childIsActive = item.children.some((child) => isActive(child.href));

                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                          childIsActive
                            ? "bg-white/15 text-white"
                            : "text-white/75 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={8}
                      className="min-w-52 border-white/10 bg-[hsl(222_56%_14%)] p-2 text-white shadow-xl"
                    >
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <DropdownMenuItem
                            key={child.href}
                            asChild
                            className="cursor-pointer rounded-lg px-3 py-2.5 text-white/75 focus:bg-white/10 focus:text-white"
                          >
                            <Link href={child.href}>
                              <Icon className="h-4 w-4 text-[hsl(37_80%_62%)]" />
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[hsl(222_56%_14%)] border-t border-white/10 overflow-hidden"
          >
            <div className="max-h-[calc(100svh-4.5rem)] overflow-y-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                if (item.type === "group") {
                  return (
                    <div key={item.label} className="py-1">
                      <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                        {item.label}
                      </p>
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                              isActive(child.href)
                                ? "bg-white/15 text-white"
                                : "text-white/75 hover:bg-white/10 hover:text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 text-[hsl(37_80%_62%)]" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
