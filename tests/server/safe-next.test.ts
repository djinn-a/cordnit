import { describe, expect, it } from "vitest";
import { safeNext } from "@/server/auth/safe-next";

describe("safeNext", () => {
  it.each(["/admin", "/admin/pages/abc-123", "/admin/activity?page=2"])("keeps admin path %s", (path) => {
    expect(safeNext(path)).toBe(path);
  });

  it.each([
    undefined,
    null,
    42,
    "",
    "/",
    "/about",
    "https://evil.example/admin",
    "//evil.example/admin",
    "/admin/../etc",
    "/administrator",
    "/admin\\evil",
    "/admin/login",
    "/admin/login?next=/admin",
  ])("falls back to /admin for %s", (value) => {
    expect(safeNext(value)).toBe("/admin");
  });
});
