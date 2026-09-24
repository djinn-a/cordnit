export const PUBLIC_ROUTES = ['/', '/aboutus', '/contactus'] as const;

export const ALWAYS_ALLOW_PREFIXES = [
  '/api/',          // contact API route
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap.xml',
  '/under-development',
  '/images/',       // static assets
];

export function getLaunchRoute(href: string): string {
  // Pass through external links immediately
  if (href.startsWith('http') || href.startsWith('mailto')) {
    return href;
  }
  
  // Extract base route (e.g. from '/contactus?type=visit')
  const baseRoute = href.split('?')[0].split('#')[0];
  
  // Also pass through if it hits an ALWAYS_ALLOW_PREFIXES prefix
  if (ALWAYS_ALLOW_PREFIXES.some(prefix => baseRoute.startsWith(prefix))) {
    return href;
  }

  // If it's a public route, keep the original link. Otherwise, point to under-development.
  if ((PUBLIC_ROUTES as readonly string[]).includes(baseRoute)) {
    return href;
  }

  return '/under-development';
}
