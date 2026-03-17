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
Modern React + Vite website for the EOS CERTH/ITI Remote Sensing research team.
- Pages: Home, Services, News, Our Work, About, Contact
- Uses: wouter (routing), framer-motion (animations), lucide-react (icons)
- Images in: `public/images/`
- No backend — fully static frontend

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
