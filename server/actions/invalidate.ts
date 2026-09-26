import "server-only";
import { updateTag } from "next/cache";
import { PAGES_LIST_TAG, REDIRECTS_TAG, blockTag, pageTag } from "@/lib/cms/document";

/** Public-cache invalidation after a live change. Draft edits never touch visitor caches. */
export function invalidateLivePage(slugs: readonly (string | null | undefined)[]): void {
  for (const slug of new Set(slugs)) if (slug) updateTag(pageTag(slug));
  updateTag(PAGES_LIST_TAG);
  // Publishing can create (slug change) or remove (path reclaimed) redirects.
  updateTag(REDIRECTS_TAG);
}

export function invalidateBlock(blockId: string): void {
  updateTag(blockTag(blockId));
}

export function invalidateRedirects(): void {
  updateTag(REDIRECTS_TAG);
}
