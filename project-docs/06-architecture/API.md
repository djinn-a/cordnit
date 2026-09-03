# API

## Purpose
Describe the purpose of this document.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from api-first.md)

# API-FIRST.md — The API-First Mandate

## The Boundary Rule (Non-Negotiable)

Frontend components, pages, and client-side code must **never** perform direct database queries against Supabase or the headless CMS. 

All data access—reads and writes—must travel through an internal, typed API layer. For the Cordinit platform, this is defined as a **GraphQL API**, backed by Next.js Route Handlers where necessary for server-side security.

### Why is this critical?
Cordinit's long-term product roadmap includes a Client Portal, a full CRM, and native mobile applications. If the Next.js marketing site connects directly to the databases, that logic is locked inside the Next.js application. 

By defining a strict GraphQL API boundary now:
1. We establish a single source of truth for data access.
2. The future Client Portal can consume the exact same GraphQL endpoints.
3. Security, rate-limiting, and validation rules only need to be written once at the API layer.

### Implementation Guidelines for Agents
- **Reads:** Use GraphQL queries (e.g., via Apollo Client or `graphql-request`) executed inside Next.js React Server Components to fetch page content from the CMS.
- **Writes:** Form submissions (Contact, Newsletter, Gated Downloads) must trigger a GraphQL mutation (`createLead`, `subscribeNewsletter`).
- **Security:** The GraphQL server/handlers run in a trusted server environment. Only this environment possesses the service-role keys required to securely write to Supabase or the CMS. These keys must never leak to the client bundle.

