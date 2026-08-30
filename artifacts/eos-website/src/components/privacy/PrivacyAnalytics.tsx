import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_CHOICE_EVENT,
  type AnalyticsChoice,
  PRIVACY_SETTINGS_EVENT,
  readAnalyticsChoice,
  storeAnalyticsChoice,
} from "@/lib/privacy";

const GOATCOUNTER_ENDPOINT = "https://imanakos.goatcounter.com/count";

function normalisePath(location: string) {
  const pathname = location.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return pathname.replace(/\/$/, "");
}

function referrerOrigin() {
  if (!document.referrer) return "";

  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? "" : referrer.origin;
  } catch {
    return "";
  }
}

export function PrivacyAnalytics() {
  const [location] = useLocation();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(() => readAnalyticsChoice());
  const [settingsOpen, setSettingsOpen] = useState(() => choice === null);
  const lastTrackedPath = useRef<string | null>(null);
  const initialReferrer = useRef(referrerOrigin());
  const activePixels = useRef(new Set<HTMLImageElement>());

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    const updateChoice = (event: Event) => {
      const nextChoice = (event as CustomEvent<AnalyticsChoice | null>).detail;
      setChoice(nextChoice);
      setSettingsOpen(nextChoice === null);
      lastTrackedPath.current = null;
    };

    window.addEventListener(PRIVACY_SETTINGS_EVENT, openSettings);
    window.addEventListener(ANALYTICS_CHOICE_EVENT, updateChoice);

    return () => {
      window.removeEventListener(PRIVACY_SETTINGS_EVENT, openSettings);
      window.removeEventListener(ANALYTICS_CHOICE_EVENT, updateChoice);
    };
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;

    const path = normalisePath(location);
    if (lastTrackedPath.current === path) return;

    const timer = window.setTimeout(() => {
      if (choice !== "accepted") return;

      const pixel = new Image(1, 1);
      const requestUrl = new URL(GOATCOUNTER_ENDPOINT);
      const releasePixel = () => activePixels.current.delete(pixel);

      requestUrl.searchParams.set("p", path);
      requestUrl.searchParams.set("t", document.title);
      const screenWidthBand = Math.max(100, Math.round(window.screen.width / 100) * 100);
      requestUrl.searchParams.set("s", String(screenWidthBand));
      requestUrl.searchParams.set("rnd", Math.random().toString(36).slice(2, 7));

      if (initialReferrer.current) {
        requestUrl.searchParams.set("r", initialReferrer.current);
      }

      pixel.referrerPolicy = "no-referrer";
      pixel.loading = "eager";
      pixel.addEventListener("load", releasePixel, { once: true });
      pixel.addEventListener("error", releasePixel, { once: true });
      activePixels.current.add(pixel);
      pixel.src = requestUrl.toString();
      lastTrackedPath.current = path;
      initialReferrer.current = "";
    }, 0);

    return () => window.clearTimeout(timer);
  }, [choice, location]);

  const choose = (nextChoice: AnalyticsChoice) => {
    storeAnalyticsChoice(nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    lastTrackedPath.current = null;
  };

  if (!settingsOpen) return null;

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-h-[calc(100svh-1.5rem)] max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[hsl(222_56%_12%)] p-4 text-white shadow-2xl sm:inset-x-4 sm:bottom-4 sm:max-h-[calc(100svh-2rem)] sm:p-6"
      role="region"
      aria-labelledby="privacy-choice-title"
      aria-describedby="privacy-choice-description"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-3xl items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(37_80%_56%)]" />
          <div>
            <h2 id="privacy-choice-title" className="text-base font-semibold text-white">
              Optional analytics
            </h2>
            <p
              id="privacy-choice-description"
              className="mt-1 text-sm leading-relaxed text-white/70"
            >
              With your permission, privacy-friendly GoatCounter records page visits and limited
              technical details in aggregate. It uses no analytics cookies, persistent visitor
              identifiers, advertising, or cross-site profiling.{" "}
              <Link
                href="/privacy"
                className="font-semibold text-white underline underline-offset-4"
              >
                Privacy details
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-white/35 bg-white/5 text-white hover:border-white/55 hover:bg-white/10 hover:text-white"
            onClick={() => choose("declined")}
          >
            Continue without analytics
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-white/35 bg-white/5 text-white hover:border-white/55 hover:bg-white/10 hover:text-white"
            onClick={() => choose("accepted")}
          >
            Allow aggregate analytics
          </Button>
        </div>
      </div>
    </aside>
  );
}
