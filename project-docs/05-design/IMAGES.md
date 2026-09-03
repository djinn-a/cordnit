# IMAGES

## Purpose
Describe the purpose of this document.

## Scope
Defines the boundaries and applicability of this document.

## Current Status
Draft / In Progress / Approved

## Rules / Requirements
List all core rules and requirements here.

## Implementation Details
Provide technical or process implementation details.

## Dependencies
List related documents, systems, or processes.

## Decisions
Record any key decisions made within the scope of this document.

## Risks
Document any identified risks.

## Open Questions
List any unresolved queries or topics.

## Last Updated
2026-09-01



## Legacy Content (Merged from assets.md)

# ASSETS.md — Media & Dummy Assets

## Handling Assets Before Final Handoff

The engineering team will not be blocked by pending design assets. 

**Rule:** Right now, we use dummy/placeholder assets for all visual media. The layout and design must be fully responsive and stable regardless of whether the final image or a placeholder is rendered.

### Placeholder Requirements
1. **Dimensions:** Placeholders must respect the intended aspect ratio of the final design (e.g., 16:9 for insight thumbnails, 1:1 for headshots).
2. **Types of Assets Requiring Placeholders:**
   - Hero background images or graphics.
   - Partner badges (e.g., Salesforce partner tier).
   - Security certifications (e.g., SOC2, ISO27001 logos).
   - Client logos for the social proof section.
   - Author headshots and article featured images.

### Technical Asset Requirements (When Final)
- **Delivery:** Images must be served via a CDN (e.g., Vercel Image Optimization, Sanity CDN).
- **Responsive:** Use responsive `srcset` (automatically handled by `next/image`).
- **Loading:** Lazy-load images that appear below the fold. Eager-load critical LCP images (like the hero banner) using the `priority` prop.
- **Accessibility:** An `alt` text field is required for every CMS-uploaded image.

