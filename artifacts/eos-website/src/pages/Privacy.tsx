import { useEffect, useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_CHOICE_EVENT,
  type AnalyticsChoice,
  clearAnalyticsChoice,
  readAnalyticsChoice,
  storeAnalyticsChoice,
} from "@/lib/privacy";

const choiceLabels: Record<AnalyticsChoice, string> = {
  accepted: "Aggregate analytics allowed",
  declined: "Analytics disabled",
};

export default function Privacy() {
  const [choice, setChoice] = useState<AnalyticsChoice | null>(() => readAnalyticsChoice());

  useEffect(() => {
    const updateChoice = (event: Event) => {
      setChoice((event as CustomEvent<AnalyticsChoice | null>).detail);
    };

    window.addEventListener(ANALYTICS_CHOICE_EVENT, updateChoice);
    return () => window.removeEventListener(ANALYTICS_CHOICE_EVENT, updateChoice);
  }, []);

  const updateChoice = (nextChoice: AnalyticsChoice) => {
    storeAnalyticsChoice(nextChoice);
    setChoice(nextChoice);
  };

  const resetChoice = () => {
    clearAnalyticsChoice();
    setChoice(null);
  };

  return (
    <div className="min-h-screen pb-24 pt-24">
      <header className="bg-[hsl(222_56%_14%)] py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(37_80%_56%)]">
            Privacy and analytics
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Your privacy choices</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
            This notice explains the limited information used to understand aggregate readership and
            how you can control it.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Analytics preference</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Current setting:{" "}
                <strong className="text-foreground">
                  {choice ? choiceLabels[choice] : "No choice yet - analytics remain off"}
                </strong>
                . Your selection is remembered in this browser for up to 180 days and can be changed
                here at any time.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button type="button" variant="outline" onClick={() => updateChoice("declined")}>
                  Continue without analytics
                </Button>
                <Button type="button" variant="outline" onClick={() => updateChoice("accepted")}>
                  Allow aggregate analytics
                </Button>
                {choice && (
                  <Button type="button" variant="ghost" onClick={resetChoice}>
                    Ask me again
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">At a glance</h2>
          <p className="leading-relaxed text-muted-foreground">
            This informational website does not use advertising cookies or create advertising
            profiles. Optional aggregate analytics are provided by GoatCounter and are disabled
            until you actively allow them. Refusing analytics does not change access to any page or
            feature.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The site operator is Dr Ioannis Manakos and the EOS CERTH/ITI Remote Sensing Research
            Team. Privacy questions can be sent to{" "}
            <a className="font-medium text-primary hover:underline" href="mailto:imanakos@iti.gr">
              imanakos@iti.gr
            </a>
            .
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Optional aggregate analytics</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you allow analytics, this site sends a small page-visit request directly to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              imanakos.goatcounter.com
            </code>
            . The purpose is to understand overall readership, popular pages and referring sites so
            that the content can be improved.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Information may include the page path and title, the referring website's origin, browser
            and operating-system category, language, screen width and an approximate country derived
            from the network address. Query strings are not sent by this integration. GoatCounter
            states that it stores aggregate results rather than IP addresses, full user-agent
            strings or persistent visitor identifiers. It temporarily uses the site name, network
            address and user-agent information in memory for up to eight hours to avoid counting
            repeated visits.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            GoatCounter sets no analytics cookies and stores no analytics identifier in your
            browser. Its hosted service is operated from Ireland and states that data are stored on
            servers in Finland and Germany. Aggregate statistics remain in the site's GoatCounter
            account until the site operator removes them. GoatCounter's optional individual pageview
            recording should remain disabled, as it is by default.
          </p>
          <a
            href="https://www.goatcounter.com/help/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            Read GoatCounter's privacy documentation
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">How your choice is remembered</h2>
          <p className="leading-relaxed text-muted-foreground">
            This site stores one first-party preference named{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              eos-analytics-consent-v1
            </code>{" "}
            in your browser's local storage. It contains only your choice and the date of that
            choice. It is needed to honour your preference and expires from use after 180 days. It
            is not used to identify you or follow you across websites.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The legal basis for optional analytics is your consent. You may withdraw it at any time
            by selecting <strong className="text-foreground">Privacy settings</strong> in the footer
            and choosing to continue without analytics. Withdrawal stops future analytics requests
            from this browser. Past aggregate entries cannot be linked back to an individual
            visitor.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Hosting and external media</h2>
          <p className="leading-relaxed text-muted-foreground">
            The website is hosted by GitHub Pages. Like other web hosts, GitHub may process normal
            technical request information needed to deliver and secure the site. This is governed by
            the{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              GitHub General Privacy Statement
            </a>
            .
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Fonts are served directly by this website. YouTube and Vimeo players are not loaded
            automatically; a connection to those providers is made only if you choose to load a
            specific external video or follow an external link. Their own privacy terms then apply.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The contact form prepares an email in your own email application. The website itself
            does not submit or store the form contents.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Questions and rights</h2>
          <p className="leading-relaxed text-muted-foreground">
            You may contact the site operator about access, correction, deletion, restriction,
            objection or withdrawal of consent where those rights apply. Because GoatCounter's
            intended statistics are anonymous and aggregated, it may not be possible to identify a
            particular visitor's entry.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            You may also contact the{" "}
            <a
              href="https://www.dpa.gr/en"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Hellenic Data Protection Authority
            </a>
            .
          </p>
          <p className="text-sm text-muted-foreground">Last updated: 28 August 2026.</p>
        </section>
      </div>
    </div>
  );
}
