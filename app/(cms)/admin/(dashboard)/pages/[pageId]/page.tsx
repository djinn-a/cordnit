import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageEditor from "@/components/cms/editor/PageEditor";
import type { EditorData } from "@/components/cms/editor/types";
import type { JsonSchemaNode } from "@/components/cms/form/SchemaForm";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { uuidSchema } from "@/lib/cms/inputs";
import { getContentJsonSchema, listSectionTypeOptions } from "@/lib/cms/registry";
import { isSectionType, type SectionType } from "@/lib/cms/types";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";
import { AppError } from "@/server/errors";

export const metadata: Metadata = { title: "Edit page" };

type Params = Promise<{ pageId: string }>;

async function EditorData({ params }: { params: Params }) {
  await requireSuperAdminPage();
  const parsed = uuidSchema.safeParse((await params).pageId);
  if (!parsed.success) notFound();

  let raw: Awaited<ReturnType<typeof cms.pages.getPageEditorData>>;
  try {
    raw = await cms.pages.getPageEditorData(parsed.data);
  } catch (err) {
    if (err instanceof AppError && err.code === "NOT_FOUND") notFound();
    throw err;
  }

  const sections = raw.sections.flatMap((s) =>
    isSectionType(s.type)
      ? [{ id: s.id, type: s.type, label: s.label, content: s.content, isHidden: s.isHidden, globalBlockId: s.globalBlockId }]
      : [],
  );
  const usedTypes = new Set<SectionType>(sections.map((s) => s.type));
  const schemas: EditorData["schemas"] = {};
  for (const type of usedTypes) schemas[type] = getContentJsonSchema(type) as JsonSchemaNode;

  const data: EditorData = {
    page: {
      id: raw.page.id,
      title: raw.page.title,
      slug: raw.page.slug,
      shell: raw.page.shell === "contact" ? "contact" : "default",
      spacing: raw.page.spacing === "compact" || raw.page.spacing === "compact-top" ? raw.page.spacing : "default",
      seo: raw.page.seo ?? {},
      breadcrumbs: raw.page.breadcrumbs ?? [],
      lockVersion: raw.page.lockVersion,
      publishedVersion: raw.page.publishedVersion,
      hasUnpublishedChanges: raw.page.hasUnpublishedChanges,
      liveSlug: raw.liveSlug,
    },
    sections,
    versions: raw.versions,
    blocks: raw.blocks.flatMap((b) =>
      isSectionType(b.type) ? [{ id: b.id, name: b.name, type: b.type, publishedVersion: b.publishedVersion }] : [],
    ),
    schemas,
    typeOptions: listSectionTypeOptions().map(({ type, label, category, description }) => ({ type, label, category, description })),
  };

  return <PageEditor data={data} />;
}

export default function EditPagePage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EditorData params={params} />
    </Suspense>
  );
}
