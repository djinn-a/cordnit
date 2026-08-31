# OVERVIEW.md — Project Overview & Context

## 1. Project Summary

Cordinit is building a corporate website that positions the company as an elite, **secure digital transformation partner**. 

The site is not just a digital brochure—it is the engineering foundation for a future, much larger platform ecosystem (including a CMS, CRM, client portal, AI workspace, etc.). Consequently, the site must be built **modular**, **API-first**, and **scalable from day one**, even though this initial phase only covers the public-facing marketing site.

### What we are building in this phase:
A responsive, high-performance, SEO-optimized marketing website built around a **solutions / industries / accelerators / insights** architecture, with a lightweight CMS-driven content layer and contact/lead capture. It is engineered so that later phases (client portal, dashboards, AI features) can be plugged in without requiring a rebuild.

### What we are NOT building in this phase:
- CRM
- Client portal
- Admin dashboard
- AI workspace
- Analytics platform

These are future phases (see Forward Compatibility), but the architecture chosen now must not block them.

---

## 2. Target Audience

The website must cater to the following audiences:

### Primary
- **Business decision-makers** evaluating a digital transformation / security partner.
- **Roles:** CTOs, founders, operations leads, CISOs, IT directors.

### Secondary
- **Potential investors and partners.**
- **Job candidates** (only if the "Careers" section is confirmed in scope by the founder; it is not currently in the main sitemap).

**Marketing Ownership:** The Ideal Customer Profile (ICP) content (personas, messaging) is entirely owned by marketing. Developers must treat all persona-specific copy as CMS-editable and never hardcode marketing messaging into the React components.
