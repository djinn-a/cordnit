---
name: documentation-auditor
description: Audit the `project-docs` hierarchy to ensure accuracy and completeness.
---

# documentation-auditor

## Purpose
Audit the `project-docs` hierarchy to ensure accuracy and completeness.

## When To Use
Use this skill when performing tasks related to documentation auditor.

## Required Context
Requires the `/project-docs/` file tree and markdown files.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/00-governance/DOCUMENTATION-GOVERNANCE.md`, `/project-docs/INDEX.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Detect stale documentation.
2. Detect duplicate documentation.
3. Detect broken internal links.
4. Detect missing references.
5. Detect undocumented significant changes.

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
