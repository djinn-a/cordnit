import { generateKeyBetween } from "fractional-indexing";
import { errors } from "@/server/errors";

/**
 * Sort key strictly between two neighbours (null = list edge), compared with
 * byte order to match `position COLLATE "C"`. Out-of-order neighbours mean the
 * client's view is stale (another tab reordered), so the editor must reload.
 */
export function keyBetween(a: string | null, b: string | null): string {
  // generateKeyBetween only throws on a === b; reversed neighbours yield a misplaced key.
  if (a !== null && b !== null && a >= b) throw errors.staleWrite();
  try {
    return generateKeyBetween(a, b);
  } catch {
    throw errors.staleWrite();
  }
}
