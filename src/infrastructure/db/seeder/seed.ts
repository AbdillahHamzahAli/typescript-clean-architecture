import "dotenv/config";

import { reset } from "drizzle-seed";
import * as schema from "../schema";
import { db } from "../drizzleClient";

import { seedRoles } from "./seeds/role";
import { seedUsers } from "./seeds/user";
import { seedPosts } from "./seeds/post";

async function main() {
  await reset(db, schema);
  console.log("Seeding database...");

  // 1) Seed roles
  console.log("- Inserting roles...");
  await seedRoles();

  // 2) Seed users
  console.log("- Inserting users...");
  await seedUsers();

  // 3) Seed posts
  console.log("- Inserting posts...");
  await seedPosts();
}

main();
