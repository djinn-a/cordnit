# Site Navbar and Footer in CMS Global Blocks

This guide describes the production request path, stored data, editor workflow, safeguards, cache behavior, and debugging steps for the site Navbar and Footer integration. It is written to help trace a defect from the visible symptom to the responsible layer.

## Scope and design constraints

- Reuse the existing Global Blocks records, schemas, editor, publish/version tables, actions, audit logging, and Next.js cache tags.
- Stable keys identify the site-wide records: `site-navbar` and `site-footer`.
- CMS owns copy, accessible text, and destinations. Site code continues to own images, logo artwork, icons, layout, responsive behavior, and component styling.
- A missing, unpublished, invalid, or unavailable CMS block must not break page rendering. The existing code-owned copy is used as fallback and its destinations are inert/blank.
- No migration, seed, new content table, new storage layer, or automatic rewrite of existing block records is part of this feature.
- Navbar and Footer are global site chrome, not page sections. They must not be added through the page section picker, converted from page sections, or deleted as ordinary reusable blocks.

## Architecture at a glance

```text
CMS editor
  -> Zod input schema
  -> server action (auth + validation)
  -> existing block service + transaction + audit/version rows
  -> publish/restore action invalidates cache tags

Public request
  -> app/(site)/layout.tsx
  -> getPublishedBlockByKey(stable key, expected type)
  -> read published version + published props + current routes/redirects
  -> validate against registered schema, restore stable list IDs, sanitize links
  -> existing TopBar / Navbar / Footer render CMS text and destinations
```

`server/cms/queries/published.ts` is the public read boundary. `server/cms/services/blocks.service.ts` is the mutation boundary. The site components remain responsible for presentation and their fallback behavior.

## Editable data contract

The authoritative runtime validation schema is `sectionContentSchemas` in `lib/cms/registry/schemas.generated.ts`. The `SectionContentMap` type is derived from those schemas and consumed by layout components; do not create a second hand-maintained content shape.

### Navbar fields

The `navbar` schema currently accepts:

- Optional logo destination (`logoHref`) and logo alt text (`logoAltText`). The logo asset itself stays in code.
- Top bar breach label/destination and newsletter label.
- Main navigation list: label, destination, and link kind. The list requires at least one item, permits at most 12, requires unique stable `_id` values, and requires exactly one Solutions dropdown item.
- Solutions dropdown list: title, description, and destination slug. At least one and at most 30 items; IDs must be unique.
- Mega-menu panel title/description and Explore label/destination.
- Contact button label and mobile menu accessible label.

### Footer fields

The `footer` schema currently accepts:

- Optional logo destination; branding logo alt text, tagline, and contact CTA label. Logo artwork remains in code.
- Footer columns with headings and label/destination links. One to eight columns; each column requires one to 40 links; column IDs must be unique.
- Six social links with accessible labels and destinations. Their IDs must belong to the code-supported `FOOTER_SOCIAL_IDS` set; IDs select existing icons and cannot introduce CMS-defined icons.
- Newsletter heading, description, placeholder, accessible labels, consent text, privacy link label/destination, button/submitting labels, and success copy.
- Media-feature eyebrow, heading, description, and CTA destination. Image/media selection remains code-owned.
- Copyright text plus one to 30 legal links, each with a label and destination.

Use the generated schema as the final authority whenever this list and code differ. Keep copy and href fields editable; do not move image or icon selection into CMS content.

## Stored data: draft, published properties, and versions

The integration uses the existing `cms.global_blocks` and `cms.global_block_versions` records:

- `global_blocks.content` is the editable draft content.
- `global_blocks.system_props` contains block-level system properties.
- `global_blocks.published_props` is the rendered, merged props snapshot for the currently published version.
- `global_blocks.published_version` identifies the current live version; null means never published.
- `global_blocks.has_unpublished_changes` indicates saved draft changes not yet published.
- `global_block_versions` stores historical content/system-props snapshots, version number, note, author, and timestamp.

Saving edits the draft and marks it unpublished. It does not change visitor output. Publishing validates draft content, inserts the next version snapshot, updates published props/version/time, clears the unpublished flag, increments the optimistic `lockVersion`, and writes an audit event in the same transaction. A stale lock version fails rather than overwriting a concurrent editor.

Restore is only allowed for the canonical Navbar/Footer records. It reads a selected version snapshot, validates it against the current schema, copies it into the draft, then uses the normal publish path. Restore therefore creates a new monotonically increasing version and audit event; it does not erase history. The editor disables restore while there are unsaved form changes. Saved draft changes are replaced only after the confirmation dialog.

There is no automatic migration/default rewrite. Existing data continues to render only if it validates against the current schema. Review actual database records before release; code inspection alone cannot prove production record compatibility.

## Public request and render sequence

1. `app/(site)/layout.tsx` loads Navbar and Footer concurrently by stable key and expected section type.
2. Each query is cached with `cacheLife("max")`. Navbar cache is tagged by its block key plus published-route and redirect tags; these route tags matter because link clickability can change when pages or redirects change.
3. The query joins the canonical `global_blocks` row to `global_block_versions` on block ID and current `published_version`. This published-version content is parsed first; draft `content` is never used to decide live list identities.
4. The query verifies that the row exists, has a published version and properties, and has the expected type. It validates historical published content and `published_props` with the current registered Zod schema.
5. Stable list `_id` values are restored from the matching published version content into `published_props`. The public props merger strips editor-only IDs; restoring from the matching version prevents a newer draft reorder/ID from changing live order or icon selection.
6. Link destinations are sanitized against published routes, redirect paths, and explicit code-owned paths. Unsupported/missing internal destinations become `""` before they reach renderers.
7. Layout passes typed props to the existing TopBar, Navbar, and Footer components. Those components continue to own the DOM, styling, responsive behavior, logo/media assets, and icon rendering.
8. If query loading throws, layout logs the error and passes no CMS props. If the row is missing, unpublished, wrong-type, or schema-invalid, the query logs and returns `null`. Components then use code-owned fallback copy with destinations blank/inert.

The page content itself is unaffected by failure to load site chrome; the layout remains renderable.

## Safe link rules

`safeCmsHref` in `server/cms/queries/published.ts` is the server-side gate for site-chrome destinations:

- Empty values remain empty. Hash-only values remain hash destinations.
- Absolute `https://`, `mailto:`, and `tel:` destinations are accepted.
- Other values must parse as same-site absolute paths. Protocol-relative URLs, backslashes, malformed paths, and unsupported schemes are blanked.
- Internal path destinations remain active only if their normalized slug is currently published, they match a redirect source path, or the path is explicitly code-owned.
- `/privacy-policy` is explicitly treated as a code-owned route. `/privacy` and `/breach` are also code-owned. `app/(site)/privacy-policy/page.tsx` supplies the policy page.
- A destination for a page not yet published is returned as an empty string, which the UI should render as unlinked text or an inert control. After that route is published, route-cache invalidation lets the saved CMS destination become active without editing the block.
- Redirect destinations are checked as possible sources; the renderer retains the configured href and the routing layer performs the redirect.

Do not solve a missing internal route by adding a hardcoded fallback URL. Blank/inert behavior is intentional and keeps future CMS links editable without sending visitors to nonexistent pages.

## Editor, save, publish, and restore paths

### Edit and save

`BlockEditor` renders the schema-driven form. `updateBlockAction` validates the request with `updateBlockSchema`; `blocks.service.ts` checks the lock version, parses content with the registered section schema, updates only draft values, and records an audit entry. Draft save intentionally does not invalidate public caches.

### Publish

`publishBlockAction` validates the block reference, calls the transactional publish service, then `invalidateBlock(block.id, block.key)` invalidates both the block-ID tag and the stable key tag. The UI uses “Published site-wide” for `site-navbar` and `site-footer`; ordinary blocks report affected page references. Since site chrome is rendered from the layout by key, usage count is not the publish mechanism.

### Restore

`restoreBlockVersionAction` validates block/version input, enforces the canonical stable key and expected type in the service, validates the stored snapshot again, and publishes it as a new version. It then invalidates the same block ID/key tags. Any schema evolution that makes an old snapshot invalid will make restore fail with validation rather than publish malformed props.

### Delete and page-section safeguards

The editor disables delete for site chrome, and the service rejects deletion even if a request bypasses the UI. Conversion from inline section to global block checks `isPageSectionType`. Page section creation, copying, conversion, and publish validation should use the same page-section type guard. Keep server enforcement: hidden UI controls are not authorization.

## Cache invalidation map

| Change                             | Tags invalidated                           | Why                                                                   |
| ---------------------------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| Navbar/Footer publish              | `cms:block:<id>`, `cms:block-key:<key>`    | Refresh block references and layout lookup by stable key              |
| Navbar/Footer restore              | Same block ID and key tags                 | Restore creates a new live snapshot                                   |
| Page publish/unpublish/slug change | Page tag(s), pages-list tag, redirects tag | Refresh page output, internal-link availability, and routing manifest |
| Redirect edit                      | Redirects tag                              | Refresh redirect resolution and site-chrome destinations              |
| Draft block save                   | None                                       | Draft must not leak into visitor output                               |

`invalidateLivePage` also invalidates the redirects tag because publishing/renaming pages can create or remove redirects. A missed tag commonly explains a correct database value that still appears stale on the site.

## Type-safety and trust boundaries

- The CMS schema defines runtime validation and the corresponding content map; site component props use these inferred types.
- Server action inputs are parsed by Zod before service methods run. Service code validates again at persistence/publish boundaries through `parseSectionContent`.
- Database JSON and values entering from dynamic persistence are untrusted until parsed. `unknown` is appropriate at those boundaries only when narrowed/validated before use; avoid `any` and avoid making the static CMS type declarations themselves `unknown`-based.
- The `SectionProps` JSON document type is deliberately broad because page sections are heterogeneous. Do not treat it as proof that Navbar/Footer props are safe; use the specific `SectionContentMap["navbar"]` / `["footer"]` result after parsing.
- The integration must not cast malformed DB JSON straight to Navbar/Footer content.

## Production checks and known limits

The code path is designed to fail closed for bad destinations and fail soft for unavailable CMS chrome. Release readiness still depends on checks against the target environment:

1. Confirm the production stable-key records exist, have matching types (`navbar`, `footer`), and have a published version.
2. Parse each current published snapshot and `published_props` using the deployed schema before rollout. Identify old records that need an explicit operator edit; do not silently migrate or overwrite them.
3. Verify existing site image/icon assets and social IDs remain code-owned and match the expected records.
4. In a browser, edit/save without publish and confirm the public site stays unchanged; publish and confirm the whole site shell updates; restore and confirm it creates a new version.
5. Check one published route, one unpublished internal destination, one redirect source, `/privacy-policy`, and a safe external destination.
6. Publish/unpublish a route and edit a redirect while the site is cached; verify link activation/deactivation follows tag invalidation.
7. Exercise missing record, never-published record, wrong block type, invalid JSON, database failure, and stale lock version. Public pages should remain available with code-owned fallback content, while CMS actions should show useful errors.
8. Verify desktop/mobile navigation, menu keyboard/accessibility behavior, footer newsletter/contact actions, no broken asset references, and no hydration errors.

Static checks previously run for this integration: `npm run typecheck` and `git diff --check`. A live database/browser smoke check is separate and must be run in an environment with reachable CMS data. Do not interpret a passing typecheck as proof that production rows have the expected shape.

## Troubleshooting by symptom

| Symptom                                                | First checks                                                                                                                                                     | Likely layer                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| CMS edit saves but public text does not change         | Confirm saved draft is published; check `publishedVersion`, `hasUnpublishedChanges`, action result, and `invalidateBlock` call                                   | BlockEditor / action / block service             |
| Publish says success but site still shows old text     | Confirm stable key and row ID; confirm publish updated `published_props` and version row; inspect cache invalidation logs/tag path and deployment cache behavior | Publish transaction / invalidation / query cache |
| Navbar/Footer is entirely fallback content             | Look for `[CMS]` logs; verify stable record exists, key/type match, version is non-null, schema parse succeeds, and DB is reachable                              | `getPublishedBlockByKey` / DB row compatibility  |
| Only some links are inert                              | Compare normalized href path to `cms.published_pages.slug`, `cms.redirects.from_path`, and code-owned route set; confirm route/redirect tag was invalidated      | Link sanitizer / route publication               |
| Links work in the editor but not on public site        | Editor displays draft input; public query sanitizes published props only. Publish first, then inspect sanitizer result                                           | Draft-versus-published workflow                  |
| Social icon missing or mismatched                      | Confirm each social `_id` is unique and in `FOOTER_SOCIAL_IDS`; verify the matching version content and code icon map                                            | Footer schema / code-owned icon map              |
| New route link stays blank after publish               | Check route slug normalization and pages-list invalidation; inspect whether the link is a redirect source or a page slug                                         | Published routes query/cache tags                |
| Restore fails for an older version                     | Parse that version with the current `navbar`/`footer` schema; schema changes can invalidate older snapshots by design                                            | Restore validation                               |
| Restore button is disabled                             | Check for unsaved changes or pending action; inspect current version/live status conditions in `BlockEditor`                                                     | Editor state                                     |
| “0 pages updated” appears for Navbar/Footer            | Site chrome is resolved from the layout by key, not by page-section usage. The editor should show “Published site-wide.”                                         | UI messaging / usage model                       |
| Navbar/Footer appears in Add Section or can be deleted | Inspect the page-section type guards and server-side creation/conversion/delete checks; UI filtering alone is insufficient                                       | CMS type guards / service layer                  |

### Useful database inspection queries

Run only against the intended environment and avoid selecting sensitive content into shared logs. These queries help establish record identity and version state:

```sql
select id, key, name, type, published_version, has_unpublished_changes,
       published_at, updated_at
from cms.global_blocks
where key in ('site-navbar', 'site-footer');

select b.key, v.version, v.created_at, v.note
from cms.global_blocks b
join cms.global_block_versions v on v.block_id = b.id
where b.key in ('site-navbar', 'site-footer')
order by b.key, v.version desc;
```

To diagnose a specific destination, compare the normalized path with published slugs and redirect sources:

```sql
select slug from cms.published_pages order by slug;
select from_path, to_path, status_code from cms.redirects order by from_path;
```

Never patch production JSON directly as a routine repair. Use the Global Block editor so validation, optimistic locking, version history, audit logging, and cache invalidation are preserved.

## Main file map

| Area                         | Files                                                                                                                                                                                                                         | Responsibility                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Contract and registry        | `lib/cms/registry/schemas.generated.ts`, `lib/cms/registry/catalog.ts`, `lib/cms/registry/index.ts`, `lib/cms/types.ts`                                                                                                       | Schema definitions, inferred content types, and allowed section types         |
| Public query and link safety | `server/cms/queries/published.ts`, `lib/cms/document.ts`                                                                                                                                                                      | Published snapshot lookup, schema parsing, IDs, link sanitization, cache tags |
| Mutation and validation      | `server/actions/blocks.ts`, `lib/cms/inputs.ts`, `server/cms/services/blocks.service.ts`                                                                                                                                      | Action validation, transactional save/publish/restore, audit/version updates  |
| Cache                        | `server/actions/invalidate.ts`, `server/actions/publish.ts`, `server/actions/redirects.ts`                                                                                                                                    | Revalidation after live block, page, or redirect changes                      |
| Site integration             | `app/(site)/layout.tsx`, `components/layout/TopBar/TopBar.tsx`, `components/layout/Navbar/Navbar.tsx`, `components/layout/Navbar/MegaMenu.tsx`, `components/layout/Navbar/navbarContent.ts`                                   | Load and render CMS Navbar content while retaining code-owned UI/assets       |
| Footer integration           | `components/layout/Footer/Footer.tsx`, `FooterMediaFeature.tsx`, `FooterNewsletter.tsx`, `footerData.ts`                                                                                                                      | Render CMS footer text/link data with code-owned visuals/actions              |
| CMS safeguards/UI            | `server/cms/services/sections.service.ts`, `server/cms/services/pages.service.ts`, `server/cms/services/publish.service.ts`, `components/cms/blocks/BlockEditor.tsx`, `app/(cms)/admin/(dashboard)/blocks/[blockId]/page.tsx` | Page-section separation, publishing labels, editor history and controls       |
| Reserved route               | `app/(site)/privacy-policy/page.tsx`, `server/cms/route-gate.ts`                                                                                                                                                              | Code-owned privacy route and public routing behavior                          |

When debugging, start at the first boundary that can produce the symptom: editor state for a missing button/value, action/service for failed writes, DB row/version for persistence, query/schema for fallback, sanitizer for blank links, invalidation/cache for stale output, and site component for visual behavior.
