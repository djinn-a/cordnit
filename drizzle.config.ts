import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const url = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;
if (!url) throw new Error("Set DATABASE_URL_DIRECT (or DATABASE_URL) to run drizzle-kit.");

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schema/index.ts",
  out: "./server/db/migrations",
  schemaFilter: ["cms"],
  casing: "snake_case",
  dbCredentials: { url },
  migrations: { schema: "cms", table: "__drizzle_migrations" },
  strict: true,
  verbose: true,
});
