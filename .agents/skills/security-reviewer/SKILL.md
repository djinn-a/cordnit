---
name: security-reviewer
description: Audit code for vulnerabilities, exposed secrets, and weak validation.
---

# security-reviewer

## Purpose
Audit code for vulnerabilities, exposed secrets, and weak validation.

## When To Use
Use this skill when performing tasks related to security reviewer.

## Required Context
Requires environment variable usage, API endpoints, and forms.

## Required Documentation
Do not load all project documentation. Progressively load only the following relevant domains:
`/project-docs/14-security/SECURITY-OVERVIEW.md`, `/project-docs/14-security/INPUT-VALIDATION.md`

## Required Source Inspection
Inspect the specific directories and files relevant to this domain before making changes. Avoid deep-scanning unrelated folders.

## Execution Steps
1. Audit forms for input sanitization.
2. Verify HTTPS/CSP headers.
3. Check rate-limiting on endpoints.

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
