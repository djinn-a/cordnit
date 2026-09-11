# COLORS

## Purpose
Brand and semantic color tokens. Components use Tailwind color classes mapped from CSS variables — never hardcoded hex.

## Current Status
Approved (2026-09-11)

## Brand primary
Canonical primary: `#2251ff`

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` / `primary-DEFAULT` | `#2251ff` | CTAs, accents, eyebrows, links |
| `primary-hover` | `#1a42e0` | Hover on primary actions |
| `primary-muted` | `#C9DDF5` | Soft fills / chips |
| `primary-pale` | `#E8F0F8` | Background tints |
| `primary-border` | `#8BBDD6` | Soft borders |

Legacy `#0A82B5` is retired as brand primary. Competing blues (`#2b5cff`, `#2563eb`, `#2E5CFF`, Tailwind `blue-600`) map to `primary` / `primary-hover`.

## Neutrals & surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | `#FFFFFF` | Default page |
| `surface-dark` | `#0a1122` | Dark panels / modals |
| `surface-darker` | `#050811` | Deep overlays |
| `ink` | `#000000` | Headings |
| `ink-muted` | `#555555` | Body secondary |
| `ink-subtle` | `#a1a1aa` | Placeholder / meta |
| `border-subtle` | `#e5e7eb` | Default borders |

## Semantic

| Token | Hex |
|-------|-----|
| `success` | `#00d95f` |
| `error` | `#ef4444` |
| `warning` | `#f59e0b` |
| `info` | `#2251ff` |

## Footer
- `footer-icon`: `#1c1c1c`

## Rules
- No hex in `.tsx` files.
- Prefer `text-primary`, `bg-primary`, `border-primary`, etc.

## Last Updated
2026-09-11
