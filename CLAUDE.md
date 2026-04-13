# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

University project for **ITBA 71.38 - Programacion Web**. Solo e-commerce website built over 16 weeks with incremental deliverables. Deployed on Vercel (preview deploys per PR, auto-deploy on main).

**Niche: SWAP Podcast** — Spanish-language conversational podcast for ambitious young people (16-25) in Argentina/LATAM. Co-hosted by Segu and Francisco Bottaro. Topics: health, productivity, personal development, career, entrepreneurship, AI, mindset.

**Primary use case:** Landing page that potential guests scan via QR code to quickly understand what SWAP is about and feel attracted to participate.

**Final product scope:** Catalog with search/filtering, shopping cart, checkout (Mercado Pago sandbox), user auth, order history, internal API, Supabase database, webhooks, CI/CD pipeline. E-commerce angle TBD.

## Workflow Rules (MANDATORY)

1. **Log every prompt** — Append to `PROMPTS.md` with date/time before doing any work.
2. **Document every new concept** — When introducing any new coding concept (variable, function, loop, event, hook, etc.), add it to `code-knowledge.md` with a plain-language explanation. Focus on concepts, not code dumps. This is the student's oral exam reference.
3. **Only course technologies** — HTML, CSS, JavaScript, React, Next.js, Supabase (SQL), Mercado Pago. No extra frameworks or libraries unless explicitly part of the course.
4. **Explain as you build** — The student must understand and explain every piece of code in a 10-minute oral exam. Prioritize clear, understandable code over clever solutions.
5. **Incremental delivery** — Build progressively matching the deliverable schedule. Don't jump ahead.
6. **Semantic HTML + Accessibility** — Proper semantic tags, ARIA attributes where needed, responsive design from the start.
7. **No commented-out code** — The exam says commented code won't count.

## Current Phase

**E2 complete — static HTML/CSS/JS site live on Vercel.** Open `index.html` or `guest.html` directly in browser to preview locally. Next.js will be introduced at deliverable E4.

```bash
# After Next.js setup (E4):
npm install
npm run dev      # dev server on localhost:3000
npm run build    # production build
```

## Design System

CSS custom properties defined in `:root` of `styles.css` (shared via `guest.css` too):

- **Colors:** `--bg` (#080808 dark), `--accent` (#C8FF00 lime), `--text` (#EFEFEF), `--text-muted` (#666)
- **Fonts:** `--font-display: 'Syne'` (headings), `--font-body: 'DM Sans'` (body) — loaded via Google Fonts
- **Layout:** `--container: 1200px`, `--section-gap: 7rem`, `--radius: 12px`
- `guest.css` is standalone (not imported from `styles.css`) but uses the same token names

## File Structure

```
index.html          # Main landing page (guest application, full sections)
styles.css          # Styles for index.html — design tokens + all section styles
script.js           # JS for index.html — 5 modules: scroll reveal, navbar, mobile nav, stats counter, form handler
guest.html          # QR code page — mobile-first podcast overview for potential guests
guest.css           # Styles for guest.html — standalone, shares same design tokens
assets/
  swap-logo.png
  swap-logo-transparent.png
PROMPTS.md          # MANDATORY: log every prompt here
code-knowledge.md   # MANDATORY: document every new concept here (oral exam reference)
```

## Tech Stack (Progressive)

| Phase | Tech |
|-------|------|
| CI/CD | GitHub + Vercel (preview deploys per PR, auto-deploy on main) |
| Layout | HTML semantico + CSS (flex/grid, responsive) |
| Logic | JavaScript moderno (ES6+, async/await, fetch, DOM) |
| Framework | React + Next.js (routes, data-fetching, API route handlers) |
| Database | Supabase (tables: users/profiles/products/orders/order_items, RLS policies, SQL directo) |
| Payments | Mercado Pago sandbox (checkout + webhooks) |

## Deliverables & Deadlines

| # | Deliverable | Week | Weight | Description |
|---|-------------|------|--------|-------------|
| E1 | CI/CD operativo | S2 | 10% | Repo + pipeline + preview per PR |
| E2 | Maquetado | S4 | 15% | Landing + key views, accessible & responsive |
| E3 | JS + DOM | S6 | 15% | Dynamic forms/components with fetch |
| E4 | React/Next | S9 | 20% | Navigable catalog + basic internal API |
| E5 | Base de datos | S12 | 20% | Supabase model + CRUD integration |
| E6 | Pagos & Webhooks | S15-16 | 20% | Sandbox checkout + webhook + demo |

## Grading

- Funcionalidad: 40% | Calidad del codigo/estructura: 20% | Interfaz/Accesibilidad: 15% | Despliegue/operatividad: 15% | Documentacion breve: 10%
- **Web delivery must score 10/10 (perfect) — no bugs allowed.**

## Oral Exam (April 27-30, 2026)

10-minute individual oral, 100 points. **70+ points + approved web = promotion (no final exam).**

| Module | Points | Topics |
|--------|--------|--------|
| 1. Comprension + Diagrama + CI/CD | 30 | Architecture diagram (5-6 slides), tech roles, deploy flow |
| 2. HTML, CSS, JavaScript | 25 | Semantic HTML, ARIA, responsive, events, async/fetch, form validation, ES6 modules |
| 3. React y Next | 25 | Components, props vs state, useEffect, Next routes, client vs server rendering |
| 4. Uso de IA | 20 | Justify AI tool choice, describe validation process, identify AI errors, prompt documentation |

<!-- autoskills:start -->

Summary generated by `autoskills`. Check the full files inside `.claude/skills`.

## Accessibility (a11y)

Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", or "make accessible".

- `.claude/skills/accessibility/SKILL.md`
- `.claude/skills/accessibility/references/A11Y-PATTERNS.md`: Practical, copy-paste-ready patterns for common accessibility requirements. Each pattern is self-contained and linked from the main [SKILL.md](../SKILL.md).
- `.claude/skills/accessibility/references/WCAG.md`

## MANDATORY PREPARATION

Add strategic color to features that are too monochromatic or lack visual interest, making interfaces more engaging and expressive. Use when the user mentions the design looking gray, dull, lacking warmth, needing more color, or wanting a more vibrant or expressive palette.

- `.claude/skills/colorize/SKILL.md`

## STEPS

Evaluate design from a UX perspective, assessing visual hierarchy, information architecture, emotional resonance, cognitive load, and overall quality with quantitative scoring, persona-based testing, automated anti-pattern detection, and actionable feedback. Use when the user asks to review, crit...

- `.claude/skills/critique/SKILL.md`
- `.claude/skills/critique/reference/cognitive-load.md`: Cognitive load is the total mental effort required to use an interface. Overloaded users make mistakes, get frustrated, and leave. This reference helps identify and fix cognitive overload.
- `.claude/skills/critique/reference/heuristics-scoring.md`: Score each of Nielsen's 10 Usability Heuristics on a 0–4 scale. Be honest — a 4 means genuinely excellent, not "good enough."
- `.claude/skills/critique/reference/personas.md`: Test the interface through the eyes of 5 distinct user archetypes. Each persona exposes different failure modes that a single "design director" perspective would miss.

## Frontend Code Review

Trigger when the user requests a review of frontend files (e.g., `.tsx`, `.ts`, `.js`). Support both pending-change reviews and focused file reviews while applying the checklist rules.

- `.claude/skills/frontend-code-review/SKILL.md`
- `.claude/skills/frontend-code-review/references/business-logic.md`: IsUrgent: True
- `.claude/skills/frontend-code-review/references/code-quality.md`: IsUrgent: True Category: Code Quality
- `.claude/skills/frontend-code-review/references/performance.md`: IsUrgent: True Category: Performance

## Design Thinking

Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beaut...

- `.claude/skills/frontend-design/SKILL.md`

## MANDATORY PREPARATION

Performs a final quality pass fixing alignment, spacing, consistency, and micro-detail issues before shipping. Use when the user mentions polish, finishing touches, pre-launch review, something looks off, or wants to go from good to great.

- `.claude/skills/polish/SKILL.md`

## SEO optimization

Optimize for search engine visibility and ranking. Use when asked to "improve SEO", "optimize for search", "fix meta tags", "add structured data", "sitemap optimization", or "search engine optimization".

- `.claude/skills/seo/SKILL.md`

## MANDATORY PREPARATION

Improves typography by fixing font choices, hierarchy, sizing, weight, and readability so text feels intentional. Use when the user mentions fonts, type, readability, text hierarchy, sizing looks off, or wants more polished, intentional typography.

- `.claude/skills/typeset/SKILL.md`

## UI/UX Pro Max - Design Intelligence

UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, and HTML/CSS). Actions: plan, build,...

- `.claude/skills/ui-ux-pro-max/SKILL.md`

<!-- autoskills:end -->
