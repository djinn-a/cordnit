const ADMIN_PATH = /^\/admin(\/[\w\-/]*)?(\?[\w\-=&%]*)?$/;

/** Only same-app admin paths are allowed as post-login targets (no open redirects). */
export function safeNext(next: unknown): string {
  if (typeof next !== "string") return "/admin";
  return ADMIN_PATH.test(next) && !next.startsWith("/admin/login") ? next : "/admin";
}
