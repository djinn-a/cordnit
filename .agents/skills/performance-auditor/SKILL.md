---
name: performance-auditor
description: Audit frontend and backend code for performance bottlenecks.
---

# performance-auditor

## Purpose
Audit frontend and backend code for performance bottlenecks.

## When To Use
Use this skill when performing tasks related to performance auditor.

## Required Context
Requires built assets, route handlers, and API queries.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/17-performance/PERFORMANCE-STRATEGY.md`, `/project-docs/17-performance/CORE-WEB-VITALS.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Audit Next.js bundle sizes.
2. Check image optimization.
3. Verify data fetching caching strategies.

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
