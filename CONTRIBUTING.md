# Contributing to EOS Website

Thank you for your interest in contributing to the EOS Earth Observation Services website. This guide covers everything you need to get started.

---

## Table of Contents

- [Getting started](#getting-started)
- [Branching](#branching)
- [Commit message style](#commit-message-style)
- [Code style and linting](#code-style-and-linting)
- [Pull request checklist](#pull-request-checklist)
- [Reporting bugs](#reporting-bugs)

---

## Getting started

1. **Fork** the repository on GitHub and clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/eos.iti.gr.git
   cd eos.iti.gr
   ```

2. **Install dependencies** (requires Node.js v22+ and pnpm v10+):

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm --filter @workspace/eos-website dev
   ```

   The site will be available at `http://localhost:5173`.

4. **Verify the production build works** before opening a PR:

   ```bash
   pnpm --filter @workspace/eos-website build
   ```

---

## Branching

Create a new branch off `main` for every change. Use the following naming pattern:

| Type            | Pattern                       | Example                            |
| --------------- | ----------------------------- | ---------------------------------- |
| New feature     | `feat/<short-description>`    | `feat/add-team-member`             |
| Bug fix         | `fix/<short-description>`     | `fix/mobile-nav-overflow`          |
| Content update  | `content/<short-description>` | `content/update-publications-2025` |
| Chore / tooling | `chore/<short-description>`   | `chore/upgrade-vite`               |

Keep branch names lowercase and use hyphens, not underscores or spaces.

---

## Commit message style

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <short summary>
```

**Types:** `feat`, `fix`, `content`, `style`, `refactor`, `chore`, `docs`, `test`, `ci`

**Examples:**

```
feat(team): add Dr. Smith to the team page
fix(nav): correct mobile menu z-index overlap
content(news): add article on Sentinel-2 data release
chore: upgrade Vite to v6
```

Rules:

- Use the **imperative mood** in the summary ("add", not "added" or "adds").
- Keep the first line to **72 characters or fewer**.
- Add a blank line followed by a longer description if the change needs more context.

---

## Code style and linting

This project uses **ESLint** for static analysis and **Prettier** for consistent formatting. Both tools are configured at the workspace root and run across all packages.

### Running locally

```bash
# Check for lint errors (ESLint)
pnpm lint

# Auto-fix lint errors where possible
pnpm lint:fix

# Check formatting (Prettier)
pnpm format:check

# Auto-format all files
pnpm format
```

Run `pnpm lint` and `pnpm format:check` before opening a PR. CI will reject PRs that fail either check.

### Configuration files

| File               | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `eslint.config.js` | ESLint rules (TypeScript + React Hooks)                            |
| `.prettierrc`      | Prettier options (100-char lines, 2-space indent, trailing commas) |
| `.prettierignore`  | Files excluded from Prettier formatting                            |

### Key rules

- **No unused variables** — prefix with `_` if a variable must be declared but not used (e.g. `_unused`).
- **React Hooks rules** — hooks must follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks); exhaustive-deps violations are flagged as warnings.
- **No explicit `any`** — TypeScript `any` types are warnings; prefer proper types or `unknown`.
- **No `console` in app code** — `console.*` calls are warnings in source files; they are permitted in server and script files.

### Editor integration

Most editors can apply ESLint and Prettier automatically on save. Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code extensions and add to your workspace settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### CI enforcement

Every pull request and push to `main` runs the [Lint & Format check](.github/workflows/lint.yml) workflow, which executes `pnpm lint` and `pnpm format:check`. Both must pass before a PR can be merged.

---

## Pull request checklist

Before marking your PR ready for review, confirm each item:

- [ ] Branch is up to date with `main`
- [ ] `pnpm --filter @workspace/eos-website build` completes without errors
- [ ] No TypeScript errors (`pnpm --filter @workspace/eos-website tsc --noEmit`)
- [ ] `pnpm lint` reports no errors or warnings
- [ ] `pnpm format:check` reports no formatting issues
- [ ] New UI components are responsive and tested at mobile, tablet, and desktop widths
- [ ] Image files placed under `artifacts/eos-website/public/images/` use lowercase names
- [ ] Commit messages follow the [Conventional Commits](#commit-message-style) style
- [ ] PR description explains **what** changed and **why**

The [Deploy to GitHub Pages](https://github.com/imanakos/eos.iti.gr/actions/workflows/deploy.yml) workflow runs automatically on every push to `main`. A failed deployment opens a tracking issue labelled `deployment-failure`; a successful deployment closes it automatically.

---

## Reporting bugs

If you find a bug, please [open a GitHub Issue](https://github.com/imanakos/eos.iti.gr/issues/new) and include:

1. **A clear title** describing the problem (e.g. "News section images broken on Safari 17").
2. **Steps to reproduce** — be as specific as possible.
3. **Expected behaviour** vs **actual behaviour**.
4. **Environment details**: browser name and version, OS, screen size if it is a layout issue.
5. **Screenshots or console output** if relevant.

Please search the existing issues before opening a new one to avoid duplicates.
