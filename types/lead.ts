export interface WebsiteLead {
  // Personal & Company Information
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;

  // Enquiry Details
  interests: string[];
  helpDetails: string;

  // Consent & Preferences
  introCall: boolean;
  privacy: boolean;

  // Attribution / Context Data (Optional)
  source?: string | null;
  landingPage?: string | null;
  ctaLocation?: string | null;
  solution?: string | null;
  service?: string | null;
  industry?: string | null;
  accelerator?: string | null;
  insight?: string | null;
  content?: string | null;
  
  // UTM Parameters (Optional)
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  referrer?: string | null;

  // Timestamps (Optional)
  submissionDateTime?: string | null;
  bookingDateTime?: string | null;
}
