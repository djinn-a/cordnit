CREATE SCHEMA IF NOT EXISTS "cms";
--> statement-breakpoint
CREATE TYPE "cms"."page_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "cms"."audit_log" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cms"."audit_log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"actor_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text,
	"summary" text,
	"diff" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."audit_log" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."global_block_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"content" jsonb NOT NULL,
	"system_props" jsonb NOT NULL,
	"note" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."global_block_versions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."global_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"system_props" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"published_props" jsonb,
	"published_version" integer,
	"has_unpublished_changes" boolean DEFAULT true NOT NULL,
	"lock_version" integer DEFAULT 1 NOT NULL,
	"published_at" timestamp with time zone,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."global_blocks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."page_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" uuid NOT NULL,
	"type" text NOT NULL,
	"label" text,
	"position" text COLLATE "C" NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"system_props" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"global_block_id" uuid,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."page_sections" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."page_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"document" jsonb NOT NULL,
	"note" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."page_versions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"shell" text DEFAULT 'default' NOT NULL,
	"spacing" text DEFAULT 'default' NOT NULL,
	"seo" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"breadcrumbs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" "cms"."page_status" DEFAULT 'draft' NOT NULL,
	"template_id" uuid,
	"lock_version" integer DEFAULT 1 NOT NULL,
	"published_version" integer,
	"has_unpublished_changes" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."pages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."published_pages" (
	"slug" text PRIMARY KEY NOT NULL,
	"page_id" uuid NOT NULL,
	"document" jsonb NOT NULL,
	"version" integer NOT NULL,
	"noindex" boolean DEFAULT false NOT NULL,
	"block_ids" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."published_pages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."redirects" (
	"from_path" text PRIMARY KEY NOT NULL,
	"to_path" text NOT NULL,
	"status_code" integer DEFAULT 308 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."redirects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"shell" text DEFAULT 'default' NOT NULL,
	"spacing" text DEFAULT 'default' NOT NULL,
	"sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."templates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "cms"."global_block_versions" ADD CONSTRAINT "global_block_versions_block_id_global_blocks_id_fk" FOREIGN KEY ("block_id") REFERENCES "cms"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms"."page_sections" ADD CONSTRAINT "page_sections_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms"."page_sections" ADD CONSTRAINT "page_sections_global_block_id_global_blocks_id_fk" FOREIGN KEY ("global_block_id") REFERENCES "cms"."global_blocks"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms"."page_versions" ADD CONSTRAINT "page_versions_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "cms"."templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms"."published_pages" ADD CONSTRAINT "published_pages_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_log_created_idx" ON "cms"."audit_log" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "audit_log_entity_idx" ON "cms"."audit_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "global_block_versions_block_version_unique" ON "cms"."global_block_versions" USING btree ("block_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "global_blocks_key_unique" ON "cms"."global_blocks" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "page_sections_page_position_unique" ON "cms"."page_sections" USING btree ("page_id","position");--> statement-breakpoint
CREATE INDEX "page_sections_global_block_idx" ON "cms"."page_sections" USING btree ("global_block_id") WHERE "cms"."page_sections"."global_block_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "page_versions_page_version_unique" ON "cms"."page_versions" USING btree ("page_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_slug_unique" ON "cms"."pages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "pages_status_updated_idx" ON "cms"."pages" USING btree ("status","updated_at" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "published_pages_page_unique" ON "cms"."published_pages" USING btree ("page_id");--> statement-breakpoint
CREATE UNIQUE INDEX "templates_key_unique" ON "cms"."templates" USING btree ("key");