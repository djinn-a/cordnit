import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlockEditor from "@/components/cms/blocks/BlockEditor";
import type { JsonSchemaNode } from "@/components/cms/form/SchemaForm";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { uuidSchema } from "@/lib/cms/inputs";
import { SECTION_CATALOG, getContentJsonSchema } from "@/lib/cms/registry";
import { isSectionType } from "@/lib/cms/types";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";
import { AppError } from "@/server/errors";

export const metadata: Metadata = { title: "Edit Global Block" };

type Params = Promise<{ blockId: string }>;

async function BlockData({ params }: { params: Params }) {
  await requireSuperAdminPage();
  const parsed = uuidSchema.safeParse((await params).blockId);
  if (!parsed.success) notFound();

  let raw: Awaited<ReturnType<typeof cms.blocks.getBlockEditorData>>;
  try {
    raw = await cms.blocks.getBlockEditorData(parsed.data);
  } catch (err) {
    if (err instanceof AppError && err.code === "NOT_FOUND") notFound();
    throw err;
  }
  const { block, usages, versions } = raw;
  if (!isSectionType(block.type)) notFound();

  return (
    <BlockEditor
      data={{
        id: block.id,
        name: block.name,
        typeLabel: SECTION_CATALOG[block.type].label,
        content: block.content,
        lockVersion: block.lockVersion,
        publishedVersion: block.publishedVersion,
        hasUnpublishedChanges: block.hasUnpublishedChanges,
        schema: getContentJsonSchema(block.type) as JsonSchemaNode,
        usages,
        versions,
      }}
    />
  );
}

export default function BlockPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BlockData params={params} />
    </Suspense>
  );
}
