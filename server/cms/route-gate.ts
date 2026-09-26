/**
 * Decides public route outcomes in proxy.ts so they get real HTTP statuses
 * (a streamed page can only soft-404 or client-redirect once its shell is sent).
 *
 * Runs in the proxy bundle: must not import `server-only` modules or `@/server/db`.
 */
import postgres from "postgres";
import { HOME_SLUG, pathSegmentsToSlug, slugToPath } from "@/lib/cms/document";
import { RESERVED_SLUG_ROOTS } from "@/lib/cms/inputs";

export type RedirectStatus = 301 | 302 | 307 | 308;
export type RouteManifest = {
  slugs: ReadonlySet<string>;
  redirects: ReadonlyMap<string, { toPath: string; statusCode: number }>;
};
export type RouteDecision =
  | { kind: "bypass" }
  | { kind: "page" }
  | { kind: "redirect"; location: string; status: RedirectStatus }
  | { kind: "miss" };

const MAX_SLUG_LENGTH = 200;
/** Roots served by their own handlers; the gate never decides for them. */
const BYPASS_ROOTS = new Set(["_next", "api", "admin", "preview"]);
/** Code-owned pages under reserved roots. Any other path under a reserved root is a 404. */
const APP_PAGES = new Set(["/breach", "/privacy", "/cms-404"]);
const REDIRECT_STATUSES = new Set<number>([301, 302, 307, 308]);

const BYPASS: RouteDecision = { kind: "bypass" };
const PAGE: RouteDecision = { kind: "page" };
const MISS: RouteDecision = { kind: "miss" };

const redirectTo = (location: string, status: number): RouteDecision => ({
  kind: "redirect",
  location,
  status: REDIRECT_STATUSES.has(status) ? (status as RedirectStatus) : 308,
});

/** Mirrors the catch-all page's lookup (page first, then redirect) with canonical URLs enforced. */
export function resolveRoute(pathname: string, manifest: RouteManifest): RouteDecision {
  if (pathname === "/") return manifest.slugs.has(HOME_SLUG) ? PAGE : MISS;

  const segments = pathname.slice(1).split("/");
  if (BYPASS_ROOTS.has(segments[0] ?? "") || APP_PAGES.has(pathname)) return BYPASS;
  if (pathname.endsWith("/")) return redirectTo(pathname.replace(/\/+$/, "") || "/", 308);
  if (segments.includes("")) return MISS;

  const slug = pathSegmentsToSlug(segments);
  if (!slug || slug.length > MAX_SLUG_LENGTH) return MISS;
  if ((RESERVED_SLUG_ROOTS as readonly string[]).includes(slug.split("/")[0] ?? "")) return MISS;

  const canonical = slugToPath(slug);
  if (manifest.slugs.has(slug)) return canonical === pathname ? PAGE : redirectTo(canonical, 308);
  const target = manifest.redirects.get(canonical);
  if (target && target.toPath !== pathname) return redirectTo(target.toPath, target.statusCode);
  return MISS;
}

type Snapshot = { manifest: RouteManifest; startedAt: number };

export type RouteGateOptions = {
  loadManifest: () => Promise<RouteManifest>;
  /** Age after which the manifest is revalidated in the background. */
  ttlMs?: number;
  /** Minimum gap between miss-triggered reloads, and the retry delay after a failed load. */
  reloadIntervalMs?: number;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  onError?: (err: unknown) => void;
};

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * In-memory manifest with three guarantees:
 * - a 404 is only answered from data read after the request arrived, so fresh publishes never 404;
 * - miss-triggered reloads are single-flight and at most one per interval: misses in between
 *   wait for the next slot, so 404 scanners cannot flood the database;
 * - any database failure fails open to the page's own handling.
 */
export function createRouteGate({
  loadManifest,
  ttlMs = 30_000,
  reloadIntervalMs = 2_000,
  now = Date.now,
  sleep = defaultSleep,
  onError,
}: RouteGateOptions) {
  let current: Snapshot | null = null;
  let inflight: { startedAt: number; promise: Promise<Snapshot> } | null = null;
  let nextSlot: Promise<Snapshot> | null = null;
  let lastMissReloadAt = Number.NEGATIVE_INFINITY;
  let retryAt = Number.NEGATIVE_INFINITY;

  function fetchSince(minStartedAt: number): Promise<Snapshot> {
    if (inflight && inflight.startedAt >= minStartedAt) return inflight.promise;
    const startedAt = now();
    const promise = loadManifest().then(
      (manifest) => {
        const snapshot = { manifest, startedAt };
        if (!current || current.startedAt <= startedAt) current = snapshot;
        return snapshot;
      },
      (err: unknown) => {
        retryAt = now() + reloadIntervalMs;
        onError?.(err);
        throw err;
      },
    );
    const entry = { startedAt, promise };
    inflight = entry;
    void promise.then(
      () => void (inflight === entry && (inflight = null)),
      () => void (inflight === entry && (inflight = null)),
    );
    return promise;
  }

  async function snapshotFor(arrivedAt: number): Promise<Snapshot | null> {
    if (current) {
      if (arrivedAt - current.startedAt >= ttlMs && arrivedAt >= retryAt) {
        fetchSince(arrivedAt - ttlMs).catch(() => {});
      }
      return current;
    }
    if (arrivedAt < retryAt) return null;
    return fetchSince(Number.NEGATIVE_INFINITY).catch(() => null);
  }

  /** A snapshot whose load started at or after `arrivedAt`, loading at most once per interval. */
  function freshSince(arrivedAt: number): Promise<Snapshot> {
    if (inflight && inflight.startedAt >= arrivedAt) return inflight.promise;
    if (nextSlot) return nextSlot;
    const wait = lastMissReloadAt + reloadIntervalMs - now();
    const start = () => {
      nextSlot = null;
      lastMissReloadAt = now();
      return fetchSince(lastMissReloadAt);
    };
    if (wait <= 0) return start();
    nextSlot = sleep(wait).then(start);
    return nextSlot;
  }

  return async function resolve(pathname: string): Promise<RouteDecision> {
    const arrivedAt = now();
    const snapshot = await snapshotFor(arrivedAt);
    if (!snapshot) return BYPASS;
    const decision = resolveRoute(pathname, snapshot.manifest);
    if (decision.kind !== "miss" || snapshot.startedAt >= arrivedAt) return decision;
    if (arrivedAt < retryAt) return BYPASS;
    try {
      return resolveRoute(pathname, (await freshSince(arrivedAt)).manifest);
    } catch {
      return BYPASS;
    }
  };
}

const globalForGate = globalThis as unknown as { __cmsRouteSql?: postgres.Sql };

async function loadManifestFromDb(): Promise<RouteManifest> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = (globalForGate.__cmsRouteSql ??= postgres(url, {
    // Supavisor transaction mode does not support prepared statements.
    prepare: false,
    max: 2,
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {},
  }));
  const [pages, redirects] = await Promise.all([
    sql<{ slug: string }[]>`select slug from cms.published_pages`,
    sql<{ from_path: string; to_path: string; status_code: number }[]>`select from_path, to_path, status_code from cms.redirects`,
  ]);
  return {
    slugs: new Set(pages.map((p) => p.slug)),
    redirects: new Map(redirects.map((r) => [r.from_path, { toPath: r.to_path, statusCode: r.status_code }])),
  };
}

let gate: ReturnType<typeof createRouteGate> | undefined;

/** Process-wide gate backed by its own two-connection pool. */
export function routeGate(onError: (err: unknown) => void) {
  return (gate ??= createRouteGate({ loadManifest: loadManifestFromDb, onError }));
}
