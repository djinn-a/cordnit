# Feature Build Swarm

## Purpose
Orchestrate the safe construction of a new feature from DB to UI.

1. **DB-AGENT:** Update `DATAMODEL.md` and generate Supabase migrations if required.
2. **SCHEMA-AGENT:** Validate the migration via `supabase-schema-validator`.
3. **API-AGENT:** Draft the Next.js Route Handler for the feature.
4. **UI-AGENT:** Build the React component using `DESIGN-SYSTEM.md` tokens.
5. **QA-AGENT:** Verify the feature meets Core Web Vitals targets.
6. **TEST-AGENT:** Write automated tests covering the new feature.
