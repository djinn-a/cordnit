/** Shared (client + server) contract for every server action and API route. */
export const ERROR_CODES = [
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "VALIDATION",
  "NOT_FOUND",
  "CONFLICT",
  "STALE",
  "RATE_LIMITED",
  "INTERNAL",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export type FieldErrors = Record<string, string[]>;

export type ApiError = {
  code: ErrorCode;
  message: string;
  fieldErrors?: FieldErrors;
};

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export const HTTP_STATUS_BY_CODE: Record<ErrorCode, number> = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  VALIDATION: 422,
  NOT_FOUND: 404,
  CONFLICT: 409,
  STALE: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

export function isActionResult(value: unknown): value is ActionResult<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof (value as { ok: unknown }).ok === "boolean"
  );
}
