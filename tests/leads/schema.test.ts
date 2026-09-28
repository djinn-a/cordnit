import { describe, expect, it } from "vitest";
import {
  isLikelyBot,
  leadFieldErrors,
  leadSubmissionSchema,
  validateEnquiryField,
} from "@/lib/leads/schema";

const enquiry = {
  firstName: "Siobhán",
  lastName: "O'Brien-Smith",
  email: "  Jane.Doe@Example.COM ",
  company: "AT&T, Inc.",
  jobTitle: "VP, Engineering",
  helpDetails: "We need help with cloud security.",
  interests: ["Cybersecurity"],
  introCall: true,
  privacy: true,
};

describe("leadSubmissionSchema", () => {
  it("accepts a lead form without a phone and normalises email", () => {
    const result = leadSubmissionSchema.parse({ type: "lead_form", ...enquiry, phone: "" });
    expect(result).toMatchObject({ type: "lead_form", email: "jane.doe@example.com", phone: undefined });
  });

  it("requires a 10-digit phone for contact page leads", () => {
    expect(leadSubmissionSchema.safeParse({ type: "contact", ...enquiry }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ type: "contact", ...enquiry, phone: "12345" }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ type: "contact", ...enquiry, phone: "9876543210" }).success).toBe(true);
  });

  it("requires privacy consent for enquiries and marketing consent for newsletter", () => {
    const noPrivacy = leadSubmissionSchema.safeParse({ type: "lead_form", ...enquiry, privacy: false });
    expect(noPrivacy.success).toBe(false);
    if (!noPrivacy.success) expect(leadFieldErrors(noPrivacy.error)).toHaveProperty("privacy");

    expect(leadSubmissionSchema.safeParse({ type: "newsletter", email: "a@b.co" }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ type: "newsletter", email: "a@b.co", consent: true }).success).toBe(true);
  });

  it("rejects unknown types, invalid emails and oversized fields", () => {
    expect(leadSubmissionSchema.safeParse({ type: "admin", email: "a@b.co" }).success).toBe(false);
    expect(leadSubmissionSchema.safeParse({ type: "newsletter", email: "not-an-email", consent: true }).success).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ type: "lead_form", ...enquiry, helpDetails: "x".repeat(5001) }).success,
    ).toBe(false);
    expect(
      leadSubmissionSchema.safeParse({ type: "lead_form", ...enquiry, interests: Array.from({ length: 21 }, (_, i) => `i${i}`) })
        .success,
    ).toBe(false);
  });

  it("rejects script-like names", () => {
    expect(validateEnquiryField("firstName", "<script>")).toBeTruthy();
    expect(validateEnquiryField("firstName", "Jean-Luc")).toBeNull();
    expect(validateEnquiryField("company", "3M")).toBeNull();
  });

  it("keeps known attribution keys, drops unknown keys and invalid values instead of failing", () => {
    const result = leadSubmissionSchema.parse({
      type: "newsletter",
      email: "a@b.co",
      consent: true,
      attribution: { ctaLocation: "Footer", utmSource: "x".repeat(501), evil: "payload", referrer: 42 },
    });
    expect(result.attribution).toEqual({ ctaLocation: "Footer" });
  });

  it("strips fields that are not part of the lead type", () => {
    const result = leadSubmissionSchema.parse({ type: "newsletter", email: "a@b.co", consent: true, isAdmin: true });
    expect(result).not.toHaveProperty("isAdmin");
  });
});

describe("isLikelyBot", () => {
  it("flags filled honeypots, missing timing and instant submissions", () => {
    expect(isLikelyBot({ hpField: "spam.example", elapsedMs: 10_000 })).toBe(true);
    expect(isLikelyBot({ hpField: "", elapsedMs: undefined })).toBe(true);
    expect(isLikelyBot({ hpField: "", elapsedMs: 500 })).toBe(true);
    expect(isLikelyBot({ hpField: "", elapsedMs: 8_000 })).toBe(false);
  });
});
