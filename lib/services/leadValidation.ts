import { WebsiteLead } from '@/types/lead';

/** Strictly typed interface for the incoming API payload */
export interface LeadSubmissionDTO {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  helpDetails: string;
  interests: string[];
  introCall: boolean;
  privacy: boolean;
  
  submissionId?: string;
  bookingDateTime?: string;
  source?: string;
  landingPage?: string;
  ctaLocation?: string;
  solution?: string;
  service?: string;
  industry?: string;
  accelerator?: string;
  insight?: string;
  content?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
}

// Helper for safe truncation and normalization
const trimAndLimit = (str: unknown, maxLength: number): string => {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
};

/** Type guard to check if an unknown error is an instance of Error */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * Validates the raw request payload at runtime to ensure it adheres to the LeadSubmissionDTO.
 * Strips unknown properties and enforces strict types and length limits.
 */
export function validateLeadPayload(raw: unknown): { isValid: boolean; data?: WebsiteLead; error?: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { isValid: false, error: 'Invalid JSON payload. Must be an object.' };
  }

  // Typecast to a generic record to safely access properties at runtime
  const record = raw as Record<string, unknown>;

  const firstName = trimAndLimit(record.firstName, 50);
  const lastName = trimAndLimit(record.lastName, 50);
  const email = trimAndLimit(record.email, 255);
  const company = trimAndLimit(record.company, 100);
  const jobTitle = trimAndLimit(record.jobTitle, 100);
  const phone = trimAndLimit(record.phone, 15);
  const helpDetails = trimAndLimit(record.helpDetails, 2000);
  
  if (!firstName || !lastName || !email || !company || !helpDetails) {
    return { isValid: false, error: 'Missing required fields.' };
  }
  
  // Basic email structure validation
  if (!/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) {
    return { isValid: false, error: 'Invalid email format.' };
  }

  let interests: string[] = [];
  if (Array.isArray(record.interests)) {
    interests = record.interests
      .filter((i: unknown) => typeof i === 'string')
      .map((i: string) => trimAndLimit(i, 50))
      .slice(0, 20); // Cap at 20 interests
  }
  if (interests.length === 0) {
    return { isValid: false, error: 'At least one interest must be selected.' };
  }

  // Construct a strict, normalized object ignoring any malicious/unknown fields
  const validatedLead: WebsiteLead = {
    firstName,
    lastName,
    email,
    company,
    jobTitle,
    phone,
    helpDetails,
    interests,
    introCall: Boolean(record.introCall),
    privacy: Boolean(record.privacy),
    
    // Tracking and optional metadata (bounded)
    submissionId: trimAndLimit(record.submissionId, 50),
    bookingDateTime: trimAndLimit(record.bookingDateTime, 100) || null,
    source: trimAndLimit(record.source, 100) || null,
    landingPage: trimAndLimit(record.landingPage, 255) || null,
    ctaLocation: trimAndLimit(record.ctaLocation, 100) || null,
    solution: trimAndLimit(record.solution, 100) || null,
    service: trimAndLimit(record.service, 100) || null,
    industry: trimAndLimit(record.industry, 100) || null,
    accelerator: trimAndLimit(record.accelerator, 100) || null,
    insight: trimAndLimit(record.insight, 100) || null,
    content: trimAndLimit(record.content, 100) || null,
    utmSource: trimAndLimit(record.utmSource, 100) || null,
    utmMedium: trimAndLimit(record.utmMedium, 100) || null,
    utmCampaign: trimAndLimit(record.utmCampaign, 100) || null,
    utmContent: trimAndLimit(record.utmContent, 100) || null,
    referrer: trimAndLimit(record.referrer, 255) || null,
  };

  return { isValid: true, data: validatedLead };
}
