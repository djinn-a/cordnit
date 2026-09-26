import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routeGate } from "@/server/cms/route-gate";

/**
 * Two jobs, split by path:
 * - /admin and /preview: refresh the Supabase session cookie and bounce anonymous visitors to login.
 *   Every page and action re-checks the role server-side; this is not the only gate.
 * - Public pages: answer CMS redirects and unknown URLs with real 3xx/404 statuses,
 *   which a streamed page cannot do once its shell is sent.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isCmsPath(pathname)) return authGate(request);
  // Server Function POSTs reuse page paths; they are answered by the page itself.
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  return publicGate(request);
}

function isCmsPath(pathname: string) {
  return /^\/(admin|preview)(\/|$)/.test(pathname);
}

const logGateError = (err: unknown) =>
  console.error(
    JSON.stringify({
      level: "error",
      msg: "route-gate.load failed; serving pages without the gate",
      time: new Date().toISOString(),
      err: err instanceof Error ? { name: err.name, message: err.message } : String(err),
    }),
  );

async function publicGate(request: NextRequest) {
  const decision = await routeGate(logGateError)(request.nextUrl.pathname);
  switch (decision.kind) {
    case "redirect": {
      const target = new URL(decision.location, request.url);
      const internal = decision.location.startsWith("/") && !decision.location.startsWith("//");
      if (internal && !target.search) target.search = request.nextUrl.search;
      return NextResponse.redirect(target, decision.status);
    }
    case "miss": {
      const notFound = request.nextUrl.clone();
      notFound.pathname = "/cms-404";
      notFound.search = "";
      return NextResponse.rewrite(notFound);
    }
    default:
      return NextResponse.next();
  }
}

async function authGate(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return new NextResponse("CMS authentication is not configured.", { status: 503 });
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
      },
    },
  });

  let isAuthenticated = false;
  try {
    const { data } = await supabase.auth.getClaims();
    isAuthenticated = Boolean(data?.claims?.sub);
  } catch {
    isAuthenticated = false;
  }

  const { pathname, search } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!isAuthenticated && !isLogin) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    if (pathname !== "/admin") loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthenticated && isLogin) {
    const home = request.nextUrl.clone();
    home.pathname = "/admin";
    home.search = "";
    return NextResponse.redirect(home);
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  // Every page path; skips Next internals, API routes and files with an extension.
  matcher: ["/((?!_next/|api/|.*\\.\\w+$).*)"],
};
