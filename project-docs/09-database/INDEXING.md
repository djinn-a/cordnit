# INDEXING

## Purpose
List the CMS indexes and the query each one serves.

## Current Status
Approved.

| Index | Serves |
|---|---|
| `published_pages` PK (`slug`) | Public page read: one PK lookup per cache miss. |
| `published_pages_page_unique (page_id)` | Upsert on publish; unpublish by page. |
| `pages_slug_unique (slug)` | Slug uniqueness (mapped to a friendly field error). |
| `pages_status_updated_idx (status, updated_at desc)` | Admin pages table and filters. |
| `page_sections_page_position_unique (page_id, position)` | Ordered range scan for a page; also guarantees no two sections share a slot. `position` is `COLLATE "C"` so byte order matches fractional keys. |
| `page_sections_global_block_idx (global_block_id) where not null` | "Used on" list for a block; FK restrict checks. Partial, so page-local sections cost nothing. |
| `page_versions_page_version_unique (page_id, version)` | Version drawer, rollback lookup. |
| `global_block_versions_block_version_unique (block_id, version)` | Block history. |
| `global_blocks_key_unique`, `templates_key_unique` | Key uniqueness. |
| `audit_log_created_idx (created_at desc)` | Activity feed (newest first). |
| `audit_log_entity_idx (entity_type, entity_id)` | History of one entity. |
| `redirects` PK (`from_path`) | Redirect lookup (cached as a map). |

## Guidance
- Public reads are cached, so indexes mainly serve the admin and publish paths.
- Run `get_advisors` (Supabase) or `EXPLAIN ANALYZE` before adding indexes; the tables are small today.

## Last Updated
2026-09-26
