---
name: project-context-loader
description: Initialize agent context by loading only the most critical overarching project rules.
---

# project-context-loader

## Purpose
Initialize agent context by loading only the most critical overarching project rules.

## When To Use
Use this skill when performing tasks related to project context loader.

## Required Context
Requires the master context documents.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/27-ai-context/PROJECT-MEMORY.md`, `/project-docs/INDEX.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
Read the master documentation map and project memory to orient the agent before executing complex tasks.

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
