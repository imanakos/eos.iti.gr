# EOS — Earth Observation Services

[![Deploy to GitHub Pages](https://github.com/imanakos/eos.iti.gr/actions/workflows/deploy.yml/badge.svg)](https://github.com/imanakos/eos.iti.gr/actions/workflows/deploy.yml)

Website for the CERTH/ITI Remote Sensing research team (EOS), available at
[imanakos.github.io/eos.iti.gr](https://imanakos.github.io/eos.iti.gr/).

---

## About

EOS (Earth Observation Services) is the Remote Sensing research group of the Information Technologies Institute (ITI) at the Centre for Research and Technology Hellas (CERTH), led by Dr. Ioannis Manakos. The group specialises in satellite image analysis, land cover mapping, vegetation indices, inundation mapping, UAV services, and open Earth observation data products.

This repository contains the source code for the
[EOS website](https://imanakos.github.io/eos.iti.gr/) — a fully static React application that
presents the group's research, publications, projects, news, services, and team.

## Tech Stack

- **Frontend**: React 19 + Vite + TailwindCSS v4
- **Routing**: wouter
- **Animations**: framer-motion
- **Monorepo**: pnpm workspaces
- **Language**: TypeScript 5
- **Deployment**: GitHub Pages (via GitHub Actions)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v22 or later
- [pnpm](https://pnpm.io/) v10 or later

### Getting started

```bash
# Install all workspace dependencies
pnpm install

# Start the EOS website in development mode
pnpm --filter @workspace/eos-website dev
```

The site will be available at `http://localhost:5173` (or the next available port).

### Building for production

```bash
pnpm --filter @workspace/eos-website build
```

The production output is written to `artifacts/eos-website/dist/public/`.

## Deployment

The site is deployed automatically to **GitHub Pages** on every push to `main` or `master` via the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow.

The workflow:

1. Installs dependencies with `pnpm install --frozen-lockfile`
2. Builds the site with `pnpm --filter @workspace/eos-website run build`
3. Uploads the `artifacts/eos-website/dist/public/` directory as a Pages artifact
4. Deploys it to GitHub Pages

When a deployment fails, the workflow opens a GitHub Issue labelled `deployment-failure` and (optionally) sends a Slack notification. The issue is automatically closed when the next deployment succeeds.

You can view all workflow runs on the [Actions page](https://github.com/imanakos/eos.iti.gr/actions).

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on how to fork and branch the repo, commit message conventions, the PR checklist, and how to report bugs.
