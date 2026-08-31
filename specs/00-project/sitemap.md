# SITEMAP.md — Information Architecture & Routing

This document defines the exact routing structure for the Next.js application. All URLs must adhere to this taxonomy to ensure optimal SEO and strict content compartmentalization.

## Design Decision (Resolved)
- **Managed Services:** Consolidated under a single parent hub (`/solutions/managed-services`) for stronger domain authority and cross-selling, rather than splitting into fragmented top-level practices.
- **Careers:** Explicitly out of scope for Phase 1. Do not build a `/careers` route.

## Level 1 & 2 Taxonomy

```text
/
├── /about                    (Company overview, History, Leadership)
├── /contact                  (Master lead capture form)
├── /insights                 (Master hub for all thought leadership)
│   ├── /insights/blog             
│   ├── /insights/case-studies     
│   └── /insights/whitepapers      
│
├── /solutions                (Master hub for all services)
│   │
│   ├── /solutions/cloud-engineering                 [Practice Hub]
│   │   ├── /solutions/cloud-engineering/aws-migration       [Sub-Service]
│   │   ├── /solutions/cloud-engineering/azure-migration     [Sub-Service]
│   │   └── /solutions/cloud-engineering/cloud-native        [Sub-Service]
│   │
│   ├── /solutions/data-ai                           [Practice Hub]
│   │   ├── /solutions/data-ai/data-lakes                    [Sub-Service]
│   │   ├── /solutions/data-ai/machine-learning              [Sub-Service]
│   │   └── /solutions/data-ai/bi-analytics                  [Sub-Service]
│   │
│   ├── /solutions/managed-services                  [Practice Hub]
│   │   ├── /solutions/managed-services/managed-it           [Sub-Service]
│   │   ├── /solutions/managed-services/managed-cloud        [Sub-Service]
│   │   └── /solutions/managed-services/managed-cyber        [Sub-Service]
│   │
│   └── /solutions/digital-transformation            [Practice Hub]
│
├── /industries               (Master hub for verticals)
│   ├── /industries/finance
│   ├── /industries/healthcare
│   └── /industries/manufacturing
│
├── /accelerators             (Master hub for proprietary IP)
│   └── /accelerators/[accelerator-slug]
│
└── /legal
    ├── /legal/privacy-policy
    └── /legal/terms-of-service
```

## Error Handling & Fallbacks (Production Readiness)
- **404 Strategy:** Any invalid route must trigger a custom `not-found.tsx` page that provides a search bar and quick links back to `/solutions` and `/insights`. Never rely on the default Next.js 404 page.
- **Dynamic Route Trapping:** The `[slug]` routes for insights and solutions must explicitly fetch from the CMS. If the CMS returns null (e.g., an unpublished article), the Route Handler MUST return a `notFound()` invocation, yielding a 404 status code (critical for Googlebot), rather than a 500 error or an empty page template.
