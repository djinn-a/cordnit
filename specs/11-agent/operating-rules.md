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
