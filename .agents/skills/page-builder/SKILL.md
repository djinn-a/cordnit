---
name: page-builder
description: Construct new UI pages conforming to the product specifications and design system.
---

# page-builder

## Purpose
Construct new UI pages conforming to the product specifications and design system.

## When To Use
Use this skill when performing tasks related to page builder.

## Required Context
Requires the component library and page routes.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/03-pages/PAGE-TEMPLATE.md`, `/project-docs/02-product/PAGE-REQUIREMENTS.md`, `/project-docs/07-frontend/ROUTING.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Load page requirements.
2. Verify necessary components exist.
3. Construct the page following the architecture guidelines.
4. Add to routing.

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
