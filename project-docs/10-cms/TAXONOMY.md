# TAXONOMY

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



## Legacy Content (Merged from taxonomy.md)

# TAXONOMY.md — Content Data Model (Headless CMS)

While Supabase handles transactional data, the Headless CMS holds the complex relationships for the marketing site. This taxonomy must strictly prevent orphaned content.

## 1. The "Solutions" Hierarchy
The PDF dictates a highly modular hierarchy: `Practice Area` -> `Sub-Service`.

**CMS Document Type: `Service`**
- `id`: UUID
- `title`: String
- `slug`: String
- `parent_service`: Reference to `Service` (Nullable).
  - *Edge Case Handling:* If `parent_service` is NULL, this is a top-level Practice Area (e.g., "Cloud Engineering"). If populated, it is a Sub-Service (e.g., "AWS Migration").
- `content_blocks`: Array of references to Sections (Hero, ValueProps, FAQs).

## 2. The "Insights" Tagging System
Insights (Blog/Case Studies) must be filterable by both Industry and Service.

**CMS Document Type: `Insight`**
- `title`: String
- `slug`: String
- `type`: Enum (`Blog`, `Case Study`, `Whitepaper`)
- `related_services`: Array of References to `Service`
- `related_industries`: Array of References to `Industry`

**Production Requirement (Referential Integrity):**
If an `Industry` is deleted in the CMS, the CMS must either block the deletion (if Insights are attached) or safely cascade/nullify the reference. The Next.js frontend must gracefully handle missing references by filtering out nulls in the GraphQL response, preventing 500 errors if content editors make mistakes.

