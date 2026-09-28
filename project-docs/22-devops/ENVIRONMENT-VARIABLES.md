# ENVIRONMENT VARIABLES

## Purpose
Single reference for every environment variable the app reads.

## Current Status
Approved. Template: `.env.example` (committed). Real values: `.env.local` (gitignored) and the hosting provider.

## Variables
| Name | Required | Scope | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (defaults to https://cordinit.com) | public | Canonicals, sitemap, OG URLs. |
| `DATABASE_URL` | yes | server | Postgres transaction pooler (6543), used at runtime. |
| `DATABASE_URL_DIRECT` | scripts/migrations | server | Session/direct connection (5432) for drizzle-kit and scripts. |
| `DB_POOL_MAX` | no (5) | server | Connections per instance. |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | public | Supabase Auth endpoint. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | public | Supabase Auth client key (safe to expose; `cms` schema is not reachable with it). |
| `SUPABASE_SECRET_KEY` | admin script, password change | server | Service-level key. Never expose. |
| `CMS_ADMIN_EMAIL_DOMAIN` | no (`cms.cordinit.com`) | server | Username -> internal email mapping. |
| `CMS_REVALIDATE_SECRET` | for `/api/revalidate` | server | Bearer token, min 32 chars. |
| `LEADS_IP_SALT` | production | server | HMAC key (min 32 chars) for hashing visitor IPs used by lead rate limiting. `/api/leads` returns 500 in production without it. Generate: `openssl rand -hex 32`. |
| `LEAD_NOTIFICATIONS_ENABLED` | no (`false`) | server | Set to `true` to send lead notification emails once the Resend domain is verified. |
| `RESEND_API_KEY`, `NOTIFICATION_FROM_EMAIL`, `NOTIFICATION_TO_EMAIL` | lead emails | server | Lead notification emails (best-effort; leads are always stored in `cms.leads` first). |

## Rules
- Server values are validated lazily by `server/env.ts` (Zod); a missing value fails with a clear message the first time it's needed.
- `NEXT_PUBLIC_*` values are inlined at build time: rebuild after changing them.
- Rotate `SUPABASE_SECRET_KEY` and the DB password if they are ever pasted anywhere outside a secret store.

## Setting them on Vercel
```bash
vercel env add DATABASE_URL production
# repeat for each variable, for production and preview
```

## Last Updated
2026-09-26
