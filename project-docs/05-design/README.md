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

# OVERVIEW.md — UI/UX Implementation Layer

## Foundation
The Cordinit website UI is built upon a strict, token-driven design system. The goal is to ensure a fast, credible, and highly accessible user experience that scales seamlessly into future phases (Client Portal, Admin Dashboard).

## Core Directives for UI Engineering

1. **Token-Driven:** Components must consume design tokens only. Hardcoded hex values, raw pixel spacing, and ad-hoc font sizes are strictly forbidden inside React components.
2. **Responsive by Default:** The site must be fully responsive across mobile, tablet, and desktop viewports.
3. **Dummy Assets:** Until final assets are delivered by the design and marketing teams, developers must implement responsive placeholder/dummy assets for:
   - Trust signals (certifications, partner badges)
   - CMS imagery (hero images, blog thumbnails)
   - Client logos
4. **Accessibility:** WCAG 2.1 AA compliance is the minimum standard.
5. **Performance:** The UI must adhere to Core Web Vitals (Lighthouse 90+), utilizing responsive images (`srcset`), lazy loading, and avoiding heavy, performance-degrading animations.

