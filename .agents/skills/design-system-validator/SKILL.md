---
name: design-system-validator
description: Verify UI implementations match the design system tokens precisely.
---

# design-system-validator

## Purpose
Verify UI implementations match the design system tokens precisely.

## When To Use
Use this skill when performing tasks related to design system validator.

## Required Context
Requires CSS/Tailwind configuration and component styles.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/05-design/DESIGN-SYSTEM.md`, `/project-docs/05-design/DESIGN-TOKENS.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Ensure no arbitrary hex colors or spacing values are used.
2. Verify Tailwind classes match the approved token scales.
3. Audit responsive breakpoints.

## Validation Checklist
- [ ] Task executed according to execution steps.
- [ ] Relevant documentation was loaded and adhered to.
- [ ] Changes adhere to the global "Minimal Change" and "Reuse Before Create" rules.

## Failure Conditions
- The agent invents requirements or hardcodes values that should be dynamic/CMS-driven.
- The agent modifies architecture without checking documentation.
- The execution steps fail or throw errors.

## Output Requirements
Produce clear, concise output summarizing the findings or the changes made. Include references to the documents consulted.

## Completion Criteria
The task is considered complete when the validation checklist is fully checked off and no failure conditions are met.
