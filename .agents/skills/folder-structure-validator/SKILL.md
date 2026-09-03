---
name: folder-structure-validator
description: Ensure the repository file structure strictly adheres to the approved architecture and detect duplication.
---

# folder-structure-validator

## Purpose
Ensure the repository file structure strictly adheres to the approved architecture and detect duplication.

## When To Use
Use this skill when performing tasks related to folder structure validator.

## Required Context
Requires directory listing of the current workspace.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/06-architecture/FOLDER-STRUCTURE.md`, `/project-docs/06-architecture/ARCHITECTURE.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Inspect actual repository structure.
2. Compare against FOLDER-STRUCTURE.md.
3. Detect misplaced files.
4. Detect duplicate structures.
5. Detect duplicate components.
6. Detect documentation mismatches.

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
