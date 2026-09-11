# BREAKPOINTS

## Purpose
Canonical viewport ladder for Cordinit. All responsive type, spacing, and layout steps use these named screens. No `clamp()`.

## Current Status
Approved (2026-09-11)

## Screen map (mobile-first)

| Name | Role | Min-width | Tailwind prefix |
|------|------|-----------|-----------------|
| base | Small mobile | `< 360px` | (none) |
| xs | Mobile | `360px` | `xs:` |
| sm | Large mobile | `480px` | `sm:` |
| md | Small DWEB | `768px` | `md:` |
| lg | Medium DWEB | `1024px` | `lg:` |
| xl | Large DWEB | `1280px` | `xl:` |
| 2xl | Wider DWEB | `1536px` | `2xl:` |
| 3xl | XL DWEB | `1920px` | `3xl:` |

## Rules
- Styles are mobile-first: base styles apply below the next named min-width.
- Do not use range queries (e.g. former `tablet-only`). Compose with min-width prefixes only.
- Navigation: hamburger below `lg`; full mega-menu from `lg` up.
- Containers widen at `2xl` / `3xl` via max-width tokens, not ad-hoc classes.

## Implementation
Defined in `tailwind.config.ts` `theme.screens` (and mirrored in `@theme` if needed).

## Last Updated
2026-09-11
