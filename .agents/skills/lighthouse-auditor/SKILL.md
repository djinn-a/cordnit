---
name: lighthouse-auditor
description: Verification rubric for Core Web Vitals & Lighthouse targets.
---

# Lighthouse Auditor

## Instructions
1. Review the proposed UI component code.
2. Check for heavy client-side scripts `use client` loaded above the fold that could impact LCP.
3. Ensure all `<Image>` tags have explicit `width` and `height` to prevent CLS.
4. Verify hero images utilize the `priority` attribute.
5. Ensure third-party scripts (analytics, fonts) are loaded asynchronously.
6. Reject the PR if theoretical performance would drop below 90.
