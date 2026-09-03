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

# OVERVIEW.md — Performance Targets

## Targets
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Lighthouse Performance ≥ 90 (mobile and desktop)

## Practices
- Prefer SSG / ISR and React Server Components
- Images via CDN with srcset and lazy loading
- Minimize client-side JavaScript
- Avoid heavy animation libraries
- Code-split and tree-shake aggressively
- Monitor with Lighthouse CI and the `lighthouse-auditor` skill

## Budget Discipline
Any new third-party script or large asset must be justified against the Core Web Vitals budget before merge.

