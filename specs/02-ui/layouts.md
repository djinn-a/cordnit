# LAYOUTS.md — Global Layout Structures

The global layout components wrap all public marketing pages and enforce the primary Information Architecture.

## 1. Header (Sticky)
- **Behavior:** The header must be sticky to ensure navigation is always accessible.
- **Navigation:** Houses the primary navigation links: Solutions, Industries, Accelerators, Insights, About.
- **Mega-Menu:** The "Solutions" link must trigger a mega-menu that exposes the complex 3-level hierarchy (Practices -> Sub-services).
- **CTA:** Must feature a persistent "Get in Touch" / "Book a Call" CTA button.

## 2. Footer
- **Sitemap:** Must contain the full text sitemap, including all Solutions sub-items linked out for SEO and accessibility.
- **Form:** Includes the Newsletter signup capture form.
- **Links:** Social media links, Privacy Policy, and Terms of Service.

## 3. Page Layout Wrappers
- **Main Content Constraint:** Standardize the maximum width of content containers across the site (e.g., `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) to ensure readability on ultrawide monitors. 
- **Section Spacing:** Use consistent vertical rhythm (driven by spacing tokens like `--space-section`) between major modules (Hero -> Value Props -> Grids).
