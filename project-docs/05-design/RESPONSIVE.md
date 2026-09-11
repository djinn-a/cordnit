# RESPONSIVE

## Purpose
Responsive contract for Cordinit — multi-breakpoint, mobile-first, no `clamp()`.

## Current Status
Approved (2026-09-11)

## Breakpoints
See [BREAKPOINTS.md](./BREAKPOINTS.md).

| Role | Prefix |
|------|--------|
| Small mobile | base |
| Mobile | `xs:` |
| Large mobile | `sm:` |
| Small DWEB | `md:` |
| Medium DWEB | `lg:` |
| Large DWEB | `xl:` |
| Wider / XL | `2xl:` / `3xl:` |

## Rules
- Prefer semantic type utilities (`text-h2`, `text-eyebrow`) that already encode the full ladder.
- Prefer `Container` / `Section` for layout shells.
- Do not use range queries.
- Real-device testing is mandatory before declaring a feature done.

## Last Updated
2026-09-11
