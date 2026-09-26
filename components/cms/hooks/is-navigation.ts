import { unstable_rethrow } from "next/navigation";

/**
 * True for the rejection a Server Action produces when it calls redirect(): the
 * router is already navigating, so callers must not treat it as a failure.
 */
export function isNavigation(err: unknown): boolean {
  try {
    unstable_rethrow(err);
    return false;
  } catch {
    return true;
  }
}
