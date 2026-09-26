import type { BreadcrumbItem, PageSeo, PageShell, PageSpacing } from "@/lib/cms/document";
import type { SectionCategory } from "@/lib/cms/registry/catalog";
import type { SectionType } from "@/lib/cms/types";
import type { JsonSchemaNode } from "../form/SchemaForm";

export type EditorPage = {
  id: string;
  title: string;
  slug: string;
  shell: PageShell;
  spacing: PageSpacing;
  seo: PageSeo;
  breadcrumbs: BreadcrumbItem[];
  lockVersion: number;
  publishedVersion: number | null;
  hasUnpublishedChanges: boolean;
  liveSlug: string | null;
};

export type EditorSection = {
  id: string;
  type: SectionType;
  label: string | null;
  content: Record<string, unknown>;
  isHidden: boolean;
  globalBlockId: string | null;
};

export type EditorVersion = { version: number; note: string | null; createdAt: Date | string };

export type EditorBlock = {
  id: string;
  name: string;
  type: SectionType;
  publishedVersion: number | null;
};

export type SectionTypeOptionView = {
  type: SectionType;
  label: string;
  category: SectionCategory;
  description: string;
};

export type EditorData = {
  page: EditorPage;
  sections: EditorSection[];
  versions: EditorVersion[];
  blocks: EditorBlock[];
  schemas: Partial<Record<SectionType, JsonSchemaNode>>;
  typeOptions: SectionTypeOptionView[];
};
