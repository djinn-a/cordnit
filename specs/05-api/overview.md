# OVERVIEW.md — API-First Boundary

**Responsibility:** Route Handlers / GraphQL boundary; createLead, newsletter, search, revalidate.
**Source:** Project Brief Sections 4, 7, 11

## 1. API-First Enforcement
- Frontend components, pages, and client-side code must never perform direct database queries against Supabase or the headless CMS.
- All data access must travel through an internal API layer (Next.js Route Handlers, typed GraphQL client, or equivalent).

## 2. Mutations Required in Phase 1
- `createLead`
- `subscribeNewsletter`
- `requestGatedDownload` (if gated content is confirmed)

All mutations must validate input, verify hCaptcha, apply rate limiting, persist to Supabase, trigger confirmation email + internal notification, and return a clean success/error payload.
