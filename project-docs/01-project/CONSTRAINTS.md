# CONSTRAINTS

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



## Legacy Content (Merged from constraints.md)

# CONSTRAINTS.md — Non-Negotiable Engineering Rules

This document outlines the absolute technical boundaries for the Cordinit project. Senior engineers and autonomous agents must strictly abide by these rules. Violations will block PR merges.

## 1. Zero Direct Database Queries from the Client
- **Rule:** React Components (both Server and Client) are strictly forbidden from instantiating a Supabase client or a CMS SDK client to perform direct database queries.
- **Enforcement:** All data fetching must travel through the internal GraphQL API layer or isolated Next.js Route Handlers.
- **Why?** To preserve the API-First mandate for future platforms (Mobile, Client Portal) and to prevent accidental leakage of database schemas or service-role keys.

## 2. Zero Hardcoded Content
- **Rule:** No marketing copy, button labels, or taxonomy categories may be hardcoded into the `.tsx` files.
- **Enforcement:** Everything must be queryable from the Headless CMS.
- **Why?** Marketing teams must be able to change positioning without triggering an engineering deployment.

## 3. Zero Hardcoded Styling Values
- **Rule:** The use of arbitrary hex codes (e.g., `text-[#1a2b3c]`) or arbitrary pixel values (e.g., `p-[23px]`) in Tailwind classes is strictly forbidden.
- **Enforcement:** Developers must use the predefined design tokens from `tailwind.config.ts`.
- **Why?** Design consistency and future portability to the Admin Dashboard.

## 4. Production Error Handling Mandate
- **Rule:** The application must never expose technical errors, stack traces, or database connection strings to the end user.
- **Enforcement:** 
  - Wrap all API Route Handlers in `try/catch` blocks.
  - Return standardized JSON error shapes (e.g., `{ error: "Validation failed", details: [...] }`).
  - Use Next.js `error.tsx` boundaries to capture React rendering errors gracefully.
  - **Fallback state:** If a third-party service (like a Newsletter provider) is down, log the error to the audit table and display a generic success or retry message to the user, rather than a broken page.

