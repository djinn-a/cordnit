# Site Structure & Information Architecture (IA)

This document serves as the absolute source of truth for the website's navigation, routing structure, and URL schema. The IA is designed to be highly logical for both users and search engine crawlers.

## Global Navigation Elements

### Primary Navigation (Header)
- **Solutions** (Mega-menu hub: linking to practice areas and sub-services)
- **Industries**
- **Accelerators**
- **Insights**
- **About**
- **Contact**
- **Persistent CTA**: "Get in Touch" or "Book a Call" sticky button.

### Footer Navigation
- Full sitemap (all Solutions sub-items explicitly linked for SEO).
- Social media links (LinkedIn, Twitter).
- Legal links (Privacy Policy, Terms of Service).
- Newsletter signup module.

## URL Schema and Hierarchy

### Level 1: Core Hubs & Static Pages
These pages sit at the root of the domain and serve as primary entry points.
- `/` - The Home Page
- `/solutions` - Solutions overview (Mega-menu hub)
- `/industries` - Industries overview
- `/accelerators` - Accelerators overview
- `/insights` - Insights hub (Combined blog, articles, and resources)
- `/about` - Company history, Vision, Mission, Values, and Team
- `/contact` - Primary contact form and company location info
- `/legal/privacy-policy` - Legal documentation
- `/legal/terms-of-service` - Legal documentation

### Level 2 & 3: Deep Solutions Hierarchy
The Solutions section contains a mix of complex "deep" practices and simpler "flat" practices. The URL structure must reflect this taxonomy.

**Deep Practices (Contains sub-services):**
1. **Cybersecurity**
   - Practice Overview: `/solutions/cybersecurity`
   - Sub-services (Level 3):
     - `/solutions/cybersecurity/cloud-security`
     - `/solutions/cybersecurity/application-security`
     - `/solutions/cybersecurity/identity-security`
     - `/solutions/cybersecurity/data-security`
     - `/solutions/cybersecurity/ai-security`
     - `/solutions/cybersecurity/exposure-management`
     - `/solutions/cybersecurity/vulnerability-management`
     - `/solutions/cybersecurity/managed-security`

2. **Salesforce**
   - Practice Overview: `/solutions/salesforce`
   - Sub-services (Level 3):
     - `/solutions/salesforce/sales`
     - `/solutions/salesforce/service`
     - `/solutions/salesforce/marketing`
     - `/solutions/salesforce/commerce`
     - `/solutions/salesforce/ai`
     - `/solutions/salesforce/integrations`
     - `/solutions/salesforce/managed-services`

**Flat Practices (No sub-items):**
These are standalone Level 2 pages.
- `/solutions/ai-automation`
- `/solutions/cloud-infrastructure`
- `/solutions/application-engineering`
- `/solutions/data-integration`
- `/solutions/managed-services` *(Note: This is an org-wide managed services page, distinct from the specific Salesforce/Cybersecurity managed services. Slugs are kept unique to prevent collision).*

### Dynamic Content Routing
These routes rely on CMS-driven slugs to generate pages dynamically at build time (SSG) or request time.
- **Industries**: `/industries/[slug]` (e.g., `/industries/financial-services`)
- **Accelerators**: `/accelerators/[slug]` (e.g., `/accelerators/cloud-migration-framework`)
- **Insights**: 
  - Detail Pages: `/insights/[slug]` (e.g., `/insights/zero-trust-architecture-2026`)
  - Filtered Views: `/insights/category/[category]` (e.g., `/insights/category/cybersecurity`)

### System Pages
- `/404` - Custom Not Found error page (styled on-brand)
- `/500` - Custom Server error page (styled on-brand)
