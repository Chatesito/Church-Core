---
name: multi-tenant-architecture
description: Guidelines for building a white-label, multi-tenant church platform using Next.js App Router, Middleware, and Supabase RLS. Use when setting up subdomains, dynamic theming, or tenant isolation.
---

# Multi-Tenant Architecture (White-Label Church Platform)

This project is a multi-tenant platform. A single codebase serves multiple churches (tenants), starting with "San Juan Maria Vianney". 

## 1. Tenant Resolution (Middleware)
- Use Next.js Middleware (`middleware.ts` or `proxy.ts`) to intercept requests.
- Extract the hostname/subdomain (e.g., `sanjuan.midominio.com` -> `tenant: sanjuan`).
- Rewrite the URL internally to a dynamic route like `/app/[tenantId]/page.tsx` without changing the URL shown in the user's browser.

## 2. Dynamic Theming (Tailwind CSS)
- **NEVER hardcode colors** like `bg-yellow-500` for a specific church.
- Rely on the `tailwind-design-system` skill using CSS variables: `bg-primary`, `text-secondary`.
- Fetch the tenant's color palette from the database on the server and inject it as CSS variables in the root HTML or layout wrapper.
- Example: San Juan Maria Vianney uses Gold (Primary) and Black (Secondary).

## 3. Data Isolation (Supabase RLS)
- Every table in Supabase must have a `tenant_id` column.
- Row Level Security (RLS) must be STRICT. Ensure that queries automatically filter by the active `tenant_id`.
- Never allow a Parish Admin from Church A to see or edit data from Church B.

## 4. Asset Management
- Logos and images must be fetched from Supabase Storage grouped by `tenant_id`.
- Use generic fallbacks if a tenant is missing a specific image.