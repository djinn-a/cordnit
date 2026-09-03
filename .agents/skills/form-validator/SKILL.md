---
name: form-validator
description: Ensure form implementations meet validation and lead-generation criteria.
---

# form-validator

## Purpose
Ensure form implementations meet validation and lead-generation criteria.

## When To Use
Use this skill when performing tasks related to form validator.

## Required Context
Requires form components and API route handlers.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/12-forms-leads/FORM-ARCHITECTURE.md`, `/project-docs/12-forms-leads/VALIDATION.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Check client-side validation logic.
2. Check server-side validation logic.
3. Ensure spam-protection (hCaptcha) is implemented.

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
