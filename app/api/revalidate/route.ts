import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/server/env";
import { logger } from "@/server/logger";

/**
 * Machine-to-machine cache purge for scripts, CI and future workers (the admin
 * UI invalidates through server actions instead). Only `cms:` tags are accepted.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer $CMS_REVALIDATE_SECRET
 *   { "tags": ["cms:page:home", "cms:pages"] }
 */
const bodySchema = z.object({
  tags: z
    .array(z.string().regex(/^cms:[a-z0-9:\-/]+$/i).max(256))
    .min(1)
    .max(200),
});

function sameSecret(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = env().CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: { code: "INTERNAL", message: "Revalidation is not configured." } }, { status: 501 });
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !sameSecret(token, secret)) {
    return NextResponse.json({ ok: false, error: { code: "UNAUTHENTICATED", message: "Invalid token." } }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: { code: "VALIDATION", message: "Body must be JSON." } }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "VALIDATION", message: "Provide 1-200 cms: tags." } },
      { status: 400 },
    );
  }

  const tags = [...new Set(parsed.data.tags)];
  for (const tag of tags) revalidateTag(tag, "max");
  logger.info("api.revalidate", { count: tags.length });
  return NextResponse.json({ ok: true, data: { revalidated: tags.length } });
}
