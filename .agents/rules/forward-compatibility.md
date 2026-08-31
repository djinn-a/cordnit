# Forward Compatibility Mandate

## Constraint
Phase 1 code must not break when Phase 2 launches.

1. **No Data Silos:** Every database table must have logical mappings ready to sync with the future CRM.
2. **API Schema Readiness:** While Phase 1 uses standard Next.js route handlers, the JSON responses and request bodies must be perfectly structured to seamlessly swap to a GraphQL `mutation` or `query` string in Phase 2.
3. **No Bare Inserts:** Do not write raw SQL `INSERT` statements in the UI. Everything routes through the `API-AGENT` patterns.
