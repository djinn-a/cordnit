import { NextResponse, type NextRequest } from 'next/server';
import { PUBLIC_ROUTES, ALWAYS_ALLOW_PREFIXES } from '@/lib/config/launch-routes';

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAlwaysAllowed = ALWAYS_ALLOW_PREFIXES.some(p => pathname.startsWith(p));
  const isPublicRoute = (PUBLIC_ROUTES as readonly string[]).includes(pathname);

  if (isAlwaysAllowed || isPublicRoute) {
    return NextResponse.next();
  }

  const res = NextResponse.rewrite(new URL('/under-development', req.url));
  // Belt-and-suspenders: even though robots.txt disallows these paths,
  // tag the response so any crawler that does fetch it gets a clear signal.
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
