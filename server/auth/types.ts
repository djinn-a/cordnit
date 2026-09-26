export const SUPER_ADMIN_ROLE = "super_admin" as const;

export type AdminSession = {
  userId: string;
  email: string;
  username: string;
  role: typeof SUPER_ADMIN_ROLE;
};

/**
 * Swappable identity backend. Supabase Auth today; Cognito or self-managed
 * sessions on AWS later. Nothing outside server/auth depends on Supabase.
 */
export interface AuthProvider {
  getSession(): Promise<AdminSession | null>;
  signIn(username: string, password: string): Promise<AdminSession>;
  signOut(): Promise<void>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
}
