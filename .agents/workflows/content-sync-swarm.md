# Content Sync Swarm

## Purpose
Orchestration spec for syncing Headless CMS static data.

1. **CMS-AGENT:** Parse the incoming copy or structure changes.
2. **CMS-AGENT:** Update the static `/data/*.ts` files to reflect the new copy.
3. **SCHEMA-AGENT:** Execute the `cms-graphql-sync-checker` skill.
4. **UI-AGENT:** Update any React components to map the new CMS props, ensuring NO hardcoded text is added directly to the component.
5. **SEO-AGENT:** Verify the XML sitemap accurately maps the new L2/L3 routes.
