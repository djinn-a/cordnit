import {
  ATTRIBUTION_KEYS,
  type AttributionKey,
  type BotSignals,
  type LeadAttribution,
  type LeadSubmissionInput,
} from "./schema";

const STORAGE_KEY = "cordinit:lead-attribution";
const UTM_PARAMS: Record<string, AttributionKey> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
};
const MAX_VALUE_LENGTH = 500;

function readStored(): LeadAttribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadAttribution) : {};
  } catch {
    return {};
  }
}

function writeStored(value: LeadAttribution) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, quota); attribution is best-effort.
  }
}

const clip = (value: string) => value.slice(0, MAX_VALUE_LENGTH);

/**
 * Records first-touch landing page and external referrer once per session, and the
 * latest UTM parameters whenever the URL carries them. Safe to call on every navigation.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const stored = readStored();
  const next: LeadAttribution = { ...stored };

  if (!next.landingPage) next.landingPage = clip(window.location.pathname + window.location.search);
  if (!next.referrer && document.referrer) {
    try {
      if (new URL(document.referrer).origin !== window.location.origin) {
        next.referrer = clip(document.referrer);
      }
    } catch {
      // Ignore malformed referrers.
    }
  }

  const params = new URLSearchParams(window.location.search);
  const hasUtm = Object.keys(UTM_PARAMS).some((p) => params.has(p));
  if (hasUtm) {
    for (const [param, key] of Object.entries(UTM_PARAMS)) {
      const value = params.get(param);
      if (value) next[key] = clip(value);
      else delete next[key];
    }
  }

  writeStored(next);
}

type LeadContext = Record<string, string | boolean | null | undefined>;

/** Merges stored session attribution with call-site context, keeping only known keys. */
export function buildAttribution(context: LeadContext = {}): LeadAttribution {
  const merged: LeadAttribution = { ...readStored() };
  for (const key of ATTRIBUTION_KEYS) {
    const value = context[key];
    if (typeof value === "string" && value.trim()) merged[key] = clip(value.trim());
  }
  return merged;
}

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; code: "VALIDATION"; message: string; fieldErrors: Record<string, string> }
  | { ok: false; code: "RATE_LIMITED" | "ERROR"; message: string };

const GENERIC_ERROR = "Something went wrong while submitting. Please try again.";

/** Validated client-side for UX; the server re-validates everything with the same schema. */
type LeadPayload = { type: LeadSubmissionInput["type"] } & Record<string, unknown>;

export async function submitLead(
  payload: LeadPayload,
  options: { context?: LeadContext; signals: BotSignals },
): Promise<SubmitLeadResult> {
  const body = JSON.stringify({
    ...payload,
    attribution: buildAttribution(options.context),
    ...options.signals,
  });

  let response: Response;
  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: "same-origin",
    });
  } catch {
    return { ok: false, code: "ERROR", message: "Network error. Check your connection and try again." };
  }

  if (response.ok) return { ok: true };

  const data = (await response.json().catch(() => null)) as {
    error?: { code?: string; message?: string; fieldErrors?: Record<string, string[]> };
  } | null;

  if (response.status === 429) {
    return {
      ok: false,
      code: "RATE_LIMITED",
      message: data?.error?.message ?? "Too many submissions. Please try again later.",
    };
  }

  if (data?.error?.code === "VALIDATION") {
    const fieldErrors: Record<string, string> = {};
    for (const [key, messages] of Object.entries(data.error.fieldErrors ?? {})) {
      if (messages[0]) fieldErrors[key] = messages[0];
    }
    return {
      ok: false,
      code: "VALIDATION",
      message: data.error.message ?? "Some fields are invalid.",
      fieldErrors,
    };
  }

  return { ok: false, code: "ERROR", message: GENERIC_ERROR };
}
