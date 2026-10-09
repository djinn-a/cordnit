# Site Navbar and Footer in CMS Global Blocks

How the site header and footer are edited, stored, published, cached, and rendered, and where to look when something goes wrong.

## Design in one paragraph

The Navbar and Footer are two Global Blocks with stable keys, `site-navbar` and `site-footer`. Marketing edits them in **Admin → Blocks**, publishes once, and every page updates. Links are checked **when the block is published** (not on every render), so visitors never see a link to a page that is not live, and the layout cache only changes when the header or footer itself is republished. TopBar, Navbar and Footer are Server Components: every link is in the server HTML, and only the dropdown, mobile drawer, newsletter and contact modal are client islands.

## Request path

```text
CMS editor (SchemaForm from the zod schema)
  -> server action (super_admin + zod)
  -> blocks.service publishBlockTx
       -> parse with the registered schema
       -> assertChromeLinksLive: every internal link must be a published page,
          a redirect source, or a code-owned route (/breach, /privacy)
       -> version row + audit row, one transaction
  -> invalidateBlock: cms:block:<id>, cms:block-key:<key>

Visitor request
  -> app/(site)/layout.tsx -> getSiteChrome()
  -> getPublishedBlockByKey(key, type)   'use cache', tag cms:block-key:<key>
       reads the published version's content and parses it with the schema
  -> TopBar / Navbar / Footer (server) + small client islands
```

## Editable content

`sectionContentSchemas.navbar` and `.footer` in `lib/cms/registry/schemas.generated.ts` are the authority; `SectionContentMap` types the components.

- **Navbar:** optional logo upload (SVG/PNG/WebP/JPEG + alt text), logo link, top-bar labels, a fixed **Solutions** dropdown (label, link, panel copy, "explore all" link, 1–30 items each with title, description, link and optional icon upload), up to 12 plain nav links, the contact button label and the mobile menu label.
- **Footer:** optional logo upload, logo link, branding copy, optional contact email and phone (rendered as `<address>` and added to Organization JSON-LD), link columns, 0–6 social links chosen from a platform dropdown (`SOCIAL_PLATFORMS` in `lib/cms/site-chrome.ts` supplies icon and label; each platform at most once), newsletter copy, media feature (with optional thumbnail upload), copyright and legal links.

A blank link renders the text without a link. Code still owns layout, styles, the default logo, the default solution icons and the social icons.

## Uploads

`components/cms/shared/MediaField.tsx` is the one uploader (SEO images use it too). Rules live in `lib/cms/media.ts`:

| Purpose | Types | Max | Folder |
| --- | --- | --- | --- |
| `seo` | JPEG, PNG, WebP | 5 MB | `seo/` |
| `logo` | + SVG | 1 MB | `chrome/logos/` |
| `icon` | + SVG | 512 KB | `chrome/icons/` |
| `media` | JPEG, PNG, WebP | 5 MB | `chrome/media/` |

The browser uploads straight to Supabase with a signed URL; `verifyUploadedImage` then downloads the object, checks size and magic bytes, and rejects SVGs with scripts, event handlers, `foreignObject`, embeds or `javascript:`/`data:text/html` URLs (the object is deleted). Uploaded images are always rendered with `<img>`, never inlined, so an SVG cannot run code even if one slipped through.

## Link safety

`lib/cms/site-chrome.ts`:

- `isSafeChromeHref` (schema level): blank, `#hash`, `/path`, `https://`, `mailto:`, `tel:`. Protocol-relative URLs, backslashes and other schemes are rejected at save.
- `findDeadInternalLinks` (publish level): internal paths are compared case- and trailing-slash-insensitively against published slugs, redirect sources and `CODE_OWNED_ROUTES`. Publish fails listing up to eight dead links.
- The editor shows the same check live (inline field warnings plus a summary banner) using `cms.siteChrome.loadLivePaths()`.
- Unpublishing a page that the live header or footer links to succeeds but warns the editor (`chromeBlocksLinkingTo`).

## Fallback and build safety

- `NAVBAR_DEFAULTS` / `FOOTER_DEFAULTS` (`lib/cms/site-chrome-defaults.ts`) are real content whose links all point at seeded pages; a unit test enforces that.
- A missing, unpublished, wrong-type or schema-invalid block logs `[CMS]` and renders the defaults.
- A **database error** during `next build` is rethrown so a broken deploy fails instead of baking defaults into the static shell. At runtime the error is logged and the defaults render.
- `npm run build:cms` runs `cms:seed-chrome:prod` (creates and publishes any missing block from the defaults, one transaction, never overwrites) and `cms:verify-chrome:prod` (exists, type, published, schema, no dead links; exits 1 otherwise).

## SEO / AEO

- All navigation links are plain `<a>` in server HTML inside `<nav>`/`<ul>`; the mega menu is hidden with CSS, not unmounted.
- Organization JSON-LD on every page merges footer social links into `sameAs`, uses the uploaded logo when Site Settings has none, and adds a `contactPoint` from the footer email/phone.
- `/llms.txt` (`app/llms.txt/route.ts`, `lib/seo/llms-txt.ts`) lists indexable published pages grouped by the navbar and footer, with each page's meta description. It returns 404 when "discourage search engines" is on and is refreshed by the chrome, page-list and site-settings tags.
- `/privacy-policy` is a permanent redirect to `/privacy`.

## Cache tags

| Change | Tags | Effect on chrome |
| --- | --- | --- |
| Navbar/Footer publish or restore | `cms:block:<id>`, `cms:block-key:<key>` | Layout re-renders with new chrome |
| Page publish/unpublish, redirect edit | page tags, pages-list, redirects | Chrome cache untouched (links were checked at publish) |
| Draft save | none | Drafts never reach visitors |

## Operations

```bash
npm run cms:seed-chrome      # create + publish missing blocks from defaults (local DB)
npm run cms:verify-chrome    # check both blocks are live and valid
```

Rows created by an older schema (before logos, the Solutions group and the social platform dropdown) will fail to parse: the site shows the defaults and `cms:verify-chrome` exits 1. Fix by opening the block in the editor, or delete the stale row in a staging DB and re-run the seed. Never patch production JSON by hand; the editor keeps validation, versions, audit and cache invalidation together.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Publish fails with "links to pages that aren't live" | Publish those pages first, fix the link, or add a redirect |
| Site shows default chrome | `[CMS]` logs; run `cms:verify-chrome` against that environment |
| Published but site unchanged | Block key matches `site-navbar`/`site-footer`; `invalidateBlock` received the key |
| Upload rejected | Type, size and purpose against the table above; SVG contains active content |
| Restore fails | The old version doesn't match today's schema (expected after schema changes) |

## File map

| Area | Files |
| --- | --- |
| Schema, defaults, link rules | `lib/cms/registry/schemas.generated.ts`, `lib/cms/site-chrome.ts`, `lib/cms/site-chrome-defaults.ts`, `lib/cms/media.ts` |
| Reads | `server/cms/queries/published.ts`, `server/cms/queries/site-chrome.ts` |
| Writes | `server/cms/services/blocks.service.ts`, `server/cms/services/site-chrome.service.ts`, `server/actions/media.ts`, `server/storage/supabase-storage.ts` |
| Editor | `components/cms/blocks/BlockEditor.tsx`, `components/cms/form/SchemaForm.tsx`, `components/cms/shared/MediaField.tsx` |
| Site | `app/(site)/layout.tsx`, `components/layout/{TopBar,Navbar,Footer}/*`, `components/layout/chrome-client.tsx` |
| SEO | `lib/seo/structured-data.ts`, `lib/seo/llms-txt.ts`, `app/llms.txt/route.ts`, `next.config.ts` (redirect) |
| Scripts and tests | `scripts/cms/seed-site-chrome.ts`, `scripts/cms/verify-site-chrome.ts`, `tests/cms/site-chrome.test.ts` |
