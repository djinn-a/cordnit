# CONTACT-LEADS.md — Contact Form Edge Cases & Handling

The Contact Form is the primary conversion mechanism for Cordinit. Its API must be bulletproof.

## API Flow
1. **Frontend:** Client validates form (Zod). Submits JSON + hCaptcha token.
2. **Route Handler:** Verifies hCaptcha. If failed -> `403 Forbidden`.
3. **Validation:** Server validates payload (Zod). If failed -> `400 Bad Request`.
4. **Processing:**
   - Normalize email (lowercase, trim).
   - Upsert into `leads` table.
5. **Notification:** Fire event to trigger internal notification (Email Provider pending).
6. **Response:** Return `200 OK` (even if it was a duplicate, to prevent email enumeration attacks).

## Edge Cases & Error Handling

### 1. The Duplicate Lead
**Scenario:** A user submits the contact form today. Next month, they submit it again.
**Production Handling:** We do NOT want two rows in the CRM for the same person.
- The SQL query performs an `INSERT ... ON CONFLICT (email_normalized) DO UPDATE`.
- The `updated_at` field is refreshed.
- The `inquiry_count` field increments by `1`.
- The `message` field appends the new message to the history, or stores it in a separate JSON array.

### 2. High-Frequency Bot Attack
**Scenario:** A bot bypasses hCaptcha and hits the endpoint 100 times a second.
**Production Handling:**
- **Rate Limiting:** Vercel Edge Middleware / Next.js Rate Limiter blocks IPs making > 5 requests per minute.
- **Audit Log:** The failed attempts are logged to `form_submissions_audit`.
- **Database Connection:** Supabase connections are pooled (PgBouncer) to prevent connection exhaustion.

### 3. Database Outage
**Scenario:** Supabase is down during a critical marketing campaign.
**Production Handling:**
- The API handler catches the 500 error from the Supabase client.
- **Fallback:** The payload is immediately serialized and dispatched via email to a fallback inbox (e.g., `emergency-leads@cordinit.com`) so the lead is never lost.
- Frontend displays a generic success message to the user (do not leak database errors).

### 4. PII and GDPR Requests
**Scenario:** A user requests their data be deleted.
**Production Handling:**
- Admins can delete the record from `leads`.
- The `form_submissions_audit` table only contains IP hashes and non-PII payload data, meaning it does not need to be scrubbed.
