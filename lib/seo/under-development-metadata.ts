import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/** Shared noindex metadata for unfinished production stubs. */
export function underDevelopmentMetadata(pageLabel: string, siteName: string = SITE_NAME): Metadata {
  return {
    title: { absolute: `${pageLabel} | Coming Soon | ${siteName}` },
    description: `The ${pageLabel} page is under development. Visit ${siteName} home, about, or contact for live content.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}
