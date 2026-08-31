# FUTURE-PLATFORM.md — Forward Compatibility Mandates

The defining characteristic of the Cordinit project is that Phase 1 (Marketing Website) must lay the groundwork for Phase 2+ (CRM, Client Portal, Admin Dashboard, AI Workspace). 

Agents and developers must read this document before making structural decisions to avoid future rework.

## 1. Authentication System Readiness
While the public site does not require user accounts, the underlying database must be ready for them.
- Supabase schemas should anticipate relating to `auth.users`. 
- For example, the `leads` table includes an `assigned_to` UUID column, anticipating the future creation of internal staff accounts. A `profiles` table scaffold exists to link future portal users.

## 2. API-First Foundation
By routing every dynamic feature (forms, Insight feeds, Solution hierarchies) through a GraphQL API today, we ensure that:
- Tomorrow's native mobile app can consume the exact same data without scraping HTML.
- The future Client Portal can fetch user data using the same authentication and endpoint patterns.

## 3. CRM-Ready Data Architecture
Contact form submissions and newsletter signups are not simply emailed and discarded.
- They are stored in highly structured Supabase tables.
- They include UTM parameters, `page_path`, IP hashing, and timestamps.
- They are automatically deduplicated.
- **Why?** Because in Phase 2, the Cordinit CRM will connect directly to this Postgres database. If the data is unstructured, the CRM cannot ingest it.

## 4. Portable Design System
The visual components built for the marketing site must be entirely decoupled from Next.js routing logic.
- They must accept generic props.
- They must rely strictly on Tailwind classes fueled by CSS variables (design tokens).
- **Why?** The Admin Dashboard and Client Portal will be distinct applications (potentially separate Next.js or React SPAs). They must be able to import the `components/ui` library to maintain brand consistency effortlessly.
