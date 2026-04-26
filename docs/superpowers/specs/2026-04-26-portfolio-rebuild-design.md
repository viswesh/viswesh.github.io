# Portfolio Rebuild — Design Spec

**Date:** 2026-04-26
**Owner:** Viswesh Subramanian
**Status:** Draft for review
**Repo:** `github.com/viswesh/viswesh.github.io`
**Live URL today:** https://viswesh.github.io

---

## 1. Goal

Replace the current Bootstrap 3 / jQuery 1.11 portfolio (last meaningful content edit: 2013) with a modern, animated personal site whose **explicit objective is to get Viswesh hired as Director of Engineering** at AI-native and AI-infrastructure companies. Primary geos: Bangalore-based AI scaleups and remote-first distributed teams.

Anchor positioning: **technical engineering leader specializing in production AI agent infrastructure.** A Director who scales teams *and* can call BS on a system-design review.

Single-line elevator: *"I lead engineering teams building production AI agents — and I still ship the harness underneath them."*

## 2. Positioning Strategy

The site is for one audience: **a Director-of-Engineering hiring panel skimming for 30 seconds.** That panel needs three signals to advance a candidate:

1. **Scope** — How many people, what kind of org, what outcomes shipped under their leadership.
2. **Strategic substance** — Do they have a thesis, or just management mechanics?
3. **Technical depth** — Can they review a system-design doc and catch what a staff engineer would catch?

Most senior-EM portfolios overweight (1) and look interchangeable. Most builder portfolios overweight (3) and read as senior-IC. **Viswesh's edge is having credible signal on all three** — and the site must surface them in that order.

**Lead order on every page section:**
1. **Leadership scope first** — team size, org outcomes, Atlan's Visionary → Leader move on Gartner MQ during his tenure, Adobe Experience Platform team scaling.
2. **Strategic substance second** — "system around the model," "harness-as-a-service," "from if-else to SOUL.md" — these are the thesis statements.
3. **Technical depth third** — cost case study, MCP Apps demo, harness reference architecture. Reads as proof, not main act.

The builder/practitioner work is a **differentiator, not the headline.** It's what separates him from every other Director candidate whose technical knowledge stopped at promotion to manager.

**Anti-positioning:** the site must NOT read as a senior/staff engineer's portfolio. If a recruiter could imagine pitching this person for a Staff Engineer role, the framing is wrong.

## 3. Tone & Visual Direction

**Editorial / magazine** — large serif headlines (display serif, e.g. Fraunces or PP Editorial New), generous whitespace, restrained color, kinetic accents on hero + scroll. Reference points: rauno.me, brittanychiang.com (information density), paco.me (motion restraint).

- **Type:** Display serif for headlines; monospace (Berkeley Mono / JetBrains Mono) for code, numbers, labels; clean sans (Inter or Geist) for body.
- **Palette:** Neutral base (off-white `#FAF9F6` light; near-black `#0F0F0F` dark). One accent color — finalized during implementation by trying 2-3 options in-browser. Starting point: warm amber `#E8A33D` (signals pragmatism, avoids default AI-bro electric blue). Backup options: deep moss green `#3F5E3F`, or muted terracotta `#B5613F`. Final pick to be confirmed against the editorial type pairing — accent must support, not compete.
- **Dark mode:** First-class, system-driven, manual toggle. Both modes must look intentional, not inverted.
- **Imagery:** Sparse. One profile photo (replaces `img/4.jpg`). Diagrams over photos. Diagrams must look like the real ones from his LinkedIn posts (clean, schematic, not stock illustrations).

**Anti-goals:** Aceternity-style gradient meshes, particle backgrounds, scroll-jacked heroes, cursor trails. None of that. Restraint signals senior.

## 4. Information Architecture

Sections in scroll order:

1. **Hero** — Name, role line, one-line tagline, primary CTA (workshop) + secondary CTA (contact).
2. **Now** — "What I'm building this quarter" — short, dated, updates often. ~3-5 bullets.
3. **About** — Career arc (Web → CDP → AI Governance), positioning paragraph, photo.
4. **Experience** — Vertical timeline. **Atlan → Adobe (SEM → Senior UI Engineer) → Juniper → BMC (Staff Specialist → Staff Product Developer).** Education and Toastmasters Area Director (2017-18) appear as small subsections at the bottom. Pre-BMC roles (Mark InfoTech, CSS Chennai) are dropped — career narrative starts at BMC. Scroll-pinned line. **Each role card has a fixed three-line structure: Scope (team size, reports, org), Outcome (launches, metrics, awards), Depth (one line of technical work he personally led).** This three-line format is the spec — it forces every role to advertise leadership and depth in equal measure.

   **Customer logo strip:** under the Atlan card, render a horizontal logo strip (Nasdaq, GM, FOX, Unilever, HubSpot — Atlan's named customers per his LinkedIn profile). Under the Adobe SEM card, a second logo strip (Coca-Cola, Home Depot, GM, TSB, MLB, Panera, Henkel, Telefónica, ServiceNow, EY — public AEP roster). Logos are visual proof, not claimed personal relationships. Caption clarifies these are platform/product customers.
5. **Writing** — LinkedIn essays as cards, sorted by impact (impressions × recency). Click → external LinkedIn post URL. Cards show: title, date, hook (1 line), impressions/likes (social proof), tag.
6. **Projects** — Featured artifacts. Initial set: **Agent Harness Reference Architecture (9 components)** as the headline project. Designed to grow — additional cards added over time. Old portfolio (BeX, WeatherMe) moved to a small "Archive" sub-section or linked-only.
7. **Speaking** — Workshop CTA (Luma link to "From Agent Demo to Agent System"), past talks (WWRUG13 2013, The Stage 2021).
8. **Contact** — GitHub, LinkedIn, Twitter/X, email. (Drop Instagram — off-brand for Director positioning.)

**Dropped from current site:** "Beyond work" section (bodybuilding, running, fulfillment talks). Per user directive — keep positioning sharp.

**Not in v1:** Blog (writing lives on LinkedIn for now), newsletter signup, search.

## 5. Content Map

Source material for content:
- LinkedIn posts PDF (29 posts) — pulled into `content/linkedin-posts.json` as a structured list.
- Old `index.html` — used only for pre-2016 history (BMC, Mark, CSS, education).
- Currently-running workshop — `luma.com/e8xut60e`.

### Hero copy (proposed)

> **Viswesh Subramanian**
> Senior Engineering Manager at Atlan. I lead engineering teams building production AI agents — and I still ship the harness underneath them.
>
> [Join the free workshop →] [Get in touch]

Hero must read leadership-first. "I lead engineering teams building production AI agents" is the headline; "and I still ship the harness underneath them" is the differentiator. Order matters.

### Now (proposed, dated 2026-04)

- Leading 24+ engineers building Atlan's [context layer for AI](https://atlan.com/context-layer/) — unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph. Over a dozen production agents shipping today, working across a ~200-person engineering org.
- Building the agent harness that's getting Atlan to **5-hour customer ticket resolution** with AI in the loop.
- Running a free public workshop on production agent harnesses — next session: {DATE}.
- Authoring a 9-component reference architecture for AI agent infrastructure.

### About (proposed, ~140 words, leadership-first)

> 17+ years building bridges between data governance and engineering excellence. Today I lead AI-native context engineering at Atlan — 24+ engineers building the [context layer for AI](https://atlan.com/context-layer/), unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph that organizations like Nasdaq, GM, FOX, Unilever, and HubSpot rely on. Over a dozen production agents now run on it. The harness we're building is taking customer-ticket resolution to ~5 hours with AI in the loop. In the year since I joined, Atlan moved from Visionary to Leader on the 2026 Gartner MQ for Data & Analytics Governance.
>
> Before Atlan: nearly six years at Adobe — first as a Senior UI Engineer in the SF Bay Area shipping Adobe Experience Platform's ML workspace and Entity Lifecycle Management initiative, then as Software Engineering Manager (Remote, India) leading 12 engineers across Privacy, Unified Profile, Unified Permissions Framework, Use Case Playbooks, and Sandbox management. The platform serves The Coca-Cola Company, The Home Depot, GM, TSB Bank, MLB, Panera Bread, Henkel, Telefónica, T. Rowe Price, ServiceNow, and EY. Built the Bangalore and Noida teams complementing the US-side org.
>
> Before Adobe: Staff Software Engineer at Juniper Networks (SF Bay, 2016–2019) — internal product manager + engineer for network editor, unified dashboard, visualization. Drove a 40% lift in development velocity, 30% reduction in licensing charges, 40% reduction in network authoring time. Built the Security Director mobile app that helped close two large enterprise accounts.
>
> Before Juniper: six years at BMC, ending as Staff Specialist Product Developer — shipped a native Android app for ITSM (NPS +50%), led list-based asset visualization (retention +30%, churn −20%), built BMC's cloud lifecycle management portal and service designer (operations cost −80%).
>
> What I care about: the system around the model. Models are commoditized — context engineering, memory, cost controls, observability are not. I still ship code in those layers myself, because directors who can't review a system design lose the room.
>
> I write about all of this in long form on LinkedIn.

### Experience cards (proposed copy)

Each card uses the fixed three-line structure: **Scope · Outcome · Depth.**

**Atlan — Senior Engineering Manager** (March 2025 → present)
- *Scope.* Lead 24+ engineers building Atlan's context layer for enterprise AI — unifying data products, domains, lineage, and contracts into a shared Enterprise Data Graph. Cross-functional with a ~200-person engineering org.
- *Outcome.* Atlan moved Visionary → Leader on the 2026 Gartner MQ for D&A Governance during this tenure. Harness work driving customer-ticket resolution to ~5 hours with AI in the loop. Customers include Nasdaq, GM, FOX, Unilever, and HubSpot.
- *Depth.* Architecting the 9-component agent harness — context engineering, memory, cost controls, observability, evals. Shipping MCP integrations (Drive & Discover demo).

**Adobe — Software Engineering Manager** (Nov 2021 → April 2025, Remote/India)
- *Scope.* Led 12 engineers owning Privacy, Unified Profile, Unified Permissions Framework, Use Case Playbooks, and Sandbox management for **Adobe Experience Platform** — the CDP behind Real-Time CDP and Journey Optimizer used by The Coca-Cola Company, The Home Depot, General Motors, TSB Bank, MLB, Panera Bread, Henkel, Telefónica, T. Rowe Price, Dick's Sporting Goods, Coles, ServiceNow, and EY. Built the Bangalore and Noida teams complementing Adobe's US-side org.
- *Outcome.* Shipped Privacy stack (Data Hygiene, Privacy Console, audits) automating GDPR / CCPA across Experience Cloud. Unified Permissions Framework went GA as Attribute-Based Access Control across Real-Time CDP and Journey Optimizer. Use Case Playbooks shipped a Playbook Authoring Framework (April 2025) generating audiences, journeys, and schemas at no added cost. Sandbox tooling shipped iterative cross-sandbox config migration (June 2025) and B2B architecture support (July 2025). The platform underneath: 10–14 second customer-data refresh cycle, streaming segmentation at up to 15,000 events/sec.
- *Depth.* React/TypeScript SPAs at cloud-native scale. Architected pattern convergence and infrastructure upgrades across the org. Defined developer-velocity tooling and the experimentation environment the team ships through.

**Adobe — Senior UI Engineer** (June 2019 → Nov 2021, SF Bay Area)
- *Scope.* IC + tech lead for Experience Platform's first-time user experience for marketers; product manager for the Entity Lifecycle Management initiative.
- *Outcome.* Built the ML workspace data scientists use to train and score propensity, conversion, and churn models inside AEP. Entity Lifecycle Management cut COGS and improved data-engineer productivity. Customer outcomes attributable to the platform during this period included Home Depot (+62% personalized campaigns, +50% YoY marketing productivity) and TSB Bank (39% more product conversions, 300% lift in mobile journey completion).
- *Depth.* React frontend for ingestion, modeling, governance workflows; cross-platform analytics instrumentation.

**Juniper Networks — Staff Software Engineer** (March 2016 → June 2019, SF Bay Area)
- *Scope.* Internal PM + engineer for network editor, unified dashboard, and visualization across 8+ cross-functional teams.
- *Outcome.* **40% lift in development velocity** (UX patterns + API standards). **30% reduction in licensing charges** (consolidated map provider across network apps). **40% reduction in network authoring time** (reusable geo component). Security Director mobile app helped close 2 large enterprise accounts.
- *Depth.* Authored an Augmented Reality MVP for network admins demonstrating 25% faster configuration. Built Matomo-based analytics provider and a preferences provider used across products.

**BMC Software — Staff Specialist Product Developer** (Feb 2013 → March 2016, San Jose / Bangalore)
- *Scope.* Tech lead for ITSM mobile + cloud lifecycle management.
- *Outcome.* Native Android app for ITSM lifted **NPS by 50%**. List-based asset visualization lifted **retention by 30%, cut churn by 20%**. Spoke at WWRUG13 San Jose on ITSM data visualization.
- *Depth.* AngularJS, Android (AppCompat / Material Design), d3.js, Google Closure. Pioneered Grunt-based build automation across the BMC frontend.

**BMC Software — Staff Product Developer** (Dec 2009 → Jan 2013, San Jose)
- *Scope.* End-user, tenant, and admin portals for cloud services.
- *Outcome.* Cloud infrastructure service designer cut **operations cost by 80%** through templatized provisioning. Auto-scale policy designer automated IT ops, reducing manual error and improving availability.
- *Depth.* Visualization layer for asset health, compute, and storage metrics; jQuery UI portlet customization on Twitter Bootstrap; d3.js heatmaps.

**Toastmasters International — Area Director, D101 Area 5** (July 2017 → June 2018, Sunnyvale)
- *Scope.* Area Director helping multiple area clubs improve status and align with district vision. Brief but real leadership signal outside core engineering.

**Education**
- **State University of New York Institute of Technology** — MS, Computer Systems Networking and Telecommunications (2007–09).
- **Anna University** — BE, Electronics and Communications (2002–06).
- **Product School** — Product Management (2019).
- **Certifications:** OWASP Web Application Security; ITIL V3 Foundation; BMC Service Request Management 2.1.

### Writing — cards (initial, ordered by impressions desc)

Cards marked **[FEATURED]** render larger and pin to the top of the Writing section regardless of recency — they're the narrative spine the site is built around. All other cards render in a 2-column grid below the featured row, ordered by recency.

**Featured row composition is balanced by lane to support Director-of-Eng positioning** — not pure builder. Target mix:
- 2 strategic-thesis posts ("system around the model," "from if-else to SOUL.md")
- 2 builder/practitioner posts ("$0.15 → $0.01," "harness 101")
- 2 leadership posts ("let's talk busy work," "what I learned about promotions" or "stacked PRs")

This way the row reads as *opinionated leader who can build*, not *engineer who got promoted*.


1. **52,731 imp** — "Front-End Engineer Wanted in Bangalore" (Adobe hiring, 2025) — *team-building*
2. **27,824 imp** — "Join my team as a Front End React Engineer" — *team-building*
3. **10,760 imp** — "I've joined Atlan as Senior EM" — *career arc*
4. **5,048 imp** — "An AI agent call that should cost $0.01 was costing $0.15" — *cost engineering* — **[FEATURED]**
5. **4,876 imp** — "What I have learned about promotions" — *people leadership* — **[FEATURED]**
6. **3,934 imp** — "Met in Delhi to push our context layer for AI" — *team*
7. **3,855 imp** — "Atlan named Leader in 2026 Gartner MQ" — *outcomes*
8. **3,641 imp** — "MCP Apps — Drive & Discover Mapbox demo" — *demo* — **[FEATURED]**
9. **3,467 imp** — "We don't debate AI tools. We work on the system around them." — *strategy*
10. **3,445 imp** — "Let's talk busy work" — *anti-pattern leadership* — **[FEATURED]**
11. **2,239 imp** — "From if-else to SOUL.md" — *strategy* — **[FEATURED]**
12. **1,997 imp** — "Same agent, two months apart, completely different results" — *AI SDLC*
13. **1,464 imp** — "What's a data product?" — *primer*
14. **1,390 imp** — "Two AI agents argued and solved a customer bug" — *multi-agent*
15. **1,346 imp** — "AI Agents on Strike" — *Atlan brand*
16. **1,318 imp** — "Free workshop on production agent harnesses" — *speaking*
17. **1,191 imp** — "Atlan agents have personalities" — *culture*
18. **1,160 imp** — "Validate engineering hypotheses in 30 minutes with Docker + AI" — *AI SDLC*
19. **965 imp** — "Agent harness 101 — 9 components" — *reference architecture* — **[FEATURED]**

(Pre-Atlan posts truncated to top 5; older fitness/coaching posts excluded per positioning.)

### Projects (initial v1)

**Agent Harness Reference Architecture** — *the headline project.*

- One-pager visual diagram of the 9 components: sandbox, context engineering, orchestration, cost controls, tool access, memory, guardrails, observability, evals.
- Each component links to: a tool list (E2B/Daytona for sandbox; Portkey/Cloudflare AI Gateway for cost; Langfuse/Arize for observability; etc.) and a one-paragraph "what to think about."
- CTA: "Walk through this in the workshop →" (Luma link).
- This is the asset a Director-of-Eng hiring panel will land on. Designed for sharing as a standalone link.

Section is structured to **grow** — workshop replays, additional case studies (cost optimization, multi-agent debugging) added as project cards over time.

**Planned next project cards** (ordered by Director-of-Eng signal value, to add as content is ready):
1. **Team & Org Design** — how the Atlan AI agent fleet is organized, what the squad model looks like, how the team grew. Org-leader proof artifact. Highest priority second card.
2. **Cost Engineering Case Study** — long-form expansion of the $0.15 → $0.01 post.
3. **Multi-Agent Debugging Case Study** — long-form expansion of the "two agents argued" post.
4. **Drive & Discover MCP Apps Demo** — embedded video / GIF + write-up.
5. **Workshop Replay** — once the first session airs, the recording becomes a card.

### Speaking

- **Live now:** Free workshop — *From Agent Demo to Agent System: A Production Architecture Workshop* — Luma. Card with date, registration CTA.
- **Past:** The Stage 2021 (fulfillment talk, hosted Suresh Kannan), WWRUG13 San Jose 2013 (ITSM data viz). Smaller list-style.

### Contact

- Email: `ns.viswesh@gmail.com`
- GitHub: `github.com/viswesh`
- LinkedIn: `linkedin.com/in/viswesh-subramanian-848a6736`
- Twitter/X: `twitter.com/viswesh`
- Phone: drop from public site (was `315.266.7050` — old, US line)
- Location: "Bangalore · open to remote"

## 6. Stack

| Concern | Choice |
|---|---|
| Framework | Astro 5.x with React integration |
| Styling | Tailwind CSS 4 (CSS-first config) |
| Components | shadcn/ui + selective Aceternity bits via 21st.dev Magic MCP |
| Motion | `motion` (the library formerly known as Framer Motion) inside React islands only |
| Type | Self-hosted via `@fontsource` for Fraunces + JetBrains Mono + Inter; preload critical subsets |
| Content | MDX for long-form, JSON for structured lists (writing index, projects) |
| Icons | `lucide-astro` |
| Deploy | GitHub Pages via `actions/deploy-pages` |
| Analytics | Plausible (privacy-friendly) — script optional, gated on consent |
| Forms | None in v1 (no contact form — mailto only) |

**Why each choice:**
- **Astro** ships ~0 JS by default; islands hydrate motion components only. Perfect for a content-heavy site with localized interactivity.
- **Tailwind 4** for speed of iteration with `frontend-design` skill.
- **Motion library** because Aceternity / shadcn motion components ship against it.
- **MDX + JSON split** so writing-index updates are one-line edits without touching components.
- **GitHub Pages** because zero-cost, zero-migration (URL stays `viswesh.github.io`).

## 7. Motion & Interaction Principles

- **Hero:** Headline characters animate in via subtle stagger (50-80ms). Tagline fades. No parallax. Subtle grain/noise overlay (CSS, not JS).
- **Scroll:** Section headlines fade-up on enter. Timeline line draws as user scrolls past Experience. No scroll-jacking, no full-page snap.
- **Hover:** Writing cards lift 2-3px and reveal a faint border accent. Project card images get a 1.02 scale.
- **Reduced motion:** Respect `prefers-reduced-motion` — disable all animations except opacity fades.
- **Performance budget:** Hero TTI < 1.5s on 4G. Total JS shipped on initial load < 50 KB gzipped (motion library + small islands).

## 8. Performance & SEO

- Lighthouse target: ≥ 95 across all four metrics on mobile.
- Static-rendered HTML for every section. Open Graph image generated at build (Astro OG image integration).
- `meta description` = elevator line. `meta robots` = `index,follow`.
- JSON-LD `Person` schema on home: name, jobTitle, worksFor (Atlan), sameAs (GitHub/LinkedIn/Twitter).
- Sitemap.xml + robots.txt at root.
- Image strategy: AVIF/WebP via Astro `<Image>`, lazy-loaded except hero photo.

## 9. Accessibility

- Color contrast WCAG AA in both light/dark.
- Keyboard nav: visible focus rings, logical tab order, skip-to-content link.
- All motion respects `prefers-reduced-motion`.
- Alt text on every image. Diagrams ship with text fallback below the SVG.

## 10. File Structure

```
viswesh.github.io/
├── astro.config.mjs
├── tailwind.config.ts (or v4 css-first)
├── package.json
├── public/
│   ├── og-default.png
│   ├── favicon.svg
│   └── img/profile.jpg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Now.astro
│   │   ├── About.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── WritingGrid.astro
│   │   ├── ProjectCard.astro
│   │   ├── Speaking.astro
│   │   ├── Contact.astro
│   │   └── islands/
│   │       ├── HeroAnimation.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── ScrollProgress.tsx
│   ├── content/
│   │   ├── writing.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   └── speaking.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── projects/agent-harness.astro  (project detail page, v1)
│   └── styles/
│       └── global.css
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docs/
    └── superpowers/specs/...
```

## 11. Deployment

- Branch: build from `main`. CI deploys on push.
- Workflow: `actions/checkout@<sha>` + `actions/setup-node@<sha>` + `npm ci` + `npm run build` + `actions/upload-pages-artifact@<sha>` + `actions/deploy-pages@<sha>`. **All actions pinned to full SHAs per security policy.**
- Domain: stays at `viswesh.github.io` for v1. Custom domain (`viswesh.dev` or similar) deferred to a later iteration.
- Permissions: workflow grants `contents: read`, `pages: write`, `id-token: write` only.

## 12. Migration from Current Site

- Old `index.html`, `css/`, `js/`, `img/`, `projects/` — preserved on a `legacy/` branch for archive. Main branch gets the rebuild.
- Old links that may be inbound: `/projects/bex/index.html`, `/projects/weatherme/index.html` — keep these files in `public/projects/...` so they continue to resolve.

## 13. Out of Scope (v1)

- Blog / MDX posts (writing lives on LinkedIn).
- Newsletter signup.
- Search.
- Analytics dashboard.
- Internationalization.
- CMS — content is edited as JSON/MDX in the repo.
- Workshop registration form (Luma handles it).
- Custom domain.
- Comments.

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Site reads as another generic AI-bro page | Editorial typography + restraint + serious case studies, not gradient meshes. Per `frontend-design` skill anti-AI-slop guidance. |
| LinkedIn-post links rot if LI changes URL structure | Each writing card stores: external URL + a short cached excerpt locally. Worst case, excerpt remains. |
| Workshop link expires after each session | `content/speaking.json` has a `nextSession` field that's easy to update; build is a `git push` away. |
| Director-of-Eng panels skim 30s before bouncing | Hero + Now + first project (Agent Harness) must answer "who, what, why hire" inside one viewport. Tested on mobile. |
| User wants to add new killer projects later | Projects section structured as `content/projects.json` array; adding a project = one JSON entry + one MDX detail page. |
| Site reads as senior IC, not Director-of-Eng candidate | Hero leads with "I lead engineering teams." About opens with leadership scope and Atlan Gartner Leader outcome. Experience cards force three-line scope/outcome/depth structure. Featured writing balanced 2 strategic + 2 builder + 2 leader, not builder-heavy. |

## 15. Success Criteria

The site is "done v1" when:

1. Hero, Now, About, Experience, Writing, Projects (with Agent Harness as the one featured), Speaking, Contact all render.
2. Lighthouse mobile ≥ 95 in all four categories.
3. Dark/light mode both look intentional.
4. Reduced-motion users see no motion.
5. Deploys cleanly to `viswesh.github.io` via GitHub Actions.
6. Reads convincingly as a Director-of-Engineering AI-expert candidate to a recruiter who skims for 30 seconds.

## 16. Open Questions

**Resolved (PDF + research):**
- ~~Atlan team size~~ → **24+ direct reports, ~200-engineer cross-functional org.**
- ~~Adobe team size~~ → **12 reports as SEM (Nov 2021–April 2025).** Prior role: Senior UI Engineer in SF Bay (June 2019–Nov 2021).
- ~~Juniper role details~~ → **Staff SWE + internal PM, March 2016–June 2019, SF Bay. 40% dev velocity lift, 30% licensing reduction, 40% authoring time cut, AR MVP, Security Director mobile app closed 2 enterprise deals.**
- ~~Atlan outcomes~~ → **Gartner Leader move + 5-hour ticket resolution + Enterprise Data Graph launch.**
- ~~Adobe customer logos~~ → **AEP public roster: Coca-Cola, Home Depot, GM, TSB, MLB, Panera, Henkel, Telefónica, T. Rowe Price, ServiceNow, EY.** Module-level outcomes attributable: Privacy automating GDPR/CCPA, ABAC GA on Unified Permissions, Playbook Authoring Framework GA April 2025, Sandbox iterative migration June 2025, B2B arch July 2025.
- ~~BMC outcomes~~ → **NPS +50% (Android app), retention +30% / churn −20% (asset visualization), ops cost −80% (cloud service designer).**

**Still optional / lower priority:**
- **5-hour ticket resolution baseline** — what was the prior baseline (e.g., "from 5 days to 5 hours")? Adds punch if shareable.
- Profile photo: use existing `img/4.jpg` or shoot/source new? *Default: keep existing for v1, swap later.*
- Workshop section "next session" date — set when first scheduled session is confirmed.
- Twitter/X handle — confirm `@viswesh` is still active and posting on-brand.
- Accent color final pick (amber / moss / terracotta).
- Logo licensing — using third-party logos (Coca-Cola, GM, etc.) for purposes of identifying public AEP customers is generally fair use; if any are challenged, drop. Confirm comfort with the approach.
