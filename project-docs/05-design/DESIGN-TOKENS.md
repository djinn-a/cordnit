# DESIGN TOKENS

## Purpose
Single source of truth for visual values. CSS variables in `app/globals.css` → Tailwind theme → semantic utilities / UI primitives.

## Current Status
Approved (2026-09-11)

## Categories

### Color
See [COLORS.md](./COLORS.md). Variables: `--color-primary`, `--color-primary-hover`, …

### Typography
See [TYPOGRAPHY.md](./TYPOGRAPHY.md). Implemented as `@layer components` utilities in `app/styles/typography.css`.

### Breakpoints
See [BREAKPOINTS.md](./BREAKPOINTS.md).

### Radius
| Token | Value | Class |
|-------|-------|-------|
| `radius-btn` | `0.4rem` | `rounded-btn` |
| `radius-md` | `0.75rem` | `rounded-md` (theme) |
| `radius-lg` | `1rem` | `rounded-lg` |
| `radius-card` | `1.5rem` | `rounded-card` |
| `radius-card-lg` | `2rem` | `rounded-card-lg` |

### Shadows
| Token | Usage |
|-------|-------|
| `shadow-card` | Elevated cards |
| `shadow-focus` | Focus rings |
| `shadow-glow-primary` | Primary CTA glow |

### Gradients
| Token | Usage |
|-------|-------|
| `gradient-contact` | Contact form dark card |
| `gradient-nav` | Navbar accent strip |
| `gradient-newsletter` | Newsletter dark panel |

### Layout
| Token | Value |
|-------|-------|
| `max-w-container` | `80rem` (7xl) |
| `max-w-container-xl` | `1400px` |
| `max-w-container-2xl` | `1600px` |
| `max-w-container-wide` | `1800px` |

### Spacing semantics
- Section vertical: handled by `Section` variants (`py-section` / responsive)
- Container horizontal: `px-4 xs:px-5 sm:px-6 lg:px-8`

## Implementation map
| File | Role |
|------|------|
| `app/globals.css` | CSS variables + imports |
| `app/styles/typography.css` | Semantic type utilities |
| `tailwind.config.ts` | Screens, colors, radius, shadows, max-widths |
| `lib/utils/cn.ts` | Class merge helper |
| `components/ui/*` | Primitives consuming tokens |

## Rules
1. Components consume tokens / semantic utilities only.
2. Before adding a token, search for an existing role and reuse.
3. Token changes require a docs update in this folder.

## Last Updated
2026-09-11
