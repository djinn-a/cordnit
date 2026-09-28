CREATE TABLE "cms"."lead_rate_limits" (
	"key" text NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "lead_rate_limits_key_window_start_pk" PRIMARY KEY("key","window_start")
);
--> statement-breakpoint
ALTER TABLE "cms"."lead_rate_limits" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cms"."leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"company" text,
	"job_title" text,
	"phone" text,
	"message" text,
	"interests" text[] DEFAULT '{}'::text[] NOT NULL,
	"intro_call" boolean DEFAULT false NOT NULL,
	"privacy_consent" boolean DEFAULT false NOT NULL,
	"booking_at" text,
	"attribution" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ip_hash" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cms"."leads" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "lead_rate_limits_window_idx" ON "cms"."lead_rate_limits" USING btree ("window_start");--> statement-breakpoint
CREATE INDEX "leads_created_idx" ON "cms"."leads" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "leads_type_created_idx" ON "cms"."leads" USING btree ("type","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "cms"."leads" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "leads_newsletter_email_unique" ON "cms"."leads" USING btree ("email") WHERE "cms"."leads"."type" = 'newsletter';--> statement-breakpoint
REVOKE ALL ON TABLE "cms"."leads" FROM PUBLIC, anon, authenticated;--> statement-breakpoint
REVOKE ALL ON TABLE "cms"."lead_rate_limits" FROM PUBLIC, anon, authenticated;--> statement-breakpoint
ALTER TABLE "cms"."leads" ADD CONSTRAINT "leads_type_check" CHECK ("type" IN ('lead_form', 'contact', 'newsletter'));--> statement-breakpoint
ALTER TABLE "cms"."leads" ADD CONSTRAINT "leads_email_format" CHECK (char_length("email") BETWEEN 3 AND 254 AND "email" = lower("email") AND position('@' in "email") > 1);--> statement-breakpoint
ALTER TABLE "cms"."leads" ADD CONSTRAINT "leads_field_lengths" CHECK (
  coalesce(char_length("first_name"), 0) <= 100
  AND coalesce(char_length("last_name"), 0) <= 100
  AND coalesce(char_length("company"), 0) <= 200
  AND coalesce(char_length("job_title"), 0) <= 200
  AND coalesce(char_length("phone"), 0) <= 20
  AND coalesce(char_length("message"), 0) <= 5000
  AND coalesce(char_length("booking_at"), 0) <= 100
  AND coalesce(char_length("ip_hash"), 0) <= 128
  AND coalesce(char_length("user_agent"), 0) <= 300
  AND coalesce(array_length("interests", 1), 0) <= 20
  AND pg_column_size("attribution") <= 16384
);--> statement-breakpoint
ALTER TABLE "cms"."leads" ADD CONSTRAINT "leads_contact_requires_consent" CHECK ("type" = 'newsletter' OR "privacy_consent" = true);--> statement-breakpoint
ALTER TABLE "cms"."lead_rate_limits" ADD CONSTRAINT "lead_rate_limits_count_positive" CHECK ("count" > 0);