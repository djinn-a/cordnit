import { beforeEach, describe, expect, it, vi } from "vitest";

const leads = vi.hoisted(() => ({ createLead: vi.fn() }));
const rateLimit = vi.hoisted(() => ({ consumeLeadRateLimit: vi.fn() }));
const email = vi.hoisted(() => ({ sendLeadNotification: vi.fn() }));
const logger = vi.hoisted(() => ({ error: vi.fn(), warn: vi.fn(), info: vi.fn() }));
const nextServer = vi.hoisted(() => ({ after: vi.fn() }));

vi.mock("@/server/cms", () => ({ cms: { leads } }));
vi.mock("@/server/leads/rate-limit", () => rateLimit);
vi.mock("@/lib/services/email", () => email);
vi.mock("@/server/logger", () => ({ logger }));
vi.mock("@/server/env", () => ({ env: () => ({ LEADS_IP_SALT: "x".repeat(32) }) }));
vi.mock("next/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/server")>()),
  after: nextServer.after,
}));

const { POST } = await import("@/app/api/leads/route");

const HOST = "cordinit.com";
const human = { hpField: "", elapsedMs: 8000 };
const newsletter = { type: "newsletter", email: "reader@example.com", consent: true, ...human };
const leadForm = {
  type: "lead_form",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  company: "Acme",
  jobTitle: "CTO",
  helpDetails: "Need help",
  interests: ["Cybersecurity"],
  introCall: true,
  privacy: true,
  bookingDateTime: "October 1, 2026 at 02:00 PM",
  attribution: { ctaLocation: "Hero" },
  ...human,
};
const contact = { ...leadForm, type: "contact", phone: "9876543210" };

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`https://${HOST}/api/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: `https://${HOST}`,
      host: HOST,
      "sec-fetch-site": "same-origin",
      "x-forwarded-for": "203.0.113.7, 10.0.0.1",
      "user-agent": "vitest",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  rateLimit.consumeLeadRateLimit.mockResolvedValue({ allowed: true });
  leads.createLead.mockResolvedValue(true);
});

describe("POST /api/leads", () => {
  it.each([
    ["lead_form", leadForm],
    ["contact", contact],
    ["newsletter", newsletter],
  ])("stores a valid %s lead and schedules a notification", async (type, body) => {
    const res = await POST(request(body));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ ok: true, data: null });
    expect(leads.createLead).toHaveBeenCalledWith(
      expect.objectContaining({ type }),
      expect.objectContaining({ ipHash: expect.stringMatching(/^[0-9a-f]{64}$/), userAgent: "vitest" }),
    );
    expect(nextServer.after).toHaveBeenCalledTimes(1);
  });

  it("never stores the raw IP", async () => {
    await POST(request(newsletter));
    expect(JSON.stringify(leads.createLead.mock.calls)).not.toContain("203.0.113.7");
  });

  it("rejects cross-origin and origin-less requests", async () => {
    expect((await POST(request(newsletter, { origin: "https://evil.example", "sec-fetch-site": "cross-site" }))).status).toBe(403);
    expect((await POST(request(newsletter, { origin: "https://evil.example", "sec-fetch-site": "" }))).status).toBe(403);
    const noOrigin = request(newsletter);
    noOrigin.headers.delete("origin");
    expect((await POST(noOrigin)).status).toBe(403);
    expect(leads.createLead).not.toHaveBeenCalled();
  });

  it("rejects non-JSON content types, malformed JSON and oversized bodies", async () => {
    expect((await POST(request(newsletter, { "content-type": "text/plain" }))).status).toBe(415);
    expect((await POST(request("{not json"))).status).toBe(400);
    expect((await POST(request({ ...newsletter, padding: "x".repeat(20_000) }))).status).toBe(413);
    expect(leads.createLead).not.toHaveBeenCalled();
  });

  it("silently accepts but discards honeypot and too-fast submissions", async () => {
    for (const signals of [{ hpField: "http://spam" }, { elapsedMs: 200 }, { elapsedMs: undefined }]) {
      const res = await POST(request({ ...newsletter, ...signals }));
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true, data: null });
    }
    expect(rateLimit.consumeLeadRateLimit).not.toHaveBeenCalled();
    expect(leads.createLead).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input without echoing values", async () => {
    const res = await POST(request({ ...contact, phone: "12", email: "<script>alert(1)</script>" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.error.code).toBe("VALIDATION");
    expect(body.error.fieldErrors).toHaveProperty("phone");
    expect(body.error.fieldErrors).toHaveProperty("email");
    expect(JSON.stringify(body)).not.toContain("<script>");
    expect(leads.createLead).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After when rate limited", async () => {
    rateLimit.consumeLeadRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 120 });
    const res = await POST(request(newsletter));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("120");
    expect(leads.createLead).not.toHaveBeenCalled();
  });

  it("reports success for duplicate newsletter signups without notifying", async () => {
    leads.createLead.mockResolvedValue(false);
    const res = await POST(request(newsletter));
    expect(res.status).toBe(200);
    expect(nextServer.after).not.toHaveBeenCalled();
  });

  it("returns a generic 500 and logs no personal data when storage fails", async () => {
    leads.createLead.mockRejectedValue(new Error("db down"));
    const res = await POST(request(leadForm));
    expect(res.status).toBe(500);
    expect((await res.json()).error.code).toBe("INTERNAL");
    const logged = JSON.stringify([...logger.info.mock.calls, ...logger.warn.mock.calls, ...logger.error.mock.calls]);
    expect(logged).not.toContain("jane@example.com");
    expect(logged).not.toContain("Need help");
  });
});
