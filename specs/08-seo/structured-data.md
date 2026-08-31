# STRUCTURED-DATA.md — JSON-LD Implementations

To secure rich snippets in Google Search results, Cordinit must inject strictly formatted JSON-LD structured data into the DOM. Do NOT use Microdata (HTML attributes); use `<script type="application/ld+json">`.

## 1. Organization Schema
- **Location:** Injected on the Home page (`/`).
- **Purpose:** Defines the company, logo, social profiles, and primary contact points.

## 2. BreadcrumbList Schema
- **Location:** Injected on all deep pages (Solutions, Industries, Insights).
- **Purpose:** Helps Google understand the site taxonomy and displays clean breadcrumbs in search results (e.g., `Cordinit > Solutions > Cloud Engineering`).
- **Edge Case:** Must accurately map the parent-child relationship defined in the CMS (e.g., ensuring "AWS Migration" accurately points back to "Cloud Engineering").

## 3. Article Schema
- **Location:** Injected on all individual Insight pages (`/insights/[slug]`).
- **Purpose:** Required for Google Discover and Top Stories carousels.
- **Properties:** Must include `headline`, `image`, `datePublished`, `dateModified`, and `author`.

## 4. Error Handling
- Never render malformed JSON-LD. If a required property (like an Article's author) is missing from the CMS, either fall back to the corporate "Cordinit Team" entity or omit the schema entirely to prevent Google Search Console validation errors.
