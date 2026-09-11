import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand ISR webhook endpoint for headless CMS (Sanity / etc.).
 *
 * Expected JSON body:
 * { "secret": "...", "slug"?: "aboutus", "tag"?: "page:aboutus" }
 *
 * For 100k+ pages: prefer tag-based revalidation over rebuilding everything.
 * Set CMS_REVALIDATE_SECRET in the environment before enabling webhooks.
 */
export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "CMS_REVALIDATE_SECRET is not configured" },
      { status: 501 }
    );
  }

  let body: { secret?: string; slug?: string; tag?: string; path?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (body.tag) {
    revalidateTag(body.tag, "max");
  }

  if (body.path) {
    revalidatePath(body.path);
  } else if (body.slug) {
    const path = body.slug === "home" ? "/" : `/${body.slug}`;
    revalidatePath(path);
  } else {
    return NextResponse.json(
      { message: "Provide tag, path, or slug" },
      { status: 400 }
    );
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
