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
