---
name: supabase-schema-validator
description: Evaluates Supabase models and CRM payloads.
---

# Supabase Schema Validator

## Instructions
1. Inspect the proposed SQL migration or schema definition.
2. Verify all primary keys are `UUID DEFAULT gen_random_uuid()`.
3. Verify the presence of `created_at` and `updated_at` TIMESTAMPTZ columns.
4. Verify Row Level Security (RLS) is enabled.
5. Verify CRM required fields exist: `utm_source`, and `consent_granted_at`.
6. Reject the schema if any criteria are not met.
