# SITEMAP

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



## Legacy Content (Merged from sitemap-robots.md)

# SITEMAP-ROBOTS.md — Crawl Budget & Indexing

## 1. Dynamic Sitemap (`sitemap.xml`)
A static sitemap is insufficient for a CMS-driven site. 
- Use the Next.js `sitemap.ts` convention to generate the sitemap dynamically at request time or build time.
- The function must query the GraphQL API for all published Solutions, Industries, and Insights.
- **Priority Rules:**
  - Home: `1.0`
  - Solutions / Industries: `0.8`
  - Insights Hub: `0.8`
  - Individual Insight Articles: `0.6`

## 2. Robots.txt (`robots.txt`)
- Must explicitly map to the dynamic sitemap: `Sitemap: https://cordinit.com/sitemap.xml`.
- Disallow crawling of internal Next.js API routes: `Disallow: /api/`

## 3. Parameter-Driven Routes (Edge Case)
**Scenario:** The `/insights` page allows filtering via query parameters (e.g., `?industry=finance&topic=cloud`). If Googlebot crawls these, it generates thousands of duplicate pages, burning crawl budget.
**Production Handling:** 
- The Next.js layout or middleware must detect query parameters on these routes.
- If parameters are present, inject `<meta name="robots" content="noindex, nofollow" />`.
- Only the clean, parameter-less base route (`/insights`) is allowed to be indexed.

