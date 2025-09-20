import { users, type NewUser } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const path = "src/db/seeder/data/user.json";
const file = Bun.file(path);
const data = await file.json();

export const seedUsers = async () => {
  for (const user of data) {
    const existingUser = await db.select().from(users).where(eq(users.email, user.email));
    if (existingUser.length === 0) {
      const hashedPassword = await Bun.password.hash(user.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
      user.password = hashedPassword;
      await db.insert(users).values(user);
    }
  }
};
