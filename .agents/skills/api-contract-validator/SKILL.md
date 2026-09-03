---
name: api-contract-validator
description: Ensure API routes conform to predefined requests and responses.
---

# api-contract-validator

## Purpose
Ensure API routes conform to predefined requests and responses.

## When To Use
Use this skill when performing tasks related to api contract validator.

## Required Context
Requires API Route Handlers.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/11-api/API-CONTRACT.md`, `/project-docs/08-backend/API-DESIGN.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Inspect API input payloads.
2. Verify response status codes and error formats.
3. Ensure no direct DB calls are made from the frontend.

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
