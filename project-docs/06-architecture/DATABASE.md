# DATABASE (ARCHITECTURE)

## Purpose
Describe how the app connects to Postgres and why.

## Current Status
Approved. Supabase Postgres, project `uwvlztbbhdtussvzqdtg`, schema `cms`.

## Access
- ORM: Drizzle (`server/db/schema/*`, `server/db/client.ts`) over `postgres.js`.
- Runtime connection: `DATABASE_URL`, the Supavisor **transaction pooler** (port 6543) with `prepare: false`. Required because the direct DB host is IPv6-only and serverless functions need pooling.
- Migrations: `DATABASE_URL_DIRECT` (session/direct connection) via `drizzle-kit`.
- Pool size per instance: `DB_POOL_MAX` (default 5).
- The Supabase Data API (PostgREST) is **not** used for CMS data. The `cms` schema isn't exposed and is locked down (see [../09-database/SCHEMA.md](../09-database/SCHEMA.md)).

## Why Postgres + Drizzle (not a hosted CMS)
- Typed queries, transactions and constraints in one place.
- Portable: the same migrations run on RDS/Aurora (see [../22-devops/AWS-MIGRATION.md](../22-devops/AWS-MIGRATION.md)).
- One database for the CMS today and the CRM later (see [../build-next-bucket.md](../build-next-bucket.md)).

## Health
`GET /api/health` runs `select 1` and reports DB latency (no secrets in the response).

## Related
[../09-database/SCHEMA.md](../09-database/SCHEMA.md), [../09-database/INDEXING.md](../09-database/INDEXING.md), [../09-database/MIGRATIONS.md](../09-database/MIGRATIONS.md)

## Last Updated
2026-09-26
