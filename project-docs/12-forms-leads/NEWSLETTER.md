# NEWSLETTER

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



## Legacy Content (Merged from newsletter.md)

# NEWSLETTER.md — Newsletter Architecture

The Newsletter subscription mechanism requires strict adherence to email marketing laws (CAN-SPAM, GDPR) while maintaining high conversion rates.

## Status: Pending Review
The exact double opt-in flow (Soft Opt-in vs Strict Double Opt-in) is awaiting legal/stakeholder review. The database schema has been designed to support both.

## The State Machine (`status` column)
Every subscriber exists in one of the following states:
1. `pending`: Initial state. Awaiting email verification (if Strict Double Opt-in is chosen).
2. `subscribed`: Actively receiving emails.
3. `unsubscribed`: Explicitly opted out via footer link. MUST NOT receive marketing emails.
4. `bounced`: Hard bounce registered by email provider (e.g., SendGrid/Resend).

## Edge Cases

### 1. Re-Subscribing
**Scenario:** A user who previously `unsubscribed` fills out the newsletter form again.
**Production Handling:** 
- Do NOT throw a "unique constraint" error to the frontend.
- Update the existing row: change `status` from `unsubscribed` to `subscribed` (or `pending`).
- Log the `opt_in_date` to current timestamp.

### 2. Scraping / Spam Subscriptions
**Scenario:** Bot submits thousands of fake emails to the newsletter endpoint.
**Production Handling:**
- Require a hidden honeypot field on the frontend. If filled, instantly return `200 OK` but drop the payload.
- Require hCaptcha on the frontend.
- If using Strict Double Opt-in, bots will never click the link, so `status` remains `pending` and they are never mailed.

### 3. Enumeration Attack
**Scenario:** Bad actor tries emails to see if they are already subscribed (based on API error messages).
**Production Handling:**
- The API must ALWAYS return `200 OK` with the exact same success message regardless of whether the email is new, already subscribed, or unsubscribed.

