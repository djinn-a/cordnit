import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { toCsvRow } from "@/lib/leads/csv";
import { LEAD_TYPE_LABELS } from "@/lib/leads/schema";
import { requireSuperAdmin } from "@/server/auth";
import { cms } from "@/server/cms";
import { leadFiltersSchema } from "@/server/cms/services/leads.service";
import type { LeadRow } from "@/server/db/schema";
import { logger } from "@/server/logger";

const COLUMNS: [header: string, value: (lead: LeadRow) => unknown][] = [
  ["Received (UTC)", (l) => l.createdAt.toISOString()],
  ["Type", (l) => LEAD_TYPE_LABELS[l.type]],
  ["Email", (l) => l.email],
  ["First name", (l) => l.firstName],
  ["Last name", (l) => l.lastName],
  ["Company", (l) => l.company],
  ["Job title", (l) => l.jobTitle],
  ["Phone", (l) => l.phone],
  ["Interests", (l) => l.interests],
  ["Message", (l) => l.message],
  ["Intro call", (l) => (l.type === "newsletter" ? "" : l.introCall ? "Yes" : "No")],
  ["Requested slot", (l) => l.bookingAt],
  ["Consent", (l) => (l.privacyConsent ? "Yes" : "No")],
  ["CTA location", (l) => l.attribution.ctaLocation],
  ["Source", (l) => l.attribution.source],
  ["Landing page", (l) => l.attribution.landingPage],
  ["Referrer", (l) => l.attribution.referrer],
  ["Solution", (l) => l.attribution.solution],
  ["Service", (l) => l.attribution.service],
  ["Industry", (l) => l.attribution.industry],
  ["UTM source", (l) => l.attribution.utmSource],
  ["UTM medium", (l) => l.attribution.utmMedium],
  ["UTM campaign", (l) => l.attribution.utmCampaign],
  ["UTM content", (l) => l.attribution.utmContent],
  ["UTM term", (l) => l.attribution.utmTerm],
  ["Lead ID", (l) => l.id],
];

export async function GET(request: Request) {
  const requestId = randomUUID();
  let session;
  try {
    session = await requireSuperAdmin();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "UNAUTHENTICATED", message: "Please sign in to continue." } },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const params = new URL(request.url).searchParams;
  const { type, q, from, to } = leadFiltersSchema.parse({
    type: params.get("type") ?? undefined,
    q: params.get("q") || undefined,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
  });
  const filters = { type, q, from, to };

  const rowCount = await cms.leads.recordLeadExport(filters, session.userId);
  logger.info("lead.export", { requestId, rowCount });

  const encoder = new TextEncoder();
  const batches = cms.leads.iterateLeads(filters);
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // UTF-8 BOM so Excel renders non-ASCII names correctly.
      controller.enqueue(encoder.encode(`\uFEFF${toCsvRow(COLUMNS.map(([h]) => h))}`));
    },
    async pull(controller) {
      try {
        const { value, done } = await batches.next();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(value.map((lead) => toCsvRow(COLUMNS.map(([, get]) => get(lead)))).join("")));
      } catch (err) {
        logger.error("lead.export.failed", { requestId, err });
        controller.error(err);
      }
    },
    async cancel() {
      await batches.return(undefined);
    },
  });

  const date = new Date().toISOString().slice(0, 10);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cordinit-leads-${date}.csv"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
