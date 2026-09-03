# README

## Purpose
This directory is responsible for containing all documentation related to readme.

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



## Legacy Content (Merged from operating-rules.md)

# OPERATING-RULES.md — Strict Agent Constraints

These rules map directly to the non-negotiable constraints outlined in `00-project/constraints.md` and the architecture defined in `01-architecture`.

## 1. Dependency Management (Strictly Forbidden)
Agents are **strictly forbidden** from installing new `npm` dependencies (e.g., `npm install <package>`) without explicit human authorization.
- **Why?** Unvetted dependencies introduce security vulnerabilities, bundle bloat, and architectural drift.
- **Action:** If a task requires a new library, the Agent must halt, explain *why* it is necessary, provide alternatives using existing native code, and await a human `Proceed` command.

## 2. API-First Mandate Enforcement
Agents must never bypass the API layer.
- Do not write `import { supabase } from '@/lib/supabase'` inside a `.tsx` file that renders a UI component.
- All data interactions must go through the GraphQL API or Next.js Route Handlers.

## 3. UI Token Compliance
Agents generating UI components must ONLY use Tailwind classes defined in the design token system.
- **Banned:** `text-[#FF5733]`, `w-[324px]`, `p-[11px]`.
- **Required:** `text-brand-primary`, `max-w-md`, `p-4`.

## 4. Documentation Integrity
If an Agent updates a feature or schema, it MUST proactively update the corresponding Markdown documentation in the `specs/` directory to ensure the codebase remains self-documenting.



## Legacy Content (Merged from code-generation.md)

# CODE-GENERATION.md — Quality & Error Handling Standards

When an Agent is authorized to write or modify code, it must adhere to production-level standards. Prototype-quality code is unacceptable.

## 1. Strict TypeScript
- **No `any`.** Agents must define precise interfaces or rely on generated GraphQL/Supabase types.
- Ensure `tsconfig.json` strict mode is respected. Fix type errors rather than ignoring them with `@ts-ignore`.

## 2. Robust Error Handling (Edge Cases)
Agents must anticipate failure points.
- Wrap all network requests, database transactions, and file system operations in `try/catch` blocks.
- **Never expose raw stack traces.** If an error occurs, map it to a standard, user-friendly JSON response format: `{ error: true, code: "VALIDATION_FAILED", details: "..." }`.
- Ensure Next.js API routes return appropriate HTTP status codes (`400` for bad input, `401` for auth, `403` for forbidden, `500` for server error).

## 3. Descriptive Logging
- Ensure `console.error` logs on the server side are highly descriptive for debugging (e.g., `console.error("[GraphQL Mutation: CreateLead] Failed to upsert to Supabase", err)`).

## 4. Idempotency First
- When writing data-mutating logic, Agents must design the function to be idempotent (safe to retry multiple times without causing duplicate records or corruption).



## Legacy Content (Merged from conflict-resolution.md)

# CONFLICT-RESOLUTION.md — Prompt vs. Spec Arbitration

Agents will occasionally encounter a scenario where the Human Operator's prompt explicitly requests something that violates the established `specs/`. 

## The Resolution Protocol

**Specs Override Prompts.**

The AI Agent must treat the `specs/` directory as the immutable system of record. If a user asks the Agent to violate a core constraint (e.g., "Just fetch this directly from Supabase on the homepage to save time"), the Agent must:

1. **Halt Execution.** Do not write the violating code.
2. **Flag the Contradiction.** Point out exactly which spec file (e.g., `01-architecture/api-first.md`) forbids the requested action.
3. **Offer the Compliant Alternative.** Explain how to achieve the goal while adhering to the specs (e.g., "I must route this through the GraphQL API instead. Shall I scaffold the Route Handler?").
4. **Require Explicit Override.** If the user truly intends to break the rules, they must explicitly state: *"I acknowledge the spec violation. Proceed anyway."* Only then may the Agent comply.



## Legacy Content (Merged from overview.md)

# OVERVIEW.md — AI Agent Operations

## The Purpose of this Directory
The `specs/11-agent` directory acts as the absolute operational law for any AI coding assistant (like Antigravity) working within the Cordinit repository. 

AI Agents possess vast pre-trained knowledge, but that knowledge is general. This repository is highly specific. When interacting with this codebase, Agents must suppress their generalized assumptions and strictly adhere to the localized constraints defined in the `specs/` taxonomy.

## Prime Directive
**Before writing any code, modifying any schema, or installing any package, the Agent MUST verify its intended actions against the relevant `specs/` documentation.**

If an Agent operates blindly and introduces technical debt, architectural violations (e.g., direct Supabase queries from the client), or unapproved dependencies, it has failed its primary objective.

