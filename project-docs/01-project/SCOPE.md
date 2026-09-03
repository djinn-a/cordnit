# SCOPE

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



## Legacy Content (Merged from scope.md)

# SCOPE.md — Phase Boundaries

To maintain engineering velocity and architectural purity, we strictly define the boundaries of Phase 1. Scope creep into Phase 2 concepts will compromise the launch timeline and introduce technical debt.

## In Scope (Phase 1)
- **Next.js App Router Setup:** Strict React Server Component architecture.
- **Headless CMS Integration:** Fetching Content (Solutions, Industries, Insights) via GraphQL.
- **Supabase Transactional Layer:** Capturing Leads and Newsletter subscriptions.
- **Design System Implementation:** Tailwind CSS fueled by design tokens.
- **Core Web Vitals:** Optimizing LCP, CLS, and INP metrics.
- **Deployment & CI/CD:** Dockerization, Vercel/AWS deployment pipelines, and environment separation.
- **SEO & Analytics:** Metadata generation, sitemap.xml, GA4 implementation.

## Out of Scope (Phase 1)
*Do not write code, schemas, or routing logic for the following. However, ensure the underlying architecture (API layer, PostgreSQL) does not preclude their addition in Phase 2.*

- **User Authentication:** No public login, registration, or JWT-based session management. (Stick to native Next.js/Supabase Service roles for system writes).
- **Client Portal:** No dashboard for clients to view projects or tickets.
- **Admin Dashboard:** Cordinit staff will use the Headless CMS interface and Supabase dashboard directly in Phase 1. We are not building a bespoke admin panel yet.
- **CRM Integration (Bidirectional):** Phase 1 captures leads into Supabase. Pushing these leads into Salesforce/HubSpot is deferred.
- **Careers Page:** Explicitly deferred to keep the initial marketing launch tight.
- **AI Workspace:** Generative AI features (chatbots, document analysis) are Phase 3.

## Edge Case Scope Mitigation
If a design asset implies a feature that is Out of Scope (e.g., a "Login" button in the header mockup), developers MUST override the design and remove the element from the component tree. Do not stub it with a `#` link. If it cannot function, it must not exist in the DOM.

