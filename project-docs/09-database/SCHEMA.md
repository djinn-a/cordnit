# SCHEMA

## Purpose
Reference for the `cms` Postgres schema. Source of truth: `server/db/schema/cms.ts` and `server/db/migrations/*.sql`.

## Current Status
Approved. Migrations `0000`-`0003` applied.

## Tables
| Table | Purpose | Key columns |
|---|---|---|
| `pages` | Draft page meta | `id uuid pk`, `slug text unique` (e.g. `salesforce/sales`, home = `home`), `title`, `shell` (`default`/`contact`), `spacing` (`default`/`compact`/`compact-top`), `seo jsonb`, `breadcrumbs jsonb`, `status` enum (`draft`/`published`/`archived`), `lock_version int`, `published_version`, `has_unpublished_changes`, `template_id` -> templates (set null), `created_by`/`updated_by uuid` |
| `page_sections` | Ordered draft sections | `page_id` -> pages (cascade), `type`, `label`, `position text COLLATE "C"`, `content jsonb` (editable text), `system_props jsonb` (hidden images/icons), `global_block_id` -> global_blocks (**restrict**), `is_hidden` |
| `global_blocks` | Reusable sections | `key unique`, `name`, `type`, `content`, `system_props`, `published_props`, `published_version`, `has_unpublished_changes`, `lock_version` |
| `global_block_versions` | Block history | `(block_id, version) unique`, `content`, `system_props`, `note` |
| `page_versions` | Page history | `(page_id, version) unique`, `document jsonb` (published snapshot), `source jsonb` (raw sections for draft restore), `note`, `created_by` |
| `published_pages` | **Read model**, one row per live URL | `slug pk`, `page_id unique` -> pages (cascade), `document jsonb`, `version`, `noindex`, `block_ids uuid[]`, `published_at` |
| `templates` | "Layouts" | `key unique`, `name`, `description`, `shell`, `spacing`, `sections jsonb` |
| `redirects` | Old path -> new path | `from_path pk`, `to_path`, `status_code` (301/302/307/308) |
| `audit_log` | Every mutation | `id bigint identity`, `actor_id uuid`, `action`, `entity_type`, `entity_id`, `summary`, `diff jsonb`, `created_at` |

Actor columns are plain `uuid` with **no FK to `auth.users`**, so the schema doesn't depend on Supabase Auth.

## Constraints (migration 0001+)
- `pages_slug_format`: lowercase segments separated by `/`, max 200 chars.
- `pages_shell_check`, `pages_spacing_check`, `templates_*_check`: enum-like checks.
- `pages_lock_version_positive`.
- `page_sections_position_format`: base62 only.
- `redirects_status_check`, `redirects_no_self_loop`.

## Security
- RLS enabled on every table, with **no policies**.
- `REVOKE ALL` on the schema, tables and sequences from `PUBLIC`, `anon`, `authenticated`, including default privileges for future tables.
- The schema isn't in the Data API's exposed schemas. Only the server's Postgres role reaches it.

## Deviation from the plan
No `deleted_at` column: deletes are hard deletes (versions cascade), and history lives in `audit_log`. Soft delete can be added later if a trash/restore feature is needed.

## Last Updated
2026-09-26
