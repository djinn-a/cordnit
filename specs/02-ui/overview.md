# OVERVIEW.md — UI/UX Implementation Layer

## Foundation
The Cordinit website UI is built upon a strict, token-driven design system. The goal is to ensure a fast, credible, and highly accessible user experience that scales seamlessly into future phases (Client Portal, Admin Dashboard).

## Core Directives for UI Engineering

1. **Token-Driven:** Components must consume design tokens only. Hardcoded hex values, raw pixel spacing, and ad-hoc font sizes are strictly forbidden inside React components.
2. **Responsive by Default:** The site must be fully responsive across mobile, tablet, and desktop viewports.
3. **Dummy Assets:** Until final assets are delivered by the design and marketing teams, developers must implement responsive placeholder/dummy assets for:
   - Trust signals (certifications, partner badges)
   - CMS imagery (hero images, blog thumbnails)
   - Client logos
4. **Accessibility:** WCAG 2.1 AA compliance is the minimum standard.
5. **Performance:** The UI must adhere to Core Web Vitals (Lighthouse 90+), utilizing responsive images (`srcset`), lazy loading, and avoiding heavy, performance-degrading animations.
