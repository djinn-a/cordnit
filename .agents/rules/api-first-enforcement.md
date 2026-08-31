# API-First Enforcement

## Constraint
Strict decoupling of the Frontend Client from the Database.

1. **Frontend Isolation:** Client components (`use client`) must never import `@supabase/supabase-js`.
2. **Proxy Mandatory:** All browser interactions that require database reading or writing must POST/GET to `/app/api/...` route handlers.
3. **Service Key Protection:** The `SUPABASE_SERVICE_ROLE_KEY` must only exist in Server contexts.
