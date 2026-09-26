import "server-only";
import type {
  InlineSectionNode,
  PublishedPageDocument,
  SectionNode,
  SectionProps,
} from "@/lib/cms/document";
import { mergeSectionProps } from "@/lib/cms/registry/props";
import { isSectionType } from "@/lib/cms/types";
import type { PageRow, PageSectionRow, SectionSource } from "@/server/db/schema";

type BlockPropsLookup = (blockId: string) => SectionProps | null | undefined;

/**
 * Builds the render document from draft rows. With `resolveBlock` (preview),
 * block refs are inlined from draft block content; without it (publish), they
 * stay as refs resolved at render time through their own cache tag.
 */
export function buildDocument(
  page: PageRow,
  sections: readonly PageSectionRow[],
  meta: { version: number; publishedAt: Date },
  resolveBlock?: BlockPropsLookup,
): PublishedPageDocument {
  const nodes: SectionNode[] = [];
  for (const s of sections) {
    if (s.isHidden || !isSectionType(s.type)) continue;
    if (s.globalBlockId) {
      if (resolveBlock) {
        const props = resolveBlock(s.globalBlockId);
        if (props) nodes.push({ _key: s.id, _type: s.type, props });
      } else {
        nodes.push({ _key: s.id, _type: s.type, blockId: s.globalBlockId });
      }
      continue;
    }
    nodes.push({ _key: s.id, _type: s.type, props: mergeSectionProps(s.systemProps, s.content) });
  }

  return {
    pageId: page.id,
    slug: page.slug,
    title: page.title,
    shell: page.shell,
    spacing: page.spacing,
    seo: page.seo ?? {},
    breadcrumbs: page.breadcrumbs ?? [],
    sections: nodes,
    version: meta.version,
    publishedAt: meta.publishedAt.toISOString(),
  };
}

export function toSectionSource(sections: readonly PageSectionRow[]): SectionSource[] {
  return sections.map((s) => ({
    type: s.type,
    label: s.label,
    content: s.content,
    systemProps: s.systemProps,
    globalBlockId: s.globalBlockId,
    isHidden: s.isHidden,
  }));
}

export function inlineNodes(nodes: readonly SectionNode[]): InlineSectionNode[] {
  return nodes.filter((n): n is InlineSectionNode => "props" in n);
}
