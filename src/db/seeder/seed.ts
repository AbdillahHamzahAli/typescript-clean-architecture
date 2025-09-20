import "dotenv/config";
import { db, pool } from "../index";
import { roles, users, posts } from "../schema";
import { eq } from "drizzle-orm";
import { seed } from "drizzle-seed";
import { seedRoles } from "./seeds/role";
import { seedUsers } from "./seeds/user";
import { seedPosts } from "./seeds/post";

async function main() {
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
