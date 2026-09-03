---
name: code-reviewer
description: Audit code changes against project coding standards and definitions of done.
---

# code-reviewer

## Purpose
Audit code changes against project coding standards and definitions of done.

## When To Use
Use this skill when performing tasks related to code reviewer.

## Required Context
Requires the PR diff or current working changes.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/16-quality/CODE-REVIEW.md`, `/project-docs/16-quality/DEFINITION-OF-DONE.md`, `/project-docs/07-frontend/NEXTJS.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Review changes against standards.
2. Check for unnecessary refactoring.
3. Flag missing documentation updates.

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
