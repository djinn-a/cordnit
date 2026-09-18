---
trigger: always_on
---

# Page Layout and Section Spacing Rules

When creating or modifying page layouts and section components, you MUST follow these spacing invariants to match the project's Figma design system:

## 1. Global Container Constraints
The main page layout (e.g., `PageLayout`) is responsible for defining the maximum width, horizontal padding, and global section gaps.
- Use `max-w-[1440px]` (or equivalent) for the main wrapper.
- Use the config token `px-space-60` for left/right padding.
- Use the config token `py-space-80` to provide space between the navigation bar (top) and footer (bottom).

## 2. Gap-Based Section Spacing
The layout wrapper must use a flex-column approach with `gap-space-80` to handle spacing *between* sections.
- **NEVER** apply vertical margins (e.g., `mb-[64px]`) or padding (e.g., `pt-12`, `pb-24`) to the outer container of individual section components just to create space between them. 
- Rely entirely on the parent container's `gap` to space out the sections uniformly.

## 3. Section Component Responsibilities
- Individual sections (e.g., `PageHero`, `AboutSection`) should act as flexible blocks (`w-full`) without external spacing classes.
- If a section contains multiple internal blocks (like a text block and an image block) that are treated as separate rows in the design, use `gap-space-80` internally to separate them, matching the page-level spacing flow.
