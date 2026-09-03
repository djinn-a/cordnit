---
name: release-validator
description: Run pre-flight checks before considering a milestone complete or ready for release.
---

# release-validator

## Purpose
Run pre-flight checks before considering a milestone complete or ready for release.

## When To Use
Use this skill when performing tasks related to release validator.

## Required Context
Requires the entire project state and CI/CD status.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/25-releases/RELEASE-CHECKLIST.md`, `/project-docs/16-quality/QUALITY-GATES.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Run all linters and formatters.
2. Run all tests.
3. Trigger performance and accessibility audits.
4. Verify documentation is up to date.

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
