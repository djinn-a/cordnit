import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  customType,
  index,
  integer,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import type {
  BreadcrumbItem,
  PageSeo,
  PageShell,
  PageSpacing,
  PublishedPageDocument,
  SectionProps,
} from "@/lib/cms/document";

export const cms = pgSchema("cms");

export const pageStatus = cms.enum("page_status", ["draft", "published", "archived"]);

/** Fractional-index keys are base62 and must compare byte-wise. */
const orderKey = customType<{ data: string; driverData: string }>({
  dataType() {
    return 'text COLLATE "C"';
  },
});

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/** Raw draft section: used by templates and version snapshots for faithful restores. */
export type SectionSource = {
  type: string;
  label?: string | null;
  content: SectionProps;
  systemProps: SectionProps;
  globalBlockId?: string | null;
  isHidden?: boolean;
};

export const templates = cms
  .table(
    "templates",
    {
      id: uuid().primaryKey().defaultRandom(),
      key: text().notNull(),
      name: text().notNull(),
      description: text(),
      shell: text().$type<PageShell>().notNull().default("default"),
      spacing: text().$type<PageSpacing>().notNull().default("default"),
      sections: jsonb().$type<SectionSource[]>().notNull().default([]),
      ...timestamps,
    },
    (t) => [uniqueIndex("templates_key_unique").on(t.key)],
  )
  .enableRLS();

export const pages = cms
  .table(
    "pages",
    {
      id: uuid().primaryKey().defaultRandom(),
      slug: text().notNull(),
      title: text().notNull(),
      shell: text().$type<PageShell>().notNull().default("default"),
      spacing: text().$type<PageSpacing>().notNull().default("default"),
      seo: jsonb().$type<PageSeo>().notNull().default({}),
      breadcrumbs: jsonb().$type<BreadcrumbItem[]>().notNull().default([]),
      status: pageStatus().notNull().default("draft"),
      templateId: uuid().references(() => templates.id, { onDelete: "set null" }),
      lockVersion: integer().notNull().default(1),
      publishedVersion: integer(),
      hasUnpublishedChanges: boolean().notNull().default(true),
      publishedAt: timestamp({ withTimezone: true }),
      createdBy: uuid(),
      updatedBy: uuid(),
      ...timestamps,
    },
    (t) => [
      uniqueIndex("pages_slug_unique").on(t.slug),
      index("pages_status_updated_idx").on(t.status, t.updatedAt.desc()),
    ],
  )
  .enableRLS();

export const globalBlocks = cms
  .table(
    "global_blocks",
    {
      id: uuid().primaryKey().defaultRandom(),
      key: text().notNull(),
      name: text().notNull(),
      type: text().notNull(),
      content: jsonb().$type<SectionProps>().notNull().default({}),
      systemProps: jsonb().$type<SectionProps>().notNull().default({}),
      publishedProps: jsonb().$type<SectionProps>(),
      publishedVersion: integer(),
      hasUnpublishedChanges: boolean().notNull().default(true),
      lockVersion: integer().notNull().default(1),
      publishedAt: timestamp({ withTimezone: true }),
      updatedBy: uuid(),
      ...timestamps,
    },
    (t) => [uniqueIndex("global_blocks_key_unique").on(t.key)],
  )
  .enableRLS();

export const globalBlockVersions = cms
  .table(
    "global_block_versions",
    {
      id: uuid().primaryKey().defaultRandom(),
      blockId: uuid()
        .notNull()
        .references(() => globalBlocks.id, { onDelete: "cascade" }),
      version: integer().notNull(),
      content: jsonb().$type<SectionProps>().notNull(),
      systemProps: jsonb().$type<SectionProps>().notNull(),
      note: text(),
      createdBy: uuid(),
      createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    },
    (t) => [uniqueIndex("global_block_versions_block_version_unique").on(t.blockId, t.version)],
  )
  .enableRLS();

export const pageSections = cms
  .table(
    "page_sections",
    {
      id: uuid().primaryKey().defaultRandom(),
      pageId: uuid()
        .notNull()
        .references(() => pages.id, { onDelete: "cascade" }),
      type: text().notNull(),
      label: text(),
      position: orderKey().notNull(),
      content: jsonb().$type<SectionProps>().notNull().default({}),
      systemProps: jsonb().$type<SectionProps>().notNull().default({}),
      globalBlockId: uuid().references(() => globalBlocks.id, { onDelete: "restrict" }),
      isHidden: boolean().notNull().default(false),
      ...timestamps,
    },
    (t) => [
      uniqueIndex("page_sections_page_position_unique").on(t.pageId, t.position),
      index("page_sections_global_block_idx")
        .on(t.globalBlockId)
        .where(sql`${t.globalBlockId} is not null`),
    ],
  )
  .enableRLS();

export const pageVersions = cms
  .table(
    "page_versions",
    {
      id: uuid().primaryKey().defaultRandom(),
      pageId: uuid()
        .notNull()
        .references(() => pages.id, { onDelete: "cascade" }),
      version: integer().notNull(),
      document: jsonb().$type<PublishedPageDocument>().notNull(),
      source: jsonb().$type<SectionSource[]>(),
      note: text(),
      createdBy: uuid(),
      createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    },
    (t) => [uniqueIndex("page_versions_page_version_unique").on(t.pageId, t.version)],
  )
  .enableRLS();

/** Read model: exactly one row per live URL. */
export const publishedPages = cms
  .table(
    "published_pages",
    {
      slug: text().primaryKey(),
      pageId: uuid()
        .notNull()
        .references(() => pages.id, { onDelete: "cascade" }),
      document: jsonb().$type<PublishedPageDocument>().notNull(),
      version: integer().notNull(),
      noindex: boolean().notNull().default(false),
      blockIds: uuid().array().notNull().default(sql`'{}'::uuid[]`),
      publishedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    },
    (t) => [uniqueIndex("published_pages_page_unique").on(t.pageId)],
  )
  .enableRLS();

export const redirects = cms
  .table("redirects", {
    fromPath: text().primaryKey(),
    toPath: text().notNull(),
    statusCode: integer().notNull().default(308),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  })
  .enableRLS();

export const auditLog = cms
  .table(
    "audit_log",
    {
      id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
      actorId: uuid(),
      action: text().notNull(),
      entityType: text().notNull(),
      entityId: text(),
      summary: text(),
      diff: jsonb().$type<Record<string, unknown>>(),
      createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    },
    (t) => [
      index("audit_log_created_idx").on(t.createdAt.desc()),
      index("audit_log_entity_idx").on(t.entityType, t.entityId),
    ],
  )
  .enableRLS();

export type PageRow = typeof pages.$inferSelect;
export type PageSectionRow = typeof pageSections.$inferSelect;
export type GlobalBlockRow = typeof globalBlocks.$inferSelect;
export type TemplateRow = typeof templates.$inferSelect;
export type PageVersionRow = typeof pageVersions.$inferSelect;
export type AuditLogRow = typeof auditLog.$inferSelect;
