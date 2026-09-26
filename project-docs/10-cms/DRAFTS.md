# DRAFTS

## Purpose
Describe how draft content is stored, edited, and previewed without affecting the live site.

## Current Status
Approved.

## Model
- The draft is the write model: `cms.pages` (meta, SEO, breadcrumbs) + `cms.page_sections` (ordered rows).
- The live site never reads it. It reads `cms.published_pages` only.
- `pages.has_unpublished_changes` drives the "Unpublished changes" tag in the admin.

## Editing rules
| Operation | Rows touched | Notes |
|---|---|---|
| Edit section text | 1 | Validated against the section schema. |
| Reorder | 1 | New fractional key between the new neighbours (`server/cms/positions.ts`). |
| Add / duplicate | 1 | Inserted after the chosen section; defaults prefilled. |
| Hide / show | 1 | Hidden sections are skipped at publish. |
| Delete | 1 | |
| Convert to Global Block | 2 | Creates the block (published as v1) and links the section. |
| Detach from Global Block | 1 | Copies the block's content back into the section. |

Every page mutation bumps `pages.lock_version` in the same transaction (optimistic locking). Two tabs editing the same page: the second save gets `STALE` and is asked to reload.

## Preview
- `/preview/[pageId]` renders the draft through the same `LayoutRenderer` as the public site, with draft Global Block content inlined.
- It is dynamic, `noindex`, and requires the super admin (anonymous requests are redirected to login by `proxy.ts`).
- The editor embeds it in an iframe and reloads it after each save.

## Unsaved-changes safety
The editor warns on navigation/close when the form is dirty and supports Cmd/Ctrl+S.

## Last Updated
2026-09-26
