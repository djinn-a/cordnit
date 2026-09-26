-- The cms schema is reachable only through the server's direct Postgres connection.
-- RLS is enabled on every table with no policies, and the Data API roles lose all privileges.
REVOKE ALL ON SCHEMA "cms" FROM PUBLIC;--> statement-breakpoint
REVOKE ALL ON SCHEMA "cms" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL ON ALL TABLES IN SCHEMA "cms" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL ON ALL SEQUENCES IN SCHEMA "cms" FROM anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "cms" REVOKE ALL ON TABLES FROM anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "cms" REVOKE ALL ON SEQUENCES FROM anon, authenticated;--> statement-breakpoint

ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_slug_format"
  CHECK ("slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*)*$' AND char_length("slug") <= 200);--> statement-breakpoint
ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_shell_check" CHECK ("shell" IN ('default', 'contact'));--> statement-breakpoint
ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_spacing_check" CHECK ("spacing" IN ('default', 'compact'));--> statement-breakpoint
ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_lock_version_positive" CHECK ("lock_version" > 0);--> statement-breakpoint
ALTER TABLE "cms"."templates" ADD CONSTRAINT "templates_shell_check" CHECK ("shell" IN ('default', 'contact'));--> statement-breakpoint
ALTER TABLE "cms"."templates" ADD CONSTRAINT "templates_spacing_check" CHECK ("spacing" IN ('default', 'compact'));--> statement-breakpoint
ALTER TABLE "cms"."page_sections" ADD CONSTRAINT "page_sections_position_format" CHECK ("position" ~ '^[0-9A-Za-z]+$');--> statement-breakpoint
ALTER TABLE "cms"."redirects" ADD CONSTRAINT "redirects_status_check" CHECK ("status_code" IN (301, 302, 307, 308));--> statement-breakpoint
ALTER TABLE "cms"."redirects" ADD CONSTRAINT "redirects_no_self_loop" CHECK ("from_path" <> "to_path");
