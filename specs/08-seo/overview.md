# OVERVIEW.md — SEO & Discoverability Architecture

## SEO as a First-Class Citizen
For Cordinit, organic search is a primary lead generation channel. SEO is not an afterthought to be added via a plugin; it is baked into the Next.js App Router architecture using the native Metadata API and Server-Side Rendering (SSR/SSG).

## Production Rules
1. **Server-Rendered:** No core marketing content or routing structure can rely on Client Components to render. Search engine crawlers must receive fully formed HTML payloads.
2. **Dynamic Metadata:** Every CMS-driven page must generate its own `<title>`, `<meta name="description">`, and Open Graph tags.
3. **No Duplicate Content:** Strict rules are enforced regarding trailing slashes and query parameters to ensure crawl budgets are spent efficiently.
4. **Performance is SEO:** Google's Core Web Vitals (LCP, CLS, INP) directly impact rank. The performance rules in `07-performance` and `02-ui` are inherently SEO requirements.
