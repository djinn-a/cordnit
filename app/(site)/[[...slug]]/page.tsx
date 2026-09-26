import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect, unstable_rethrow } from "next/navigation";
import { Suspense } from "react";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { HOME_SLUG, pathSegmentsToSlug, slugToPath, slugToSegments } from "@/lib/cms/document";
import { RESERVED_SLUG_ROOTS } from "@/lib/cms/inputs";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { cms } from "@/server/cms";
import { logger } from "@/server/logger";

type Params = Promise<{ slug?: string[] }>;

const MAX_SLUG_LENGTH = 200;

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const routes = await cms.published.listPublishedRoutes();
    const params = routes.map((r) => ({ slug: slugToSegments(r.slug) }));
    return params.length > 0 ? params : [{ slug: [] }];
  } catch (err) {
    unstable_rethrow(err);
    logger.error("generateStaticParams failed; falling back to on-demand rendering", { err });
    return [{ slug: [] }];
  }
}

function toLookupSlug(segments: string[] | undefined): string | null {
  const slug = pathSegmentsToSlug(segments);
  if (!slug || slug.length > MAX_SLUG_LENGTH) return null;
  if ((RESERVED_SLUG_ROOTS as readonly string[]).includes(slug.split("/")[0] ?? "")) return null;
  return slug;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = toLookupSlug((await params).slug);
  if (!slug) return {};
  const doc = await cms.published.getPublishedPage(slug);
  return doc ? buildPageMetadata(doc) : { robots: { index: false, follow: false } };
}

async function CmsPage({ params }: { params: Params }) {
  const { slug: segments } = await params;
  const slug = toLookupSlug(segments);
  if (!slug) notFound();
  if (slug === HOME_SLUG && segments?.length) permanentRedirect("/");

  const doc = await cms.published.getPublishedPage(slug);
  if (!doc) {
    const target = (await cms.published.getRedirectMap())[slugToPath(slug)];
    if (target) {
      if (target.statusCode === 307 || target.statusCode === 302) redirect(target.toPath);
      permanentRedirect(target.toPath);
    }
    notFound();
  }

  const sections = await cms.published.resolveSections(doc);
  return (
    <LayoutRenderer
      shell={doc.shell}
      spacing={doc.spacing}
      breadcrumbs={doc.breadcrumbs}
      sections={sections}
    />
  );
}

export default function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" aria-busy="true" />}>
      <CmsPage params={params} />
    </Suspense>
  );
}
