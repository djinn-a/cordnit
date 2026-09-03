---
trigger: always_on
---

# Tailwind Design Token Workflow

This rule applies to ALL UI development in this project. Whenever creating, modifying, or adding any UI, you MUST automatically follow the Tailwind design token workflow below.

## 1. Check tailwind.config.ts First
Before writing new styling, inspect `tailwind.config.ts` for existing design tokens (e.g., colors, fontFamily, fontSize, spacing, width, height, borderRadius, etc.).

## 2. Reuse Existing Tokens
If the required value already exists in `tailwind.config.ts`, reuse it. 
- Example: Use `bg-brand-primary` instead of `bg-[#0A82B5]`.
- Always prefer existing reusable design tokens over creating duplicate arbitrary values.

## 3. Automatically Add New Reusable Tokens
If a styling value does NOT exist but is **reusable**, automatically add it to `tailwind.config.ts`.
- Examples of reusable values: brand colors, typography sizes, container sizes, card/button border radius, common shadows.
- Add the token and use it immediately in the UI. **Do not wait for explicit user permission to do this.**

## 4. Keep One-Off Values Arbitrary
Do NOT put every CSS value into `tailwind.config.ts`.
- Keep genuinely one-off values (e.g., unique positioning, specific percentages, unique dimensions) as arbitrary values inside the component.
- Decision Process:
  1. Exists? → YES: Reuse it.
  2. Reusable/System token? → Add to `tailwind.config.ts`.
  3. Unique/One-off? → Keep component-specific.

## 5. Prevent Duplicate Tokens
Before adding a new token, verify that an existing token doesn't already serve the same purpose. Never create duplicate tokens representing the same CSS value without a valid semantic reason.

## 6. Preserve Existing UI
When modifying `tailwind.config.ts`, ensure that you DO NOT unintentionally change the existing UI, layout, typography, animations, or responsive behavior of other components.

## 7. Use the Correct Token Category
Store values in the correct Tailwind category (e.g., `theme.extend.colors`, `theme.extend.spacing`, `theme.extend.borderRadius`). Do not mix unrelated values.

## 8. Exact Value Preservation
Do not approximate values. If the design requires `37px`, use exactly `37px` as a custom token (if reusable) or as an arbitrary value (if one-off). The UI must remain pixel-accurate.

## 9. Automatic Development Workflow Checklist
For EVERY new UI development, automatically execute this loop:
1. Identify required styles
2. Check `tailwind.config.ts`
3. Reuse existing tokens
4. Automatically add missing reusable tokens
5. Implement UI using tokens
6. Keep one-off values component-specific
7. Verify no unintended UI changes

## 10. Tailwind Config Compatibility
Before adding tokens, verify the project's Tailwind version and existing configuration approach.

Follow the existing project architecture.

For Tailwind CSS v4 projects, ensure new tokens added to tailwind.config.ts are correctly connected and generated through the project's configured @config workflow.

Do not introduce a second conflicting design-token system.

---

## 11. Update Existing Tokens Instead of Duplicating
If a new reusable requirement is semantically the same as an existing token but requires the same value, reuse the existing token.

If a token needs to evolve for the design system, carefully verify all existing usages before changing it.

Never rename, remove, or modify an existing shared token if doing so could change existing UI.

Prefer adding a new token only when it represents a genuinely different semantic purpose.
**DO NOT wait for separate user instructions to do this.** This is a permanent project development rule and must be followed automatically.
