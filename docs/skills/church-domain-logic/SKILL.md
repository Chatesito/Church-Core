---
name: church-domain-logic
description: Business logic, domain vocabulary, and functional requirements for Catholic church websites. Use when creating database schemas, UI structures, or data fetching strategies related to parish activities.
---

# Church Domain Logic & Terminology

This project models the real-world structure of a Catholic Parish. Use the exact terminology below to maintain consistency across the UI, database, and codebase.

## 1. Core Terminology
- **Parish Life (Vida Parroquial)**: Replaces "Weekly Activities". Refers to recurring religious activities with strict schedules (e.g., Holy Hour / Hora Santa, First Saturdays / Primeros Sábados, Rosary). Do NOT use generic terms like "events" for these.
- **Events (Eventos)**: One-time or special occasions (e.g., Patronal Feasts, Parish Bingos, Retreats).
- **Liturgical Readings (Lecturas del Día)**: Includes First Reading, Responsorial Psalm, Second Reading (if applicable), and the Daily Gospel. 
- **Parish Team (Miembros de la Iglesia)**: The hierarchy of the parish. Includes roles like Priest (Párroco), Deacon (Diácono), Secretary (Secretaria), Musicians (Músicos/Coro).

## 2. Automation Strategy (Zero-Touch for Clergy)
- **Daily Gospel & Readings**: Priests and secretaries will NOT type the daily readings manually. The system must automatically fetch these from a reliable external Catholic API or via a scheduled web scraper (e.g., scraping EWTN or Ciudad Redonda) and store them in the database via a CRON job.
- **Saint of the Day (Santo del Día)**: Handled automatically similar to the liturgical readings.

## 3. User Roles
- **SuperAdmin**: Platform owner (us). Can create new tenants, assign global features.
- **ParishAdmin**: The Priest or Secretary. Can edit local content, manage the Parish Team, and post Events. Cannot touch platform settings.
- **Parishioner (Feligrés)**: The end-user visiting the site to read the Gospel or check Mass schedules. Read-only access to public data.

## 4. UI/UX Considerations
- The target audience includes elderly parishioners. 
- **Accessibility is mandatory**: High contrast (especially with the Gold/Black palette), readable font sizes, and straightforward navigation.
- See the `ui-ux-pro-max` skill for applying accessibility guidelines.