ALTER TABLE "cms"."pages" DROP CONSTRAINT "pages_spacing_check";--> statement-breakpoint
ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_spacing_check" CHECK ("spacing" IN ('default', 'compact', 'compact-top'));--> statement-breakpoint
ALTER TABLE "cms"."templates" DROP CONSTRAINT "templates_spacing_check";--> statement-breakpoint
ALTER TABLE "cms"."templates" ADD CONSTRAINT "templates_spacing_check" CHECK ("spacing" IN ('default', 'compact', 'compact-top'));
