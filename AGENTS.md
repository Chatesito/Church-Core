# ChurchCore - AI Agent Guidelines

## 1. Project Overview

**ChurchCore** is a **multi-tenant (white-label) platform for Catholic parishes**. 

The first tenant is **Parroquia San Juan María Vianney** (Neiva, Huila, Colombia). The platform serves multiple churches from a single codebase, allowing each parish to customize their branding, content, and configuration **without touching code**.

### Initial Scope (San Juan María Vianney Mockup)
The platform includes these sections (reference mockup in `docs/mockups/san-juan-maria-vianney/`):
- **HomeSection**: Hero slider, church info, Mass schedules, photo gallery, embedded map
- **DailyReadingsSection**: 4 liturgical readings per day (First Reading, Psalm, Second Reading, Gospel) with **long variable text**
- **EventsSection**: Special occasions (5+ events with modals for details)
- **LearnMoreSection**: Parish team members, ministry groups, weekly Parish Life activities table
- **Footer & Navbar**: Contact info, social links, dropdown navigation

### Multi-Tenant Vision

| Aspect | Per-Tenant (Customizable) | Global (Shared) |
|--------|---------------------------|-----------------|
| **Branding** | Colors, logos, parish name, contact info | — |
| **Content** | Events, groups, members, schedules, gallery | Daily readings, Saint of the day, Liturgical calendar |
| **Setup** | Supabase config only (zero-code) | Platform codebase (Next.js) |
| **Management** | Parish Admin (priest/secretary) via web panel | SuperAdmin (us) |

**Key Principle:** Adding a new parish = creating records in Supabase (`tenant_id`, theme config, schedules). **Zero code changes required.**

---

## 2. Tech Stack (Strict - Non-Negotiable)

- **Framework:** Next.js 15+ (App Router, React Server Components)
- **Language:** TypeScript (Strict mode - **NO `any` types allowed**)
- **Styling:** Tailwind CSS v4 (**CSS variables for theming**, no hardcoded colors)
- **Architecture:** Feature-Sliced Design (FSD) / Screaming Architecture
- **Backend/DB:** Supabase (PostgreSQL + Auth + Storage + Row Level Security)
- **Multi-Tenancy:** Next.js Middleware for tenant resolution + Supabase RLS for data isolation
- **Text Measurement:** Pretext (`@chenglou/pretext`) — For truncating long text, responsive typography, and multi-column balancing

---

## 3. Catholic Parish Domain Logic (Core Context)

### 3.1. Terminology (Use Exact Terms)
- **Parish Life (Vida Parroquial)**: Recurring religious activities with strict schedules (e.g., Holy Hour / Hora Santa, First Saturdays / Primeros Sábados, Rosary). **NOT generic "events"**.
- **Events (Eventos)**: One-time or special occasions (e.g., Patronal Feasts, Parish Bingos, Retreats).
- **Liturgical Readings (Lecturas del Día)**: Includes First Reading, Responsorial Psalm, Second Reading (optional), and Daily Gospel.
- **Parish Team (Miembros de la Iglesia)**: Hierarchy including Priest (Párroco), Deacon (Diácono), Secretary (Secretaria), Musicians (Músicos/Coro).

### 3.2. User Roles
- **SuperAdmin** (us): Platform owner. Can create new tenants, assign global features, deploy code.
- **ParishAdmin**: Priest or Secretary. Can edit local content (events, groups, members, schedules) via web admin panel. **Cannot touch code or platform settings.**
- **Parishioner (Feligrés)**: End-user visiting the site. Read-only access to public data (readings, schedules, events).

### 3.3. Automation Strategy (Zero-Touch for Clergy)
- **Daily Liturgical Readings**: **100% automatic**. System fetches readings from a reliable Catholic API or scheduled scraper (e.g., EWTN, Ciudad Redonda) via CRON job. Priests/secretaries **NEVER type readings manually**.
- **Saint of the Day (Santo del Día)**: Same automatic strategy as readings.
- **Parish-Specific Content**: Parish Admins manage via web panel (events, groups, schedules) — **no code access required**.

### 3.4. UI/UX Considerations
- **Target Audience**: Includes elderly parishioners.
- **Accessibility is MANDATORY**: High contrast (especially Gold/Black palette), readable font sizes (16px minimum), straightforward navigation.
- **Long Variable Text**: Daily readings can be **very long** (500+ words per reading). Design must handle overflow gracefully (scroll, truncation with "Read More", responsive typography).

---

## 4. Multi-Tenant Architecture Rules

### 4.1. Tenant Resolution (Next.js Middleware)
- Use Next.js Middleware (`middleware.ts`) to intercept requests.
- Extract hostname/subdomain (e.g., `sanjuan.midominio.com` → `tenant: sanjuan`).
- Rewrite URL internally to dynamic route (e.g., `/app/[tenantId]/page.tsx`) without changing the browser URL.

### 4.2. Dynamic Theming (Tailwind CSS v4)
- **NEVER hardcode colors** like `bg-yellow-500` for a specific church.
- Use CSS variables: `bg-primary`, `text-secondary`, `bg-accent`.
- Fetch tenant's color palette from database on the server and inject as CSS variables in root layout.
- Example: San Juan María Vianney uses **Gold (Primary)** and **Black (Secondary)**.

### 4.3. Data Isolation (Supabase RLS)
- **Every table must have a `tenant_id` column.**
- **Row Level Security (RLS) is STRICT**: Queries automatically filter by active `tenant_id`.
- **Never allow Parish Admin from Church A to see/edit data from Church B.**

### 4.4. Asset Management
- Logos and images stored in Supabase Storage, grouped by `tenant_id`.
- Use generic fallbacks if tenant is missing a specific image.

---

## 5. Architecture & Code Rules (SOLID Principles)

- **SRP (Single Responsibility):** Each component does ONE thing. Strict separation of UI and Business Logic.
- **OCP (Open/Closed):** Use composition and configuration (not modification) to extend features per tenant.
- **LSP (Liskov Substitution):** Tenant-specific implementations must conform to shared interfaces.
- **ISP (Interface Segregation):** **AI MUST NOT load all documentation at once.** Use the Skills Routing Table (below) to load only necessary context.
- **DCP (Dependency Inversion):** Business logic depends on abstractions, not Supabase implementation details.

### Code Quality Rules
- **Avoid Immediacy:** Prioritize clean, strictly typed, scalable code over quick fixes.
- **No Hardcoding:** No hardcoded colors, liturgical texts, or tenant-specific data in components.
- **TypeScript Strict:** NO `any` types. Use proper generics and type inference.
- **Feature-Sliced Design:** Follow FSD structure (`entities/`, `features/`, `pages-flat/`, `shared/`, `widgets/`).

### Git Protocol
- **DO NOT create commits or push changes unless explicitly requested by the user.**
- Always ask for permission first.
- Use conventional commits when creating commits.

---

## 6. Skills Routing Table (Context Routing for AI)

⚠️ **AI INSTRUCTION:** DO NOT load all context into memory at once. Use this table to know which folder to read in `docs/skills/` based on the task you are executing.

| Context / Task to Perform                   | Folder to Consult                               |
| :------------------------------------------ | :---------------------------------------------- |
| **Multi-Tenant Setup (Middleware, RLS)**    | `docs/skills/multi-tenant-architecture/`        |
| **Next.js (App Router, Server Components)** | `docs/skills/next-best-practices/`              |
| **Next.js Cache and PPR (v16+)**            | `docs/skills/next-cache-components/`            |
| **Database and Postgres (Types, RLS)**      | `docs/skills/supabase-postgres-best-practices/` |
| **Authentication (Supabase + Next.js)**     | `docs/skills/nextjs-supabase-auth/`             |
| **Styles and Components (Tailwind v4)**     | `docs/skills/tailwind-design-system/`           |
| **UI/UX and Accessibility Rules**           | `docs/skills/ui-ux-pro-max/`                    |
| **Complex Typing in TypeScript**            | `docs/skills/typescript-advanced-types/`        |
| **Text Measurement (Truncation, Layout)**   | Pretext docs: https://github.com/chenglou/pretext |
| **Find/Install new tools**                  | `docs/skills/find-skills/`                      |
| **Git Commits (Conventional Commits)**      | `docs/skills/git-commit/`                       |

---

## 7. Reference Materials

- **Initial Mockup:** `docs/mockups/san-juan-maria-vianney/` — Full React implementation of San Juan María Vianney parish site (hero, readings, events, team, footer, navbar).
- **Architecture Skills:** `docs/skills/multi-tenant-architecture/` — Detailed middleware, theming, and RLS guidelines.
- **Domain Vocabulary:** This document (Section 3) — Catholic terminology and automation rules.

---

**Note for the AI:** Before coding, ask yourself:
1. Does this affect **theming**? → Read `tailwind-design-system`
2. Does this affect **database**? → Read `supabase-postgres-best-practices` 
3. Does this affect **multi-tenancy**? → Read `multi-tenant-architecture`
4. Does this involve **Catholic domain logic**? → Reread Section 3 of this document

**Be surgical with your memory. Load only what you need.**
