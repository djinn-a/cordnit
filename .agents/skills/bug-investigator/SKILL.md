---
name: bug-investigator
description: Diagnose and resolve issues within the codebase using minimal changes.
---

# bug-investigator

## Purpose
Diagnose and resolve issues within the codebase using minimal changes.

## When To Use
Use this skill when performing tasks related to bug investigator.

## Required Context
Requires the error stack trace and affected files.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/16-quality/VERIFICATION.md`, `/project-docs/06-architecture/ERROR-HANDLING.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Reproduce the error.
2. Trace the issue to its root cause.
3. Apply the minimal possible change to resolve it.
4. Verify the fix does not break related systems.

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
