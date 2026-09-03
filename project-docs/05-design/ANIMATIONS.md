# ANIMATIONS

## Purpose
Describe the purpose of this document.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from animations.md)

# ANIMATIONS.md

## Motion Rules
- Duration tokens: `--duration-fast` (150ms), `--duration-normal` (250ms), `--duration-slow` (400ms)
- Easing: `--ease-standard`, `--ease-emphasized`
- Motion is **subtle and purposeful only**. Heavy parallax or long entrance animations are forbidden because they harm Core Web Vitals and perceived performance.
- Respect `prefers-reduced-motion` natively in all custom transitions.

