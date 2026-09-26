/**
 * Creates (or with --reset, rotates the password of) the single CMS super admin.
 *
 *   npm run cms:admin                       # username "superadmin"
 *   npm run cms:admin -- --username=alice
 *   npm run cms:admin -- --reset            # rotate the password
 *
 * Prints the generated password once. It is never stored anywhere else.
 */
import { randomInt } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { usernameSchema, usernameToEmail } from "@/server/auth/username";
import { SUPER_ADMIN_ROLE } from "@/server/auth/types";

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%^*-_=+";

function generatePassword(length = 24): string {
  let out = "";
  for (let i = 0; i < length; i++) out += CHARSET[randomInt(CHARSET.length)];
  return out;
}

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  const eq = hit.indexOf("=");
  return eq === -1 ? "true" : hit.slice(eq + 1);
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  const domain = process.env.CMS_ADMIN_EMAIL_DOMAIN ?? "cms.cordinit.com";
  if (!url || !secret) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local");
  }

  const username = usernameSchema.parse(arg("username") ?? "superadmin");
  const email = usernameToEmail(username, domain);
  const reset = arg("reset") === "true";
  const password = generatePassword();

  const admin = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: list, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listError) throw listError;
  const existing = list.users.find((u) => u.email?.toLowerCase() === email);
  const otherAdmins = list.users.filter(
    (u) => u.app_metadata?.role === SUPER_ADMIN_ROLE && u.email?.toLowerCase() !== email,
  );
  if (otherAdmins.length > 0) {
    throw new Error(
      `A different super admin already exists (${otherAdmins.map((u) => u.email).join(", ")}). ` +
        "The CMS supports exactly one super admin.",
    );
  }

  if (existing && !reset) {
    console.log(`Super admin "${username}" already exists. Use --reset to rotate the password.`);
    return;
  }

  if (existing) {
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      app_metadata: { role: SUPER_ADMIN_ROLE },
    });
    if (error) throw error;
  } else {
    const { error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: SUPER_ADMIN_ROLE },
      user_metadata: { username },
    });
    if (error) throw error;
  }

  console.log("\nCMS super admin ready");
  console.log("─────────────────────");
  console.log(`Login URL : /admin/login`);
  console.log(`Username  : ${username}`);
  console.log(`Password  : ${password}`);
  console.log("\nStore it in a password manager now. It will not be shown again.\n");
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
