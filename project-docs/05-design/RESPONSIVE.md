# RESPONSIVE

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



## Legacy Content (Merged from responsive.md)

# RESPONSIVE.md — Responsive Design Mandates

All UI components and layouts must be responsive. Developers should follow a **mobile-first** approach using Tailwind CSS.

## Breakpoints (Aligned with Brief Section 8)

The following breakpoints map to the standard Tailwind configuration and must be respected across all pages:

| Device Type | Viewport Range | Tailwind Modifier |
|---|---|---|
| **Mobile** | `≤ 640px` | Default (no modifier) to `sm` |
| **Tablet** | `641px – 1024px` | `md` and `lg` |
| **Desktop** | `≥ 1025px` | `xl` and `2xl` |

## Implementation Rules
- **Fluid Layouts:** Use CSS Grid and Flexbox to ensure components resize fluidly between breakpoints. Avoid fixed widths.
- **Images:** All images (including dummy assets) must scale down gracefully without breaking their aspect ratios. Use Tailwind's `aspect-video`, `aspect-square`, or `object-cover` where appropriate.
- **Navigation:** 
  - Desktop (`xl`): Full mega-menu for Solutions.
  - Mobile/Tablet (`sm`, `md`, `lg`): Hamburger menu triggering a mobile drawer or slide-out menu.
- **Verification:** Browser resizing during development is insufficient. Real-device testing is mandatory before declaring a feature "done."

