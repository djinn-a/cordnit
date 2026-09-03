# DATA VALIDATION

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



## Legacy Content (Merged from validation.md)

# VALIDATION.md — Input Validation & Sanitization

All incoming data from the frontend must be rigorously validated at the Next.js API boundary using **Zod**. The frontend should share these Zod schemas to provide real-time user feedback.

## 1. Contact Form Schema

```typescript
import { z } from "zod";

export const ContactFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters").max(100),
  last_name: z.string().min(2, "Last name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone_number: z.string().max(50).optional(), // User decision: Optional for conversions
  company_name: z.string().max(150).optional(),
  job_title: z.string().max(100).optional(),
  area_of_interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().max(5000).optional(),
  hcaptcha_token: z.string().min(1, "Verification required"),
});
```

## 2. Newsletter Schema

```typescript
export const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  source: z.string().optional(),
  hcaptcha_token: z.string().min(1, "Verification required"),
});
```

## 3. Sanitization Rules (Server-Side)
Validation (Zod) ensures data shape. Sanitization ensures data safety.

- **Email Normalization:** Before inserting into Supabase, the email MUST be transformed: `email.trim().toLowerCase()`. This prevents duplicate records for `John@Doe.com` and `john@doe.com`.
- **XSS Prevention:** The `message` field from the contact form must be stripped of any HTML tags or script injection attempts before being rendered in an internal Admin dashboard or CRM. (Supabase stores raw, but rendering layers must sanitize, or we sanitize at the API layer).
- **String Trimming:** All string inputs must be `.trim()`ed to remove leading/trailing whitespace.

