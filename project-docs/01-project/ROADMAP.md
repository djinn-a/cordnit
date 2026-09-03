# ROADMAP

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



## Legacy Content (Merged from future-platform.md)

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



## Legacy Content (Merged from 07-future-compatibility.md)

# Forward Compatibility & Scaling Strategy (Read Before Building)

The Cordinit Master Blueprint outlines a long-term vision that extends far beyond this Phase 1 public marketing website. Future phases include a fully-fledged CRM, a logged-in Client Portal, an Admin Dashboard, and an AI Workspace. 

To avoid costly rework, technical debt, and data silos, the architecture implemented today must adhere to the following forward-compatibility principles.

## 1. API-First Foundation
**The Requirement**: The frontend must never communicate directly with the database. All dynamic data flows (form submissions, newsletter signups, gated content requests) must pass through a dedicated, internal API layer (GraphQL/REST).
**Why it Matters for the Future**: 
When Cordinit builds a mobile app or a secure Client Portal in Phase 2, those new frontends will need to access the same logic. By building an API layer now, future applications can simply consume the existing endpoints. The API acts as the central brain of the Cordinit digital ecosystem.

## 2. Authentication System Readiness
**The Requirement**: While Phase 1 does not require user accounts or login screens for the public, the API layer and database schema must be designed with an authentication layer in mind.
**Why it Matters for the Future**:
When the Client Portal launches, users will need to authenticate via JWT or OAuth. By utilizing Supabase now, we inherit an enterprise-grade Auth module. Developers must ensure that API endpoints are structured so that adding Authorization headers (Role-Based Access Control) in the future is a matter of configuration, not restructuring.

## 3. CRM-Ready Data Schema
**The Requirement**: Do not build contact forms that simply bundle data into an email and discard the original input. 
**Why it Matters for the Future**:
All incoming leads, contact requests, and gated-content downloads must be stored in a highly structured, normalized database (Supabase). 
- A table structure (e.g., `Leads`, `Interactions`, `Company`) should be designed now.
- When Phase 2 (CRM) begins, the engineering team will already have a rich, structured dataset to query and build dashboards around, rather than starting from zero or trying to parse thousands of old emails.

## 4. Standalone Design System (UI Component Library)
**The Requirement**: The Tailwind component library (Buttons, Cards, Modals, Typography scales) should be built as a distinct, reusable internal library.
**Why it Matters for the Future**:
The future Admin Dashboard and Client Portal must look and feel identical to the marketing site, maintaining brand trust. If components are deeply entangled with Next.js marketing page logic, they cannot be reused. Building them as isolated, "dumb" UI components (potentially documented in Storybook) ensures the team can rapidly spin up new products using the exact same visual building blocks.

## 5. Extensible CMS Modeling
**The Requirement**: The Headless CMS schemas must be highly relational and not hardcoded to specific page layouts.
**Why it Matters for the Future**:
Content like "Insights" or "Service Definitions" will be reused inside the future AI Workspace (to train LLMs or provide RAG capabilities) and inside the Client Portal. Treat content as modular data objects, not just "text on a webpage". Use reference fields extensively (e.g., An Insight *references* a Solution, rather than just linking to it via a URL string).

