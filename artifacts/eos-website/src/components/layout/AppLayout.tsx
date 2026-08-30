import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RouteMetadata } from "./RouteMetadata";
import { PrivacyAnalytics } from "@/components/privacy/PrivacyAnalytics";

function ScrollToTop() {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <RouteMetadata />
      <ScrollToTop />
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[110] -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[hsl(222_56%_14%)] shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
      <PrivacyAnalytics />
    </div>
  );
}
