import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Logger } from "drizzle-orm";
import { logger } from "./logging";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please define it in your .env file.");
}

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug(query, params);
  }

  logQuerySlow(query: string, params: unknown[], duration: number): void {
    logger.debug(query, params, duration);
  }

  logError(error: Error): void {
    logger.error(error);
  }
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { logger: new MyLogger() });

export type Db = typeof db;
