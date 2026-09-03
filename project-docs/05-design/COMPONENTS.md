# COMPONENTS

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



## Legacy Content (Merged from components.md)

# COMPONENTS.md — Component Library Primitives

The Cordinit component library must be built as a set of highly reusable, token-driven primitives. This library will eventually be exported for use in the Client Portal and Admin Dashboard.

## Required Primitives
- **Button:** Variants for Primary, Secondary, Tertiary, Destructive, and Ghost. Must support disabled and loading states.
- **Card:** Highly flexible container with optional slots for media (top/side), headers, and footers. Used heavily in the Solutions and Insights grids.
- **Form Controls:** 
  - Input (Text, Email)
  - Textarea
  - Select (Dropdown)
  - Checkbox & Radio
  - *Must include clear error/success validation states.*
- **Navigation:** Desktop mega-menu structure and mobile drawer primitives.
- **Modals / Dialogs:** Accessible, focus-trapped overlays.
- **Badges / Tags:** Used for categorizing Insights or marking Industries.
- **Alert / Toast:** For form submission feedback (success/error).
- **Accordions / Tabs:** Critical for structuring deep Solutions practice pages.
- **Skeleton Loaders:** For CMS data fetching states.

## Component Contract
Every component must:
1. Accept a limited set of size and variant props.
2. Use only design tokens for visual values.
3. Be fully responsive.
4. Support keyboard navigation natively.

