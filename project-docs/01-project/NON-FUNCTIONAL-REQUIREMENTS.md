# NON FUNCTIONAL REQUIREMENTS

## Purpose
Describe the purpose of this document.

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



## Legacy Content (Merged from 05-non-functional-requirements.md)

# Non-Functional Requirements & Standards

This document establishes the strict quality standards for the Cordinit website. A page or feature is not considered "Done" until it meets all of the following criteria.

## 1. Performance (Speed is a Feature)
To align with the brand promise of high-tier engineering, the site must be objectively fast.
- **Core Web Vitals Targets**:
  - **LCP (Largest Contentful Paint)**: < 2.5 seconds.
  - **CLS (Cumulative Layout Shift)**: < 0.1.
  - **INP (Interaction to Next Paint)**: < 200 milliseconds.
- **Lighthouse Scoring**: A minimum score of **90+** across Performance, Accessibility, Best Practices, and SEO on both mobile and desktop audits.
- **Asset Optimization**: All images must be served via a CDN, utilize responsive `srcset` attributes, be converted to Next-Gen formats (WebP/AVIF), and be lazy-loaded if they appear below the fold.

## 2. Technical SEO
Organic search is a primary lead generation channel. Technical SEO must be flawless.
- **Rendering**: Critical content must be available in the initial HTML payload (Server-Side Rendering or Static Site Generation). Client-only rendering is strictly forbidden for indexable content.
- **Semantics**: Strict adherence to HTML5 semantic tags (`<article>`, `<nav>`, `<section>`, `<footer>`). Proper `<h1>` through `<h6>` heading hierarchy is required per page.
- **Crawling**: Auto-generated XML `sitemap.xml` and properly configured `robots.txt` must be maintained dynamically.
- **Structured Data (JSON-LD)**: 
  - `Organization` schema on the homepage.
  - `Article` schema on Insight posts.
  - `BreadcrumbList` schema across the site (critical for the 3-level deep Solutions hierarchy).
- **Metadata**: Every page must have unique, CMS-editable `<title>`, `<meta name="description">`, and Open Graph (`og:image`, `og:title`) tags. All pages must declare a `<link rel="canonical">`.

## 3. Accessibility (A11y)
The site must be accessible to all users, regardless of ability.
- **Compliance Level**: Minimum of **WCAG 2.1 AA**.
- **Keyboard Navigation**: The entire site (especially complex menus, modals, and forms) must be fully navigable via keyboard (`Tab`, `Enter`, `Space`, `Esc`). Focus states must be highly visible.
- **Screen Readers**: Proper ARIA roles and labels must be applied to custom interactive elements. 
- **Images**: `alt` text is a mandatory field for all image uploads within the CMS.
- **Contrast**: Text and background color combinations must meet the minimum 4.5:1 contrast ratio.

## 4. Security
As a digital transformation and security partner, Cordinit's own site must be bulletproof.
- **Transport**: HTTPS enforced everywhere via HSTS.
- **Forms & Inputs**: Strict input sanitization and validation on both the client (for UX) and the server (for security) to prevent Cross-Site Scripting (XSS) and SQL Injection.
- **Abuse Prevention**: Rate limiting must be implemented on all API endpoints, specifically form submissions, to prevent spam and DDoS.
- **Headers**: Implementation of a strict Content Security Policy (CSP), `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`.
- **Dependency Management**: Automated scanning for vulnerable packages via `npm audit` or Dependabot.
- **Secrets Management**: Absolutely no API keys or secrets are to be committed to the repository or leaked into client-side bundles. Environment variables and secure secret managers must be used.

## 5. Responsive Design & Layout
- **Breakpoints**: 
  - Mobile: `≤640px`
  - Tablet: `641px - 1024px`
  - Desktop: `1025px+`
- **Testing**: UI must be verified on physical devices (iOS Safari, Android Chrome), not just simulated via browser resizing.

## 6. Design System Architecture
- **Token-Driven**: The component library must consume design tokens (JSON/Tailwind config) provided by the design team, rather than hardcoding hex values. This includes colors, typography scales, spacing scales, border radii, and shadows.
- **Motion**: Animations should be subtle, purposeful micro-interactions (e.g., hover states, smooth page transitions). Avoid heavy, layout-thrashing animations that degrade scroll performance.
- **Dark Mode**: Not required for v1 unless explicitly mandated by the final design deliverables, but the color tokens should be structured to allow for a future dark mode implementation easily.

