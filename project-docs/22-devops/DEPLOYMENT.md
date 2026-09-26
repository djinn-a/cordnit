# DEPLOYMENT

## Purpose
How the site and CMS are built and deployed today (Vercel), and where the AWS path is documented.

## Current Status
Approved. Host: Vercel, function region `hnd1` (Tokyo, next to the Supabase database in ap-northeast-1), set in `vercel.json`.

## Requirements
- Node 22 (`.nvmrc`, `engines.node >= 22`).
- All variables from [ENVIRONMENT-VARIABLES.md](./ENVIRONMENT-VARIABLES.md) set for Production and Preview.
- Supabase Auth: public sign-ups disabled.

## Pre-deploy checks
```bash
npm run typecheck && npm run lint && npm test && npm run build
```
Schema changes: apply migrations (`npm run db:migrate`) **before** deploying code that depends on them.

## Deploy
```bash
npm run deploy        # vercel --prod
```
The build prerenders every published CMS page (`generateStaticParams` reads `published_pages`), so `DATABASE_URL` must be reachable from the build environment.

## After deploy
- `GET /api/health` returns `{ ok: true, data: { db: "up" } }`.
- Sign in at `/admin`, open a page, and check the preview loads.

## Rollback
- Code: promote the previous deployment in Vercel.
- Content: use the Versions drawer in the page editor (independent of code deploys).

## AWS
See [AWS-MIGRATION.md](./AWS-MIGRATION.md).

## Last Updated
2026-09-26
