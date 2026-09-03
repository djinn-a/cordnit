# DESIGN APPROVAL

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



## Legacy Content (Merged from design-approval.md)

# DESIGN-APPROVAL.md — Design System Rules & Handoff

This document defines the required processes and rules for implementing the visual design system, based on Section 9 of the Project Brief.

## 1. Design System Requirements

Actual color and typography values are owned by the brand/design team. Developers must build the component library to consume tokens, not hardcoded hex values.

- **Design Tokens:** Define and implement tokens for colors (primary, secondary, neutral, semantic states), typography scale, spacing scale, border radius, and shadows.
- **Reusable Component Library:** Must include primitives such as:
  - Buttons (primary, secondary, tertiary, destructive, ghost)
  - Cards (with slots for media, header, footer)
  - Form controls (Input, Textarea, Select, Checkbox, Radio)
  - Navigation (desktop mega-menu, mobile drawer)
  - Footer, Modals, Badges/Tags, Accordion/Tabs, Skeleton loaders.
- **Motion:** Must be subtle and purposeful (hover states, page transitions). Heavy animations that hurt Core Web Vitals are forbidden. Respect `prefers-reduced-motion`.
- **Dark Mode:** Not required for v1 unless explicitly specified by design. Confirm before building.

## 2. Handover from Design to Engineering

The design team must deliver the following artifacts to engineering:
- **Figma File:** Containing the component library.
- **Design Tokens Export:** In JSON or CSS format.
- **Explicit Confirmations:** Scope of dark mode for v1.
- **Assets:** Certification and partner badge assets (placeholders are acceptable until finalized).

**Strict Rule:** Engineering must never invent brand colors or typography scales. All visual values must map back to an approved design token.

## 3. Implementation Checklist for Engineers

- [ ] Design tokens (JSON/CSS) are imported globally.
- [ ] Tailwind theme is extended exclusively via design tokens.
- [ ] No hex values or raw pixel spacing exist inside `.tsx` files.
- [ ] Component library is isolated (e.g., under `components/ui`).
- [ ] Components accept a limited set of size/variant props.
- [ ] Components support keyboard navigation and ARIA attributes natively.

