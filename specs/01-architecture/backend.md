# BACKEND.md — Data Layer & API Architecture

The "Backend" of Phase 1 consists of three distinct pillars working together.

## 1. GraphQL API Layer (The Intermediary)
- Serves as the single access point for the Next.js frontend.
- Defines the canonical entities: `Lead`, `NewsletterSubscriber`, `Service`, `Industry`, `Insight`.
- Responsible for executing business logic, input validation, handling hCaptcha verification, and orchestrating writes to Supabase or reads from the CMS.

## 2. Supabase (The Transactional Database)
- **Role:** Master system of record for structured user, lead, and transactional data.
- **Technology:** PostgreSQL.
- **Design:** Schema is fully normalized and heavily indexed. Lead data is deduplicated upon insert using `email_normalized` and `source`.
- **Security:** Protected by Row Level Security (RLS). The GraphQL API communicates with Supabase using a secure service-role key, bypassing RLS where system-level writes are required, but maintaining strict validation.

## 3. Headless CMS (The Content Engine)
- **Role:** Master system of record for marketing copy, page relationships, taxonomy, and SEO metadata.
- **Technology:** Sanity, Strapi, or Payload (exact choice finalized by Tech Lead).
- **Design:** Content is modeled modularly. For instance, the "Solutions" hierarchy relies on a single `Service` document type with a nullable `parent` reference, allowing infinite scalability without code changes.
