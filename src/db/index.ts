import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please define it in your .env file.");
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool);

export type Db = typeof db;
