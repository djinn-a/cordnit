# Security Audit Flow

## Purpose
Periodic orchestration spec for security vulnerability checks.

1. **SECURITY-AGENT:** Run `npm audit` and check for CVEs in `package.json`.
2. **SECURITY-AGENT:** Review `next.config.ts` to ensure the CSP headers have not degraded.
3. **DB-AGENT:** Audit the Supabase RLS policies to ensure no `anon` keys have `INSERT` or `SELECT` access to `leads`.
4. **QA-AGENT:** Confirm that form submissions rate limiting is active.
5. **COMPLIANCE-AGENT:** Check that the privacy policy and consent timestamps are accurately capturing data.
