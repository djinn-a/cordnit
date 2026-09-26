# PUBLISHING

## Purpose
Describe publishing, versions, rollback, Global Block publishing, and how the live cache is refreshed.

## Current Status
Approved.

## Publish a page
One transaction in `server/cms/services/publish.service.ts`:
1. Lock the page row and check `lockVersion`.
2. Read sections in order, validate each, build the `PublishedPageDocument` (`server/cms/document-builder.ts`). Hidden sections are dropped; Global Blocks become refs.
3. Insert `cms.page_versions` (next version number, the document, the raw section `source` for faithful restores, and the note).
4. Upsert `cms.published_pages` (one row per live URL).
5. If the slug changed since the last publish: add a 308 redirect from the old path, repoint redirects that targeted the old path, and delete any redirect that now shadows the new path.
6. Write the audit log.

After commit, the action calls `updateTag` for the page (old and new slug), `cms:pages`, and `cms:redirects`. The next request re-renders once and is cached again.

## Rollback
From the Versions drawer: pick a version and **Restore**.
- The chosen document becomes live as a **new** version (history is never rewritten).
- "Also restore the draft" (default on) replaces the draft sections from that version's `source`.

## Unpublish / delete
- Unpublish removes the `published_pages` row (the URL 404s and leaves the sitemap) and keeps the draft.
- Delete removes the page, its sections and versions.

## Global Blocks
- A block has draft `content` and `published_props`, with its own versions table.
- Publishing a block updates only `cms:block:<id>`. Pages that reference it pick up the change on their next render; no page is republished.
- A block used by pages can't be deleted (FK `restrict`, surfaced as a friendly `CONFLICT`).

## Layouts (templates)
"Save as layout" stores the page's sections (`SectionSource[]`) in `cms.templates`. "New page from layout" copies them into a new draft.

## Latency
Visitors always get cached HTML. The database is read only on a cache miss (first request after a publish or deploy), with one primary-key lookup per page plus one per referenced block.

## Last Updated
2026-09-26
