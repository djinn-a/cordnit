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

# OVERVIEW.md — Content Architecture

**Responsibility:** Service content type + nullable parent, taxonomy sync, SEO fields.
**Source:** Project Brief Sections 4, 5, 6, 7

## CMS-Driven Content
- Zero hardcoded marketing copy, page titles, descriptions, or ICP messaging inside React components.
- Every piece of user-facing content must be editable by non-developers via the headless CMS.
- **Headless CMS Choice:** Sanity.

