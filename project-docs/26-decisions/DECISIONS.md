# DECISIONS

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



## Legacy Content (Merged from DECISIONS.md)

# DECISIONS.md — Architecture & Product Decision Log

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-08-26 | Use Next.js App Router + TypeScript | SSR/SSG, React Server Components, strong typing | Accepted |
| 2026-08-26 | Headless CMS for all marketing content | Non-dev editing + reusable API later | Accepted (Sanity selected) |
| 2026-08-26 | Supabase for leads and newsletter | Structured, queryable, CRM-ready | Accepted |
| 2026-08-26 | API-first boundary (no direct DB from frontend) | Forward compatibility with portal and mobile | Accepted |
| 2026-08-26 | Single Service content type with nullable parent | Supports deep and flat practices without code changes | Accepted |
| 2026-08-26 | Google Analytics 4 with consent support | Standard analytics + legal flexibility | Accepted |
| 2026-08-26 | Dark mode out of scope for v1 | Explicit brief guidance | Accepted until design overrides |
| 2026-08-26 | Restructure into modular `/specs` folders | Better agent context loading | Accepted |

Add new rows whenever a significant technical or product decision is made.

