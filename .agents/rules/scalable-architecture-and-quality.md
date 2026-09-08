---
trigger: always_on
---

# Scalable Architecture and Code Quality Rules

This document outlines the strict architecture, modularity, and code quality rules that **MUST** be adhered to by all agents working in this repository.

## 1. Responsive & Styling Ownership (Tailwind)

**1.1 Centralized Responsive Breakpoints**
All responsive breakpoints (`screens`) MUST be defined exclusively in `tailwind.config.ts`. Avoid arbitrary media queries or custom React hooks for viewport checks unless absolutely necessary for complex logic. 

**1.2 Tailwind Class Preference over Custom CSS**
Strictly use Tailwind classes. Custom CSS or inline styles (`style={{}}`) are forbidden unless targeting dynamic runtime calculations (like positioning based on mouse coordinates) that Tailwind cannot handle. 

**1.3 Design Token Ownership**
Colors, typography scales, spacing, and animations must be defined as tokens in `tailwind.config.ts` and reused systemically. **DO NOT** use arbitrary tailwind values (e.g. `w-[42px]`) if the value represents a reusable system concept. If it's reusable, add it to `tailwind.config.ts` first. (Refer to `tailwind-reuse.md`).

**1.4 Fluid Typography and Spacing**
For ultimate maintainability and robustness, prefer using fluid typography and spacing tokens in `tailwind.config.ts` (e.g., using `clamp()`). Use standard breakpoint prefixes (`sm:`, `md:`, `lg:`) primarily for macro-layout shifts (grids, flex-direction) rather than micromanaging every padding or font-size at every screen size.

## 2. Architecture & Modularity (SSR / CSR)

**2.1 Strict Server-Client Boundary**
Clearly separate Server Components (SSR/RSC) from Client Components (`"use client"`). Push `"use client"` boundaries as deep down the component tree as possible (to the leaf nodes) to maximize server-side rendering benefits.

**2.2 Feature-Sliced Design (FSD)**
The folder structure MUST follow a Feature-Sliced paradigm. Organize code by feature domains (e.g., `src/features/auth`, `src/features/admin`, `src/features/dashboard`) rather than grouping everything by technical layers (e.g., avoiding massive `src/components` or `src/hooks` folders). Each feature should be self-contained with its own `components`, `api`, `utils`, and `store`.

**2.3 Separation of Concerns (Container/Presenter)**
Separate data-fetching and business logic (Container - Server Components) from UI rendering (Presenter - Client/Server Components). Data fetching logic (API calls, DB queries) MUST NOT be mixed inside UI components. Use dedicated service or repository modules inside the feature's `api/` folder.

**2.4 Hybrid Data Fetching Strategy**
Use the best data fetching strategy for the use-case:
- Use Server Components fetching directly for static or initial page loads.
- Use Server Actions for form mutations and secure backend executions from the client.
- Use traditional API routes (`/api`) only when exposing endpoints to external clients or handling webhooks.

**2.5 Stateless Core UI Components**
Make core, reusable UI components pure, stateless, and unaware of business logic or data fetching. Pass data via explicit props.

**2.6 Prudent Component Decoupling (No Premature Abstraction)**
Do not tightly decouple Frontend components for reusability if it only creates complexity without genuine reuse value. It is better to have slightly duplicated code than an overly complex, generalized component that handles too many edge cases and is hard to maintain.

**2.7 Scalable Global State (Zustand)**
Use local state (`useState`) for isolated UI state. When global client-side state is genuinely required, use **Zustand**. Keep server state (fetched data) out of the global client state; rely on Server Components, React Query, or SWR for caching server data instead.

**2.8 Strict Error Boundaries & Suspense**
Implement a strict page-level and component-level standard for loading and error states. Use `<Suspense fallback={<Loading />}>` for async components and wrap volatile components in `<ErrorBoundary>` to ensure the app never crashes entirely.

## 3. Code Quality & Maintainability

**3.1 Strict TypeScript Typing**
Use absolute strict typing. **No `any` types allowed.** Define clear interfaces/types for all API responses, props, and component state.

**3.2 Pure Functions and Immutability**
Write pure functions for utility logic. Do not mutate objects/arrays directly; use immutable operations (e.g., map, filter, spread operators).

**3.3 Avoid Deep Nesting & High Cyclomatic Complexity**
Keep component rendering trees shallow and readable. If a single component file grows beyond ~150-200 lines, carefully consider if it should be extracted into smaller sub-components or custom hooks.

**3.4 Consistent Naming Conventions**
Enforce strict naming conventions:
- `PascalCase` for React components and Interfaces/Types.
- `camelCase` for variables, functions, and custom hooks.
- `UPPER_SNAKE_CASE` for constants.
- Descriptive verbs for actions (e.g., `handleUpdate`, `fetchUser`).

**3.5 No Magic Numbers or Strings**
Extract all magic numbers, configuration values, and repeated strings into constants files or environment variables.

**3.6 Export Boundaries (Barrel Files)**
Use `index.ts` (barrel files) at the feature folder level to explicitly define what a module exports to the rest of the application. Treat anything not exported by `index.ts` as private internal logic to that feature.

**3.7 Automated Testing Preparedness**
Write code in a highly testable manner (dependency injection for side effects, pure functions) to ensure scaling does not break existing functionality, even if tests aren't immediately written.

**3.8 Performance & Memoization**
Strategically use `useMemo`, `useCallback`, and `React.memo` for expensive operations or to prevent unnecessary re-renders in large lists or complex UI, without falling into the trap of premature optimization.

**3.9 Self-Documenting Code & JSDoc**
Write clear, self-documenting code. Use JSDoc comments to describe the purpose, inputs, and outputs of complex utility functions, API services, and shared components.
