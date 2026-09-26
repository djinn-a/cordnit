# CMS CONTRACT

## Purpose
Define the stable interfaces between the CMS and its consumers, so either side can change without breaking the other.

## Current Status
Approved.

## 1. Published document (public site contract)
Defined in `lib/cms/document.ts`. Produced by the publish service, stored in `cms.published_pages.document`, rendered by `LayoutRenderer`.

```ts
type PublishedPageDocument = {
  pageId: string; slug: string; title: string;
  shell: "default" | "contact";
  spacing: "default" | "compact" | "compact-top";
  seo: { title?; description?; canonical?; noindex? };
  breadcrumbs: { label; href?; isCurrent? }[];
  sections: (InlineSectionNode | BlockRefSectionNode)[];
  version: number; publishedAt: string; // ISO
};
type InlineSectionNode   = { _key: string; _type: SectionType; props: Record<string, unknown> };
type BlockRefSectionNode = { _key: string; _type: SectionType; blockId: string };
```

Rules:
- Inline `props` are already merged (`system_props` + `content`) and validated at publish time. The render path never re-parses.
- Block refs are resolved at render time by `resolveSections()` through the block's own cache tag, so publishing a block never republishes pages.
- Home is stored as slug `home` and served at `/` (`slugToPath` / `slugToSegments`).

## 2. Local API (server-only)
`server/cms/index.ts` exposes one facade, `cms`:

| Namespace | Used by | Notes |
|---|---|---|
| `cms.published.*` | Public RSC routes, sitemap | Cached with `'use cache'`, `cacheLife('max')`, tagged. |
| `cms.preview.*` | `/preview/[pageId]` | Uncached draft render; requires the super admin. |
| `cms.pages / sections / blocks / templates / redirects / publish` | Server actions, scripts | Transactions, optimistic locking, audit log. |

Direction of dependencies: `actions -> services -> repositories -> db`. Client components never import `server/*`.

## 3. Server action envelope
Every mutation is wrapped by `withAction(name, zodSchema, handler)` and returns:
```ts
type ActionResult<T> = { ok: true; data: T } | { ok: false; error: { code: ErrorCode; message: string; fieldErrors?: Record<string, string[]> } };
```
Codes: `UNAUTHENTICATED, FORBIDDEN, VALIDATION, NOT_FOUND, CONFLICT, STALE, RATE_LIMITED, INTERNAL`. Details in [../06-architecture/ERROR-HANDLING.md](../06-architecture/ERROR-HANDLING.md).

Mutations on a page send the page's `lockVersion`; the response returns the new one. A mismatch returns `STALE` (the admin shows "changed in another tab, reload").

## 4. Cache tags
| Tag | Invalidated when |
|---|---|
| `cms:page:<slug>` | That page is published, rolled back, unpublished, deleted, or its slug changes (old and new). |
| `cms:block:<id>` | A Global Block is published or deleted. |
| `cms:pages` | Any page is published/unpublished/deleted (sitemap, static params). |
| `cms:redirects` | Redirects change, including automatic ones from slug changes. |

Actions use `updateTag` (read-your-own-writes). External triggers use `POST /api/revalidate` (`Authorization: Bearer $CMS_REVALIDATE_SECRET`, body `{ "tags": [...] }`), which calls `revalidateTag(tag, "max")`.

## Last Updated
2026-09-26
