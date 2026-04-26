# viswesh.github.io

Personal site for Viswesh Subramanian — Senior Engineering Manager, AI-native context engineering @ Atlan.

## Stack

Astro 6 · React 19 islands · Tailwind 4 · Motion · TypeScript · Vitest · Playwright. Deploys to GitHub Pages via Actions.

## Develop

```bash
npm install
npm run dev
```

## Test

```bash
npm test          # vitest content schemas
npm run e2e       # playwright smoke
```

## Build

```bash
npm run build
```

## Architecture

See `docs/superpowers/specs/2026-04-26-portfolio-rebuild-design.md` and `docs/superpowers/plans/2026-04-26-portfolio-rebuild.md`.

## Content

All content lives under `src/content/*.json`. Update a JSON file, push to `main`, GitHub Actions deploys.

## License

MIT for code. Customer logos in `public/logos/` are used under nominative fair use to identify public AEP/Atlan customers.
