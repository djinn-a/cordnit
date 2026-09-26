# ARCHITECTURE DECISIONS (ADRs)

## Purpose
Record the significant architecture decisions behind the in-house CMS, with context and trade-offs, so future changes start from the reasoning, not just the code.

## Current Status
Approved. Format: Context / Decision / Consequences. Add new ADRs at the end; supersede instead of editing.

---

### ADR-001: Build an in-house CMS instead of Sanity
- **Status**: Accepted, 2026-09. Supersedes the 2026-08-26 "Sanity selected" decision.
- **Context**: One editor, text-only changes, strict brand layouts, a CRM planned on the same data, and a later move to AWS. A hosted CMS adds a vendor, a second data store, and a webhook hop for every publish.
- **Decision**: CMS inside the Next.js monolith on Supabase Postgres, Drizzle, Supabase Auth and an Ant Design admin.
- **Consequences**: Full control over the editing model and zero per-seat cost. We own features a SaaS CMS gives for free (media library, RBAC, scheduling), which are listed in the build-next bucket.

### ADR-002: Dedicated Supabase project
- **Status**: Accepted.
- **Context**: The other Supabase account (`dcpxbkicuasufffonzqm`) holds unrelated apps' data.
- **Decision**: Use project `uwvlztbbhdtussvzqdtg` only. Never touch the other project.
- **Consequences**: Clean blast radius and billing separation.

### ADR-003: CQRS-lite, a published read model
- **Context**: Visitors must never wait on draft joins; editors need cheap granular writes.
- **Decision**: Normalised write model (`pages`, `page_sections`) plus a denormalised, validated `published_pages.document` per URL, written by one publish transaction.
- **Consequences**: O(1) public reads, trivially cacheable; publish is the only place that assembles pages. Two shapes of the same data must stay in sync through the publish service (covered by `cms:verify` and tests).

### ADR-004: Fractional indexing for section order
- **Context**: Integer positions make every reorder rewrite N rows and invite races.
- **Decision**: `position text COLLATE "C"` with `fractional-indexing` keys; a move updates only the moved row. `keyBetween` rejects out-of-order neighbours as `STALE`.
- **Consequences**: O(1) reorders. Keys grow slowly under repeated inserts at the same spot (tested: 200 inserts stay under 64 chars); a periodic rebalance is possible but not needed.

### ADR-005: Text-only editing, hidden `system_props`
- **Context**: Editors should change copy without breaking layouts; images and icons are design assets.
- **Decision**: Split props by key into `content` (editable) and `system_props` (hidden). Arrays carry stable `_id`s so images follow their card when items move.
- **Consequences**: Layouts can't be broken from the admin. Changing an image is a code/seed change until the media library lands.

### ADR-006: Keep all 56 section types 1:1
- **Context**: The existing components encode the approved design.
- **Decision**: Every component becomes a registered section type with a Zod schema; no redesign during migration.
- **Consequences**: Pixel-identical migration (verified by `cms:verify`). The type list is long; consolidating into generic variants is in the bucket.

### ADR-007: Static pages + tag invalidation (Cache Components)
- **Context**: Marketing pages must be as fast as the old static site and update right after publish.
- **Decision**: `cacheComponents`, `'use cache'` + `cacheLife('max')` + `cacheTag`, `generateStaticParams` for all slugs, `updateTag` from actions.
- **Consequences**: Static TTFB, immediate updates. Multi-instance self-hosting needs a shared cache handler (ADR-010).

### ADR-008: Global Blocks as references, not copies
- **Decision**: Pages store a block ref; blocks resolve at render time through their own cache tag.
- **Consequences**: Publishing a block is one tag invalidation, with no page republishing fan-out. A block can't be deleted while referenced (FK restrict).

### ADR-009: Single super admin behind an `AuthProvider` interface
- **Decision**: Supabase Auth, username mapped to an internal email, role in `app_metadata`; proxy for `/admin` and `/preview` only; role re-checked in every page and action. Actor ids have no FK to `auth.users`.
- **Consequences**: No email/SMS providers. Swapping to Cognito or custom sessions is one new implementation. Multi-user RBAC is in the bucket.

### ADR-010: Portable to AWS
- **Decision**: Plain Postgres migrations, no Supabase-only features in the `cms` schema, env validated by Zod, structured JSON logs, Vercel region `hnd1` today.
- **Consequences**: Migration path documented in [../22-devops/AWS-MIGRATION.md](../22-devops/AWS-MIGRATION.md).

### ADR-011: Redirects and 404s render inside the page's Suspense boundary
- **Status**: Superseded by ADR-012.
- **Context**: The catch-all resolves pages, redirects and not-found inside a streamed Suspense boundary (required by Cache Components for runtime params).
- **Decision**: Accept Next's streamed behaviour for now: redirects are HTTP 200 plus a client/meta redirect; unknown URLs are HTTP 200 with the 404 page and `noindex`.
- **Consequences**: Browsers and Google handle both correctly (noindex keeps soft 404s out of the index), but they aren't true 3xx/404 status codes. Planned fix: resolve redirects and unknown slugs in `proxy.ts` against cached maps to return real 308/404 statuses (bucket item).

### ADR-012: Proxy route gate for real 3xx/404 statuses
- **Status**: Accepted, 2026-09. Supersedes ADR-011.
- **Context**: With Cache Components the catch-all streams its shell before `notFound()`/`permanentRedirect()` can run, so the status is already 200. The Next docs place status-critical checks in `proxy.ts`. The proxy can run outside the app runtime: no `'use cache'`, no tag invalidation, no `server-only` modules.
- **Decision**: `proxy.ts` matches every page path (not `_next/*`, `api/*` or files with an extension). `/admin` and `/preview` keep the session gate; public GET/HEAD requests go through `server/cms/route-gate.ts`:
  - `resolveRoute(path, manifest)` is pure and mirrors the page's lookup order (published page, then redirect). It also 308s non-canonical URLs (uppercase, percent-encoded, trailing slash, `/home`) and 404s unknown paths under reserved roots.
  - The manifest (published slugs + redirects) loads through its own two-connection `postgres` pool and lives in memory. After 30s it is revalidated in the background while the old copy keeps serving.
  - A 404 is only answered from data read after the request arrived. A miss triggers a reload, single-flight and at most one per 2s; misses in between wait for that slot. Newly published pages therefore never 404, and 404 scanners can't flood the database.
  - Any database failure fails open to `NextResponse.next()` (the page's own `notFound()`/redirect stays as a second line of defense) and retries after 2s.
  - Misses are rewritten to `app/(site)/cms-404`, whose page only calls `notFound()` synchronously, so the styled not-found page is served with a real 404. `cms-404` is a reserved slug root.
- **Consequences**: Correct statuses for SEO and monitoring, and one hop for uppercase or legacy URLs. Every public request pays an in-memory lookup (about 2ms warm). Per instance there is one manifest load at cold start and at most one reload per 2s under 404 traffic, so a burst of unknown URLs can wait up to 2s. Removing a redirect or unpublishing a page reaches the gate within 30s, and the page answers correctly meanwhile. The public site no longer has zero proxy overhead (ADR-009 now covers only the auth part of the proxy).

### ADR-013: One round trip per CMS mutation
- **Status**: Accepted, 2026-09.
- **Context**: `updateTag` inside an action already makes Next re-render the current route in the action response. The admin also called `router.refresh()` right after, which aborted that stream ("destination stream closed early") and doubled every render against a 5-connection pool.
- **Decision**: `withAction` calls `refresh()` (from `next/cache`) after a successful mutation, so the fresh route arrives with the result. Actions that leave the route declare `redirectTo`, which calls `redirect()` server-side; the client uses `useCmsAction().navigate()`, which treats the redirect rejection as success. Login and logout redirect server-side too. Clients never call `router.refresh()` after a mutation; the only one left is the user-triggered "Reload" on a STALE conflict. The preview iframe is keyed on the page's `lockVersion`, which every draft write bumps, so it reloads once per committed change. `logging.serverFunctions` is off because Next would log action arguments (passwords); `withAction` logs `action.ok`/`action.failed` with name, request id and duration only.
- **Consequences**: One POST per mutation, no aborted streams, no secrets in logs. New actions get the refresh by default; use `{ refresh: false }` only when the action changes nothing the current route renders (`saveTemplateAction`, `changePasswordAction`).

## Last Updated
2026-09-26
