# OVERVIEW

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



## Legacy Content (Merged from overview.md)

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



## Legacy Content (Merged from 01-project-summary.md)

# Project Summary & Business Context

## 1. Introduction and Vision
Cordinit is establishing itself as a premier partner for secure digital transformation. The company is building a corporate marketing website that serves as more than just a digital brochure; it is the foundational layer for an expansive, modular SaaS platform. The long-term vision for this platform includes a CRM, a Client Portal, an Admin Dashboard, and an AI Workspace. 

Because of this ambitious roadmap, the public-facing marketing site built in this initial phase must be architected with a strict **API-first**, **Modular**, and **Highly Scalable** philosophy. The technology choices made today will directly dictate the success and velocity of future product rollouts.

## 2. Core Business Goals
To ensure the website delivers immediate value while preparing for the future, the following goals have been established:

1. **Fast, Credible First Impression**
   - **Rationale**: Cordinit sells "secure digital transformation". The website itself must be the ultimate proof of this capability. It must load instantly, feel premium, and function flawlessly without glitches or jank. 
   - **Outcome**: High user trust, reduced bounce rates, and strong brand authority.

2. **SEO-Ready from Launch**
   - **Rationale**: Organic search traffic will serve as a primary acquisition channel for high-value leads.
   - **Outcome**: Complete technical SEO compliance (Core Web Vitals, semantic HTML, structured data) leading to rapid indexing and strong SERP rankings.

3. **Built-in Lead Capture**
   - **Rationale**: The site is a lead-generation engine. Contact and quote forms must be reliable and seamlessly integrated with backend systems to eventually feed the future CRM.
   - **Outcome**: Automated lead ingestion, validation, and notification systems with zero data loss.

4. **Modular Architecture**
   - **Rationale**: The company plans to rapidly expand into a SaaS platform. A monolithic or rigidly coupled website would become a dead-end and require a costly rebuild.
   - **Outcome**: A decoupled frontend and backend, component-driven UI, and API-based data access.

5. **Security by Design**
   - **Rationale**: Security is not an afterthought; it is a stated company principle and a core selling point.
   - **Outcome**: Best-in-class security practices (CSP headers, input validation, secure hosting, XSS/CSRF prevention) implemented from day one.

## 3. Target Audience & Personas

### Primary Audience
**Business Decision-Makers (CTOs, Founders, Operations Leads)**
- **Mindset**: Pragmatic, time-poor, highly technical or technically adjacent. They are evaluating partners based on competence, security posture, and past results.
- **Needs**: Clear value propositions, transparent capabilities, case studies (proof of work), and easy ways to get in touch or request a consultation.
- **Site Experience**: Requires fast navigation, logical categorizations (Solutions vs. Industries), and high-contrast, readable technical content.

### Secondary Audience
**Investors, Partners, and Job Candidates**
- **Mindset**: Evaluating the company's growth potential, culture, and market positioning.
- **Needs**: Strong "About Us" narrative, clear mission/vision/values, and comprehensive industry positioning.
- **Note on Careers**: Career pages are currently deferred, but the site structure should allow for their easy addition via the CMS without developer intervention.

## 4. Scope Boundaries (What we are NOT building yet)
To prevent scope creep, it is critical to acknowledge that this phase **only covers the public-facing marketing site**. The architecture must *support* the following future features, but we are *not* building them now:
- A functional CRM system.
- A logged-in Client Portal.
- An internal Admin Dashboard (beyond the Headless CMS).
- An AI Workspace or Analytics Platform.

