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

Static HTML/CSS (no build tools yet). Next.js will be added at deliverable E4.

```bash
# Current: open index.html directly in browser
# After Next.js setup (E4):
npm install
npm run dev      # dev server
npm run build    # production build
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
