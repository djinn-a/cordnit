# META-TAGS.md — Title, Description, and Open Graph Strategy

## 1. The Next.js Metadata API
All meta tags must be generated using the Next.js `generateMetadata()` function within `page.tsx` or `layout.tsx` files. 

### Title Template
To maintain brand consistency, the root `layout.tsx` must define a title template:
```typescript
export const metadata = {
  title: {
    template: '%s | Cordinit',
    default: 'Cordinit | Secure Digital Transformation Partner',
  },
}
```

## 2. Canonical URLs & Trailing Slashes
Duplicate content penalties will destroy domain authority.
- **Decision:** No Trailing Slashes. The URL `/about` is canonical; `/about/` must 301 redirect to `/about`.
- **Implementation:** Next.js defaults to `trailingSlash: false`. Do not change this in `next.config.js`.
- **Canonical Tags:** Every page MUST output a `<link rel="canonical" href="https://cordinit.com/current-path" />`. This path must explicitly omit the trailing slash.

## 3. Open Graph (OG) and Twitter Cards
When links are shared on LinkedIn, X (Twitter), or Slack, they must render perfectly.
- **Required Tags:** `og:title`, `og:description`, `og:image`, `og:url`, `og:type` (website vs article).
- **Twitter:** `twitter:card="summary_large_image"`.
- **Images:** The `og:image` must be precisely 1200x630 pixels.

## 4. Fallback Strategy (Edge Case Handling)
**Scenario:** A content editor publishes a new Insight article but forgets to upload a featured image or write an SEO description.
**Production Handling:**
- The Next.js `generateMetadata` function MUST catch null values.
- **Description Fallback:** Slice the first 150 characters of the article's rich text content.
- **Image Fallback:** Serve a branded, default Cordinit OG placeholder image located at `/public/images/og-default.jpg`.
