---
name: dependency-auditor
description: Audit `package.json` for unauthorized or outdated dependencies.
---

# dependency-auditor

## Purpose
Audit `package.json` for unauthorized or outdated dependencies.

## When To Use
Use this skill when performing tasks related to dependency auditor.

## Required Context
Requires `package.json` and `package-lock.json`.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/01-project/DEPENDENCIES.md`, `/project-docs/28-maintenance/DEPENDENCY-UPDATES.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. List current dependencies.
2. Cross-reference against approved architecture.
3. Flag unauthorized or duplicate packages.

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
