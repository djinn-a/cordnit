import type { LeadAttribution, LeadType } from "@/lib/leads/schema";

export type LeadView = {
  id: string;
  type: LeadType;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  jobTitle: string | null;
  phone: string | null;
  message: string | null;
  interests: string[];
  introCall: boolean;
  privacyConsent: boolean;
  bookingAt: string | null;
  attribution: LeadAttribution;
  userAgent: string | null;
  createdAt: string;
};

export type LeadFiltersView = {
  type?: LeadType;
  q?: string;
  from?: string;
  to?: string;
  page: number;
  pageSize: number;
};

export const LEAD_TYPE_COLORS: Record<LeadType, string> = {
  lead_form: "blue",
  contact: "purple",
  newsletter: "green",
};

export function leadName(lead: Pick<LeadView, "firstName" | "lastName">): string {
  return [lead.firstName, lead.lastName].filter(Boolean).join(" ");
}
