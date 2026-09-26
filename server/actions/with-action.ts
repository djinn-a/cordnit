import "server-only";
import { randomUUID } from "node:crypto";
import { refresh } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import type { z } from "zod";
import type { ActionResult } from "@/lib/types/result";
import { requireSuperAdmin, type AdminSession } from "@/server/auth";
import { normalizeError, zodToFieldErrors } from "@/server/errors";
import { logger } from "@/server/logger";

type ActionContext = { session: AdminSession; requestId: string };

type ActionOptions<T> = {
  /** Re-render the calling route in the same response (default). */
  refresh?: boolean;
  /**
   * Navigate after success. The destination renders in the same response, so the
   * caller never shows the route it is leaving (for example a page it just deleted).
   */
  redirectTo?: (data: T) => string;
};

/**
 * Wraps every CMS mutation: authenticate, parse input with Zod, run, and
 * convert any failure into a typed ActionResult. Handlers never catch errors.
 * Logs carry the action name and timing only: inputs can contain secrets.
 */
export function withAction<S extends z.ZodType, T>(
  name: string,
  schema: S,
  handler: (input: z.output<S>, ctx: ActionContext) => Promise<T>,
  options: ActionOptions<T> = {},
): (input: z.input<S>) => Promise<ActionResult<T>> {
  const shouldRefresh = options.refresh ?? true;
  return async (rawInput) => {
    const requestId = randomUUID();
    const startedAt = performance.now();
    const durationMs = () => Math.round(performance.now() - startedAt);
    let destination: string | undefined;
    let data: T;
    try {
      const session = await requireSuperAdmin();
      const parsed = schema.safeParse(rawInput);
      if (!parsed.success) {
        return {
          ok: false,
          error: {
            code: "VALIDATION",
            message: "Some fields are invalid.",
            fieldErrors: zodToFieldErrors(parsed.error),
          },
        };
      }
      data = await handler(parsed.data, { session, requestId });
      destination = options.redirectTo?.(data);
    } catch (err) {
      unstable_rethrow(err);
      const error = normalizeError(err);
      const log = error.code === "INTERNAL" ? logger.error : logger.warn;
      log("action.failed", { action: name, requestId, code: error.code, durationMs: durationMs(), err });
      return { ok: false, error };
    }
    logger.info("action.ok", { action: name, requestId, durationMs: durationMs() });
    if (destination) redirect(destination);
    if (shouldRefresh) refresh();
    return { ok: true, data };
  };
}
