"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { changePasswordSchema, loginSchema } from "@/lib/cms/inputs";
import type { ActionResult } from "@/lib/types/result";
import { auth } from "@/server/auth";
import { safeNext } from "@/server/auth/safe-next";
import { normalizeError, zodToFieldErrors } from "@/server/errors";
import { logger } from "@/server/logger";
import { withAction } from "./with-action";

/** Resolves only on failure: success redirects server-side so the admin renders once. */
export async function loginAction(input: z.input<typeof loginSchema> & { next?: string }): Promise<ActionResult<never>> {
  const requestId = randomUUID();
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: { code: "VALIDATION", message: "Some fields are invalid.", fieldErrors: zodToFieldErrors(parsed.error) },
    };
  }
  try {
    const session = await auth.signIn(parsed.data.username, parsed.data.password);
    logger.info("auth.login", { requestId, userId: session.userId });
  } catch (err) {
    const error = normalizeError(err);
    logger.warn("auth.login failed", { requestId, code: error.code, username: parsed.data.username });
    return { ok: false, error };
  }
  redirect(safeNext(input.next));
}

/** Resolves only on failure: success redirects to the login screen. */
export async function logoutAction(): Promise<ActionResult<never>> {
  try {
    await auth.signOut();
  } catch (err) {
    const error = normalizeError(err);
    logger.warn("auth.logout failed", { code: error.code, err });
    return { ok: false, error };
  }
  redirect("/admin/login");
}

export const changePasswordAction = withAction(
  "auth.changePassword",
  changePasswordSchema,
  async (input) => {
    await auth.changePassword(input.currentPassword, input.newPassword);
    return null;
  },
  { refresh: false },
);
