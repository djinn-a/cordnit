# README

## Purpose
This directory is responsible for containing all documentation related to readme.

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



## Legacy Content (Merged from overview.md)

# OVERVIEW.md — Definition of Done Enforcement

**Responsibility:** Automated enforcement of DoD + form/API tests.
**Source:** Project Brief Section 13 Definition of Done

## 1. Definition of Done
A deliverable is complete only when all of the following are true:
- Matches functional requirements
- Responsive on mobile, tablet, desktop
- Passes WCAG 2.1 AA
- Lighthouse ≥ 90
- Content is CMS-editable
- SEO metadata fields present
- Forms validated client + server
- Code reviewed and merged via PR
- Documented

## 2. Implementation checks
- Lead / newsletter submissions persist in structured storage.
- Spam protection (hCaptcha) and rate limiting on form endpoints.
- JSON-LD present where required.
- Core Web Vitals within targets.

