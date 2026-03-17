# Workspace

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
- `/news` — All 54+ news articles with search + pagination (real images from eos.iti.gr)
- `/our-work` — Our Work hub linking to all sub-pages
- `/our-work/projects` — All research projects with real logos
- `/our-work/cooperations` — All cooperations (NASA LCLUC, EARSeL, Copernicus Academy, etc.)
- `/our-work/publications` — Publications list with real DOI links
- `/our-work/special-issues` — Journals: Remote Sensing, Land (MDPI)
- `/our-work/workshops` — EARSeL/NASA LCLUC workshops 2014–2021 with reports
- `/services` — Services overview
- `/services/uav` — UAV services page (DJI Mini 3 Pro, Anafi AI Parrot, etc.)
- `/services/zenodo` — Zenodo open data products
- `/e-learning` — All 16 SEOS EU FP6 modules + 3 other platforms
- `/about` — Background page
- `/about/team` — Team with real photos (Dr. Ioannis Manakos, PhD candidates)
- `/contact` — Contact with real director info + functional mailto form

**Data files:**
- `src/data/newsData.ts` — 54 news articles with images and original URLs
- `src/data/projectsData.ts` — All projects (recent + past) with descriptions

**Tech:** wouter (routing), framer-motion (animations), lucide-react (icons), TailwindCSS v4
**Images:** Loaded directly from eos.iti.gr (no downloads needed, all public)
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
