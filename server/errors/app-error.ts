import type { ErrorCode, FieldErrors } from "@/lib/types/result";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly fieldErrors?: FieldErrors;
  /** Safe to show to the admin. Internal detail belongs in `cause`. */
  readonly expose: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    options?: { fieldErrors?: FieldErrors; cause?: unknown; expose?: boolean },
  ) {
    super(message, { cause: options?.cause });
    this.name = "AppError";
    this.code = code;
    this.fieldErrors = options?.fieldErrors;
    this.expose = options?.expose ?? code !== "INTERNAL";
  }
}

export const errors = {
  unauthenticated: (message = "Please sign in to continue.") =>
    new AppError("UNAUTHENTICATED", message),
  forbidden: (message = "You do not have access to this resource.") =>
    new AppError("FORBIDDEN", message),
  notFound: (entity: string) => new AppError("NOT_FOUND", `${entity} was not found.`),
  conflict: (message: string, fieldErrors?: FieldErrors) =>
    new AppError("CONFLICT", message, { fieldErrors }),
  validation: (message: string, fieldErrors?: FieldErrors) =>
    new AppError("VALIDATION", message, { fieldErrors }),
  staleWrite: () =>
    new AppError(
      "STALE",
      "This content was changed elsewhere (another tab?). Reload to get the latest version.",
    ),
};
