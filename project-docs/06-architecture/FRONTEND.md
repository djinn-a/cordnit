# FRONTEND

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



## Legacy Content (Merged from frontend.md)

# FRONTEND.md — Frontend Architecture

## Framework & Language
- **Next.js (App Router):** The definitive framework for this project. Utilizes React Server Components for maximum performance and SEO.
- **TypeScript:** Enforced in strict mode. All GraphQL responses, component props, and API payloads must be fully typed.

## Styling & Design System
- **Tailwind CSS:** Used for utility-first styling.
- **Design Tokens:** Tailwind's configuration (`tailwind.config.ts`) must be extended using a strict design token system. Components may only consume these tokens; hardcoded hex colors or arbitrary pixel values inside `.tsx` files are forbidden.

## Data Fetching
- **Server Components:** Prefer native `fetch` combined with Next.js caching and revalidation logic inside Server Components to query the GraphQL API.
- **Client Components:** For highly interactive components requiring client-side data mutation or fetching, use standard fetch wrappers or an established client (like Apollo Client or React Query) configured to hit the internal GraphQL endpoint.

## State Management
- Minimize global state. Use URL query parameters for filter state (e.g., on the Insights hub) to ensure deep-linking and SEO compatibility.
- Use React Context only for lightweight, global UI state (e.g., mobile menu toggles, theme preferences if dark mode is later added).

