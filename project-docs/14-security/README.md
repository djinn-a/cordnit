# README

## Purpose
This directory is responsible for containing all documentation related to readme.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from overview.md)

# OVERVIEW.md — Security-by-Design

**Responsibility:** HTTPS, sanitization, rate limit, captcha, CSP, secrets, MFA-ready CMS.
**Source:** Project Brief Section 8 Security + Section 2 “Security by design”

## 1. Baseline Controls
- HTTPS everywhere
- Input sanitization and server-side validation
- Rate limiting on form endpoints
- hCaptcha (or equivalent) on lead forms
- Content-Security-Policy (CSP) headers configured
- Dependency scanning (npm audit + Dependabot)
- No secrets in client code or repository
- Strong authentication on CMS admin (MFA recommended)

## 2. API & Supabase Access
- Supabase RLS must be enabled.
- Service role key used only on the server.
- Public (anon) role: insert-only on `leads` and `newsletter_subscribers` via the API layer.
- Never expose service-role key to the browser.

