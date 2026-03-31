# ChurchCore - AI Agent Guidelines

## 1. Project Vision
Scalable "White-label" (multi-tenant) platform for Catholic parishes (starting with San Juan Maria Vianney Parish). 
The goal is to create a single codebase that allows customizing styles (colors, logos) and content per church without duplicating code.

## 2. Tech Stack (Strict)
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict mode - NO ANY)
- **Styling:** Tailwind CSS v4 (based on dynamic CSS variables)
- **Architecture:** Feature-Sliced Design / Screaming Architecture / Multi-tenant via Middleware
- **Backend/DB:** Supabase (PostgreSQL, Auth, Storage, RLS)

## 3. Architecture & Code Rules (SOLID Principles)
- **SRP (Single Responsibility):** Each component does ONE thing. Strict separation of UI and Logic.
- **ISP (Interface Segregation):** The AI MUST NOT read all manuals at once. It must consult the Skills table (below) to load only the necessary context.
- **Avoid Immediacy:** Prioritize clean, strictly typed, and scalable code over quick fixes. Do not hardcode colors or liturgical texts.
- **Git Protocol:** DO NOT create commits or push changes unless explicitly requested by the user. Always ask for permission first.

## 4. Skills Routing Table (Context Routing)
⚠️ **AI INSTRUCTION:** DO NOT load all context into memory at once. Use this table to know which folder to read in `docs/skills/` based on the task you are executing.

| Context / Task to Perform                   | Folder to Consult                               |
| :------------------------------------------ | :---------------------------------------------- |
| **Business Architecture (Multi-tenant)**    | `docs/skills/multi-tenant-architecture/`        |
| **Parish Logic (Gospel, Schedules)**        | `docs/skills/church-domain-logic/`              |
| **Next.js (App Router, Server Components)** | `docs/skills/next-best-practices/`              |
| **Next.js Cache and PPR (v16+)**            | `docs/skills/next-cache-components/`            |
| **Database and Postgres (Types, RLS)**      | `docs/skills/supabase-postgres-best-practices/` |
| **Authentication (Supabase + Next.js)**     | `docs/skills/nextjs-supabase-auth/`             |
| **Styles and Components (Tailwind v4)**     | `docs/skills/tailwind-design-system/`           |
| **UI/UX and Accessibility Rules**           | `docs/skills/ui-ux-pro-max/`                    |
| **Complex Typing in TypeScript**            | `docs/skills/typescript-advanced-types/`        |
| **Find/Install new tools**                  | `docs/skills/find-skills/`                      |

---
**Note for the AI:** If the user asks for a feature, first think: "Does it affect design? (read tailwind). Does it affect the DB? (read supabase)". Be surgical with your memory.