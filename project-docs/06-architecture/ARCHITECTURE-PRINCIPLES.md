# ARCHITECTURE PRINCIPLES

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



## Legacy Content (Merged from principles.md)

# PRINCIPLES.md — Foundational Engineering Principles

Every line of code and architectural decision must map back to these four principles outlined in the Project Brief.

## 1. Modular & Scalable
- Content types (like Solutions) must be built as reusable, data-driven templates with parent-child relationships, rather than hardcoded one-off pages.
- The Design System must be packaged as reusable primitives (`components/ui`) so that future platforms (Admin Dashboard, Client Portal) can import the exact same visual language.

## 2. API-First
- Frontend separation is non-negotiable. 
- The website is merely one consumer of the Cordinit platform. The GraphQL API is the true product. All data flows through this API.

## 3. Performance First
- **Core Web Vitals are strict requirements:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **Pre-rendering:** Prefer Static Site Generation (SSG) or Server-Side Rendering (SSR) for all indexable marketing content. Avoid heavy client-side JavaScript payloads.
- **Asset Optimization:** Images must be responsive (`srcset`) and served via a CDN. 

## 4. Security by Design
- Assume every form endpoint is actively being targeted by bots. Implement hCaptcha and IP-based rate limiting on all mutations.
- Sanitize all inputs before passing them to the GraphQL API.
- Rely on Row Level Security (RLS) in Supabase as an absolute safeguard, even though the frontend does not connect to it directly.

