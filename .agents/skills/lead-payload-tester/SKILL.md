---
name: lead-payload-tester
description: Testing rubric for form payloads and UTM tracking.
---

# Lead Payload Tester

## Instructions
1. Inspect the API Route Handler for form submissions.
2. Verify Zod schema validation is present for `first_name`, `last_name`, `email`, and `message`.
3. Verify UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) are optionally accepted and passed to the database.
4. Verify the `consent_granted_at` timestamp is populated prior to database insertion.
5. Ensure the API response does not leak internal database errors or UUIDs.
6. Reject the code if any criteria are missed.
