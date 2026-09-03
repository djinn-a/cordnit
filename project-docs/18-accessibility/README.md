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



## Legacy Content (Merged from accessibility.md)

# ACCESSIBILITY.md — WCAG Compliance

## Standard
The Cordinit website must strictly meet **WCAG 2.1 AA** standards.

## Core Requirements
- **Keyboard Navigation:** Every interactive element (Buttons, Forms, Mega-Menu, Accordions) must be fully usable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
- **Focus States:** Visible, high-contrast focus rings must be present on all focusable elements (enforced via design tokens like `--shadow-focus`).
- **Color Contrast:** Foreground text and background colors must pass the WCAG AA minimum contrast ratio (4.5:1 for normal text, 3:1 for large text).
- **Semantics:** 
  - Use proper HTML5 semantic tags (`<nav>`, `<main>`, `<article>`, `<aside>`).
  - Maintain a strict heading hierarchy (`H1` -> `H2` -> `H3`) without skipping levels.
- **ARIA:** Use ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-label`) only when native HTML semantics are insufficient.
- **Images:** An `alt` text field is strictly required on every CMS image.

## Verification
- Accessibility is verified via Lighthouse (target: 90+) and the `wcag-accessibility-checker` skill before any PR is merged.

