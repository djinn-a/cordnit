---
name: cms-graphql-sync-checker
description: Verifies CMS data synchronization with Next.js sitemaps.
---

# CMS Data Sync Checker

## Instructions
1. Inspect the static `/data/*.ts` files representing the simulated CMS.
2. Verify that the L2/L3 parent-child hierarchy in `navigation.ts` strictly matches the URL routing map.
3. Ensure no HTML tags are hardcoded in the CMS strings; use markdown or structured rich-text arrays instead.
4. Reject if naming collisions (e.g., "Managed Services") are not uniquely slugged.
