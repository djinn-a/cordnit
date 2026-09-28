# CONTENT SCHEMAS

## Purpose
Explain how each section type's editable content is defined, validated, and turned into admin forms.

## Current Status
Approved. 56 section types + `newsletter`.

## Where things live
| File | Role |
|---|---|
| `lib/cms/types.ts` | `SECTION_TYPES` list and `isSectionType()` guard. |
| `lib/cms/registry/schemas.generated.ts` | One Zod v4 schema per type (generated, then hand-tuned). |
| `lib/cms/registry/catalog.ts` | Label, category, and description for the "Add section" picker. |
| `lib/cms/registry/fields.ts` | Field helpers that attach `.meta({ label, widget, maxLength })`. |
| `lib/cms/registry/props.ts` | `splitSectionProps` / `mergeSectionProps` / `stripItemIds`. |
| `server/cms/section-defaults.json` | Real copy + hidden images used to prefill a newly added section. |
| `lib/cms/component-map.ts` | `SectionType -> React component`. |
| `scripts/cms/generate-registry.ts` | Regenerates schemas from the seed snapshot. |

## Content vs system props
Every section's props are split into two JSON columns:

- `content`: the editable text (titles, descriptions, button labels, list items).
- `system_props`: presentation the editor never sees (image `src`, icons, variants, class names, ids, booleans).

Keys declared in the section schema are always content. For undeclared keys, `isSystemKey()` decides the split by key name (exact names like `id`, `alt`, `variant` and patterns like `*image*`, `*icon*`, `*logo*`). Arrays of objects get a stable `_id` on both sides, so an editor can reorder, add or remove cards and images stay with the right card. A new card borrows a sibling's presentation but keeps its own identity.

## Validation
- **On save**: `parseSectionContent(type, content)` runs the type's Zod schema; unknown keys are stripped; errors come back as field errors on the form.
- **On publish**: the whole page is validated again before the snapshot is written.
- **Render path**: trusts the snapshot, no parsing cost.

## Forms
`getContentJsonSchema(type)` converts the Zod schema with `z.toJSONSchema` (input mode), JSON-normalised so it can cross the RSC boundary. `components/cms/form/SchemaForm.tsx` renders it with Ant Design (text, textarea, URL, select, switch, arrays with add/remove/reorder, and a button editor for `cta` fields with add/remove for optional buttons).

## Adding a new section type
1. Build the component (props-driven, no data imports).
2. Add the type to `SECTION_TYPES`, a schema in the registry, a catalog entry, and a `component-map` entry.
3. Add defaults to `section-defaults.json`.
4. Run `npm test`: the registry tests fail if any type lacks catalog data, defaults, or a serialisable schema.

## Tests
`tests/cms/registry.test.ts` proves every section of all 28 seeded pages passes its schema, that the schema-guided split -> parse -> merge reproduces the original props exactly, and that no CTA field leaks into `systemProps`. `tests/cms/cta.test.ts` covers CTA validation and action binding.

## Buttons (CTA field)
Every section button uses the `cta(label, { variant? })` field builder, backed by `ctaSchema` in `lib/cta`:

| Key | Values | Notes |
|---|---|---|
| `label` | 1-300 chars | Required. |
| `action` | `link` / `contactModal` / `newsletterModal` / `scrollTo` | Defaults to `link`. |
| `href` | path, `#anchor`, `https://`, `mailto:`, `tel:` | Required for `link`; `#anchor` required for `scrollTo`. Validated on the server. |
| `newTab` | boolean | `link` only. |
| `variant` | `primary` / `secondary` / `outline` / `ghost` | Hidden in the editor with `cta(label, { variant: false })` where the design fixes the style (inline card links, CTA band). |

Rendering: `CtaButton` (`components/ui/Button`) resolves the action through `useCtaAction`, and pass `ctaLocation` so contact-modal leads keep their attribution. `Button` renders a Next `Link` for internal paths, `<a>` for other hrefs and `<button>` otherwise.

The content/system split is schema-guided: `splitSectionProps(props, schema)` treats every key the schema declares as content, so a CTA's `variant` and `newTab` stay editable even though their names match `isSystemKey`. The seed script and the defaults generator (`generate-registry.ts --defaults-only`) pass the schema; `snapshot.json` `samples` feed `section-defaults.json` and must use the same CTA shape as the pages.

## Last Updated
2026-09-27
