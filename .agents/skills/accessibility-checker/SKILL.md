---
name: accessibility-checker
description: Ensure all UI components and pages meet WCAG standards.
---

# accessibility-checker

## Purpose
Ensure all UI components and pages meet WCAG standards.

## When To Use
Use this skill when performing tasks related to accessibility checker.

## Required Context
Requires the generated UI code.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/18-accessibility/ACCESSIBILITY-STRATEGY.md`, `/project-docs/18-accessibility/WCAG.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Audit DOM structure for semantic HTML.
2. Check ARIA labels and focus states.
3. Verify color contrast ratios.

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
