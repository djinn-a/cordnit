import { describe, expect, it, vi } from "vitest";
import { createRouteGate, resolveRoute, type RouteManifest } from "@/server/cms/route-gate";

const manifest = (slugs: string[], redirects: Record<string, [string, number]> = {}): RouteManifest => ({
  slugs: new Set(slugs),
  redirects: new Map(Object.entries(redirects).map(([from, [toPath, statusCode]]) => [from, { toPath, statusCode }])),
});

const site = manifest(["home", "aboutus", "cybersecurity/cloud-security"], {
  "/old-301": ["/aboutus", 301],
  "/old-302": ["/aboutus", 302],
  "/old-307": ["/aboutus", 307],
  "/old-308": ["/aboutus", 308],
  "/weird": ["/aboutus", 399],
  "/external": ["https://example.com/x", 308],
  "/loop": ["/loop", 308],
});

describe("resolveRoute", () => {
  it.each([
    ["/", "page"],
    ["/aboutus", "page"],
    ["/cybersecurity/cloud-security", "page"],
    ["/does-not-exist", "miss"],
    ["/cybersecurity/nope", "miss"],
  ])("%s -> %s", (path, kind) => {
    expect(resolveRoute(path, site).kind).toBe(kind);
  });

  it("returns a miss for / when home is not published", () => {
    expect(resolveRoute("/", manifest(["aboutus"])).kind).toBe("miss");
  });

  it.each([301, 302, 307, 308] as const)("serves a stored %i redirect with its status", (status) => {
    expect(resolveRoute(`/old-${status}`, site)).toEqual({ kind: "redirect", location: "/aboutus", status });
  });

  it("falls back to 308 for an unexpected stored status and keeps external targets", () => {
    expect(resolveRoute("/weird", site)).toMatchObject({ status: 308 });
    expect(resolveRoute("/external", site)).toMatchObject({ location: "https://example.com/x" });
  });

  it("never redirects a path to itself", () => {
    expect(resolveRoute("/loop", site).kind).toBe("miss");
  });

  it("prefers a published page over a redirect with the same path", () => {
    expect(resolveRoute("/aboutus", manifest(["aboutus"], { "/aboutus": ["/x", 308] })).kind).toBe("page");
  });

  it.each([
    ["/AboutUs", "/aboutus"],
    ["/about%75s", "/aboutus"],
    ["/home", "/"],
    ["/Cybersecurity/Cloud-Security", "/cybersecurity/cloud-security"],
  ])("redirects non-canonical %s to %s", (path, location) => {
    expect(resolveRoute(path, site)).toEqual({ kind: "redirect", location, status: 308 });
  });

  it("resolves an uppercase redirect source in one hop", () => {
    expect(resolveRoute("/OLD-307", site)).toEqual({ kind: "redirect", location: "/aboutus", status: 307 });
  });

  it("strips trailing slashes", () => {
    expect(resolveRoute("/aboutus/", site)).toEqual({ kind: "redirect", location: "/aboutus", status: 308 });
    expect(resolveRoute("/aboutus//", site)).toMatchObject({ location: "/aboutus" });
  });

  it.each(["/admin", "/admin/pages/1", "/preview/abc", "/api/health", "/breach", "/privacy", "/cms-404"])(
    "bypasses code-owned route %s",
    (path) => {
      expect(resolveRoute(path, site).kind).toBe("bypass");
    },
  );

  it.each(["/studio", "/breach/extra", "/privacy/x", "/Breach", "/cms-404/x", "/a//b", "/bad%E0%A4%A"])(
    "misses %s",
    (path) => {
      expect(resolveRoute(path, site).kind).toBe("miss");
    },
  );

  it("misses slugs longer than 200 characters even if listed", () => {
    const long = "a".repeat(201);
    expect(resolveRoute(`/${long}`, manifest([long])).kind).toBe("miss");
    const max = "a".repeat(200);
    expect(resolveRoute(`/${max}`, manifest([max])).kind).toBe("page");
  });
});

function setup(initial: RouteManifest = site) {
  let clock = 1_000_000;
  let next: RouteManifest | Error = initial;
  const loadManifest = vi.fn(async () => {
    if (next instanceof Error) throw next;
    return next;
  });
  const onError = vi.fn();
  const sleep = vi.fn(async (ms: number) => {
    await new Promise((r) => setTimeout(r, 0));
    clock += ms;
  });
  const resolve = createRouteGate({ loadManifest, now: () => clock, sleep, onError, ttlMs: 30_000, reloadIntervalMs: 2_000 });
  return {
    resolve,
    loadManifest,
    onError,
    sleep,
    tick: (ms: number) => (clock += ms),
    serve: (m: RouteManifest | Error) => (next = m),
  };
}

describe("createRouteGate", () => {
  it("reuses the manifest within the TTL", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(10_000);
    await g.resolve("/aboutus");
    await g.resolve("/");
    expect(g.loadManifest).toHaveBeenCalledTimes(1);
  });

  it("serves the stale manifest after the TTL while revalidating in the background", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(31_000);
    g.serve(manifest(["home"]));
    expect((await g.resolve("/aboutus")).kind).toBe("page");
    expect(g.loadManifest).toHaveBeenCalledTimes(2);
    await new Promise((r) => setTimeout(r, 0));
    expect((await g.resolve("/aboutus")).kind).not.toBe("page");
  });

  it("re-checks the database once before answering a miss, so fresh publishes are served", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(5_000);
    g.serve(manifest(["home", "aboutus", "new-page"]));
    expect((await g.resolve("/new-page")).kind).toBe("page");
    expect(g.loadManifest).toHaveBeenCalledTimes(2);
  });

  it("answers a miss from the first load without reloading again", async () => {
    const g = setup();
    expect((await g.resolve("/nope")).kind).toBe("miss");
    expect(g.loadManifest).toHaveBeenCalledTimes(1);
  });

  it("shares one reload between concurrent misses", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(5_000);
    const results = await Promise.all(["/a", "/b", "/c", "/d"].map((p) => g.resolve(p)));
    expect(results.map((r) => r.kind)).toEqual(["miss", "miss", "miss", "miss"]);
    expect(g.loadManifest).toHaveBeenCalledTimes(2);
  });

  it("throttles miss reloads: misses inside the interval share the next slot", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(5_000);
    expect((await g.resolve("/a")).kind).toBe("miss");
    expect(g.loadManifest).toHaveBeenCalledTimes(2);
    g.tick(500);
    g.serve(manifest(["home", "published-meanwhile"]));
    const [b, c, fresh] = await Promise.all([g.resolve("/b"), g.resolve("/c"), g.resolve("/published-meanwhile")]);
    expect([b.kind, c.kind, fresh.kind]).toEqual(["miss", "miss", "page"]);
    expect(g.sleep).toHaveBeenCalledTimes(1);
    expect(g.sleep).toHaveBeenCalledWith(1_500);
    expect(g.loadManifest).toHaveBeenCalledTimes(3);
    g.tick(2_000);
    expect((await g.resolve("/d")).kind).toBe("miss");
    expect(g.loadManifest).toHaveBeenCalledTimes(4);
    expect(g.sleep).toHaveBeenCalledTimes(1);
  });

  it("fails open when the first load fails, and backs off before retrying", async () => {
    const g = setup();
    g.serve(new Error("ECONNREFUSED"));
    expect((await g.resolve("/aboutus")).kind).toBe("bypass");
    expect((await g.resolve("/nope")).kind).toBe("bypass");
    expect(g.loadManifest).toHaveBeenCalledTimes(1);
    expect(g.onError).toHaveBeenCalledTimes(1);
    g.tick(2_000);
    g.serve(site);
    expect((await g.resolve("/aboutus")).kind).toBe("page");
    expect(g.loadManifest).toHaveBeenCalledTimes(2);
  });

  it("keeps serving known routes but never 404s while the database is down", async () => {
    const g = setup();
    await g.resolve("/aboutus");
    g.tick(5_000);
    g.serve(new Error("timeout"));
    expect((await g.resolve("/nope")).kind).toBe("bypass");
    expect((await g.resolve("/aboutus")).kind).toBe("page");
    expect((await g.resolve("/old-308")).kind).toBe("redirect");
    expect(g.onError).toHaveBeenCalledTimes(1);
  });
});
