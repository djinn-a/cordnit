# DESIGN-SYSTEM.md — Tailwind Design Tokens, Density Scales, Typography & Color Specs

Owner: Design / Brand team (token values) + Engineering (implementation)
Principle: Components consume tokens only. No hard-coded hex, spacing, or font values inside React components.

## 1. Philosophy
Cordinit sells secure digital transformation. The visual system must therefore feel:
- Credible and enterprise-ready
- Clean and high-performance (no heavy animation)
- Accessible by default (WCAG 2.1 AA contrast)
- Modular so the same tokens can later power the Client Portal and Admin Dashboard
Dark mode is out of scope for v1 unless explicitly requested by design. All tokens are defined for light mode first.

## 2. Token Categories

### 2.1 Color Tokens
Tokens are expressed as CSS custom properties and mapped into the Tailwind theme.

**Brand / Primary**
- `--color-primary-50` … `--color-primary-950`
- Primary is used for primary CTAs, key interactive elements, and brand accents.

**Secondary / Accent**
- Used sparingly for secondary buttons, highlights, and data visualization.

**Neutral**
- Full gray scale for text, borders, backgrounds, and surfaces.

**Semantic**
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Used for form validation states, alerts, and status badges.

**Surface**
- `--color-background`, `--color-surface`, `--color-surface-elevated`, `--color-border`

**Implementation Rule**
```typescript
// tailwind.config.ts (illustrative)
theme: {
 extend: {
  colors: {
   primary: {
    50: 'var(--color-primary-50)',
    // ...
    950: 'var(--color-primary-950)',
   },
   // ...
  }
 }
}
```
Actual hex/RGB values are delivered by the design team via Figma or a design-tokens JSON file and must never be hard-coded in component files.

### 2.2 Typography Scale
| Token | Usage | Approximate Size (desktop) |
|---|---|---|
| `text-display` | Hero headlines | 3.5–4.5rem |
| `text-h1` | Page titles | 2.5–3rem |
| `text-h2` | Section titles | 2rem |
| `text-h3` | Card / sub-section titles | 1.5rem |
| `text-h4` | Smaller headings | 1.25rem |
| `text-body-lg` | Lead paragraphs | 1.125rem |
| `text-body` | Default body | 1rem |
| `text-body-sm` | Secondary / meta | 0.875rem |
| `text-caption` | Labels, captions | 0.75rem |

**Font families:**
- `--font-sans` — primary UI font
- `--font-mono` — code / technical content only
Line heights and letter-spacing are also tokenized.

### 2.3 Spacing Scale
A consistent 4px (or 0.25rem) base unit is recommended.
`--space-0` … `--space-32` (or denser scale as defined by design)

**Common semantic aliases:**
- `--space-section` — vertical rhythm between major page sections
- `--space-card` — internal card padding
- `--space-stack` — consistent vertical stacking gap

### 2.4 Border Radius & Shadows
- Radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- Shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-focus` (for focus rings)
Focus rings must meet accessibility contrast requirements.

### 2.5 Motion
- Duration tokens: `--duration-fast` (150ms), `--duration-normal` (250ms), `--duration-slow` (400ms)
- Easing: `--ease-standard`, `--ease-emphasized`
- Motion is subtle and purposeful only. Heavy parallax or long entrance animations are forbidden because they harm Core Web Vitals and perceived performance.

## 3. Component Library Requirements
The following primitives must be built as reusable, token-driven components:
- Button (primary, secondary, tertiary, destructive, ghost)
- Card (with optional media, header, footer slots)
- Form controls (Input, Textarea, Select, Checkbox, Radio)
- Navigation (desktop mega-menu, mobile drawer)
- Footer
- Modal / Dialog
- Badge / Tag
- Alert / Toast
- Accordion / Tabs (used on Solutions practice pages)
- CTA Banner
- Logo / Brand mark
- Skeleton loaders

**Every component must:**
- Accept a limited set of size / variant props
- Use only design tokens for visual values
- Support keyboard navigation and ARIA attributes
- Be documented with usage examples

## 4. Breakpoints (Aligned with Brief)
| Name | Range | Tailwind Default Mapping |
|---|---|---|
| mobile | ≤ 640px | `sm` and below |
| tablet | 641px – 1024px | `md` / `lg` |
| desktop | ≥ 1025px | `xl` and above |
Real-device testing is mandatory; browser resize alone is insufficient.

## 5. Density Scales
Two density modes may be defined later (comfortable vs compact). For Phase 1 only the comfortable density is required.
Spacing and typography tokens should be structured so a compact density can be introduced without rewriting components.

## 6. Accessibility Tokens
- Minimum contrast ratios enforced by the design tokens themselves
- Focus-visible styles using `--shadow-focus` or outline tokens
- Reduced-motion media query support: respect `prefers-reduced-motion`

## 7. Implementation Checklist for Engineers
- [ ] Design tokens JSON / CSS variables imported globally
- [ ] Tailwind theme extended exclusively via tokens
- [ ] No hex values or raw pixel spacing inside .tsx files
- [ ] Component library lives under components/ui or equivalent
- [ ] Storybook or equivalent documentation (recommended)
- [ ] Dark mode variables prepared but not activated unless design signs off

## 8. Handover from Design
Design must deliver:
- Figma file with component library
- Design tokens export (JSON or CSS)
- Explicit confirmation on dark mode scope for v1
- Certification / partner badge assets (placeholders acceptable until confirmed)
Engineering must never invent brand colors or typography scales.

This document is the contract between Design and Engineering for all visual decisions. Token changes require a version bump and review against existing components.
