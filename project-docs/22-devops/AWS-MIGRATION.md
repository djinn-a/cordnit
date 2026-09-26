# AWS MIGRATION RUNBOOK

## Purpose
Step-by-step plan to move the site, CMS and database from Vercel + Supabase to AWS with minimal downtime.

## Current Status
Planned (not started). The code is portable by design (ADR-010).

## Target architecture
| Concern | Today | AWS |
|---|---|---|
| App | Vercel functions (`hnd1`) | ECS Fargate or App Runner running a Next.js `standalone` image (or OpenNext on Lambda + CloudFront) |
| CDN | Vercel Edge | CloudFront in front of the app |
| Database | Supabase Postgres | RDS / Aurora PostgreSQL (ap-northeast-1) + RDS Proxy |
| Next cache | Vercel shared cache | Shared `cacheHandlers` backed by ElastiCache (Redis/Valkey) |
| Auth | Supabase Auth | Cognito, or self-managed sessions (new `AuthProvider` implementation) |
| Secrets | Vercel env | Secrets Manager / SSM Parameter Store |
| Logs | Vercel logs | CloudWatch Logs (the logger already writes JSON lines) |

## Phase 1: Prepare (no downtime)
1. Add `output: "standalone"` to `next.config.ts` and a multi-stage `Dockerfile` (Node 22, `npm ci`, `next build`, copy `.next/standalone`, `.next/static`, `public`).
2. Configure a shared cache handler (`cacheHandlers` in `next.config.ts`) using Redis. **Required with more than one container**, otherwise `updateTag` after publish only clears one instance and visitors see stale pages.
3. Implement the new `AuthProvider` (`server/auth/types.ts`). Actor ids are plain uuids with no FK to `auth.users`, so no schema change is needed.
4. Provision RDS/Aurora Postgres 16+, RDS Proxy, ElastiCache, ECS service, CloudFront, and ACM certificates (IaC: CDK or Terraform).

## Phase 2: Database
1. Apply the schema: `DATABASE_URL_DIRECT=<rds> npm run db:migrate`. The migrations are plain Postgres.
2. Data copy: `pg_dump --schema=cms --data-only` from Supabase, then `pg_restore` into RDS. For near-zero downtime, use AWS DMS or logical replication and cut over.
3. Re-apply the lockdown: on RDS, create a dedicated app role with access to `cms` only (the `anon`/`authenticated` revokes are Supabase-specific and harmless elsewhere).
4. Verify: point a staging container at RDS and run `npm run cms:verify`.

## Phase 3: Auth
1. Create the super admin in the new provider (adapt `scripts/cms/create-super-admin.ts`).
2. Update `proxy.ts` to refresh/verify the new session type.

## Phase 4: Cutover
1. Freeze CMS edits (announce a short window).
2. Final data sync, verify row counts per table.
3. Deploy the container with RDS/Redis/auth env vars; smoke test `/api/health`, `/admin`, a publish, and a few pages.
4. Switch DNS to CloudFront (lower the TTL a day before).
5. Keep Vercel + Supabase read-only for one to two weeks as a fallback.

## Rollback
DNS back to Vercel; Supabase still holds the pre-freeze data. Replay any edits made on AWS from `cms.audit_log`.

## Checklist
- [ ] Shared cache handler tested with 2+ containers (publish on one, read on the other)
- [ ] RDS Proxy connection limits vs `DB_POOL_MAX` x containers
- [ ] Secrets in Secrets Manager, not in the image
- [ ] CloudWatch alarms: 5xx rate, p95 latency, DB CPU/connections
- [ ] Backups: RDS automated backups + PITR enabled

## Last Updated
2026-09-26
