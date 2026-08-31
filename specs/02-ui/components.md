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
