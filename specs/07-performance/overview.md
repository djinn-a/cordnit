# OVERVIEW.md — Performance Targets

## Targets
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Lighthouse Performance ≥ 90 (mobile and desktop)

## Practices
- Prefer SSG / ISR and React Server Components
- Images via CDN with srcset and lazy loading
- Minimize client-side JavaScript
- Avoid heavy animation libraries
- Code-split and tree-shake aggressively
- Monitor with Lighthouse CI and the `lighthouse-auditor` skill

## Budget Discipline
Any new third-party script or large asset must be justified against the Core Web Vitals budget before merge.
