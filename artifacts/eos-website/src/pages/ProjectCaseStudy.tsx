import {
  ArrowLeft,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCheck2,
  Link2,
  Target,
  Users,
} from "lucide-react";
import { Link, type RouteComponentProps } from "wouter";
import { getProjectCaseStudy, type ProjectOutcome } from "@/data/projectCaseStudiesData";
import { SITE_URL, usePageMetadata } from "@/lib/seo";
import { assetUrl } from "@/lib/utils";
import NotFound from "./not-found";

function OutcomeStatus({ status }: { status: ProjectOutcome["status"] }) {
  const classes =
    status === "Ongoing project target"
      ? "border-amber-300/70 bg-amber-50 text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-200"
      : status === "Documented activity"
        ? "border-sky-300/70 bg-sky-50 text-sky-900 dark:border-sky-700/60 dark:bg-sky-950/30 dark:text-sky-200"
        : "border-emerald-300/70 bg-emerald-50 text-emerald-900 dark:border-emerald-700/60 dark:bg-emerald-950/30 dark:text-emerald-200";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${classes}`}
    >
      {status}
    </span>
  );
}

export default function ProjectCaseStudy({ params }: RouteComponentProps<{ slug: string }>) {
  const caseStudy = getProjectCaseStudy(params.slug);
  const canonicalPath = caseStudy ? `/research/projects/${caseStudy.slug}/` : "/research/";
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const metadata = caseStudy
    ? {
        title: caseStudy.metadata.title,
        description: caseStudy.metadata.description,
        path: canonicalPath,
        type: "article" as const,
        publishedAt: caseStudy.metadata.modifiedAt,
        modifiedAt: caseStudy.metadata.modifiedAt,
        keywords: caseStudy.metadata.keywords,
        image: {
          path: caseStudy.image.src,
          alt: caseStudy.image.alt,
        },
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "ResearchProject",
            "@id": `${canonicalUrl}#project`,
            name: caseStudy.fullName,
            alternateName: caseStudy.projectName,
            description: caseStudy.summary,
            url: caseStudy.officialProjectUrl,
            image: `${SITE_URL}${caseStudy.image.src}`,
            keywords: caseStudy.themes.join(", "),
            participant: {
              "@type": "Organization",
              name: "EOS, CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
            },
            subjectOf: caseStudy.evidenceLinks.map((evidence) => ({
              "@type": "CreativeWork",
              name: evidence.label,
              url: evidence.url,
              publisher: {
                "@type": "Organization",
                name: evidence.publisher,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${caseStudy.projectName}: an EOS project case study`,
            description: caseStudy.metadata.description,
            datePublished: caseStudy.metadata.modifiedAt,
            dateModified: caseStudy.metadata.modifiedAt,
            mainEntityOfPage: canonicalUrl,
            url: canonicalUrl,
            image: `${SITE_URL}${caseStudy.image.src}`,
            author: {
              "@type": "Organization",
              name: "EOS, CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "EOS, CERTH/ITI Remote Sensing Research Team",
              url: SITE_URL,
            },
            about: {
              "@id": `${canonicalUrl}#project`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Research",
                item: `${SITE_URL}/research/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Projects",
                item: `${SITE_URL}/research/`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: caseStudy.projectName,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  usePageMetadata(metadata);

  if (!caseStudy) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <article>
        <header className="border-b border-border bg-muted/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <Link
              href="/research/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to research
            </Link>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[hsl(30_75%_34%)]">
                  EOS project case study
                </p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                  {caseStudy.projectName}
                </h1>
                <p className="mt-3 text-xl font-semibold leading-snug text-foreground/85">
                  {caseStudy.fullName}
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {caseStudy.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {caseStudy.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex min-h-40 items-center justify-center rounded-2xl bg-muted p-5">
                  <img
                    src={assetUrl(caseStudy.image.src)}
                    alt={caseStudy.image.alt}
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Programme</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">
                      {caseStudy.programme}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Status</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">
                      {caseStudy.periodLabel}
                    </dd>
                  </div>
                </dl>
                <a
                  href={caseStudy.officialProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Official project source
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
          <section aria-labelledby="challenge-heading">
            <div className="grid gap-5 md:grid-cols-[3rem_minmax(0,1fr)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-[hsl(30_75%_34%)]">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="challenge-heading" className="text-2xl font-bold text-foreground">
                  The challenge
                </h2>
                <p className="mt-4 max-w-3xl text-[1.04rem] leading-8 text-foreground/80">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="contribution-heading">
            <div className="grid gap-5 md:grid-cols-[3rem_minmax(0,1fr)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="contribution-heading" className="text-2xl font-bold text-foreground">
                  The EOS contribution
                </h2>
                <div className="mt-4 max-w-3xl space-y-4 text-[1.04rem] leading-8 text-foreground/80">
                  {caseStudy.eosContribution.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="methods-heading"
            className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 id="methods-heading" className="text-2xl font-bold text-foreground">
                Methods and data
              </h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {caseStudy.methodsAndData.map((method) => (
                <li
                  key={method}
                  className="flex gap-3 rounded-2xl bg-muted/50 px-4 py-3.5 text-sm leading-relaxed text-foreground/80"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {method}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="outcomes-heading">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 id="outcomes-heading" className="text-2xl font-bold text-foreground">
                Outputs and outcomes
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Completed outputs and activities are labelled separately from targets that remain in
              progress.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {caseStudy.outputsAndOutcomes.map((outcome) => (
                <article
                  key={outcome.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <OutcomeStatus status={outcome.status} />
                  <h3 className="mt-4 text-lg font-bold text-foreground">{outcome.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{outcome.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="beneficiaries-heading"
            className="rounded-3xl bg-primary px-6 py-8 text-primary-foreground sm:px-8"
          >
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" aria-hidden="true" />
              <h2 id="beneficiaries-heading" className="text-2xl font-bold">
                Who this work serves
              </h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {caseStudy.beneficiaries.map((beneficiary) => (
                <li
                  key={beneficiary}
                  className="flex gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm leading-relaxed"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {beneficiary}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="evidence-heading">
            <h2 id="evidence-heading" className="text-2xl font-bold text-foreground">
              Evidence and project material
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              These sources support the project summary and provide technical or institutional
              detail. Claims are limited to what is documented in the linked material and the
              existing EOS archive.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {caseStudy.evidenceLinks.map((evidence) => (
                <li key={evidence.url}>
                  <a
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/35 hover:bg-muted/35"
                  >
                    <span>
                      <span className="block font-semibold leading-snug text-foreground group-hover:text-primary">
                        {evidence.label}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                        {evidence.kind} · {evidence.publisher}
                      </span>
                    </span>
                    <ExternalLink
                      className="mt-1 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="related-heading" className="border-t border-border pt-10">
            <div className="flex items-center gap-3">
              <Link2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 id="related-heading" className="text-2xl font-bold text-foreground">
                Continue through EOS work
              </h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {caseStudy.relatedInternalTargets.map((target) => (
                <Link
                  key={`${target.path}-${target.label}`}
                  href={target.path}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/35 hover:shadow-sm"
                >
                  <span className="font-semibold leading-snug text-foreground group-hover:text-primary">
                    {target.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {target.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
