# CMS OVERVIEW

## Purpose
Explain what the in-house Cordinit CMS is, who uses it, and how its parts fit together.

## Scope
Everything under `/admin`, the Local API in `server/cms`, the section registry in `lib/cms/registry`, and the public catch-all route that renders CMS pages. The lead forms (`/api/leads`) and the code-owned routes (`/breach`, `/privacy`) are out of scope.

## Current Status
Approved and live. 28 marketing pages are served from the CMS.

## What it is
A CMS built into the Next.js app (a monolith, no separate service), backed by Supabase Postgres (through Drizzle) and Supabase Auth.

| Capability | How |
|---|---|
| Users | One super admin, username + password (no email/SMS providers). |
| Editing | Text only, per section. Images and icons are hidden `system_props` so layouts can't break. |
| Structure | Pages are an ordered list of sections (56 types + `newsletter`). Reorder is O(1). |
| Reuse | **Global Blocks** (edit once, update everywhere) and **Layouts** (page templates). |
| Workflow | Draft, live preview, publish with a note, version history, one-click rollback. |
| SEO | Per-page title, description, canonical, noindex, breadcrumbs. DB-driven sitemap, robots, redirects. |
| Audit | Every mutation is written to `cms.audit_log` (visible under Activity). |

## Map of the code
```
app/(site)/[[...slug]]/page.tsx   public catch-all (static, tag-invalidated)
app/(site)/preview/[pageId]       auth-guarded draft render (iframe in the editor)
app/(cms)/admin/...               Ant Design admin (separate root layout; antd never ships to the site)
proxy.ts                          session gate for /admin and /preview; real 3xx/404 for public URLs (server/cms/route-gate.ts)
server/actions/*                  server actions: withAction -> service -> updateTag
server/cms/services/*             business rules, transactions, audit
server/cms/repositories/*         SQL
server/cms/queries/published.ts   cached public reads ('use cache' + cacheTag)
lib/cms/registry/*                section schemas (Zod), catalog, split/merge of props
components/cms/*                  admin UI
scripts/cms/*                     create-super-admin, seed, verify
```

Next keeps visited admin routes mounted but hidden (React `<Activity>`). Click-triggered antd popups (`Popconfirm`, `Dropdown`) inside a route must take `key={useRevealKey()}`, so they remount when the route is shown again instead of re-running effects against a popup node that was unmounted while hidden. ESLint enforces this under `components/cms` (the persistent shell is exempt).

## Day-to-day editing
1. **Pages**: open a page, pick a section on the left, edit text in the middle, see the draft preview on the right.
2. **Save** (Cmd/Ctrl+S) stores the draft. Nothing is public yet.
3. **Publish** (optionally with a note) creates a new version and updates the live page within a second.
4. **Versions** drawer: restore any earlier version to live, optionally copying it into the draft.

## Dependencies
- [CMS-CONTRACT.md](./CMS-CONTRACT.md), [CONTENT-SCHEMAS.md](./CONTENT-SCHEMAS.md), [DRAFTS.md](./DRAFTS.md), [PUBLISHING.md](./PUBLISHING.md)
- [../06-architecture/CMS.md](../06-architecture/CMS.md), [../09-database/SCHEMA.md](../09-database/SCHEMA.md)
- [../build-next-bucket.md](../build-next-bucket.md) for what is intentionally not built yet.

## Decisions
See ADR-001 to ADR-010 in [../26-decisions/ARCHITECTURE-DECISIONS.md](../26-decisions/ARCHITECTURE-DECISIONS.md).

## Risks
- Single admin account: losing the password means running `npm run cms:admin -- --reset`.
- Nav, footer, CTA band and site-wide SEO are still in code (see the bucket doc).

## Last Updated
2026-09-26
