# MIGRATIONS

## Purpose
How schema changes are made, reviewed and applied.

## Current Status
Approved. Tool: drizzle-kit. Folder: `server/db/migrations`.

## Applied
| File | Change |
|---|---|
| `0000_init_cms.sql` | `cms` schema, all tables, enum, indexes, RLS enabled. |
| `0001_lockdown_and_constraints.sql` | Revokes Data API roles, check constraints. |
| `0002_spacing_compact_top.sql` | Adds `compact-top` spacing. |
| `0003_page_version_source.sql` | `page_versions.source` for faithful draft restore. |

## Workflow
1. Edit `server/db/schema/cms.ts`.
2. `npm run db:generate` creates a SQL file + snapshot. Review the SQL; hand-edit if needed (e.g. data backfills, `CHECK`s, grants).
3. Apply: `npm run db:migrate` (uses `DATABASE_URL_DIRECT`; the transaction pooler can't run migrations).
4. `npm run typecheck && npm test`, then commit the SQL, snapshot and journal together.

## Rules
- Never edit an applied migration; add a new one.
- Additive first: add columns nullable/with defaults, backfill, then tighten.
- Any new table in `cms` must `.enableRLS()`; default privileges already revoke `anon`/`authenticated`.
- Keep migrations plain Postgres (no Supabase-only extensions) so they run unchanged on RDS/Aurora.

## Seed and verify
- `npm run cms:seed` imports `server/db/seed/snapshot.json` (28 pages) and publishes v1. Idempotent by slug; `-- --reset` re-imports; `-- --only=home,aboutus` limits scope.
- `npm run cms:verify` checks every published document renders exactly the props of the original static site.

## Last Updated
2026-09-26
