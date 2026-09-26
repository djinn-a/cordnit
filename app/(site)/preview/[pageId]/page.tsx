import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { uuidSchema } from "@/lib/cms/inputs";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false, nocache: true },
};

type Params = Promise<{ pageId: string }>;

async function DraftPreview({ params }: { params: Params }) {
  await requireSuperAdminPage();
  const parsed = uuidSchema.safeParse((await params).pageId);
  if (!parsed.success) notFound();

  const draft = await cms.preview.getDraftDocument(parsed.data);
  if (!draft) notFound();

  return (
    <>
      <div
        role="status"
        className="sticky top-0 z-[60] w-full bg-ink text-white text-center text-sm py-2 px-4"
      >
        Draft preview of <strong>{draft.doc.title}</strong>. Visitors don&apos;t see these changes until you publish.
      </div>
      <LayoutRenderer
        shell={draft.doc.shell}
        spacing={draft.doc.spacing}
        breadcrumbs={draft.doc.breadcrumbs}
        sections={draft.sections}
      />
    </>
  );
}

export default function PreviewPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" aria-busy="true" />}>
      <DraftPreview params={params} />
    </Suspense>
  );
}
