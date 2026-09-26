import type { Metadata } from "next";
import { Suspense } from "react";
import BlocksTable from "@/components/cms/blocks/BlocksTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { SECTION_CATALOG } from "@/lib/cms/registry/catalog";
import { isSectionType } from "@/lib/cms/types";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "Global Blocks" };

async function BlocksData() {
  await requireSuperAdminPage();
  const blocks = await cms.blocks.listBlocks();
  return (
    <BlocksTable
      blocks={blocks.map((b) => ({
        id: b.id,
        name: b.name,
        key: b.key,
        typeLabel: isSectionType(b.type) ? SECTION_CATALOG[b.type].label : b.type,
        usageCount: b.usageCount,
        publishedVersion: b.publishedVersion,
        hasUnpublishedChanges: b.hasUnpublishedChanges,
        updatedAt: b.updatedAt,
      }))}
    />
  );
}

export default function BlocksPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BlocksData />
    </Suspense>
  );
}
