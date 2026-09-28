import "server-only";
import { createHmac } from "node:crypto";
import { env } from "@/server/env";

const DEV_SALT = "dev-only-leads-ip-salt-not-for-production-use";

export class LeadsConfigError extends Error {}

function salt(): string {
  const configured = env().LEADS_IP_SALT;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new LeadsConfigError("LEADS_IP_SALT is not configured.");
  }
  return DEV_SALT;
}

/** Vercel sets x-forwarded-for with the client first; x-real-ip is the fallback. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

/** Keyed hash so stored values cannot be reversed to an IP by brute-forcing the IPv4 space. */
export function hashIp(ip: string): string {
  return createHmac("sha256", salt()).update(ip).digest("hex");
}
