import { describe, expect, it } from "vitest";
import { z } from "zod";
import { AppError, errors } from "@/server/errors/app-error";
import { normalizeError } from "@/server/errors/normalize";

describe("normalizeError", () => {
  it("exposes AppError messages and field errors", () => {
    const err = errors.conflict("Taken", { slug: ["Taken"] });
    expect(normalizeError(err)).toEqual({ code: "CONFLICT", message: "Taken", fieldErrors: { slug: ["Taken"] } });
  });

  it("hides INTERNAL AppError messages", () => {
    expect(normalizeError(new AppError("INTERNAL", "db password is hunter2")).message).not.toContain("hunter2");
  });

  it("maps ZodError to field errors keyed by path", () => {
    const result = z.object({ a: z.object({ b: z.string() }) }).safeParse({ a: { b: 1 } });
    expect(normalizeError(result.error)).toMatchObject({ code: "VALIDATION", fieldErrors: { "a.b": [expect.any(String)] } });
  });

  it("maps known unique violations (even when wrapped) to a field error", () => {
    const pg = Object.assign(new Error("duplicate key"), { code: "23505", constraint_name: "pages_slug_unique" });
    const wrapped = new Error("Failed query", { cause: pg });
    expect(normalizeError(wrapped)).toEqual({
      code: "CONFLICT",
      message: "Another page already uses this slug.",
      fieldErrors: { slug: ["Another page already uses this slug."] },
    });
  });

  it("maps foreign key violations to CONFLICT", () => {
    expect(normalizeError(Object.assign(new Error("fk"), { code: "23503" })).code).toBe("CONFLICT");
  });

  it("never leaks unknown errors", () => {
    expect(normalizeError(new Error("connect ECONNREFUSED 10.0.0.1"))).toEqual({
      code: "INTERNAL",
      message: "Something went wrong. Please try again.",
    });
  });
});
