# Portfolio Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `viswesh.github.io` from a 2013-era Bootstrap 3 / jQuery 1.11 site into a 2026 Astro + React-island portfolio that positions Viswesh Subramanian for Director of Engineering roles in AI-native and AI-infrastructure companies.

**Architecture:** Astro 5 statically renders the entire site; small React islands hydrate only where motion/interactivity is required (hero entrance, theme toggle, scroll progress). Content lives in JSON files for easy editing. Tailwind 4 (CSS-first) drives styling. Motion library powers all animation. Deployed to GitHub Pages via a pinned-SHA GitHub Actions workflow.

**Tech Stack:** Astro 5, React 19, Tailwind CSS 4, Motion (formerly Framer Motion), TypeScript, Vitest (content-shape tests), Playwright (smoke + visual tests), `@fontsource` for self-hosted typefaces, `lucide-astro` for icons. Deploys to GitHub Pages via `actions/deploy-pages`.

**Spec:** `docs/superpowers/specs/2026-04-26-portfolio-rebuild-design.md` (read before starting).

---

## File Structure (target end state)

```
viswesh.github.io/
├── astro.config.mjs                 # Astro config (React + Tailwind 4 integrations, base path)
├── package.json                     # Dependencies + scripts
├── tsconfig.json                    # TS config (strict)
├── vitest.config.ts                 # Vitest config (jsdom for islands)
├── playwright.config.ts             # Playwright config
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Pages deploy, pinned SHAs
├── public/
│   ├── favicon.svg                  # New favicon (initial monogram VS)
│   ├── img/
│   │   └── profile.jpg              # Migrated from old img/4.jpg
│   ├── logos/                       # Customer logo SVGs (Coca-Cola, GM, etc.)
│   └── projects/                    # Preserved old portfolio projects
│       ├── bex/                     # Existing
│       └── weatherme/               # Existing
├── src/
│   ├── components/
│   │   ├── Section.astro            # Section wrapper (id, heading, padding)
│   │   ├── Nav.astro                # Sticky in-page nav
│   │   ├── Hero.astro               # Hero scaffolding
│   │   ├── Now.astro                # "Now" section
│   │   ├── About.astro              # About paragraphs
│   │   ├── ExperienceTimeline.astro # Vertical timeline wrapper
│   │   ├── ExperienceCard.astro     # Single experience card (Scope/Outcome/Depth)
│   │   ├── LogoStrip.astro          # Customer logos row
│   │   ├── WritingGrid.astro        # Writing section wrapper (featured + grid)
│   │   ├── WritingCard.astro        # Single LinkedIn essay card
│   │   ├── ProjectCard.astro        # Single project card
│   │   ├── Speaking.astro           # Speaking + workshop CTA
│   │   ├── Contact.astro            # Contact links
│   │   ├── Footer.astro             # Footer
│   │   └── islands/
│   │       ├── HeroAnimation.tsx    # Motion stagger for headline
│   │       ├── ThemeToggle.tsx      # Light/dark toggle
│   │       └── ScrollProgress.tsx   # Top scroll-progress bar
│   ├── content/
│   │   ├── now.json                 # "Now" bullets
│   │   ├── experience.json          # Roles array
│   │   ├── writing.json             # LinkedIn essays
│   │   ├── projects.json            # Projects array
│   │   ├── speaking.json            # Workshop + past talks
│   │   └── customers.json           # Customer logo metadata per role
│   ├── data/
│   │   └── site.ts                  # Site-wide constants (name, links, meta)
│   ├── layouts/
│   │   └── BaseLayout.astro         # HTML head, font preloads, theme bootstrap
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   └── projects/
│   │       └── agent-harness.astro  # Detail page for hero project
│   ├── lib/
│   │   ├── content.ts               # Content loaders + Zod schemas
│   │   └── motion.ts                # Shared motion variants
│   └── styles/
│       └── global.css               # Tailwind 4 entry + design tokens
├── tests/
│   ├── content.test.ts              # Vitest — JSON shape validation
│   └── e2e/
│       └── smoke.spec.ts            # Playwright — section visibility + a11y
└── docs/
    └── superpowers/
        ├── specs/2026-04-26-portfolio-rebuild-design.md
        └── plans/2026-04-26-portfolio-rebuild.md   # this file
```

**Migration:** existing `index.html`, `css/`, `js/`, `img/`, `projects/` are preserved on a `legacy` branch (Task 1) before being deleted from `main`. The two old projects (`projects/bex/`, `projects/weatherme/`) are copied into `public/projects/` so existing inbound links keep working.

---

## Task 1: Preserve old site on a legacy branch

**Files:**
- Affects: entire repo

- [ ] **Step 1: Confirm clean tree on `main`**

Run:
```bash
cd /Users/viswesh.subramanian/Viswesh/Learnings/visweshGitHub/viswesh.github.io
git status
```
Expected: `working tree clean` (the spec/plan docs are the only uncommitted files; commit them in Step 2).

- [ ] **Step 2: Commit current spec + plan onto main**

Run:
```bash
git add docs/superpowers/specs/2026-04-26-portfolio-rebuild-design.md docs/superpowers/plans/2026-04-26-portfolio-rebuild.md
git commit -m "docs: add portfolio rebuild spec and plan"
```

- [ ] **Step 3: Create `legacy` branch from current state**

Run:
```bash
git branch legacy
git push origin legacy
```
Expected: branch `legacy` created and pushed. This is the rollback point.

- [ ] **Step 4: Confirm `legacy` is preserved**

Run:
```bash
git log legacy --oneline -5
```
Expected: top commit is the just-created docs commit. Older 2013-era commits visible below.

- [ ] **Step 5: Stay on `main`; this is where the rebuild happens**

Run:
```bash
git checkout main
```
Expected: `Already on 'main'`.

---

## Task 2: Initialize Astro project (in-place, preserving old files temporarily)

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (placeholder), `src/env.d.ts`
- Modify: `.gitignore` (Astro defaults)

- [ ] **Step 1: Save old top-level files to a temp prefix**

Run:
```bash
mv index.html legacy_index.html
mv README.md legacy_README.md
```
Expected: old files renamed but still on disk; Astro init won't conflict.

- [ ] **Step 2: Run Astro init in current directory**

Run:
```bash
npm create astro@latest -- --template minimal --typescript strict --no-install --no-git --skip-houston .
```
Expected: prompts answered noninteractively; new `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `.gitignore` created.

- [ ] **Step 3: Install Astro dependencies**

Run:
```bash
npm install
```
Expected: `node_modules/` populated, no errors.

- [ ] **Step 4: Verify dev server starts**

Run:
```bash
npm run dev -- --port 4321 &
sleep 4
curl -s http://localhost:4321/ | head -5
kill %1
```
Expected: HTML output containing `<!doctype html>`. Process killed cleanly.

- [ ] **Step 5: Commit**

Run:
```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/ public/ .gitignore legacy_index.html legacy_README.md
git rm -r --cached css/ js/ img/ projects/ 2>/dev/null || true
git commit -m "chore: initialize Astro project, archive old root files"
```

---

## Task 3: Add React, Tailwind 4, Motion, lucide integrations

**Files:**
- Modify: `package.json`, `astro.config.mjs`, `src/styles/global.css` (new), `src/pages/index.astro`

- [ ] **Step 1: Install integrations**

Run:
```bash
npm install @astrojs/react @astrojs/tailwind react react-dom motion lucide-astro
npm install -D @types/react @types/react-dom tailwindcss@latest @tailwindcss/vite
```

- [ ] **Step 2: Update `astro.config.mjs`**

Replace contents:
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://viswesh.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `src/styles/global.css`**

Contents:
```css
@import "tailwindcss";

@theme {
  --color-bg: #FAF9F6;
  --color-fg: #0F0F0F;
  --color-muted: #6B6B6B;
  --color-accent: #E8A33D;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0F0F0F;
    --color-fg: #FAF9F6;
    --color-muted: #9A9A9A;
  }
}

html {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-body);
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Wire `global.css` into the home page**

Replace `src/pages/index.astro`:
```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head><meta charset="utf-8" /><title>Viswesh Subramanian</title></head>
  <body><h1 class="text-4xl">Hello</h1></body>
</html>
```

- [ ] **Step 5: Run dev server, confirm Tailwind working**

Run:
```bash
npm run dev -- --port 4321 &
sleep 4
curl -s http://localhost:4321/ | grep -o 'text-4xl'
kill %1
```
Expected: `text-4xl` present in output.

- [ ] **Step 6: Commit**

Run:
```bash
git add package.json package-lock.json astro.config.mjs src/styles/global.css src/pages/index.astro
git commit -m "chore: add React, Tailwind 4, Motion, lucide integrations"
```

---

## Task 4: Self-host fonts via @fontsource

**Files:**
- Modify: `package.json`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Install fonts**

Run:
```bash
npm install @fontsource-variable/fraunces @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

Contents:
```astro
---
import '../styles/global.css';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="robots" content="index,follow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body class="antialiased">
    <a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
    <main id="main"><slot /></main>
  </body>
</html>
```

- [ ] **Step 3: Use BaseLayout from index**

Replace `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Viswesh Subramanian — Senior Engineering Manager" description="I lead engineering teams building production AI agents — and I still ship the harness underneath them.">
  <h1 class="text-6xl" style="font-family: var(--font-display)">Viswesh Subramanian</h1>
</BaseLayout>
```

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds, `dist/index.html` produced.

- [ ] **Step 5: Commit**

Run:
```bash
git add package.json package-lock.json src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add BaseLayout with self-hosted fonts and a11y skip-link"
```

---

## Task 5: Add favicon, profile image, and customer logos

**Files:**
- Create: `public/favicon.svg`, `public/img/profile.jpg`, `public/logos/*.svg`
- Delete (after copy): `legacy_index.html`, `legacy_README.md`, top-level `css/`, `js/`, `img/`, `projects/` (preserved on `legacy` branch already)

- [ ] **Step 1: Copy old profile photo**

Run:
```bash
mkdir -p public/img
cp img/4.jpg public/img/profile.jpg
```

- [ ] **Step 2: Preserve old project pages (BeX, WeatherMe)**

Run:
```bash
mkdir -p public/projects
cp -R projects/bex public/projects/bex
cp -R projects/weatherme public/projects/weatherme
```
Expected: `public/projects/bex/index.html` and `public/projects/weatherme/index.html` exist.

- [ ] **Step 3: Write `public/favicon.svg`**

Contents:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0F0F0F"/>
  <text x="50%" y="56%" text-anchor="middle" font-family="serif" font-size="34" font-weight="700" fill="#FAF9F6">VS</text>
</svg>
```

- [ ] **Step 4: Add customer logo SVGs**

For each logo in the AEP and Atlan rosters, source the SVG (Wikipedia / Brand Guidelines pages) and save under `public/logos/`. Files to create:

- `public/logos/atlan.svg`
- `public/logos/nasdaq.svg`
- `public/logos/gm.svg`
- `public/logos/fox.svg`
- `public/logos/unilever.svg`
- `public/logos/hubspot.svg`
- `public/logos/coca-cola.svg`
- `public/logos/home-depot.svg`
- `public/logos/tsb.svg`
- `public/logos/mlb.svg`
- `public/logos/panera.svg`
- `public/logos/henkel.svg`
- `public/logos/telefonica.svg`
- `public/logos/t-rowe-price.svg`
- `public/logos/servicenow.svg`
- `public/logos/ey.svg`

Each SVG should be a clean, monochrome version (set `fill="currentColor"`) so it inherits the page text color in light/dark mode. If a clean SVG is unavailable for a logo, fall back to a plain `<text>` tag SVG with the brand name in the site's display serif. Goal: visual recognition without licensing risk.

- [ ] **Step 5: Delete the legacy top-level files (already on `legacy` branch)**

Run:
```bash
git rm -r --ignore-unmatch index.html README.md legacy_index.html legacy_README.md css js img projects 2>/dev/null
rm -rf css js img projects index.html README.md legacy_index.html legacy_README.md
```
Expected: old root files gone from `main`. They remain on `legacy` branch.

- [ ] **Step 6: Commit**

Run:
```bash
git add public/ -A
git commit -m "feat: add favicon, profile photo, customer logos; remove legacy files from main"
```

---

## Task 6: Site-wide constants and content schemas

**Files:**
- Create: `src/data/site.ts`, `src/lib/content.ts`

- [ ] **Step 1: Install Zod**

Run:
```bash
npm install zod
```

- [ ] **Step 2: Create `src/data/site.ts`**

Contents:
```ts
export const site = {
  name: 'Viswesh Subramanian',
  role: 'Senior Engineering Manager at Atlan',
  tagline: 'I lead engineering teams building production AI agents — and I still ship the harness underneath them.',
  location: 'Bangalore · open to remote',
  email: 'ns.viswesh@gmail.com',
  links: {
    github: 'https://github.com/viswesh',
    linkedin: 'https://www.linkedin.com/in/viswesh-subramanian-848a6736',
    twitter: 'https://twitter.com/viswesh',
    workshop: 'https://luma.com/e8xut60e',
  },
  url: 'https://viswesh.github.io',
} as const;
```

- [ ] **Step 3: Create `src/lib/content.ts` with Zod schemas**

Contents:
```ts
import { z } from 'zod';
import nowJson from '../content/now.json';
import experienceJson from '../content/experience.json';
import writingJson from '../content/writing.json';
import projectsJson from '../content/projects.json';
import speakingJson from '../content/speaking.json';
import customersJson from '../content/customers.json';

export const NowSchema = z.object({
  date: z.string(),
  bullets: z.array(z.string()).min(1),
});

export const ExperienceCardSchema = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  scope: z.string(),
  outcome: z.string(),
  depth: z.string(),
  customers: z.array(z.string()).optional(),
});

export const ExperienceSchema = z.array(ExperienceCardSchema);

export const WritingCardSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  date: z.string(),
  hook: z.string(),
  impressions: z.number().int().nonnegative(),
  tag: z.enum(['strategy', 'builder', 'leader']),
  featured: z.boolean(),
});
export const WritingSchema = z.array(WritingCardSchema);

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  blurb: z.string(),
  cta: z.object({ label: z.string(), url: z.string().url() }),
  detailPage: z.string().optional(),
});
export const ProjectsSchema = z.array(ProjectSchema);

export const SpeakingSchema = z.object({
  workshop: z.object({
    title: z.string(),
    url: z.string().url(),
    nextSession: z.string().nullable(),
  }),
  past: z.array(z.object({
    title: z.string(),
    venue: z.string(),
    year: z.number().int(),
    url: z.string().url().optional(),
  })),
});

export const CustomerSchema = z.object({
  name: z.string(),
  logoSlug: z.string(),
});
export const CustomersSchema = z.record(z.string(), z.array(CustomerSchema));

export const now = NowSchema.parse(nowJson);
export const experience = ExperienceSchema.parse(experienceJson);
export const writing = WritingSchema.parse(writingJson);
export const projects = ProjectsSchema.parse(projectsJson);
export const speaking = SpeakingSchema.parse(speakingJson);
export const customers = CustomersSchema.parse(customersJson);
```

- [ ] **Step 4: Configure `tsconfig.json` to allow JSON imports**

Add `"resolveJsonModule": true, "esModuleInterop": true` to `compilerOptions` if missing.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/data/site.ts src/lib/content.ts tsconfig.json package.json package-lock.json
git commit -m "feat: add site constants and zod content schemas"
```

---

## Task 7: Content JSON files

**Files:**
- Create: `src/content/now.json`, `src/content/experience.json`, `src/content/writing.json`, `src/content/projects.json`, `src/content/speaking.json`, `src/content/customers.json`

- [ ] **Step 1: Create `src/content/now.json`**

Contents:
```json
{
  "date": "2026-04",
  "bullets": [
    "Leading 24+ engineers building Atlan's context layer for AI — unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph. Over a dozen production agents shipping today, working across a ~200-person engineering org.",
    "Building the agent harness driving customer-ticket resolution to ~5 hours with AI in the loop.",
    "Running a free public workshop on production agent harnesses.",
    "Authoring a 9-component reference architecture for AI agent infrastructure."
  ]
}
```

- [ ] **Step 2: Create `src/content/experience.json`**

Contents (paste verbatim):
```json
[
  {
    "company": "Atlan",
    "role": "Senior Engineering Manager",
    "start": "2025-03",
    "end": "present",
    "location": "Remote",
    "scope": "Lead 24+ engineers building Atlan's context layer for enterprise AI — unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph. Cross-functional with a ~200-person engineering org.",
    "outcome": "Atlan moved Visionary → Leader on the 2026 Gartner MQ for D&A Governance during this tenure. Harness work driving customer-ticket resolution to ~5 hours with AI in the loop.",
    "depth": "Architecting the 9-component agent harness — context engineering, memory, cost controls, observability, evals. Shipping MCP integrations (Drive & Discover demo).",
    "customers": ["nasdaq", "gm", "fox", "unilever", "hubspot"]
  },
  {
    "company": "Adobe",
    "role": "Software Engineering Manager",
    "start": "2021-11",
    "end": "2025-04",
    "location": "Remote, India",
    "scope": "Led 12 engineers owning Privacy, Unified Profile, Unified Permissions Framework, Use Case Playbooks, and Sandbox management for Adobe Experience Platform — the CDP behind Real-Time CDP and Journey Optimizer. Built the Bangalore and Noida teams complementing Adobe's US-side org.",
    "outcome": "Shipped Privacy stack (Data Hygiene, Privacy Console, audits) automating GDPR/CCPA across Experience Cloud. Unified Permissions Framework went GA as Attribute-Based Access Control across Real-Time CDP and Journey Optimizer. Use Case Playbooks shipped a Playbook Authoring Framework (Apr 2025). Sandbox tooling shipped iterative cross-sandbox config migration (Jun 2025) and B2B architecture support (Jul 2025). Platform underneath: 10–14 second customer-data refresh cycle; streaming segmentation up to 15K events/sec.",
    "depth": "React/TypeScript SPAs at cloud-native scale. Architected pattern convergence and infrastructure upgrades. Defined developer-velocity tooling and the experimentation environment.",
    "customers": ["coca-cola", "home-depot", "gm", "tsb", "mlb", "panera", "henkel", "telefonica", "t-rowe-price", "servicenow", "ey"]
  },
  {
    "company": "Adobe",
    "role": "Senior UI Engineer",
    "start": "2019-06",
    "end": "2021-11",
    "location": "SF Bay Area",
    "scope": "IC + tech lead for Experience Platform's first-time user experience for marketers; product manager for the Entity Lifecycle Management initiative.",
    "outcome": "Built the ML workspace data scientists use to train and score propensity, conversion, and churn models inside AEP. Entity Lifecycle Management cut COGS and improved data-engineer productivity. Customer outcomes attributable to the platform during this period: Home Depot (+62% personalized campaigns, +50% YoY marketing productivity); TSB Bank (39% more product conversions, 300% lift in mobile journey completion).",
    "depth": "React frontend for ingestion, modeling, governance workflows; cross-platform analytics instrumentation."
  },
  {
    "company": "Juniper Networks",
    "role": "Staff Software Engineer",
    "start": "2016-03",
    "end": "2019-06",
    "location": "SF Bay Area",
    "scope": "Internal PM + engineer for network editor, unified dashboard, and visualization across 8+ cross-functional teams.",
    "outcome": "40% lift in development velocity (UX patterns + API standards). 30% reduction in licensing charges (consolidated map provider across network apps). 40% reduction in network authoring time (reusable geo component). Security Director mobile app helped close 2 large enterprise accounts.",
    "depth": "Authored an Augmented Reality MVP for network admins demonstrating 25% faster configuration. Built Matomo-based analytics provider and a preferences provider used across products."
  },
  {
    "company": "BMC Software",
    "role": "Staff Specialist Product Developer",
    "start": "2013-02",
    "end": "2016-03",
    "location": "San Jose / Bangalore",
    "scope": "Tech lead for ITSM mobile + cloud lifecycle management.",
    "outcome": "Native Android app for ITSM lifted NPS by 50%. List-based asset visualization lifted retention by 30%, cut churn by 20%. Spoke at WWRUG13 San Jose on ITSM data visualization.",
    "depth": "AngularJS, Android (AppCompat / Material Design), d3.js, Google Closure. Pioneered Grunt-based build automation across the BMC frontend."
  },
  {
    "company": "BMC Software",
    "role": "Staff Product Developer",
    "start": "2009-12",
    "end": "2013-01",
    "location": "San Jose",
    "scope": "End-user, tenant, and admin portals for cloud services.",
    "outcome": "Cloud infrastructure service designer cut operations cost by 80% through templatized provisioning. Auto-scale policy designer automated IT ops, reducing manual error and improving availability.",
    "depth": "Visualization layer for asset health, compute, and storage metrics; jQuery UI portlet customization on Twitter Bootstrap; d3.js heatmaps."
  }
]
```

- [ ] **Step 3: Create `src/content/writing.json`**

Contents (top 10 for v1; add more later):
```json
[
  {"title": "An AI agent call that should cost $0.01 was costing $0.15", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-03", "hook": "Default Claude Agent SDK loaded 160 tool definitions. Token bill for a 12-turn task was 12× a bloated prompt. Two config classes of fix took it to under $0.01.", "impressions": 5048, "tag": "builder", "featured": true},
  {"title": "What I have learned about promotions", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2025-06", "hook": "After two decades coaching promo packets: make work matter, step outside your role, own everything, act the part.", "impressions": 4876, "tag": "leader", "featured": true},
  {"title": "Let's talk busy work", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2025-06", "hook": "Engineers don't need more velocity. They need clarity. Don't be a feature factory.", "impressions": 3445, "tag": "leader", "featured": true},
  {"title": "We don't debate AI tools. We work on the system around them.", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-03", "hook": "Linear's two PMs, Resend's 22 people. The gap between elite teams and everyone else isn't tooling — it's organizational structure.", "impressions": 3467, "tag": "strategy", "featured": true},
  {"title": "From if-else to SOUL.md", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-03", "hook": "Two years ago you needed DAGs to build a support bot. Today you need a folder of markdown files. How we got here.", "impressions": 2239, "tag": "strategy", "featured": true},
  {"title": "Agent harness 101 — 9 components", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-03", "hook": "Sandbox, context engineering, orchestration, cost controls, tool access, memory, guardrails, observability, evals. Tools and trade-offs for each.", "impressions": 965, "tag": "builder", "featured": true},
  {"title": "MCP Apps — Drive & Discover Mapbox demo", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-02", "hook": "An interactive Mapbox map running inside a Claude conversation. Cars drive, listings light up by fit. Built on the new MCP Apps spec.", "impressions": 3641, "tag": "builder", "featured": false},
  {"title": "Same agent, two months apart, completely different results", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-02", "hook": "Same model, same task. What changed: what the agent knows before it starts. Context engineering for AI SDLC.", "impressions": 1997, "tag": "strategy", "featured": false},
  {"title": "Two AI agents argued and solved a customer bug", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-02", "hook": "Triage agent vs platform agent. 10 minutes vs the usual two-day three-person fire drill. Build specialists. Let them disagree.", "impressions": 1390, "tag": "builder", "featured": false},
  {"title": "Met in Delhi to push Atlan's context layer for AI", "url": "https://www.linkedin.com/in/viswesh-subramanian-848a6736/recent-activity/all/", "date": "2026-03", "hook": "AI agents live or die by the context they get. Models are commoditized. Doing context engineering well at enterprise scale is what Atlan is building.", "impressions": 3934, "tag": "strategy", "featured": false}
]
```

(Note: LinkedIn does not give per-post stable URLs from a profile dump. The `url` field above is a placeholder pointing to the profile activity page. **Replace** each with the real per-post URL once available — see Open Question in spec §16.)

- [ ] **Step 4: Create `src/content/projects.json`**

Contents:
```json
[
  {
    "slug": "agent-harness",
    "title": "Agent Harness Reference Architecture",
    "blurb": "A 9-component reference architecture for production AI agent infrastructure: sandbox, context engineering, orchestration, cost controls, tool access, memory, guardrails, observability, evals. Open and growing.",
    "cta": {"label": "Read the breakdown", "url": "/projects/agent-harness/"},
    "detailPage": "/projects/agent-harness/"
  }
]
```

- [ ] **Step 5: Create `src/content/speaking.json`**

Contents:
```json
{
  "workshop": {
    "title": "From Agent Demo to Agent System: A Production Architecture Workshop",
    "url": "https://luma.com/e8xut60e",
    "nextSession": null
  },
  "past": [
    {"title": "Find fulfillment by confronting your fears and constructing success", "venue": "The Stage", "year": 2021},
    {"title": "Unleashing the power of ITSM data through visualization", "venue": "WWRUG13 San Jose", "year": 2013}
  ]
}
```

- [ ] **Step 6: Create `src/content/customers.json`**

Contents:
```json
{
  "atlan": [
    {"name": "Nasdaq", "logoSlug": "nasdaq"},
    {"name": "General Motors", "logoSlug": "gm"},
    {"name": "FOX", "logoSlug": "fox"},
    {"name": "Unilever", "logoSlug": "unilever"},
    {"name": "HubSpot", "logoSlug": "hubspot"}
  ],
  "adobe-experience-platform": [
    {"name": "The Coca-Cola Company", "logoSlug": "coca-cola"},
    {"name": "The Home Depot", "logoSlug": "home-depot"},
    {"name": "General Motors", "logoSlug": "gm"},
    {"name": "TSB Bank", "logoSlug": "tsb"},
    {"name": "Major League Baseball", "logoSlug": "mlb"},
    {"name": "Panera Bread", "logoSlug": "panera"},
    {"name": "Henkel", "logoSlug": "henkel"},
    {"name": "Telefónica", "logoSlug": "telefonica"},
    {"name": "T. Rowe Price", "logoSlug": "t-rowe-price"},
    {"name": "ServiceNow", "logoSlug": "servicenow"},
    {"name": "EY", "logoSlug": "ey"}
  ]
}
```

- [ ] **Step 7: Commit**

Run:
```bash
git add src/content/
git commit -m "feat: add content JSON for now/experience/writing/projects/speaking/customers"
```

---

## Task 8: Vitest content shape tests

**Files:**
- Create: `vitest.config.ts`, `tests/content.test.ts`
- Modify: `package.json` (test script)

- [ ] **Step 1: Install Vitest**

Run:
```bash
npm install -D vitest
```

- [ ] **Step 2: Create `vitest.config.ts`**

Contents:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    alias: { '~': '/src' },
  },
});
```

- [ ] **Step 3: Add `test` script to `package.json`**

Edit the `scripts` block to include:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write `tests/content.test.ts` (failing first)**

Contents:
```ts
import { describe, it, expect } from 'vitest';
import { now, experience, writing, projects, speaking, customers } from '../src/lib/content';

describe('content', () => {
  it('now has at least 3 bullets', () => {
    expect(now.bullets.length).toBeGreaterThanOrEqual(3);
  });

  it('experience starts with Atlan as current role', () => {
    expect(experience[0].company).toBe('Atlan');
    expect(experience[0].end).toBe('present');
  });

  it('experience is ordered most-recent first', () => {
    const starts = experience.map(e => e.start);
    for (let i = 0; i < starts.length - 1; i++) {
      expect(starts[i] >= starts[i + 1]).toBe(true);
    }
  });

  it('writing has at least 6 featured cards', () => {
    expect(writing.filter(w => w.featured).length).toBeGreaterThanOrEqual(6);
  });

  it('writing featured row is balanced across tags', () => {
    const featured = writing.filter(w => w.featured);
    const tags = new Set(featured.map(w => w.tag));
    expect(tags.has('strategy')).toBe(true);
    expect(tags.has('builder')).toBe(true);
    expect(tags.has('leader')).toBe(true);
  });

  it('projects has at least one entry with a CTA url', () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects[0].cta.url).toMatch(/^https?:|^\//);
  });

  it('speaking workshop url points to luma', () => {
    expect(speaking.workshop.url).toContain('luma.com');
  });

  it('customers covers atlan and adobe-experience-platform keys', () => {
    expect(customers['atlan']).toBeDefined();
    expect(customers['adobe-experience-platform']).toBeDefined();
    expect(customers['atlan'].length).toBeGreaterThanOrEqual(5);
    expect(customers['adobe-experience-platform'].length).toBeGreaterThanOrEqual(8);
  });
});
```

- [ ] **Step 5: Run tests**

Run:
```bash
npm test
```
Expected: all 8 tests pass (content already conforms to schemas from Task 7).

- [ ] **Step 6: Commit**

Run:
```bash
git add vitest.config.ts tests/content.test.ts package.json package-lock.json
git commit -m "test: add vitest content shape tests"
```

---

## Task 9: Section wrapper component

**Files:**
- Create: `src/components/Section.astro`

- [ ] **Step 1: Write `src/components/Section.astro`**

Contents:
```astro
---
interface Props {
  id: string;
  title?: string;
  eyebrow?: string;
  class?: string;
}
const { id, title, eyebrow, class: className = '' } = Astro.props;
---
<section id={id} class={`px-6 sm:px-10 py-24 sm:py-32 max-w-5xl mx-auto ${className}`}>
  {eyebrow && <p class="text-sm uppercase tracking-widest text-[var(--color-muted)] font-mono mb-4">{eyebrow}</p>}
  {title && <h2 class="text-4xl sm:text-5xl mb-12" style="font-family: var(--font-display); font-weight: 600;">{title}</h2>}
  <slot />
</section>
```

- [ ] **Step 2: Verify build still passes**

Run:
```bash
npm run build
```
Expected: success.

- [ ] **Step 3: Commit**

Run:
```bash
git add src/components/Section.astro
git commit -m "feat: add Section wrapper component"
```

---

## Task 10: Hero section + HeroAnimation island

**Files:**
- Create: `src/components/Hero.astro`, `src/components/islands/HeroAnimation.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/islands/HeroAnimation.tsx`**

Contents:
```tsx
import { motion } from 'motion/react';

export default function HeroAnimation({ name, role, tagline }: { name: string; role: string; tagline: string }) {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        className="text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
      >
        {name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="mt-6 text-lg sm:text-xl font-mono text-[var(--color-muted)]"
      >
        {role}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        className="mt-10 max-w-3xl text-2xl sm:text-3xl leading-snug"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {tagline}
      </motion.p>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/Hero.astro`**

Contents:
```astro
---
import HeroAnimation from './islands/HeroAnimation.tsx';
import { site } from '../data/site';
---
<section id="top" class="px-6 sm:px-10 pt-32 sm:pt-44 pb-20 sm:pb-28 max-w-5xl mx-auto">
  <HeroAnimation client:load name={site.name} role={site.role} tagline={site.tagline} />
  <div class="mt-12 flex flex-wrap gap-4">
    <a href={site.links.workshop} class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] hover:opacity-90 transition" target="_blank" rel="noopener noreferrer">
      Join the free workshop →
    </a>
    <a href="#contact" class="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition">
      Get in touch
    </a>
  </div>
</section>
```

- [ ] **Step 3: Wire Hero into `src/pages/index.astro`**

Replace contents:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
</BaseLayout>
```

- [ ] **Step 4: Visual smoke test**

Run:
```bash
npm run dev -- --port 4321 &
sleep 4
curl -s http://localhost:4321/ | grep -c "Viswesh Subramanian"
kill %1
```
Expected: at least 1 match.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/Hero.astro src/components/islands/HeroAnimation.tsx src/pages/index.astro
git commit -m "feat: add hero section with motion entrance"
```

---

## Task 11: Now section

**Files:**
- Create: `src/components/Now.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Now.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import { now } from '../lib/content';

const pretty = new Date(now.date + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' });
---
<Section id="now" eyebrow="Now" title={`What I'm building · ${pretty}`}>
  <ul class="space-y-5 text-lg max-w-3xl">
    {now.bullets.map((b: string) => (
      <li class="flex gap-4">
        <span class="text-[var(--color-accent)] font-mono shrink-0 mt-1">→</span>
        <span set:html={b} />
      </li>
    ))}
  </ul>
</Section>
```

- [ ] **Step 2: Update content to allow inline links**

Edit `src/content/now.json` to swap the first bullet's "context layer for AI" reference into an `<a>` tag:
```json
"Leading 24+ engineers building Atlan's <a href=\"https://atlan.com/context-layer/\" class=\"underline decoration-[var(--color-accent)] underline-offset-4\" target=\"_blank\" rel=\"noopener\">context layer for AI</a> — unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph. Over a dozen production agents shipping today, working across a ~200-person engineering org."
```

- [ ] **Step 3: Add Now to `src/pages/index.astro`**

Replace contents:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
  <Now />
</BaseLayout>
```

- [ ] **Step 4: Run vitest to confirm content still parses**

Run:
```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/Now.astro src/content/now.json src/pages/index.astro
git commit -m "feat: add Now section with current focus bullets"
```

---

## Task 12: About section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/About.astro`**

Contents:
```astro
---
import Section from './Section.astro';
---
<Section id="about" eyebrow="About" title="Twenty years building. The last decade leading.">
  <div class="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
    <div class="space-y-5 text-lg leading-relaxed max-w-2xl">
      <p>17+ years building bridges between data governance and engineering excellence. Today I lead AI-native context engineering at Atlan — 24+ engineers building the <a href="https://atlan.com/context-layer/" class="underline decoration-[var(--color-accent)] underline-offset-4" target="_blank" rel="noopener">context layer for AI</a>, unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph that organizations like Nasdaq, GM, FOX, Unilever, and HubSpot rely on. Over a dozen production agents now run on it. The harness we're building is taking customer-ticket resolution to ~5 hours with AI in the loop. In the year since I joined, Atlan moved from Visionary to Leader on the 2026 Gartner MQ for Data &amp; Analytics Governance.</p>
      <p>Before Atlan: nearly six years at Adobe — first as a Senior UI Engineer in the SF Bay Area shipping Adobe Experience Platform's ML workspace and Entity Lifecycle Management initiative, then as Software Engineering Manager (Remote, India) leading 12 engineers across Privacy, Unified Profile, Unified Permissions Framework, Use Case Playbooks, and Sandbox management. The platform serves The Coca-Cola Company, The Home Depot, GM, TSB Bank, MLB, Panera Bread, Henkel, Telefónica, T. Rowe Price, ServiceNow, and EY. Built the Bangalore and Noida teams complementing the US-side org.</p>
      <p>Before Adobe: Staff Software Engineer at Juniper Networks (SF Bay, 2016–2019) — internal product manager + engineer for network editor, unified dashboard, visualization. Drove a 40% lift in development velocity, 30% reduction in licensing charges, 40% reduction in network authoring time. Built the Security Director mobile app that helped close two large enterprise accounts.</p>
      <p>Before Juniper: six years at BMC, ending as Staff Specialist Product Developer — shipped a native Android app for ITSM (NPS +50%), led list-based asset visualization (retention +30%, churn −20%), built BMC's cloud lifecycle management portal and service designer (operations cost −80%).</p>
      <p>What I care about: the system around the model. Models are commoditized — context engineering, memory, cost controls, observability are not. I still ship code in those layers myself, because directors who can't review a system design lose the room.</p>
    </div>
    <figure class="w-full">
      <img src="/img/profile.jpg" alt="Viswesh Subramanian, headshot" class="w-full rounded-2xl object-cover aspect-[4/5]" loading="lazy" />
    </figure>
  </div>
</Section>
```

- [ ] **Step 2: Add About to `src/pages/index.astro`**

Insert `<About />` after `<Now />`. Updated file:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import About from '../components/About.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
  <Now />
  <About />
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: success.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add About section"
```

---

## Task 13: LogoStrip component

**Files:**
- Create: `src/components/LogoStrip.astro`

- [ ] **Step 1: Write `src/components/LogoStrip.astro`**

Contents:
```astro
---
import { customers } from '../lib/content';

interface Props {
  group: string;
  caption?: string;
}
const { group, caption } = Astro.props;
const list = customers[group] ?? [];
---
{list.length > 0 && (
  <div class="mt-6">
    {caption && <p class="text-xs uppercase tracking-widest font-mono text-[var(--color-muted)] mb-3">{caption}</p>}
    <ul class="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70 hover:opacity-100 transition">
      {list.map((c) => (
        <li class="text-sm font-mono whitespace-nowrap" title={c.name}>
          <img src={`/logos/${c.logoSlug}.svg`} alt={c.name} height="20" class="h-5 w-auto inline-block dark:invert" loading="lazy" />
        </li>
      ))}
    </ul>
  </div>
)}
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/components/LogoStrip.astro
git commit -m "feat: add LogoStrip component"
```

---

## Task 14: Experience timeline + cards

**Files:**
- Create: `src/components/ExperienceCard.astro`, `src/components/ExperienceTimeline.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/ExperienceCard.astro`**

Contents:
```astro
---
import LogoStrip from './LogoStrip.astro';

interface Props {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  scope: string;
  outcome: string;
  depth: string;
  customerGroup?: string;
}
const { company, role, start, end, location, scope, outcome, depth, customerGroup } = Astro.props;

function pretty(d: string): string {
  if (d === 'present') return 'Present';
  const [y, m] = d.split('-');
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}
---
<article class="relative pl-8 pb-12 border-l border-[var(--color-fg)]/15">
  <span class="absolute -left-[5px] top-1 size-[10px] rounded-full bg-[var(--color-accent)]"></span>
  <header class="mb-4">
    <h3 class="text-2xl" style="font-family: var(--font-display); font-weight: 600;">{role} <span class="text-[var(--color-muted)]">· {company}</span></h3>
    <p class="text-sm font-mono text-[var(--color-muted)] mt-1">{pretty(start)} – {pretty(end)}{location && ` · ${location}`}</p>
  </header>
  <dl class="space-y-3 text-base leading-relaxed max-w-3xl">
    <div><dt class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">Scope</dt><dd>{scope}</dd></div>
    <div><dt class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">Outcome</dt><dd>{outcome}</dd></div>
    <div><dt class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">Depth</dt><dd>{depth}</dd></div>
  </dl>
  {customerGroup && <LogoStrip group={customerGroup} caption="Platform customers" />}
</article>
```

- [ ] **Step 2: Write `src/components/ExperienceTimeline.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import ExperienceCard from './ExperienceCard.astro';
import { experience } from '../lib/content';

const groupFor = (company: string, role: string): string | undefined => {
  if (company === 'Atlan') return 'atlan';
  if (company === 'Adobe' && role === 'Software Engineering Manager') return 'adobe-experience-platform';
  return undefined;
};
---
<Section id="experience" eyebrow="Experience" title="Where I've led and built">
  <div class="space-y-2">
    {experience.map((e) => (
      <ExperienceCard
        company={e.company}
        role={e.role}
        start={e.start}
        end={e.end}
        location={e.location}
        scope={e.scope}
        outcome={e.outcome}
        depth={e.depth}
        customerGroup={groupFor(e.company, e.role)}
      />
    ))}
  </div>
  <div class="mt-16 grid sm:grid-cols-2 gap-10 text-base">
    <div>
      <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">Education</p>
      <ul class="space-y-2">
        <li>MS, Computer Systems Networking & Telecommunications · State University of New York Institute of Technology · 2007–09</li>
        <li>BE, Electronics & Communications · Anna University · 2002–06</li>
        <li>Product Management · Product School · 2019</li>
      </ul>
    </div>
    <div>
      <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">Other</p>
      <ul class="space-y-2">
        <li>Toastmasters International — Area Director (D101 Area 5) · 2017–18</li>
        <li>Certifications: Product Manager · ITIL V3 Foundation · BMC Service Request Management 2.1</li>
      </ul>
    </div>
  </div>
</Section>
```

- [ ] **Step 3: Add to `src/pages/index.astro`**

Insert `<ExperienceTimeline />` after `<About />`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import About from '../components/About.astro';
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
  <Now />
  <About />
  <ExperienceTimeline />
</BaseLayout>
```

- [ ] **Step 4: Build**

Run:
```bash
npm run build
```
Expected: success.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/ExperienceCard.astro src/components/ExperienceTimeline.astro src/pages/index.astro
git commit -m "feat: add experience timeline with scope/outcome/depth cards"
```

---

## Task 15: Writing grid (featured row + grid)

**Files:**
- Create: `src/components/WritingCard.astro`, `src/components/WritingGrid.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/WritingCard.astro`**

Contents:
```astro
---
interface Props {
  title: string;
  url: string;
  date: string;
  hook: string;
  impressions: number;
  tag: 'strategy' | 'builder' | 'leader';
  large?: boolean;
}
const { title, url, date, hook, impressions, tag, large = false } = Astro.props;

const tagLabel = { strategy: 'Strategy', builder: 'Builder', leader: 'Leader' }[tag];
const fmtImp = new Intl.NumberFormat('en-US').format(impressions);
const fmtDate = new Date(date + '-01').toLocaleString('en-US', { month: 'short', year: 'numeric' });
---
<a href={url} target="_blank" rel="noopener noreferrer" class={`group block rounded-2xl border border-[var(--color-fg)]/15 hover:border-[var(--color-accent)] transition p-6 ${large ? 'sm:p-10' : ''}`}>
  <div class="flex items-center justify-between gap-3 mb-3">
    <span class="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">{tagLabel} · {fmtDate}</span>
    <span class="font-mono text-xs text-[var(--color-muted)]">{fmtImp} imp</span>
  </div>
  <h3 class={`leading-snug ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`} style="font-family: var(--font-display); font-weight: 600;">{title}</h3>
  <p class={`mt-3 text-[var(--color-muted)] ${large ? 'text-base' : 'text-sm'}`}>{hook}</p>
  <span class="inline-block mt-4 text-sm font-mono group-hover:text-[var(--color-accent)] transition">Read on LinkedIn →</span>
</a>
```

- [ ] **Step 2: Write `src/components/WritingGrid.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import WritingCard from './WritingCard.astro';
import { writing } from '../lib/content';

const featured = writing.filter(w => w.featured);
const rest = writing.filter(w => !w.featured).sort((a, b) => b.date.localeCompare(a.date));
---
<Section id="writing" eyebrow="Writing" title="What I've been thinking out loud about">
  <div class="grid md:grid-cols-2 gap-5">
    {featured.map(w => (
      <WritingCard {...w} large />
    ))}
  </div>
  {rest.length > 0 && (
    <div class="grid md:grid-cols-2 gap-5 mt-5">
      {rest.map(w => <WritingCard {...w} />)}
    </div>
  )}
</Section>
```

- [ ] **Step 3: Add to `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import About from '../components/About.astro';
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
import WritingGrid from '../components/WritingGrid.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
  <Now />
  <About />
  <ExperienceTimeline />
  <WritingGrid />
</BaseLayout>
```

- [ ] **Step 4: Build + smoke**

Run:
```bash
npm run build
```
Expected: success.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/WritingCard.astro src/components/WritingGrid.astro src/pages/index.astro
git commit -m "feat: add writing section with featured row + grid"
```

---

## Task 16: Projects section

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

Contents:
```astro
---
interface Props {
  title: string;
  blurb: string;
  ctaLabel: string;
  ctaUrl: string;
}
const { title, blurb, ctaLabel, ctaUrl } = Astro.props;
---
<a href={ctaUrl} class="group block rounded-2xl border border-[var(--color-fg)]/15 hover:border-[var(--color-accent)] transition p-8 sm:p-12">
  <h3 class="text-3xl sm:text-4xl leading-tight" style="font-family: var(--font-display); font-weight: 600;">{title}</h3>
  <p class="mt-4 text-base sm:text-lg max-w-3xl text-[var(--color-muted)]">{blurb}</p>
  <span class="inline-block mt-6 font-mono text-sm group-hover:text-[var(--color-accent)] transition">{ctaLabel} →</span>
</a>
```

- [ ] **Step 2: Write `src/components/Projects.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import ProjectCard from './ProjectCard.astro';
import { projects } from '../lib/content';
---
<Section id="projects" eyebrow="Projects" title="The work I keep returning to">
  <div class="space-y-5">
    {projects.map(p => (
      <ProjectCard title={p.title} blurb={p.blurb} ctaLabel={p.cta.label} ctaUrl={p.cta.url} />
    ))}
  </div>
</Section>
```

- [ ] **Step 3: Add to `src/pages/index.astro`** (insert after WritingGrid)

```astro
import Projects from '../components/Projects.astro';
// ...inside body, after <WritingGrid />:
<Projects />
```

- [ ] **Step 4: Commit**

Run:
```bash
git add src/components/ProjectCard.astro src/components/Projects.astro src/pages/index.astro
git commit -m "feat: add Projects section"
```

---

## Task 17: Speaking section

**Files:**
- Create: `src/components/Speaking.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Speaking.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import { speaking } from '../lib/content';
---
<Section id="speaking" eyebrow="Speaking" title="Where I've shown up live">
  <a href={speaking.workshop.url} target="_blank" rel="noopener noreferrer" class="block rounded-2xl border-2 border-[var(--color-accent)] p-8 sm:p-10 mb-10 group">
    <p class="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-3">Live workshop · free</p>
    <h3 class="text-2xl sm:text-3xl leading-snug" style="font-family: var(--font-display); font-weight: 600;">{speaking.workshop.title}</h3>
    {speaking.workshop.nextSession && <p class="mt-3 text-base text-[var(--color-muted)]">Next session: {speaking.workshop.nextSession}</p>}
    <span class="inline-block mt-5 font-mono text-sm group-hover:underline">Register on Luma →</span>
  </a>
  <ul class="divide-y divide-[var(--color-fg)]/10">
    {speaking.past.map(t => (
      <li class="py-4 flex justify-between items-baseline gap-4">
        <span class="text-base">{t.title}</span>
        <span class="font-mono text-xs text-[var(--color-muted)] whitespace-nowrap">{t.venue} · {t.year}</span>
      </li>
    ))}
  </ul>
</Section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

After Projects:
```astro
import Speaking from '../components/Speaking.astro';
// ...
<Speaking />
```

- [ ] **Step 3: Commit**

Run:
```bash
git add src/components/Speaking.astro src/pages/index.astro
git commit -m "feat: add Speaking section with workshop CTA"
```

---

## Task 18: Contact + Footer

**Files:**
- Create: `src/components/Contact.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Contact.astro`**

Contents:
```astro
---
import Section from './Section.astro';
import { site } from '../data/site';
---
<Section id="contact" eyebrow="Contact" title="Find me">
  <p class="text-lg max-w-2xl mb-8">{site.location}. Best for: Director-of-Engineering roles in AI infra, AI-native products, or context engineering for enterprise data.</p>
  <ul class="grid sm:grid-cols-2 gap-3 max-w-xl">
    <li><a class="font-mono text-base hover:text-[var(--color-accent)] underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></li>
    <li><a class="font-mono text-base hover:text-[var(--color-accent)] underline underline-offset-4" href={site.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
    <li><a class="font-mono text-base hover:text-[var(--color-accent)] underline underline-offset-4" href={site.links.github} target="_blank" rel="noopener">GitHub</a></li>
    <li><a class="font-mono text-base hover:text-[var(--color-accent)] underline underline-offset-4" href={site.links.twitter} target="_blank" rel="noopener">Twitter / X</a></li>
  </ul>
</Section>
```

- [ ] **Step 2: Write `src/components/Footer.astro`**

Contents:
```astro
---
import { site } from '../data/site';
const year = new Date().getFullYear();
---
<footer class="px-6 sm:px-10 py-10 border-t border-[var(--color-fg)]/10 max-w-5xl mx-auto">
  <p class="font-mono text-xs text-[var(--color-muted)]">© {year} {site.name} · Built with Astro + Motion · <a href="https://github.com/viswesh/viswesh.github.io" class="underline">source</a></p>
</footer>
```

- [ ] **Step 3: Update `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import About from '../components/About.astro';
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
import WritingGrid from '../components/WritingGrid.astro';
import Projects from '../components/Projects.astro';
import Speaking from '../components/Speaking.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
import { site } from '../data/site';
---
<BaseLayout title={`${site.name} — ${site.role}`} description={site.tagline}>
  <Hero />
  <Now />
  <About />
  <ExperienceTimeline />
  <WritingGrid />
  <Projects />
  <Speaking />
  <Contact />
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Build + commit**

```bash
npm run build
git add src/components/Contact.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Contact and Footer"
```

---

## Task 19: Sticky in-page nav + theme toggle

**Files:**
- Create: `src/components/Nav.astro`, `src/components/islands/ThemeToggle.tsx`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write `src/components/islands/ThemeToggle.tsx`**

Contents:
```tsx
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null);
    const initial = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }

  return (
    <button onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="font-mono text-xs uppercase tracking-widest hover:text-[var(--color-accent)]">
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
```

- [ ] **Step 2: Update `global.css` to honor `data-theme` attribute**

Append to `src/styles/global.css`:
```css
:root[data-theme="dark"] {
  --color-bg: #0F0F0F;
  --color-fg: #FAF9F6;
  --color-muted: #9A9A9A;
}
:root[data-theme="light"] {
  --color-bg: #FAF9F6;
  --color-fg: #0F0F0F;
  --color-muted: #6B6B6B;
}
```

- [ ] **Step 3: Write `src/components/Nav.astro`**

Contents:
```astro
---
import ThemeToggle from './islands/ThemeToggle.tsx';
import { site } from '../data/site';
---
<nav class="sticky top-0 z-50 backdrop-blur bg-[var(--color-bg)]/70 border-b border-[var(--color-fg)]/10">
  <div class="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
    <a href="#top" class="font-mono text-sm font-bold">VS</a>
    <ul class="hidden sm:flex items-center gap-6 text-sm font-mono">
      <li><a href="#now" class="hover:text-[var(--color-accent)]">Now</a></li>
      <li><a href="#about" class="hover:text-[var(--color-accent)]">About</a></li>
      <li><a href="#experience" class="hover:text-[var(--color-accent)]">Experience</a></li>
      <li><a href="#writing" class="hover:text-[var(--color-accent)]">Writing</a></li>
      <li><a href="#projects" class="hover:text-[var(--color-accent)]">Projects</a></li>
      <li><a href="#contact" class="hover:text-[var(--color-accent)]">Contact</a></li>
      <li><ThemeToggle client:load /></li>
    </ul>
  </div>
</nav>
```

- [ ] **Step 4: Mount Nav inside `BaseLayout.astro`**

Replace `BaseLayout.astro` body:
```astro
<body class="antialiased">
  <a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
  <Nav />
  <main id="main"><slot /></main>
</body>
```

Add at top of frontmatter:
```astro
import Nav from '../components/Nav.astro';
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/islands/ThemeToggle.tsx src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "feat: add sticky nav and theme toggle"
```

---

## Task 20: Agent Harness project detail page

**Files:**
- Create: `src/pages/projects/agent-harness.astro`

- [ ] **Step 1: Write `src/pages/projects/agent-harness.astro`**

Contents:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Section from '../../components/Section.astro';
import { site } from '../../data/site';

const components = [
  { name: 'Sandbox', summary: 'A throwaway container the agent gets for one task. Runs code, iterates, gets destroyed when done.', tools: 'E2B · Daytona · Cloudflare Sandboxes' },
  { name: 'Context engineering', summary: 'What information gets loaded into the prompt for this specific task. Docs, rules, codebase context, conversation history.', tools: 'CLAUDE.md · SOUL.md · AGENTS.md' },
  { name: 'Task orchestration', summary: 'Breaks work into steps, handles retries, decides when to stop or escalate.', tools: 'Claude Agent SDK · OpenAI Agents SDK · Pydantic AI · Google ADK' },
  { name: 'Cost controls', summary: 'Token budgets per task, spending limits per agent, model routing to send cheap tasks to cheap models.', tools: 'Portkey · Cloudflare AI Gateway · LiteLLM' },
  { name: 'Tool access', summary: 'How the model calls APIs, reads files, runs commands, opens a browser. Permissions control what it can and cannot touch.', tools: 'MCP · Docker MCP Catalog · REST APIs · CLIs' },
  { name: 'Memory', summary: 'How the agent picks up where it left off across sessions.', tools: 'Mem0 · Letta · Zep' },
  { name: 'Guardrails', summary: 'Linters, structural tests, safety filters that sit between the agent and the outside world. The agent cannot skip them.', tools: 'NeMo Guardrails · LlamaFirewall' },
  { name: 'Observability', summary: 'Traces every step across every layer. When something goes wrong, this is how you figure out why.', tools: 'Langfuse · Arize · Braintrust · LangSmith' },
  { name: 'Evals', summary: 'Continuous offline + online evaluation of agent behavior. The feedback loop that lets the harness improve.', tools: 'Braintrust · Langfuse evals · custom harnesses' },
];
---
<BaseLayout title="Agent Harness Reference Architecture — Viswesh Subramanian" description="A 9-component reference architecture for production AI agent infrastructure.">
  <Section id="harness" eyebrow="Project · Agent Harness" title="The 9 components of a production agent harness">
    <p class="text-lg max-w-3xl mb-12 text-[var(--color-muted)]">
      Most agent demos ignore the system around the model. In production, that system is the difference between an agent that ships and one that quietly burns money. Here are the nine layers I keep coming back to.
    </p>
    <ol class="space-y-6">
      {components.map((c, i) => (
        <li class="grid md:grid-cols-[60px_1fr] gap-6 border-t border-[var(--color-fg)]/10 pt-6">
          <span class="font-mono text-3xl text-[var(--color-accent)]">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 class="text-2xl mb-2" style="font-family: var(--font-display); font-weight: 600;">{c.name}</h3>
            <p class="text-base mb-2">{c.summary}</p>
            <p class="font-mono text-xs text-[var(--color-muted)]">{c.tools}</p>
          </div>
        </li>
      ))}
    </ol>
    <div class="mt-16">
      <a href={site.links.workshop} target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)]">
        Walk through this in the workshop →
      </a>
    </div>
  </Section>
</BaseLayout>
```

- [ ] **Step 2: Build and verify the project page renders**

Run:
```bash
npm run build
ls dist/projects/agent-harness/index.html
```
Expected: file exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/agent-harness.astro
git commit -m "feat: add agent harness project detail page"
```

---

## Task 21: SEO — meta tags, sitemap, JSON-LD, OG image

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `public/og-default.png` (placeholder), `astro.config.mjs` (sitemap integration)

- [ ] **Step 1: Install sitemap integration**

Run:
```bash
npm install @astrojs/sitemap
```

- [ ] **Step 2: Wire sitemap in `astro.config.mjs`**

Updated config:
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://viswesh.github.io',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Add OG + Twitter + JSON-LD to `BaseLayout.astro`**

Update the `<head>` section to include:
```astro
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={Astro.site?.toString()} />
<meta property="og:image" content="/og-default.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="@viswesh" />
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Viswesh Subramanian",
  "jobTitle": "Senior Engineering Manager",
  "worksFor": { "@type": "Organization", "name": "Atlan" },
  "url": "https://viswesh.github.io",
  "sameAs": [
    "https://github.com/viswesh",
    "https://www.linkedin.com/in/viswesh-subramanian-848a6736",
    "https://twitter.com/viswesh"
  ]
})} />
```

- [ ] **Step 4: Generate placeholder OG image**

Use any 1200×630 image (initially) — black background with white serif text "Viswesh Subramanian / Director of Engineering / Production AI agent infrastructure". Save as `public/og-default.png`. (Iterate on this later.)

- [ ] **Step 5: Add `public/robots.txt`**

Contents:
```
User-agent: *
Allow: /
Sitemap: https://viswesh.github.io/sitemap-index.xml
```

- [ ] **Step 6: Build and confirm sitemap output**

Run:
```bash
npm run build
ls dist/sitemap-*.xml
```
Expected: `sitemap-index.xml` and `sitemap-0.xml` exist.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro astro.config.mjs public/og-default.png public/robots.txt package.json package-lock.json
git commit -m "feat: add OG meta, JSON-LD Person schema, sitemap, robots.txt"
```

---

## Task 22: Playwright smoke test

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`
- Modify: `package.json` (script)

- [ ] **Step 1: Install Playwright**

Run:
```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

Contents:
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run dev -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  use: { baseURL: 'http://localhost:4321' },
});
```

- [ ] **Step 3: Add `e2e` script to `package.json`**

```json
"e2e": "playwright test"
```

- [ ] **Step 4: Write `tests/e2e/smoke.spec.ts`**

Contents:
```ts
import { test, expect } from '@playwright/test';

test('home renders all sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Viswesh Subramanian');
  for (const id of ['now', 'about', 'experience', 'writing', 'projects', 'speaking', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test('hero CTAs link out correctly', async ({ page }) => {
  await page.goto('/');
  const workshop = page.getByRole('link', { name: /workshop/i }).first();
  await expect(workshop).toHaveAttribute('href', /luma\.com/);
});

test('agent harness page renders 9 components', async ({ page }) => {
  await page.goto('/projects/agent-harness/');
  await expect(page.locator('ol > li')).toHaveCount(9);
});

test('theme toggle switches data-theme attribute', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: /switch to/i }).click();
  const after = await html.getAttribute('data-theme');
  expect(before).not.toBe(after);
});
```

- [ ] **Step 5: Run e2e**

Run:
```bash
npm run e2e
```
Expected: all 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/smoke.spec.ts package.json package-lock.json
git commit -m "test: add playwright smoke + theme toggle test"
```

---

## Task 23: GitHub Actions deploy workflow (pinned SHAs)

**Files:**
- Create: `.github/workflows/deploy.yml`

> **Security note (per CLAUDE.md):** all third-party actions must be pinned to a full SHA, never a tag. Run `gh api repos/<org>/<repo>/git/refs/tags/<tag>` (or look up the tag in the GitHub UI) for each action below to obtain the SHA at execution time. The SHAs in the snippet below are placeholders — replace them with current ones at execution time. Permissions are minimum-required.

- [ ] **Step 1: Resolve current SHAs for the actions**

In a terminal, look up these tags on GitHub and capture their full commit SHAs:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

Record the SHAs below before pasting into the workflow.

- [ ] **Step 2: Write `.github/workflows/deploy.yml`**

Contents (replace `REPLACE_WITH_SHA` lines):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@REPLACE_WITH_SHA  # actions/checkout v4
      - uses: actions/setup-node@REPLACE_WITH_SHA  # actions/setup-node v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@REPLACE_WITH_SHA  # actions/configure-pages v5
      - uses: actions/upload-pages-artifact@REPLACE_WITH_SHA  # actions/upload-pages-artifact v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@REPLACE_WITH_SHA  # actions/deploy-pages v4
```

- [ ] **Step 3: Configure GitHub Pages settings**

In `https://github.com/viswesh/viswesh.github.io/settings/pages`, set source to **GitHub Actions** (not the legacy "Deploy from a branch"). User confirmation required.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow with pinned SHAs"
```

- [ ] **Step 5: Push and verify CI**

Run:
```bash
git push origin main
gh run watch
```
Expected: build job + deploy job complete green. Site live at `https://viswesh.github.io/`.

---

## Task 24: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

Contents:
```markdown
# viswesh.github.io

Personal site for Viswesh Subramanian — Senior Engineering Manager, AI-native context engineering @ Atlan.

## Stack

Astro 5 · React 19 islands · Tailwind 4 · Motion · TypeScript · Vitest · Playwright. Deploys to GitHub Pages via Actions.

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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Self-Review

After all tasks land, run this checklist:

- **Spec coverage** — does every section in the spec map to a task?
  - Hero (§5): Task 10
  - Now: Task 11
  - About: Task 12
  - Experience timeline + cards: Tasks 13, 14
  - Logo strips under Atlan + Adobe: Task 13 (component), Task 14 (wired in)
  - Writing featured + grid: Task 15
  - Projects + Agent Harness detail: Tasks 16, 20
  - Speaking with workshop CTA: Task 17
  - Contact + Footer: Task 18
  - Sticky nav + theme toggle: Task 19
  - SEO + JSON-LD + sitemap + robots.txt: Task 21
  - Playwright smoke + theme toggle test: Task 22
  - GitHub Actions pinned-SHA deploy: Task 23
  - Reduced-motion: handled in `global.css` (Task 3)
  - Migration of legacy site to `legacy` branch and project pages preserved: Tasks 1, 5
  - Vitest content shape: Task 8

- **Placeholder scan** — three legitimate placeholders remain (per spec §16): per-post LinkedIn URLs, workshop next-session date, profile photo refresh. They are loaded from JSON and replaceable post-deploy without code changes. Action SHAs in Task 23 are also placeholders by design — they MUST be resolved at execution time.

- **Type consistency** — `WritingCardSchema.tag` is `'strategy' | 'builder' | 'leader'` and the React component uses the same enum. `ExperienceCardSchema.end` accepts the literal string `'present'` since `pretty()` checks for it.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-26-portfolio-rebuild.md`.
