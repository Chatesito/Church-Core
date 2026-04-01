# Skill Registry

**Project**: ChurchCore  
**Generated**: 2026-03-31  
**Source**: Automated scan of project and user skills

This registry consolidates all available skills for AI agents working on this project. Project-level skills override user-level skills with the same name.

---

## Project Conventions

### Primary Index
- **AGENTS.md** — Main AI agent guidelines (sections: Project Overview, Tech Stack, Catholic Parish Domain Logic, Multi-Tenant Architecture Rules, Architecture & Code Rules, Skills Routing Table, Reference Materials)

---

## Project Skills

Skills specific to this project, located in `docs/skills/`.

| Skill | Triggers | Location |
|-------|----------|----------|
| **multi-tenant-architecture** | Multi-tenant setup, middleware, RLS, dynamic theming, tenant isolation | `docs/skills/multi-tenant-architecture/SKILL.md` |
| **typescript-advanced-types** | Complex type logic, generics, conditional types, mapped types, template literals, utility types | `docs/skills/typescript-advanced-types/SKILL.md` |
| **nextjs-supabase-auth** | Supabase auth, Next.js authentication, login, auth middleware, protected routes | `docs/skills/nextjs-supabase-auth/SKILL.md` |
| **supabase-postgres-best-practices** | Writing/reviewing/optimizing Postgres queries, schema designs, database configurations | `docs/skills/supabase-postgres-best-practices/SKILL.md` |
| **tailwind-design-system** | Creating component libraries, implementing design systems, standardizing UI patterns with Tailwind v4 | `docs/skills/tailwind-design-system/SKILL.md` |
| **ui-ux-pro-max** | UI/UX design, color systems, accessibility, animation, layout, typography, font pairing, spacing, shadows, gradients | `docs/skills/ui-ux-pro-max/SKILL.md` |
| **next-cache-components** | Next.js 16 cache components, PPR, use cache directive, cacheLife, cacheTag, updateTag | `docs/skills/next-cache-components/SKILL.md` |
| **next-best-practices** | Next.js file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization | `docs/skills/next-best-practices/SKILL.md` |
| **find-skills** | Discovering and installing agent skills from the open ecosystem | `docs/skills/find-skills/SKILL.md` |

---

## User Skills

Global skills from `C:\Users\Chatesito\.config\opencode\skills\` (SDD-related skills excluded from this table).

| Skill | Triggers | Location |
|-------|----------|----------|
| **judgment-day** | "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | `C:\Users\Chatesito\.config\opencode\skills\judgment-day\SKILL.md` |
| **issue-creation** | Creating GitHub issues, reporting bugs, requesting features (issue-first enforcement) | `C:\Users\Chatesito\.config\opencode\skills\issue-creation\SKILL.md` |
| **branch-pr** | Creating pull requests, opening PRs, preparing changes for review (issue-first enforcement) | `C:\Users\Chatesito\.config\opencode\skills\branch-pr\SKILL.md` |
| **go-testing** | Writing Go tests, using teatest, adding test coverage for Bubbletea TUIs | `C:\Users\Chatesito\.config\opencode\skills\go-testing\SKILL.md` |
| **skill-creator** | Creating new AI skills following the Agent Skills spec | `C:\Users\Chatesito\.config\opencode\skills\skill-creator\SKILL.md` |

---

## Compact Rules

Compact rules are extracted from project skills for injection into sub-agent prompts. These are pre-digested standards that avoid re-reading full SKILL.md files during delegation.

### multi-tenant-architecture

**Code Context**: `middleware.ts`, `proxy.ts`, `[tenantId]`, `tenant_id` columns, Supabase RLS policies  
**Task Context**: Setting up subdomains, dynamic theming, tenant isolation

**Rules**:
- Use Next.js Middleware to intercept requests, extract hostname/subdomain, and rewrite URL to dynamic route (e.g., `/app/[tenantId]/page.tsx`) without changing browser URL
- NEVER hardcode colors for specific churches (e.g., `bg-yellow-500`) — use CSS variables (`bg-primary`, `text-secondary`) and fetch tenant palette from database
- Every Supabase table MUST have `tenant_id` column with strict Row Level Security (RLS) — never allow cross-tenant data access
- Store logos/images in Supabase Storage grouped by `tenant_id`, use generic fallbacks if missing

### typescript-advanced-types

**Code Context**: `.ts`, `.tsx` files with complex generics, conditional types, mapped types, template literal types  
**Task Context**: Implementing type utilities, ensuring compile-time type safety, creating reusable type logic

**Rules**:
- NO `any` types — use proper generics, `unknown`, or branded types
- Use conditional types for type transformations (e.g., `T extends U ? X : Y`)
- Use mapped types to transform object types (e.g., `{ [K in keyof T]: Transform<T[K]> }`)
- Leverage template literal types for string manipulation (e.g., `type EventName<T> = \`on\${Capitalize<T>}\``)
- Use utility types (`Partial`, `Required`, `Pick`, `Omit`, `Record`, etc.) instead of manual implementations

### nextjs-supabase-auth

**Code Context**: Supabase client setup, auth middleware, protected routes, login/signup flows  
**Task Context**: Implementing authentication, protecting routes, handling sessions

**Rules**:
- Use `@supabase/ssr` for Next.js App Router (Server Components, Route Handlers, Middleware)
- Create separate client factories for Server Components (`createServerClient`), Client Components (`createBrowserClient`), and Middleware (`createServerClient` with cookie handling)
- Protect routes with middleware that checks `supabase.auth.getUser()` and redirects unauthenticated users
- Store session in cookies (httpOnly, secure, sameSite) — never in localStorage for SSR apps
- Handle auth state changes client-side with `onAuthStateChange` listener

### supabase-postgres-best-practices

**Code Context**: SQL queries, schema designs, indexes, RLS policies, database configurations  
**Task Context**: Writing/reviewing/optimizing Postgres queries or schemas

**Rules**:
- Always add indexes on foreign keys and frequently queried columns (e.g., `CREATE INDEX idx_table_column ON table(column)`)
- Use partial indexes for filtered queries (e.g., `CREATE INDEX idx_active ON users(id) WHERE active = true`)
- Avoid `SELECT *` — specify columns explicitly to reduce I/O
- Use connection pooling (PgBouncer in transaction mode for short-lived queries, session mode for complex transactions)
- Test RLS policies with `SET ROLE` to verify data isolation before production
- Use `EXPLAIN ANALYZE` to verify query plans and index usage

### tailwind-design-system

**Code Context**: Tailwind v4 CSS, design tokens, component variants, responsive patterns  
**Task Context**: Creating component libraries, implementing design systems, standardizing UI patterns

**Rules**:
- Use CSS-first configuration (`@theme` in CSS files) instead of `tailwind.config.js` for Tailwind v4
- Define design tokens as CSS variables (e.g., `--color-primary`, `--spacing-unit`) and reference in Tailwind classes
- Use `@layer components` for reusable component styles, `@layer utilities` for one-off utilities
- Implement responsive patterns with mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Use `theme()` function to reference design tokens in CSS (e.g., `color: theme('colors.primary')`)
- Never hardcode colors/spacing — always use design tokens for consistency

### ui-ux-pro-max

**Code Context**: UI components, color systems, accessibility attributes, animations, layouts, typography  
**Task Context**: UI/UX design, accessibility implementation, responsive design, interaction states

**Rules**:
- High contrast required (especially Gold/Black palette) — WCAG AA minimum (4.5:1 for text, 3:1 for UI components)
- Readable font sizes: 16px minimum for body text, 18px+ for elderly audiences
- Use semantic HTML (`<button>`, `<nav>`, `<main>`) with ARIA attributes when needed
- Implement focus indicators (visible outlines) for keyboard navigation
- Design for touch targets: 44x44px minimum (iOS), 48x48px (Android)
- Handle long variable text gracefully (scroll, truncation with "Read More", responsive typography)
- Test with screen readers (NVDA, JAWS, VoiceOver) and keyboard-only navigation

### next-cache-components

**Code Context**: Next.js 16+ server components, caching strategies, PPR (Partial Prerendering)  
**Task Context**: Implementing caching, optimizing performance with PPR, managing cache invalidation

**Rules**:
- Enable PPR in `next.config.ts`: `experimental: { ppr: true }`
- Use `use cache` directive at component level for granular caching (replaces per-route caching)
- Use `cacheLife()` profiles: `seconds`, `minutes`, `hours`, `days`, `weeks`, `max` (or custom)
- Use `cacheTag()` for cache invalidation groups (e.g., `cacheTag('posts', 'user-123')`)
- Invalidate cache with `updateTag()` after mutations (Server Actions, Route Handlers)
- Wrap dynamic parts in `<Suspense>` to enable PPR (static + dynamic content in same route)

### next-best-practices

**Code Context**: Next.js App Router, Server Components, Client Components, Route Handlers, layouts, metadata  
**Task Context**: Writing/reviewing Next.js code following official conventions

**Rules**:
- Use Server Components by default — only add `"use client"` when needed (interactivity, browser APIs, hooks)
- Fetch data in Server Components (async/await) — avoid Client Component data fetching when possible
- Use `generateMetadata()` for dynamic metadata (SEO, Open Graph)
- Handle errors with `error.tsx` (client-side) and `global-error.tsx` (root layout errors)
- Use Route Handlers (`route.ts`) for API endpoints — export named functions (`GET`, `POST`, etc.)
- Optimize images with `<Image>` component (automatic lazy loading, responsive, format conversion)
- Optimize fonts with `next/font` (automatic subsetting, preloading, font display swap)
- Use dynamic imports (`next/dynamic`) for code splitting heavy components

---

## Usage Notes

- **Project skills override user skills** with the same name
- **SDD skills** (`sdd-*`) are managed by the orchestrator, not listed here
- **Compact rules** are injected into sub-agent prompts based on code/task context
- **Re-generate this registry** after adding/removing skills or updating AGENTS.md

---

**Last updated**: 2026-03-31 by sdd-init
