# ERROR HANDLING

## Purpose
Define how errors are raised, mapped, logged and shown, so users never see internals and developers always get context.

## Current Status
Approved.

## Contract
```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: ErrorCode; message: string; fieldErrors?: Record<string, string[]> } };
```

| Code | Meaning | UI |
|---|---|---|
| `UNAUTHENTICATED` | No/expired session | Redirect to login |
| `FORBIDDEN` | Signed in without the role | Error message |
| `VALIDATION` | Zod failure | Field errors on the form (`Form.setFields`) |
| `NOT_FOUND` | Entity missing | Message + refresh |
| `CONFLICT` | Unique / FK violation | Field error when the constraint is known |
| `STALE` | `lockVersion` mismatch (another tab) | "Changed elsewhere, reload" notice |
| `RATE_LIMITED` | Reserved | Message |
| `INTERNAL` | Anything unexpected | Generic message; details only in logs |

## Flow
1. Services throw `AppError` via `errors.*` helpers (`server/errors/app-error.ts`). They never catch.
2. `withAction` (`server/actions/with-action.ts`) authenticates, parses input, runs the handler, and catches everything.
3. It calls `unstable_rethrow(err)` first (Next redirects/notFound pass through), then `normalizeError(err)`:
   - `AppError`: exposed message unless `INTERNAL`.
   - `ZodError`: `VALIDATION` with dotted-path field errors.
   - Postgres `23505`: `CONFLICT`, mapped to a field for known constraints (`pages_slug_unique`, `global_blocks_key_unique`, `templates_key_unique`). Walks `err.cause` because Drizzle wraps driver errors.
   - Postgres `23503`: `CONFLICT` ("referenced elsewhere").
   - Anything else: `INTERNAL`, generic message.
4. Logs `action.failed` with the action name, request id, code and duration (`server/logger.ts`, JSON lines): `error` for `INTERNAL`, `warn` otherwise. Success logs `action.ok`. Input arguments are never logged, and Next's own Server Function logging is disabled (`logging.serverFunctions: false`) because it prints arguments, passwords included.

## Routes
- `error.tsx` boundaries in `(site)` and the admin dashboard; `not-found.tsx` in the admin.
- `proxy.ts` answers unknown public URLs with a real 404 (rewrite to `/cms-404`) and redirects with their real status (see [CACHING.md](CACHING.md)). If the gate's database read fails, it fails open.
- The public catch-all still 404s on unknown/reserved/malformed slugs as a second line of defense (malformed percent-encoding returns `null`, not a throw).
- `generateStaticParams` and the sitemap log and fall back to a minimal list if the route query fails.

## Tests
`tests/server/errors.test.ts` covers the mapping. `tests/server/with-action.test.ts` covers the `withAction` paths, refresh/redirect behaviour, and that arguments never reach the logs. `tests/cms/route-gate.test.ts` covers the proxy route gate.

## Last Updated
2026-09-26
