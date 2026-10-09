CREATE TABLE "cms"."site_settings" (
	"id" text PRIMARY KEY DEFAULT 'global' NOT NULL,
	"seo" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"lock_version" integer DEFAULT 1 NOT NULL,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."site_settings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
REVOKE ALL ON TABLE "cms"."site_settings" FROM PUBLIC, anon, authenticated;--> statement-breakpoint
ALTER TABLE "cms"."site_settings" ADD CONSTRAINT "site_settings_singleton" CHECK ("id" = 'global');--> statement-breakpoint
ALTER TABLE "cms"."site_settings" ADD CONSTRAINT "site_settings_lock_version_positive" CHECK ("lock_version" > 0);--> statement-breakpoint
ALTER TABLE "cms"."site_settings" ADD CONSTRAINT "site_settings_seo_size" CHECK (pg_column_size("seo") <= 32768);--> statement-breakpoint
INSERT INTO "cms"."site_settings" ("id") VALUES ('global') ON CONFLICT DO NOTHING;