export const SITE_NAME = "Cordinit";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cordinit.com").replace(/\/+$/, "");

export const DEFAULT_TITLE = "Cordinit | Secure Digital Transformation";

export const DEFAULT_DESCRIPTION =
  "Cordinit helps enterprises modernise securely across cybersecurity, Salesforce, AI automation, cloud and application engineering.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
