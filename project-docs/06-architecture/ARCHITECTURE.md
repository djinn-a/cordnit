# ARCHITECTURE

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



## Legacy Content (Merged from 02-tech-stack.md)

# Technology Stack & Infrastructure

This document outlines the authoritative technology stack for the Cordinit website. The stack is carefully selected to align with the blueprint's "API-First", "Modular & Scalable", and "Performance First" principles. 

## 1. Frontend Architecture

### Framework: Next.js (React)
Next.js is the chosen framework for the frontend. It provides the optimal balance of developer experience and production performance.
- **Rendering Strategy**: We will leverage Server-Side Rendering (SSR) and Static Site Generation (SSG). Marketing pages (Home, About) will be statically generated for maximum speed, while dynamic content (Insights, specific Solutions) can utilize Incremental Static Regeneration (ISR) to stay fresh without rebuilding the entire site.
- **App Router**: We will utilize the modern Next.js App Router (`/app` directory) to take advantage of React Server Components, reducing the client-side JavaScript payload.

### Language: TypeScript
- Strict TypeScript enforcement ensures type safety across the application, reducing runtime errors and acting as living documentation for API responses and component props.

### Styling: Tailwind CSS & Design Tokens
- Tailwind CSS will be used for all styling, providing a utility-first approach that keeps CSS bundles exceptionally small.
- **Design Tokens**: Raw hex codes and pixel values should not be hardcoded in components. Instead, a strict design token system (configured via `tailwind.config.ts`) will map brand colors, typography scales, and spacing to semantic variables (e.g., `primary-500`, `text-body-lg`).

### State & Data Fetching
- **Server Components**: Native `fetch` API will be used inside Server Components to pull data from the API layer securely.
- **Client State**: For complex client-side interactions (e.g., multi-step forms, filtering), lightweight state management (React Context or Zustand) or data fetching libraries (React Query/SWR) will be used.

## 2. Backend & API Layer

### GraphQL API Layer (The Intermediary)
- Instead of the frontend talking directly to the database or multiple third-party services, all requests will go through a unified GraphQL API.
- **Benefits**: Prevents over-fetching, provides a strongly typed contract between frontend and backend, and allows us to easily swap underlying data sources in the future (e.g., migrating from one CMS to another).

### Database: Supabase (PostgreSQL)
- Supabase acts as our transactional system of record.
- **Usage**: It will store structured data such as lead captures, contact form submissions, and newsletter signups.
- **Why**: Built on robust PostgreSQL, it provides enterprise-grade scalability, Row Level Security (RLS), and a schema structure that perfectly sets the stage for our future CRM build.

### Headless CMS
- A headless CMS (e.g., Strapi, Sanity, or PayloadCMS) will manage all unstructured marketing content (Insights, Page copy, Solutions copy).
- **Workflow**: Marketing teams author content in the CMS. The CMS exposes this data via an API, which is consumed by the Next.js frontend during the build process or at runtime.

## 3. Infrastructure & DevOps

### Cloud Hosting & Containerization
- **Docker**: The application will be fully containerized using Docker to ensure absolute consistency between local development, staging, and production environments.
- **Hosting Provider**: Deployment to AWS, GCP, or Azure (pending final stakeholder confirmation) using scalable container orchestration (e.g., ECS, Cloud Run).

### CI/CD Pipeline
- **GitHub Actions**: A robust CI/CD pipeline will be established.
- **Workflow**: 
  - Push to `main` triggers automated linting, unit testing, and type checking.
  - Upon success, the application is built into a Docker image.
  - The image is automatically deployed to a staging environment for QA.
  - Production deployments require manual approval.

### Asset Delivery
- All static assets and CMS-uploaded media will be served through a high-performance Content Delivery Network (CDN) with automatic image optimization (WebP/AVIF formats, responsive resizing).

## 4. Forms & Lead Capture
- **Architecture**: Forms are rendered on the client but processed entirely on the server.
- **Security**: Implementation of hCaptcha/reCAPTCHA for spam protection. Server-side validation is mandatory to prevent injection attacks before data reaches Supabase.



## Legacy Content (Merged from 03-site-architecture.md)

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

