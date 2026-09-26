import { notFound } from "next/navigation";

/** Rewrite-only target, never navigated to; its render always throws, so there is nothing to validate. */
export const instant = false;

/**
 * Rewrite target for unknown public URLs (see proxy.ts). Nothing here suspends,
 * so the not-found UI renders before streaming starts and the status is a real 404.
 */
export default function CmsNotFound(): never {
  notFound();
}
