import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Logger } from "drizzle-orm/logger";
import { logger } from "@/shared/logging";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please define it in your .env file.");
}

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug(`Query: ${query} -- params: ${params}`);
  }

  logQueryError(query: string, params: unknown[], error: Error): void {
    logger.error(`Query Error: ${query} -- params: ${params} -- error: ${error.message}`);
  }
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, {
  logger: new MyLogger(),
});

export type Db = typeof db;
