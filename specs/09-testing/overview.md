# OVERVIEW.md — Definition of Done Enforcement

**Responsibility:** Automated enforcement of DoD + form/API tests.
**Source:** Project Brief Section 13 Definition of Done

## 1. Definition of Done
A deliverable is complete only when all of the following are true:
- Matches functional requirements
- Responsive on mobile, tablet, desktop
- Passes WCAG 2.1 AA
- Lighthouse ≥ 90
- Content is CMS-editable
- SEO metadata fields present
- Forms validated client + server
- Code reviewed and merged via PR
- Documented

## 2. Implementation checks
- Lead / newsletter submissions persist in structured storage.
- Spam protection (hCaptcha) and rate limiting on form endpoints.
- JSON-LD present where required.
- Core Web Vitals within targets.
