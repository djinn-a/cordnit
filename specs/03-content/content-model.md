# CONTENT-MODEL.md — Headless CMS Model

## 1. Content Modeling Guardrails
- All Solutions, Industries, Accelerators, Insights content lives in the headless CMS.
- SEO metadata (title, description, OG image) is stored on each CMS document.
- Related content (related insights, related solutions, related industries) is expressed as CMS reference fields.
- The contact form “Area of Interest” dropdown is populated dynamically from the same Solutions taxonomy so it never drifts.

## 2. The `service` Content Type
- Solutions content is modeled as a single `service` type with a nullable `parent` reference.
- `parent = null` - top-level / flat practice.
- `parent != null` - sub-service of a practice.
- This allows new practices and sub-services to be added without code changes.
