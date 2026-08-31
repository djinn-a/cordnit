# DATA-FLOW.md — System & Data Flow

This document maps the flow of data across the Cordinit architecture, ensuring clear separation of concerns between presentation, API, and storage layers.

## Architecture Diagram

```text
       [ User Browser / Device ]
                 |
                 | (HTTP / React Server Components / Client fetch)
                 v
   [ Next.js App Router (Frontend) ]
                 |
                 | (GraphQL Queries / Mutations via internal fetch)
                 v
[ GraphQL API Layer / Next.js Route Handlers ]
       |                            |
       | (Content Reads)            | (Transactional Writes)
       v                            v
[ Headless CMS ]              [ Supabase (PostgreSQL) ]
 (Sanity/Strapi)               (Leads, Subscribers, Audit)
                                    |
                                    v
                          [ External Services ]
                        (SendGrid, Webhooks, CRM)
```

## Storage Responsibilities

### 1. Headless CMS (The Content Engine)
- **Stores:** All marketing copy, Solutions taxonomies, Insights articles, case studies, employee profiles, and SEO metadata.
- **Flow:** Read-heavy. The GraphQL API fetches this content during Next.js build time (SSG) or request time (SSR) to render the public pages.

### 2. Supabase (The Transaction Engine)
- **Stores:** User-generated data. Contact form submissions (`leads`), email captures (`newsletter_subscribers`), and gated asset downloads.
- **Flow:** Write-heavy for the public site. Forms send GraphQL mutations to the API layer. The API validates the hCaptcha token, sanitizes input, and writes securely to Supabase using a service-role context.

### 3. Client Components
- **Flow:** Client Components may call the GraphQL API endpoints (e.g., for submitting a form without a page reload or fetching filtered results dynamically). They must never instantiate a direct Supabase client or CMS client.
