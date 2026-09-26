import "server-only";
import { redirect } from "next/navigation";
import { errors } from "@/server/errors";
import { supabaseAuthProvider } from "./supabase";
import type { AdminSession, AuthProvider } from "./types";

export const auth: AuthProvider = supabaseAuthProvider;

export async function getAdminSession(): Promise<AdminSession | null> {
  return auth.getSession();
}

/** For server actions and route handlers: throws a typed UNAUTHENTICATED error. */
export async function requireSuperAdmin(): Promise<AdminSession> {
  const session = await auth.getSession();
  if (!session) throw errors.unauthenticated();
  return session;
}

/** For admin pages and layouts: redirects to the login screen. */
export async function requireSuperAdminPage(): Promise<AdminSession> {
  const session = await auth.getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export type { AdminSession } from "./types";
