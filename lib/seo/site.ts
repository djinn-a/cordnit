export const SITE_NAME = "Cordinit";

// Canonicals and JSON-LD always target production; SITE_URL can be localhost or a preview host.
export const PRODUCTION_SITE_URL = "https://cordinit.com";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL).replace(/\/+$/, "");

export const DEFAULT_TITLE = "Cordinit | Secure Digital Transformation";

export const DEFAULT_DESCRIPTION =
  "Cordinit helps enterprises modernise securely across cybersecurity, Salesforce, AI automation, cloud and application engineering.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
