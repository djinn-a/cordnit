# BUILD NEXT BUCKET

## Purpose
The prioritised backlog of what the CMS intentionally does **not** do yet, with enough design direction that each item can start without re-planning. Ordered by value to the business, then effort.

## Current Status
Living document. Last reviewed 2026-09-26.

## Now (highest value, low effort)
| Item | Why | Direction |
|---|---|---|
| **Globals: nav, footer, CTA band, site SEO defaults** | Still edited in code (`data/navigation.ts`, footer components). | New `cms.site_settings` singleton (jsonb per area) with its own tag `cms:globals`, same draft/publish flow as Global Blocks. |
| **Scheduled publishing** | Launch pages at a set time. | `pages.scheduled_at` + a cron (Vercel Cron / EventBridge) calling an internal publish endpoint. |
| **Pages table search/pagination server-side** | Needed past a few hundred pages. | Query params + `pages_status_updated_idx`. |

## CRM (on the same database)
Goal: turn website leads into a pipeline without a second system.

| Entity | Notes |
|---|---|
| `crm.contacts` | Deduplicated by normalised email; links to `leads` rows (today in Supabase + Google Sheets). |
| `crm.companies` | Domain-based grouping of contacts. |
| `crm.deals` | Pipeline stage, value, owner, expected close. |
| `crm.activities` | Notes, calls, emails, stage changes. Reuse the `audit_log` pattern (actor, action, entity, diff). |
| `crm.tasks` | Follow-ups with due dates and reminders. |

Build steps: migrate the lead forms to write `crm.contacts` + an activity; admin screens (contacts table, deal board with dnd-kit, contact timeline); email notifications via Resend already in place; attribution (UTM, landing page) captured on lead submit. Requires multi-user RBAC first if sales staff will use it.

## Editing experience
| Item | Direction |
|---|---|
| **Media library + image editing** | Supabase Storage (S3 on AWS) bucket, `cms.assets` table (alt text required, focal point, dimensions). Expose selected `system_props` image keys in the form as an asset picker. Keep text-only as the default for safety. |
| **Inline/visual editing** | Click-to-edit in the preview iframe via `postMessage` to focus the matching form field. |
| **Draft diff** | Show a field-level diff between draft and live before publishing. |
| **Consolidate the 56 section types** | Merge near-duplicates (heroes, card grids, CTA bands) into generic types with variants, cutting the registry roughly in half. Needs design sign-off; migrate with a data migration script. |
| **Copy section between pages / Global Block from scratch** | Partially there (copy exists); add "new Global Block" without converting a page section. |

## Users and security
| Item | Direction |
|---|---|
| **Multiple users + RBAC** | Roles `admin`, `editor`, `viewer` in `app_metadata`; `requireRole()` in `withAction`; per-role UI. |
| **MFA** | Supabase Auth TOTP (`auth.mfa.*`), enforced for admins. |
| **Login rate limiting / lockout** | Per-IP + per-username counters (Redis or a table), progressive delay. |
| **Session management** | List/revoke active sessions in Settings. |

## Platform
| Item | Direction |
|---|---|
| **Public versioned API** | `/api/v1/pages/:slug` (REST, read-only, cached, API keys) for the portal/mobile; optional GraphQL later. |
| **Webhooks** | Outgoing on publish/unpublish (signed HMAC), for analytics, search indexing, Slack. |
| **Search** | Postgres full-text (`tsvector` over published documents) first; Algolia/OpenSearch if needed. |
| **i18n** | `locale` column on pages + `published_pages (locale, slug)`; `[locale]` route segment; hreflang in metadata and sitemap. |
| **A/B testing** | Variant sections on a page, assignment in `proxy.ts` via cookie, results into analytics events. |
| **Soft delete / trash** | `deleted_at` on pages and blocks with a 30-day restore window. |
| **Observability** | Sentry (errors), OpenTelemetry traces, alerting on `/api/health`. |
| **AWS migration** | See [22-devops/AWS-MIGRATION.md](./22-devops/AWS-MIGRATION.md). |

## Housekeeping
- `data/footer.ts` and `data/hero.ts` are unused (they were already unused before the CMS); delete or fold into globals.
- Component default data files are kept as render fallbacks; remove once globals and the media library land and every section is guaranteed complete props.

## Last Updated
2026-09-26
