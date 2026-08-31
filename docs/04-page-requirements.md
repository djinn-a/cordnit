# Page-by-Page Requirements & Component Breakdown

This document details the functional requirements, expected components, and data sources for the primary page templates across the Cordinit website.

## 1. Home Page (`/`)
The homepage is the highest-trafficked landing page and must concisely explain what Cordinit does and direct users to their areas of interest.
- **Hero Section**: High-impact elevator pitch, animated or highly polished brand imagery, and a primary CTA ("Talk to an Expert").
- **Value Proposition**: 3-4 pillars outlining the "Secure Digital Transformation" ethos. Editable via CMS.
- **Solutions Overview Module**: Dynamic grid providing entry points into the two major deep practices (Cybersecurity, Salesforce) and the five flat practices.
- **Social Proof**: Trust signals including client logos, testimonials, and verified partner badges (e.g., Salesforce Partner Tier).
- **Accelerators & Industries Teasers**: Highlight 2-3 featured items from these categories.
- **Insights Feed**: Automatically pulls the 3 most recent articles from the CMS.

## 2. Solutions Hub & Mega-Menu
This is the most structurally critical part of the site. It must be built as a **reusable, data-driven template**, not hardcoded one-off pages.

### The Solutions Hub (`/solutions`)
- A visually engaging grid or list providing an overview of all 7 practice areas. Cards link to individual practice pages.

### Practice Overview Template (Level 2)
Used for deep practices (Cybersecurity, Salesforce) and flat practices.
- **Practice Intro**: High-level summary of what the practice is and who it's for.
- **Sub-navigation/Tab Component**: *Conditional.* If the practice has sub-services, this component lists them, linking to their respective detail pages. If it is a flat practice, this component is hidden and the full content is displayed on the page.
- **Related Content**: Dynamically queries the CMS to show case studies, insights, and industries related specifically to this practice.

### Sub-service Detail Template (Level 3)
Used for the 15 specific sub-services (e.g., Cloud Security, Salesforce Commerce).
- **Content Blocks**: Problem statement, Cordinit's methodology/approach, and tangible outcomes/benefits.
- **Related Accelerators**: Links to specific technical accelerators that speed up this exact service.
- **Strict CMS Requirement**: A content editor must be able to add a new 9th Cybersecurity sub-service entirely via the CMS without a developer touching the Next.js codebase.

## 3. Industries & Accelerators

### Industries (`/industries` & `/industries/[slug]`)
- **Hub**: A grid of industries served.
- **Detail Template**: Focuses on industry-specific challenges and cross-links to the Cordinit Solutions that solve those challenges.

### Accelerators (`/accelerators` & `/accelerators/[slug]`)
- **Hub**: A library of packaged offerings, tools, and rapid-deployment frameworks.
- **Detail Template**: Explains what the tool accelerates, what is included in the package, expected timelines, and outcomes. Requires clarification on whether these are gated behind a demo request form or fully public.

## 4. Insights (`/insights`)
The core content marketing engine of the site, combining blog posts, articles, and whitepapers.
- **Hub Page**: Must include robust filtering (by category/practice) and support either pagination or infinite scroll for a massive library of future content.
- **Detail Template**: Displays Title, Author, Date, Reading Time, and Share buttons. Includes rich text rendering (Markdown or Portable Text from CMS).
- **Gated Downloads**: High-value assets (e.g., extensive research reports) must trigger a lead-capture form (requesting email) before granting access to the PDF. This feeds directly into the future CRM.

## 5. About & Contact

### About Page (`/about`)
- Founder letter / company story.
- Mission, vision, and core values (Managed via CMS blocks).
- Team Section: A CMS-driven grid of key leadership that supports adding/removing members without code changes.

### Contact Page (`/contact`)
- **Form Requirements**: Fields for Name, Email, Company, Message, and a Dropdown for "Area of Interest" (which must dynamically populate from the Solutions taxonomy to stay in sync).
- **Backend Flow**: Must validate on client + server side, trigger spam protection, send internal notifications via webhook/email, and securely store the payload in Supabase.
