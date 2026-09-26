import { z } from "zod";

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Username must be at least 3 characters.")
  .max(40, "Username must be at most 40 characters.")
  .regex(/^[a-z0-9._-]+$/, "Use letters, numbers, dots, dashes or underscores.");

export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters.")
  .max(128, "Password must be at most 128 characters.");

export function usernameToEmail(username: string, domain: string): string {
  return `${username}@${domain}`;
}

export function emailToUsername(email: string): string {
  const at = email.indexOf("@");
  return at > 0 ? email.slice(0, at) : email;
}
