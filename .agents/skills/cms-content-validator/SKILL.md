---
name: cms-content-validator
description: Verify that content models and fetched data align with the CMS schema.
---

# cms-content-validator

## Purpose
Verify that content models and fetched data align with the CMS schema.

## When To Use
Use this skill when performing tasks related to cms content validator.

## Required Context
Requires data fetching hooks and CMS client configurations.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/10-cms/CMS-CONTRACT.md`, `/project-docs/10-cms/CONTENT-SCHEMAS.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Verify no hardcoded marketing copy in components.
2. Check CMS API queries for correctness.
3. Validate placeholder fallbacks.

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
