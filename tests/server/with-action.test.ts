import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { errors } from "@/server/errors/app-error";

const auth = vi.hoisted(() => ({ requireSuperAdmin: vi.fn() }));
const logger = vi.hoisted(() => ({ error: vi.fn(), warn: vi.fn(), info: vi.fn() }));
const cache = vi.hoisted(() => ({ refresh: vi.fn() }));
vi.mock("@/server/auth", () => auth);
vi.mock("@/server/logger", () => ({ logger }));
vi.mock("next/cache", () => cache);

const { withAction } = await import("@/server/actions/with-action");
const { isNavigation } = await import("@/components/cms/hooks/is-navigation");

const session = { userId: "u1", email: "superadmin@cms.local", username: "superadmin", role: "super_admin" };
const schema = z.object({ n: z.number(), secret: z.string().optional() });
const handler = async ({ n }: z.output<typeof schema>) => {
  if (n < 0) throw errors.staleWrite();
  if (n === 0) throw new Error("boom");
  return n * 2;
};

beforeEach(() => {
  vi.clearAllMocks();
  auth.requireSuperAdmin.mockResolvedValue(session);
});

describe("withAction", () => {
  const action = withAction("test", schema, handler);

  it("returns data on success and re-renders the calling route once", async () => {
    expect(await action({ n: 2 })).toEqual({ ok: true, data: 4 });
    expect(cache.refresh).toHaveBeenCalledTimes(1);
  });

  it("rejects invalid input before running the handler, without refreshing", async () => {
    const result = await action({ n: "x" } as never);
    expect(result).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { n: [expect.any(String)] } } });
    expect(cache.refresh).not.toHaveBeenCalled();
  });

  it("maps thrown AppErrors and unknown errors, without refreshing", async () => {
    expect(await action({ n: -1 })).toMatchObject({ ok: false, error: { code: "STALE" } });
    expect(await action({ n: 0 })).toMatchObject({ ok: false, error: { code: "INTERNAL" } });
    expect(cache.refresh).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith("action.failed", expect.objectContaining({ code: "STALE" }));
    expect(logger.error).toHaveBeenCalledWith("action.failed", expect.objectContaining({ code: "INTERNAL" }));
  });

  it("refuses unauthenticated callers", async () => {
    auth.requireSuperAdmin.mockRejectedValue(errors.unauthenticated());
    expect(await action({ n: 1 })).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
  });

  it("never logs action arguments", async () => {
    await action({ n: 2, secret: "hunter2" });
    await action({ n: 0, secret: "hunter2" });
    const logged = JSON.stringify([...logger.info.mock.calls, ...logger.warn.mock.calls, ...logger.error.mock.calls]);
    expect(logged).not.toContain("hunter2");
  });

  it("skips the re-render when refresh is disabled", async () => {
    const quiet = withAction("quiet", schema, handler, { refresh: false });
    expect(await quiet({ n: 2 })).toEqual({ ok: true, data: 4 });
    expect(cache.refresh).not.toHaveBeenCalled();
  });

  it("redirects after success instead of refreshing", async () => {
    const redirecting = withAction("redirecting", schema, handler, { redirectTo: (d) => `/admin/pages/${d}` });
    const err = await redirecting({ n: 3 }).catch((e: unknown) => e);
    expect(isNavigation(err)).toBe(true);
    expect((err as { digest: string }).digest).toContain("/admin/pages/6");
    expect(cache.refresh).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith("action.ok", expect.objectContaining({ action: "redirecting" }));
  });

  it("does not redirect when the handler fails", async () => {
    const redirecting = withAction("redirecting", schema, handler, { redirectTo: () => "/admin" });
    expect(await redirecting({ n: -1 })).toMatchObject({ ok: false, error: { code: "STALE" } });
  });
});

describe("isNavigation", () => {
  it("is false for ordinary errors", () => {
    expect(isNavigation(new Error("network"))).toBe(false);
    expect(isNavigation(undefined)).toBe(false);
  });
});
