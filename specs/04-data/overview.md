# OVERVIEW.md — Data Architecture & Strategy

## Master Source of Truth
The Cordinit data architecture strictly separates **Transactional Data** (user-generated, requires ACID compliance) from **Content Data** (marketing copy, editorial, relationships).

1. **Transactional Data (Supabase / PostgreSQL):**
   - **Domain:** Leads, Contact Submissions, Newsletter Subscribers, Audit Logs.
   - **Characteristics:** High write volume from public APIs, strict deduplication, Row Level Security (RLS) protected, PII compliant.
2. **Content Data (Headless CMS):**
   - **Domain:** Pages, Solutions, Industries, Insights, Team Members, Global Settings.
   - **Characteristics:** High read volume, highly relational, deeply nested, localized (future-proofed).

## Production-Level Reliability
To ensure the backend never fails silently or corrupts the future CRM integration, the data layer enforces:
- **Strict Validation:** Every API mutation is validated against Zod schemas before touching the database.
- **Idempotency & Deduplication:** Leads submitting the same form multiple times will update the existing record's `last_updated` and `inquiry_count` fields rather than creating duplicate rows.
- **Soft Deletes:** No lead is ever hard-deleted from the database (unless explicitly requested for GDPR/CCPA compliance).
- **Audit Trails:** Every mutation logs the source IP (hashed), User-Agent, and Timestamp to `form_submissions_audit`.

## Unresolved Dependencies
- **Email Provider:** Pending (e.g., Resend, Sendgrid). Section mapped, implementation deferred.
- **Newsletter Opt-in Flow:** Pending legal review (Soft Opt-in vs. Strict Double Opt-in). Schema is prepared to handle both via a `status` column.
