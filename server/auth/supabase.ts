import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { connection } from "next/server";
import { env } from "@/server/env";
import { AppError, errors } from "@/server/errors";
import { logger } from "@/server/logger";
import { SUPER_ADMIN_ROLE, type AdminSession, type AuthProvider } from "./types";
import { emailToUsername, usernameToEmail } from "./username";

async function supabaseServerClient() {
  // Session checks read the clock (token expiry), so they must never run in a prerender.
  await connection();
  const cookieStore = await cookies();
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } = env();
  return createServerClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) cookieStore.set(name, value, options);
        } catch {
          // Server Components cannot set cookies; proxy.ts refreshes the session instead.
        }
      },
    },
  });
}

function toSession(claims: Record<string, unknown> | null | undefined): AdminSession | null {
  if (!claims) return null;
  const sub = typeof claims.sub === "string" ? claims.sub : null;
  const email = typeof claims.email === "string" ? claims.email : null;
  const appMeta = (claims.app_metadata ?? {}) as { role?: unknown };
  if (!sub || !email || appMeta.role !== SUPER_ADMIN_ROLE) return null;
  return { userId: sub, email, username: emailToUsername(email), role: SUPER_ADMIN_ROLE };
}

export const supabaseAuthProvider: AuthProvider = {
  async getSession() {
    try {
      const supabase = await supabaseServerClient();
      // Verified locally against the project's JWKS (asymmetric keys): no network hop.
      const { data, error } = await supabase.auth.getClaims();
      if (error || !data) return null;
      return toSession(data.claims as Record<string, unknown>);
    } catch (err) {
      unstable_rethrow(err);
      logger.warn("auth.getSession failed", { err });
      return null;
    }
  },

  async signIn(username, password) {
    const supabase = await supabaseServerClient();
    const email = usernameToEmail(username, env().CMS_ADMIN_EMAIL_DOMAIN);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.status === 429) {
        throw new AppError("RATE_LIMITED", "Too many attempts. Wait a minute and try again.");
      }
      throw errors.unauthenticated("Invalid username or password.");
    }
    const session = toSession({
      sub: data.user.id,
      email: data.user.email,
      app_metadata: data.user.app_metadata,
    });
    if (!session) {
      await supabase.auth.signOut();
      throw errors.forbidden("This account is not allowed to use the CMS.");
    }
    return session;
  },

  async signOut() {
    const supabase = await supabaseServerClient();
    await supabase.auth.signOut();
  },

  async changePassword(currentPassword, newPassword) {
    const session = await this.getSession();
    if (!session) throw errors.unauthenticated();
    const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } = env();
    // Re-authenticate on an isolated client so a wrong password never touches the live session.
    const verifier = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error: verifyError } = await verifier.auth.signInWithPassword({
      email: session.email,
      password: currentPassword,
    });
    if (verifyError) {
      throw errors.validation("Current password is incorrect.", {
        currentPassword: ["Current password is incorrect."],
      });
    }
    const supabase = await supabaseServerClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      throw errors.validation(error.message, { newPassword: [error.message] });
    }
  },
};
