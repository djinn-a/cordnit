import "server-only";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/server/env";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
export type DbOrTx = Database | Transaction;

type DbGlobal = { __cmsSql?: postgres.Sql; __cmsDb?: Database };
const globalForDb = globalThis as unknown as DbGlobal;

function createDb(): Database {
  const { DATABASE_URL, DB_POOL_MAX } = env();
  const sql =
    globalForDb.__cmsSql ??
    postgres(DATABASE_URL, {
      // Supavisor transaction mode does not support prepared statements.
      prepare: false,
      max: DB_POOL_MAX,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {},
    });
  if (process.env.NODE_ENV !== "production") globalForDb.__cmsSql = sql;
  return drizzle(sql, { schema, casing: "snake_case" });
}

/** Lazy singleton: importing this module never opens a connection by itself. */
export function db(): Database {
  if (globalForDb.__cmsDb) return globalForDb.__cmsDb;
  const instance = createDb();
  globalForDb.__cmsDb = instance;
  return instance;
}
