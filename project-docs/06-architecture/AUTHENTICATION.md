# AUTHENTICATION

## Purpose
Describe how the single CMS super admin signs in and how every CMS entry point is protected.

## Current Status
Approved. Provider: Supabase Auth (project `uwvlztbbhdtussvzqdtg`).

## Model
- One user with role `super_admin` in `app_metadata` (only the service role can set it; users can't edit `app_metadata`).
- The login form takes a **username**. The server maps it to `<username>@<CMS_ADMIN_EMAIL_DOMAIN>` and signs in with email + password. No email or SMS is ever sent.
- Public sign-ups must be **disabled** in Supabase Dashboard > Authentication > Sign In / Providers.

## Layers of protection
| Layer | Where | What |
|---|---|---|
| Proxy | `proxy.ts` (auth branch: `/admin*`, `/preview*`) | Refreshes the session cookie; anonymous users are redirected to `/admin/login?next=...`. Public routes skip auth entirely; they only go through the route gate (see [CACHING.md](CACHING.md)). |
| Pages | `requireSuperAdminPage()` | Checks claims + role in every admin page/preview render. |
| Actions | `withAction` -> `requireSuperAdmin()` | Every mutation re-checks; returns `UNAUTHENTICATED`/`FORBIDDEN`. |
| Database | `cms` schema | Not exposed through PostgREST; RLS on with no policies; `anon`/`authenticated` revoked. Only the server's Postgres connection can read it. |

Claims are verified with `supabase.auth.getClaims()` (JWT verified against the project's JWKS; no network round-trip for asymmetric keys).

## Provider abstraction
`server/auth/types.ts` defines the `AuthProvider` interface (`getSession`, `signIn`, `signOut`, `changePassword`). `server/auth/supabase.ts` implements it. Moving to Cognito or self-managed sessions means writing one new implementation. The CMS stores actor ids as plain `uuid` columns with no FK to `auth.users`.

## Operations
- Create or rotate the admin: `npm run cms:admin` (idempotent), `npm run cms:admin -- --reset` (new random 24-char password, printed once).
- Change password: Admin > Settings (min 12 characters, requires the current password).

## Last Updated
2026-09-26
