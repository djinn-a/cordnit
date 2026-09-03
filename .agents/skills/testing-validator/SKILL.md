---
name: testing-validator
description: Ensure tests are written and meet coverage/quality gates.
---

# testing-validator

## Purpose
Ensure tests are written and meet coverage/quality gates.

## When To Use
Use this skill when performing tasks related to testing validator.

## Required Context
Requires unit and integration test files.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/15-testing/TESTING-STRATEGY.md`, `/project-docs/15-testing/TEST-CHECKLIST.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Audit test coverage.
2. Verify tests match the behavior defined in the documentation.
3. Run test suites to confirm passing status.

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
