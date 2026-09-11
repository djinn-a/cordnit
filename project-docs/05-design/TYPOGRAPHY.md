# TYPOGRAPHY

## Purpose
Semantic type scale. Components use class names like `text-h2` / `text-eyebrow` only — never raw `text-[Npx]` or per-breakpoint chains in JSX.

## Current Status
Approved (2026-09-11)

## Font family
- Primary: Mulish (`--font-mulish` / `font-sans`)
- Mono: reserved for technical content only

## Semantic utilities (px per breakpoint)

| Utility | base | xs | sm | md | lg | xl+ | Weight | Notes |
|---------|------|----|----|----|----|-----|--------|-------|
| `text-display` | 28 | 32 | 40 | 48 | 56 | 64 | extrabold | Hero headlines |
| `text-h1` | 26 | 28 | 32 | 40 | 48 | 56 | extrabold | Page titles |
| `text-h2` | 22 | 24 | 28 | 36 | 40 | 48 | bold | Section titles |
| `text-h3` | 20 | 20 | 22 | 24 | 28 | 32 | semibold | Sub-section / card titles |
| `text-h4` | 16 | 16 | 18 | 18 | 20 | 20 | semibold | Small headings |
| `text-body-lg` | 16 | 16 | 17 | 18 | 18 | 18 | normal | Lead paragraphs |
| `text-body` | 15 | 15 | 15 | 16 | 16 | 16 | normal | Default body |
| `text-body-sm` | 13 | 13 | 13 | 14 | 14 | 14 | normal | Secondary / meta |
| `text-caption` | 11 | 11 | 11 | 12 | 12 | 12 | medium | Captions |
| `text-eyebrow` | 10 | 10 | 11 | 11 | 11 | 11 | bold | Uppercase labels; color `primary` |

Line heights and tracking are baked into each utility in `app/styles/typography.css`.

## Rules
- Change all section headers by editing `.text-h2` once.
- No `clamp()`.
- No arbitrary font sizes in components.

## Last Updated
2026-09-11
