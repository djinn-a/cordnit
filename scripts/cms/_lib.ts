import { createClient } from "@supabase/supabase-js";
import { SUPER_ADMIN_ROLE } from "@/server/auth/types";

export function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  const eq = hit.indexOf("=");
  return eq === -1 ? "true" : hit.slice(eq + 1);
}

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local");
  }
  return createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** The single super admin's user id, used as the audit actor for scripted changes. */
export async function superAdminId(): Promise<string> {
  const { data, error } = await supabaseAdmin().auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) throw error;
  const admin = data.users.find((u) => u.app_metadata?.role === SUPER_ADMIN_ROLE);
  if (!admin) throw new Error("No super admin found. Run `npm run cms:admin` first.");
  return admin.id;
}

/** Best-effort cache purge on a running site; seeding still succeeds if it is offline. */
export async function purgeSiteCache(tags: string[]): Promise<void> {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!site || !secret || tags.length === 0) return;
  try {
    const res = await fetch(new URL("/api/revalidate", site), {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
      body: JSON.stringify({ tags }),
      signal: AbortSignal.timeout(5000),
    });
    console.log(res.ok ? `Purged ${tags.length} cache tags on ${site}` : `Cache purge returned ${res.status}`);
  } catch {
    console.log(`Site ${site} not reachable; skipped cache purge (fresh deploys start with an empty cache).`);
  }
}
