import { ZodError } from "zod";
import type { ApiError, FieldErrors } from "@/lib/types/result";
import { AppError } from "./app-error";

type PgLikeError = { code?: string; constraint_name?: string; constraint?: string; detail?: string };

function pgError(err: unknown): PgLikeError | null {
  let current: unknown = err;
  for (let depth = 0; depth < 4 && current; depth++) {
    if (typeof current === "object" && current !== null && "code" in current) {
      const code = (current as PgLikeError).code;
      if (typeof code === "string" && /^[0-9A-Z]{5}$/.test(code)) return current as PgLikeError;
    }
    current = current instanceof Error ? current.cause : undefined;
  }
  return null;
}

export function zodToFieldErrors(error: ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length ? issue.path.join(".") : "_root";
    (out[key] ??= []).push(issue.message);
  }
  return out;
}

const UNIQUE_MESSAGES: Record<string, { field: string; message: string }> = {
  pages_slug_unique: { field: "slug", message: "Another page already uses this slug." },
  global_blocks_key_unique: { field: "key", message: "Another global block already uses this key." },
  templates_key_unique: { field: "key", message: "Another layout already uses this key." },
};

/** Maps anything thrown into a safe, typed ApiError. Never leaks internals. */
export function normalizeError(err: unknown): ApiError {
  if (err instanceof AppError) {
    return {
      code: err.code,
      message: err.expose ? err.message : "Something went wrong. Please try again.",
      ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
    };
  }
  if (err instanceof ZodError) {
    return {
      code: "VALIDATION",
      message: "Some fields are invalid.",
      fieldErrors: zodToFieldErrors(err),
    };
  }
  const pg = pgError(err);
  if (pg?.code === "23505") {
    const constraint = pg.constraint_name ?? pg.constraint ?? "";
    const known = UNIQUE_MESSAGES[constraint];
    return {
      code: "CONFLICT",
      message: known?.message ?? "This value already exists.",
      ...(known ? { fieldErrors: { [known.field]: [known.message] } } : {}),
    };
  }
  if (pg?.code === "23503") {
    return { code: "CONFLICT", message: "This item is referenced elsewhere and cannot be changed." };
  }
  return { code: "INTERNAL", message: "Something went wrong. Please try again." };
}
