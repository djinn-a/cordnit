# CMS SCALE READINESS

## Purpose
Document how the in-house CMS scales from 28 pages to many thousands without redesign.

## Current Status
Live (in-house CMS on Supabase Postgres). The earlier Sanity plan was superseded; see ADR-001.

## Why it scales
| Concern | Design | Cost |
|---|---|---|
| Serving a page | Prerendered HTML, tag-invalidated. On a miss: 1 PK read on `published_pages`. | O(1) |
| Reordering | Fractional index in `position text COLLATE "C"`; only the moved row changes. | O(1) |
| Editing a section | One row update. | O(1) |
| Publishing | One transaction; range scan of that page's sections. | O(sections) |
| Global Block change | One tag invalidation; no fan-out republish. | O(1) writes |
| Sitemap | One cached query over `published_pages`. | O(pages), cached |

## When page counts grow (10k+)
1. Stop prerendering every slug in `generateStaticParams`; return the top N and let the rest render on demand (still cached after first hit).
2. Split the sitemap (`generateSitemaps`) into chunks of 50k URLs.
3. Add pagination/search to the Pages table (currently client-side filtering).
4. On AWS, use a shared cache handler (Redis) so tag invalidation reaches every instance. See [../22-devops/AWS-MIGRATION.md](../22-devops/AWS-MIGRATION.md).

## Env
- `CMS_REVALIDATE_SECRET`: shared secret for `POST /api/revalidate`.

## Last Updated
2026-09-26
