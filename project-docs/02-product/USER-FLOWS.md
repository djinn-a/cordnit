# USER FLOWS

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



## Legacy Content (Merged from 06-user-flows.md)

# Core User Flows

This document maps out the critical paths a user will take through the Cordinit website, detailing the interaction between the user interface, the API layer, and the backend systems.

## Flow 1: Lead Capture & Contact Submission

**Goal**: A prospective client submits a request for consultation.

1. **Initiation**: User clicks a global "Get in Touch" CTA in the sticky header or navigates directly to `/contact`.
2. **Form Interaction**: 
   - User inputs standard details: Name, Email, Company, Message.
   - User selects an "Area of Interest" from a dropdown menu. *Crucially, this dropdown is dynamically populated from the CMS taxonomy for "Solutions", ensuring the form options always match the current business offerings.*
3. **Client-Side Validation (Next.js)**:
   - React Hook Form (or similar) checks for required fields, valid email regex, and minimum character counts.
   - If invalid, inline error states are shown immediately without a page refresh.
4. **Spam Challenge**: User completes an invisible or interactive hCaptcha challenge.
5. **Submission (API Request)**:
   - Next.js sends a POST request to the internal GraphQL API endpoint with the form payload and the captcha token.
6. **Server-Side Processing (API Layer)**:
   - The API verifies the captcha token with the provider.
   - The API re-validates all inputs to ensure data integrity.
   - The API sanitizes the inputs to strip malicious scripts.
7. **Database Storage (Supabase)**:
   - The API inserts the clean payload into a structured `leads` table in Supabase.
8. **Automated Notifications**:
   - A webhook triggers an internal notification to the Cordinit sales team (via Slack, Teams, or direct Email).
   - An automated, branded confirmation email is sent to the prospective client.
9. **Resolution**: The frontend receives a `200 OK` response and transitions the form into a "Success / Thank You" state.

## Flow 2: Content Discovery & Cross-Pollination

**Goal**: A user explores thought leadership and is smoothly funnelled toward a service offering.

1. **Initiation**: User searches Google for "Zero Trust Cloud Architecture" and lands organically on an Insight detail page: `/insights/zero-trust-cloud-architecture`.
2. **Engagement**: User reads the article. The Next.js frontend has fetched this rich text content statically from the Headless CMS.
3. **Contextual Cross-Linking**: 
   - At the bottom or sidebar of the article, a "Related Solutions" module appears. 
   - This relationship is defined in the CMS (the article is tagged with "Cloud Security").
4. **Navigation**: User clicks the "Cloud Security" solution card.
5. **Conversion Path**:
   - User is routed to `/solutions/cybersecurity/cloud-security`.
   - User reviews Cordinit's specific offerings, reads a related case study on that page, and clicks the prominent "Book a Call" CTA.
   - User enters Flow 1 (Lead Capture).

## Flow 3: Gated Resource Acquisition

**Goal**: Capturing a high-intent email address in exchange for premium content (e.g., a whitepaper or industry report).

1. **Initiation**: User navigates to `/insights` and clicks on a "Premium Whitepaper" asset.
2. **The Gate**: Instead of showing the full article or PDF link, the page displays a teaser summary and a small lead-capture form.
3. **Submission**: User enters their Work Email and clicks "Download".
4. **Processing**: 
   - Similar to Flow 1, the data is validated and sent to the API.
   - The API stores the email in Supabase, tagging the record with the specific whitepaper requested (`source_asset`).
5. **Fulfillment**:
   - The API returns a secure, signed URL to the frontend.
   - The UI immediately swaps the form for a "Download PDF" button, or initiates the download automatically.
   - Alternatively (or additionally), the system emails the PDF link to the user to verify the email address.

