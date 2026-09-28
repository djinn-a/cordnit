import { z } from "zod";

export const LEAD_TYPES = ["lead_form", "contact", "newsletter"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  lead_form: "Lead form",
  contact: "Contact page",
  newsletter: "Newsletter",
};

export const ATTRIBUTION_KEYS = [
  "source",
  "landingPage",
  "ctaLocation",
  "solution",
  "service",
  "industry",
  "accelerator",
  "insight",
  "content",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "referrer",
] as const;
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type LeadAttribution = Partial<Record<AttributionKey, string>>;

export const LEAD_LIMITS = {
  name: 100,
  org: 200,
  email: 254,
  message: 5000,
  interest: 100,
  interests: 20,
  booking: 100,
  attribution: 500,
} as const;

/** Letters (any script), spaces, apostrophes and hyphens: "O'Brien", "Jean-Luc". */
export const PERSON_NAME_REGEX = /^[\p{L}][\p{L}\p{M} '’-]*$/u;
/** Also allows digits and common company punctuation: "3M", "AT&T", "Acme, Inc." */
export const ORG_NAME_REGEX = /^[\p{L}\p{N}][\p{L}\p{M}\p{N} &.,'’()/+-]*$/u;
export const PHONE_REGEX = /^\d{10}$/;

const required = (label: string, max: number, pattern: RegExp, patternMessage: string) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(1, `Please enter your ${label}.`)
    .max(max, `Please keep this under ${max} characters.`)
    .regex(pattern, patternMessage);

export const emailSchema = z
  .string({ error: "Please enter your email address." })
  .trim()
  .toLowerCase()
  .min(1, "Please enter your email address.")
  .max(LEAD_LIMITS.email, "Please enter a valid email address.")
  .pipe(z.email("Please enter a valid email address."));

const phoneSchema = z
  .string({ error: "Please enter a 10-digit number." })
  .trim()
  .regex(PHONE_REGEX, "Please enter a 10-digit number.");

const blankToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

/** Attribution must never block a real lead, so invalid values are dropped, not rejected. */
const attributionValue = z
  .string()
  .trim()
  .min(1)
  .max(LEAD_LIMITS.attribution)
  .optional()
  .catch(undefined);

export const attributionSchema = z
  .object(
    Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, attributionValue])) as Record<
      AttributionKey,
      typeof attributionValue
    >,
  )
  .catch({})
  .transform((value) => {
    const clean: LeadAttribution = {};
    for (const key of ATTRIBUTION_KEYS) {
      const v = value[key];
      if (v) clean[key] = v;
    }
    return clean;
  });

/** Per-field schemas so forms can validate on blur with the exact server rules. */
export const enquiryFieldSchemas = {
  firstName: required("first name", LEAD_LIMITS.name, PERSON_NAME_REGEX, "Only letters, spaces, apostrophes and hyphens are allowed."),
  lastName: required("last name", LEAD_LIMITS.name, PERSON_NAME_REGEX, "Only letters, spaces, apostrophes and hyphens are allowed."),
  email: emailSchema,
  company: required("company name", LEAD_LIMITS.org, ORG_NAME_REGEX, "Please enter a valid company name."),
  jobTitle: required("job title", LEAD_LIMITS.org, ORG_NAME_REGEX, "Please enter a valid job title."),
  phone: phoneSchema,
  helpDetails: z
    .string({ error: "Please tell us about your requirement." })
    .trim()
    .min(1, "Please tell us about your requirement.")
    .max(LEAD_LIMITS.message, `Please keep this under ${LEAD_LIMITS.message} characters.`),
  interests: z
    .array(z.string().trim().min(1).max(LEAD_LIMITS.interest), { error: "Please select an area of interest." })
    .min(1, "Please select an area of interest.")
    .max(LEAD_LIMITS.interests, "Too many areas selected."),
  introCall: z.boolean().default(false),
  privacy: z.literal(true, { error: "Required." }),
} as const;

export type EnquiryField = keyof typeof enquiryFieldSchemas;

const enquiryShape = {
  ...enquiryFieldSchemas,
  bookingDateTime: z.preprocess(
    blankToUndefined,
    z.string().trim().max(LEAD_LIMITS.booking).optional(),
  ),
  attribution: attributionSchema.default({}),
};

export const leadFormSubmissionSchema = z.object({
  type: z.literal("lead_form"),
  ...enquiryShape,
  phone: z.preprocess(blankToUndefined, phoneSchema.optional()),
});

export const contactSubmissionSchema = z.object({
  type: z.literal("contact"),
  ...enquiryShape,
});

export const newsletterSubmissionSchema = z.object({
  type: z.literal("newsletter"),
  email: emailSchema,
  consent: z.literal(true, { error: "Please confirm you'd like to receive updates." }),
  attribution: attributionSchema.default({}),
});

export const leadSubmissionSchema = z.discriminatedUnion("type", [
  leadFormSubmissionSchema,
  contactSubmissionSchema,
  newsletterSubmissionSchema,
]);

export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;

/** Anti-bot signals sent alongside every submission; checked before validation. */
export const botSignalsSchema = z.object({
  /** Deliberately not "website"/"url": browser autofill must never fill the honeypot for real users. */
  hpField: z.string().max(500).optional().catch(undefined),
  /** Measured client-side with a monotonic clock, so client/server clock skew cannot drop real leads. */
  elapsedMs: z.number().nonnegative().optional().catch(undefined),
});
export type BotSignals = z.infer<typeof botSignalsSchema>;

export const MIN_FILL_TIME_MS = 3000;

export function isLikelyBot(signals: BotSignals): boolean {
  if (signals.hpField && signals.hpField.trim() !== "") return true;
  if (signals.elapsedMs === undefined) return true;
  return signals.elapsedMs < MIN_FILL_TIME_MS;
}

/** First message per top-level field, keyed by field name. */
export function leadFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

export function validateEnquiryField(name: EnquiryField, value: unknown): string | null {
  const result = enquiryFieldSchemas[name].safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? "Invalid value.");
}
