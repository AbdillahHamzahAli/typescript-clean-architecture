import { roles, type NewRole } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const path = "src/db/seeder/data/role.json";
const file = Bun.file(path);
const data = await file.json();

export const seedRoles = async () => {
  for (const role of data) {
    const existingRole = await db.select().from(roles).where(eq(roles.id, role.id));
    if (existingRole.length === 0) {
      await db.insert(roles).values(role);
    }
  }
};
