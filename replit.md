# Workspace

[![Deploy to GitHub Pages](https://github.com/imanakos/eos.iti.gr/actions/workflows/deploy.yml/badge.svg)](https://github.com/imanakos/eos.iti.gr/actions/workflows/deploy.yml)

## Overview

pnpm workspace monorepo using TypeScript. Contains the EOS (CERTH/ITI Remote Sensing) website and shared backend infrastructure.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19 + Vite + TailwindCSS v4

## Artifacts

### `artifacts/eos-website` — EOS Website (preview: `/`)
Complete replacement website for eos.iti.gr — CERTH/ITI Remote Sensing research team.
Fully self-contained with all content fetched and migrated from the original site.

**Pages (all internal routes):**
- `/` — Home
- `/news` — All 157 news articles with search + pagination (all images locally hosted); clicking any card opens a full-article modal with body text, image, date, and original link
- `/our-work` — Our Work hub linking to all sub-pages
- `/our-work/projects` — All research projects with real logos
- `/our-work/cooperations` — All cooperations (NASA LCLUC, EARSeL, Copernicus Academy, etc.)
- `/our-work/publications` — Publications list with real DOI links
- `/our-work/special-issues` — Journals: Remote Sensing, Land (MDPI)
- `/our-work/workshops` — EARSeL/NASA LCLUC workshops 2014–2021 with reports
- `/services` — Services overview (all products, + "Indicative Applications" algorithm module descriptions)
- `/services/vegetation-indices` — Vegetation Indices region selector (9 regions with dates, matching original)
- `/services/inundation-maps` — Inundation Maps region selector (9 regions with dates, matching original)
- `/services/land-cover-maps` — EODESM tool description with official links
- `/services/uav` — UAV services page (DJI Mini 3 Pro, Anafi AI Parrot, etc.)
- `/services/zenodo` — Zenodo open data products
- `/e-learning` — All 16 SEOS EU FP6 modules + 4 other platforms (EOTiST, Ecosystem Services Training, AQUACYCLE, WQeMS)
- `/about` — Background page (Dr. Manakos' real biography from background.php, with 1993–2018 research domain timeline)
- `/about/team` — Team with real photos (Dr. Ioannis Manakos, PhD candidates)
- `/contact` — Contact with real director info + functional mailto form

**Data files:**
- `src/data/newsData.ts` — 157 news articles (complete) with images, dates, and original URLs
- `src/data/projectsData.ts` — All projects (recent + past) with descriptions

**Publications page** — 7 tabs: Journal (37), Books (6), Conference (21), Networking (95), Poster Corner (9), Video Corner (19), Press Corner (5)

**Images & Videos:** All media self-hosted in `public/` — zero external requests to eos.iti.gr
- `public/images/logo/logoeos8.png` — real EOS logo (matched to original site)
- `public/images/news/` — all 157 news article images (all downloaded)
- `public/images/cooperation/projects/` — all cooperation org logos
- `public/images/projects/` — all project logos
- `public/images/publishing/` — poster/press corner images
- `public/images/structure/` — team photos (Plot_Final.png = personnel stats chart)
- `public/videos/` — digiryzi (24MB, complete) and digicotton (196MB/205MB) ERT interviews
- `public/files/hopfen.pdf` — press corner PDF download

**News body data:** `src/data/newsBodyData.ts` — all 151 unique articles have body text; cleaned of HTML artifacts. No references to eos.iti.gr anywhere in source code.

**Tech:** wouter (routing), framer-motion (animations), lucide-react (icons), TailwindCSS v4
**No backend** — fully static frontend
**Domain plan:** Once deployed, point eos.iti.gr DNS to this Replit app

### `artifacts/api-server` — API Server (preview: `/api`)
Express 5 API server. Routes live in `src/routes/`.

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── eos-website/        # React + Vite EOS website (serves at /)
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
