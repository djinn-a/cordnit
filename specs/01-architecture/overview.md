# OVERVIEW.md — Architecture Overview

## Foundational Architecture Principles

The Cordinit corporate website is not a standalone brochure; it is the cornerstone of a future SaaS ecosystem encompassing a CRM, Client Portal, Admin Dashboard, and AI Workspace. Consequently, the architecture implemented in Phase 1 (the marketing website) must strictly adhere to the following principles.

### 1. The Stack
- **Frontend:** Next.js (App Router) leveraging React Server Components.
- **Language:** TypeScript in strict mode.
- **Styling:** Tailwind CSS integrated with a strict design token system.
- **API Layer:** GraphQL, serving as the sole communication bridge.
- **Content:** Headless CMS (Sanity, Strapi, or Payload).
- **Database:** Supabase (PostgreSQL) for transactional and lead data.
- **Analytics:** Google Analytics 4 (GA4) with consent mode.

### 2. Decoupled Frontend + API-First Backend
The public website is a **Next.js frontend** that communicates exclusively through a **GraphQL API layer**. 
- The Next.js application does not know about the underlying database structures.
- The GraphQL API abstracts calls to the Headless CMS (for marketing content) and Supabase (for lead/newsletter capture).

**Forbidden Anti-Patterns:**
- Direct Supabase client calls from React Client Components or Server Components that render public pages.
- Direct CMS database queries from the frontend without passing through the typed GraphQL API or typed Next.js Route Handlers acting as the API boundary.
- Embedding core business logic or data transformation directly inside UI components.

### 3. Forward Compatibility
Every structural decision made today must seamlessly scale for tomorrow.
- **Auth Readiness:** While Phase 1 does not feature public user login, the API and database schema must be structured to accommodate JWT/OAuth (via Supabase Auth) without a rewrite.
- **CRM Readiness:** Lead data is captured into normalized, queryable Postgres tables designed for bidirectional CRM sync, rather than firing off unrecorded emails.
- **Design System Portability:** Components are built purely on design tokens so the future Admin Dashboard and Client Portal can reuse the exact same library.
