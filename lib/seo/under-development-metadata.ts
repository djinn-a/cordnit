import type { Metadata } from "next";

/** Shared noindex metadata for unfinished production stubs. */
export function underDevelopmentMetadata(pageLabel: string): Metadata {
  return {
    title: `${pageLabel} | Coming Soon | Cordinit`,
    description: `The ${pageLabel} page is under development. Visit Cordinit home, about, or contact for live content.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}
