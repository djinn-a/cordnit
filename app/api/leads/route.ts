import { randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";
import { botSignalsSchema, isLikelyBot, leadSubmissionSchema } from "@/lib/leads/schema";
import { HTTP_STATUS_BY_CODE, type ApiError } from "@/lib/types/result";
import { sendLeadNotification } from "@/lib/services/email";
import { cms } from "@/server/cms";
import { zodToFieldErrors } from "@/server/errors";
import { clientIp, hashIp, LeadsConfigError } from "@/server/leads/ip";
import { consumeLeadRateLimit } from "@/server/leads/rate-limit";
import { logger } from "@/server/logger";

const MAX_BODY_BYTES = 16 * 1024;

const NO_STORE = { "Cache-Control": "no-store" };

function ok() {
  return NextResponse.json({ ok: true, data: null }, { status: 200, headers: NO_STORE });
}

function fail(error: ApiError, status = HTTP_STATUS_BY_CODE[error.code], headers: Record<string, string> = {}) {
  return NextResponse.json({ ok: false, error }, { status, headers: { ...NO_STORE, ...headers } });
}

/** Browsers always send Origin on cross-origin and same-origin POSTs made with fetch. */
function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  return Boolean(host) && originHost === host;
}

async function readBody(request: Request): Promise<string | null> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function POST(request: Request) {
  const requestId = randomUUID();

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return fail({ code: "VALIDATION", message: "Content-Type must be application/json." }, 415);
  }

  if (!isSameOrigin(request)) {
    logger.warn("lead.rejected", { requestId, reason: "origin" });
    return fail({ code: "FORBIDDEN", message: "Forbidden." });
  }

  const raw = await readBody(request);
  if (raw === null) {
    return fail({ code: "VALIDATION", message: "Request body is too large." }, 413);
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return fail({ code: "VALIDATION", message: "Body must be valid JSON." }, 400);
  }
  if (typeof json !== "object" || json === null || Array.isArray(json)) {
    return fail({ code: "VALIDATION", message: "Body must be a JSON object." }, 400);
  }

  const signals = botSignalsSchema.parse(json);
  if (isLikelyBot(signals)) {
    logger.info("lead.discarded", { requestId, reason: "bot-signal" });
    return ok();
  }

  const parsed = leadSubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return fail({
      code: "VALIDATION",
      message: "Some fields are invalid.",
      fieldErrors: zodToFieldErrors(parsed.error),
    });
  }
  const lead = parsed.data;

  try {
    const ipHash = hashIp(clientIp(request.headers));

    const limit = await consumeLeadRateLimit(ipHash, lead.type);
    if (!limit.allowed) {
      logger.warn("lead.rate_limited", { requestId, type: lead.type });
      return fail(
        { code: "RATE_LIMITED", message: "Too many submissions. Please try again later." },
        429,
        { "Retry-After": String(limit.retryAfterSeconds) },
      );
    }

    const created = await cms.leads.createLead(lead, {
      ipHash,
      userAgent: request.headers.get("user-agent"),
    });

    logger.info(created ? "lead.created" : "lead.duplicate", { requestId, type: lead.type });
    if (created) {
      after(() => sendLeadNotification(lead));
    }
    return ok();
  } catch (err) {
    logger.error("lead.failed", {
      requestId,
      type: lead.type,
      reason: err instanceof LeadsConfigError ? "config" : "internal",
      err,
    });
    return fail({ code: "INTERNAL", message: "We couldn't save your submission. Please try again." });
  }
}
