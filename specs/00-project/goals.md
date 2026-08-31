# GOALS.md — Project Goals & Success Criteria

## 1. Project Summary

Cordinit is building a corporate website that serves as a cornerstone, positioning the company as an elite, secure digital transformation partner. 

The site is not just a digital brochure—it is the engineering foundation for a future, much larger SaaS ecosystem (including a CRM, CMS, client portal, AI workspace, and admin dashboard). For this reason, the marketing site must be built **modular**, **API-first**, and **scalable from day one**, despite this phase only covering public-facing pages.

### What We Are Building in Phase 1
- A highly responsive, high-performance, SEO-optimized marketing website.
- An information architecture built around four key pillars: **Solutions**, **Industries**, **Accelerators**, and **Insights**.
- A lightweight, CMS-driven content layer ensuring all marketing copy and metadata can be edited without code deployments.
- Contact and lead capture forms that reliably capture and store data securely.
- An underlying infrastructure engineered so that later phases (client portal, dashboards, AI features) can be seamlessly plugged in without requiring a rebuild of the frontend or API layer.

### What We Are NOT Building in Phase 1
- CRM application
- Client portal
- Admin dashboard (aside from the headless CMS interface)
- AI workspace
- Advanced analytics platform

These components are slated for future phases. However, the foundational architecture decisions made in Phase 1 must actively anticipate and **not block** their eventual integration.

---

## 2. Business Goals & Technical Success Criteria

The following goals dictate the engineering priorities and trade-offs for Phase 1. 

| Goal | Why It Matters | How We Measure It |
| :--- | :--- | :--- |
| **Fast, credible first impression** | Cordinit sells "secure digital transformation." The website itself must serve as the primary proof of this claim. A slow or janky site undermines the brand's core value proposition. | • Lighthouse scores ≥ 90 across all categories <br> • Core Web Vitals targets met: <br>&nbsp;&nbsp;&nbsp;- LCP < 2.5s <br>&nbsp;&nbsp;&nbsp;- CLS < 0.1 <br>&nbsp;&nbsp;&nbsp;- INP < 200ms |
| **SEO-ready from launch** | Organic search traffic is expected to be a primary channel for generating enterprise leads. The technical structure must be flawless to allow the content to rank. | • SSG (Static Site Generation) for all indexable pages <br> • Valid JSON-LD structured data <br> • Auto-generated XML sitemap <br> • Fully CMS-editable SEO metadata per page |
| **Lead capture built-in** | Contact and quote forms are the primary conversion mechanism. They must reliably capture structured data to feed the future CRM system. | • Forms validated on both client and server <br> • Robust spam protection (e.g. hCaptcha) <br> • Submissions persisted into a structured Supabase database (not just email forwarding) |
| **Modular architecture** | The company plans to rapidly expand into a full SaaS platform. The website's frontend and backend must not be a dead-end monolithic build. | • Strict adherence to an API-first approach <br> • Content types built with parent references for infinite nesting <br> • Reusable component templates instead of one-off pages |
| **Security by design** | There is no "security-as-afterthought" at Cordinit. Secure engineering is a stated company principle and must be reflected in every layer of the stack. | • HTTPS everywhere with strong headers (CSP) <br> • Strict input sanitization and XSS prevention <br> • Rate limiting on all API endpoints <br> • Secrets managed securely, out of source control |
