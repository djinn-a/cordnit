---
name: component-builder
description: Construct reusable UI components aligned with the design tokens and system.
---

# component-builder

## Purpose
Construct reusable UI components aligned with the design tokens and system.

## When To Use
Use this skill when performing tasks related to component builder.

## Required Context
Requires design tokens and existing components.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/05-design/COMPONENTS.md`, `/project-docs/05-design/DESIGN-TOKENS.md`, `/project-docs/07-frontend/COMPONENT-ARCHITECTURE.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Check if component already exists (REUSE -> EXTEND -> CREATE).
2. Build component using Tailwind v4.
3. Ensure accessibility guidelines are met.

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
