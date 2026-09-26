# CACHING

## Purpose
Describe how public pages are cached and how edits reach visitors immediately.

## Current Status
Approved. `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`.

## Strategy
Public pages are **static and invalidated by tag**, not time-based.

1. `generateStaticParams` returns every published slug, so all CMS pages are prerendered at build.
2. Reads in `server/cms/queries/published.ts` use `'use cache'`, `cacheLife('max')`, and a tag.
3. Server actions call `updateTag(tag)` after commit. The next request re-renders once and is cached again (read-your-own-writes for the editor).
4. New slugs published after a deploy render on first request, then stay cached.

Build output confirms the marketing pages have no postponed (dynamic) parts; their full HTML, including content, is in the prerender.

## Tags
| Tag | Covers |
|---|---|
| `cms:page:<slug>` | One page document. |
| `cms:block:<id>` | One Global Block's published props. |
| `cms:pages` | Route list (sitemap, static params). |
| `cms:redirects` | Redirect map. |

## Status codes: the proxy route gate
The page streams its shell first, so it can't change the status once it has started. Redirects and 404s are therefore decided in `proxy.ts` by `server/cms/route-gate.ts` (ADR-012), before the cached page is served:

| Request | Response |
|---|---|
| Published slug | Page, from the static cache. |
| Stored redirect | Its stored 301/302/307/308 with `Location`; the query string is kept for internal targets. |
| Uppercase, percent-encoded, trailing slash or `/home` | 308 to the canonical path. |
| Unknown path | Rewrite to `/cms-404`: styled not-found page, real 404, `noindex`. |
| Database unreachable | Falls through to the page (fail-open). |

The gate cannot use cache tags, so it keeps its own in-memory manifest of published slugs and redirects:
- It is revalidated in the background every 30s.
- A miss re-checks the database before answering 404, at most once per 2s per instance; concurrent misses share that reload. A page is never 404'd right after publishing.
- Removing a redirect, unpublishing or renaming a slug reaches the gate within 30s. Until then the page's own handling still answers: a soft 404 with `noindex`, or for a renamed slug a streamed redirect to the new path.

## Mutations: one round trip
Server actions re-render the calling route in the same response: `updateTag` plus `refresh()` in `withAction`. Navigating actions redirect server-side with `redirectTo`. Clients must not call `router.refresh()` after a mutation, because it aborts the in-flight render stream and doubles database load (ADR-013).

## External invalidation
`POST /api/revalidate` with `Authorization: Bearer $CMS_REVALIDATE_SECRET` and `{ "tags": ["cms:page:home"] }`. Uses `revalidateTag(tag, "max")` (stale-while-revalidate). Secret comparison is constant-time; only `cms:` tags are accepted.

## Uncached on purpose
- `/admin/*`: dynamic, per-request session.
- `/preview/[pageId]`: dynamic, `noindex`, draft content.
- `/api/health`: live DB probe.

## Multi-instance hosting
Vercel shares the cache across instances. On AWS with several containers, configure a shared `cacheHandlers` (Redis/ElastiCache), otherwise `updateTag` only clears one instance. See [../22-devops/AWS-MIGRATION.md](../22-devops/AWS-MIGRATION.md).

## Last Updated
2026-09-26
