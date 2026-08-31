# ACCESSIBILITY.md — WCAG Compliance

## Standard
The Cordinit website must strictly meet **WCAG 2.1 AA** standards.

## Core Requirements
- **Keyboard Navigation:** Every interactive element (Buttons, Forms, Mega-Menu, Accordions) must be fully usable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
- **Focus States:** Visible, high-contrast focus rings must be present on all focusable elements (enforced via design tokens like `--shadow-focus`).
- **Color Contrast:** Foreground text and background colors must pass the WCAG AA minimum contrast ratio (4.5:1 for normal text, 3:1 for large text).
- **Semantics:** 
  - Use proper HTML5 semantic tags (`<nav>`, `<main>`, `<article>`, `<aside>`).
  - Maintain a strict heading hierarchy (`H1` -> `H2` -> `H3`) without skipping levels.
- **ARIA:** Use ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-label`) only when native HTML semantics are insufficient.
- **Images:** An `alt` text field is strictly required on every CMS image.

## Verification
- Accessibility is verified via Lighthouse (target: 90+) and the `wcag-accessibility-checker` skill before any PR is merged.
