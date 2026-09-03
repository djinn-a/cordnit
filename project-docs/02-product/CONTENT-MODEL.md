# CONTENT MODEL

## Purpose
Describe the purpose of this document.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from content-model.md)

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

