# REQUIREMENTS.md — Functional & Non-Functional Requirements

## Functional Requirements (Production Logic)

### 1. The Dynamic Routing Engine
- Pages under `/solutions`, `/industries`, and `/insights` must be entirely dynamic, driven by the Headless CMS.
- **Edge Case / Error Handling:** If the CMS API is unresponsive during a user request (SSR), the application must gracefully fail by serving a cached version (ISR/Stale-While-Revalidate) or a visually consistent error boundary (`error.tsx`), rather than exposing raw stack traces.

### 2. Lead Capture & Deduplication
- The `/contact` form must collect First Name, Last Name, Email, Area of Interest, and an optional Message and Phone Number.
- **Edge Case / Error Handling:** Lead inserts must be idempotent. If `john@doe.com` submits twice, the API must perform an `UPSERT`, updating the `updated_at` timestamp and incrementing an `inquiry_count` integer, rather than crashing on a unique constraint violation.
- **Security:** All form endpoints MUST be protected by hCaptcha and strict rate-limiting to prevent bot spam and database exhaustion.

### 3. Cross-Linking & Relationships
- Insights (Case Studies) must be dynamically linked to their relevant Services and Industries via CMS references.
- **Edge Case / Error Handling:** If a linked Industry is deleted in the CMS, the frontend must safely filter out the null reference during the GraphQL mapping phase to prevent fatal runtime crashes (`Cannot read properties of null`).

## Non-Functional Requirements

### 1. Performance (Core Web Vitals)
- **LCP (Largest Contentful Paint):** < 2.5s. Achieved by preloading hero images and prioritizing critical CSS.
- **INP (Interaction to Next Paint):** < 200ms. Achieved by minimizing main-thread JavaScript and keeping React Client Components incredibly lean.
- **CLS (Cumulative Layout Shift):** < 0.1. Achieved by explicitly defining `width` and `height` attributes on all `<Image />` tags and dummy assets.

### 2. SEO & Discoverability
- The framework must generate a dynamic `sitemap.xml` and `robots.txt`.
- Canonical URLs must be self-referencing to prevent duplicate content penalties across trailing slash variants.
- Structured Data (JSON-LD) must be injected into the `<head>` for Articles, Organizations, and Breadcrumbs.
