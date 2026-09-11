# CMS SCALE READINESS

## Purpose
Document how Cordinit scales from static `data/pages/*` to a headless CMS producing 100k+ SSR pages without rewriting presentational components.

## Current Status
Prepared (architecture ready; Sanity not wired)

## As-built pipeline

```
getPage(slug) → PageDocument → LayoutRenderer → SectionRenderer → componentMap[_type]
```

| Piece | Path |
|-------|------|
| Types | `lib/cms/types.ts` |
| Map | `lib/cms/component-map.ts` |
| Loader | `lib/cms/get-page.ts` (static today) |
| Renderers | `components/renderers/*` |
| Page docs | `data/pages/{home,about,contact}.ts` |
| Revalidate | `POST /api/revalidate` |

## When CMS lands (Sanity)

1. Keep `PageDocument` / `SectionType` contracts stable.
2. Replace `getPage` body with GraphQL or `lib/cms` client fetch tagged `page:${slug}`.
3. Add dynamic route `app/(main)/[[...slug]]/page.tsx` (or hub + `[slug]`) calling `getPage`.
4. Do **not** SSG all pages at build — use on-demand ISR via `/api/revalidate` webhooks.
5. Chunk sitemaps (`sitemap/[id].xml` + index).
6. Configure `images.remotePatterns` for the CMS CDN in `next.config`.
7. `generateMetadata` already reads `page.seo` — map CMS SEO fields into that shape.
8. Never call CMS from Client Components; interactive leaves stay props-driven.

## Env
- `CMS_REVALIDATE_SECRET` — shared webhook secret for `/api/revalidate`

## Last Updated
2026-09-11
