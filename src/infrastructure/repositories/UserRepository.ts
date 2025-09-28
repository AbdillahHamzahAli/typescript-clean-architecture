import type { IUserRespository } from "@/application/interfaces/IUserRespository";
import { User } from "@/domain/entities/User";
import { db } from "../db/drizzleClient";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

export class UserRespository implements IUserRespository {
  async create(user: User): Promise<User> {
    const inserted = await db
      .insert(users)
      .values({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .returning();

    const row = inserted[0];

    if (!row) {
      throw new Error("Failed to insert user");
    }

    return row;
  }

  async findAll(): Promise<User[]> {
    const rows = await db.select().from(users);
    return rows.map((r) => {
      return new User(r.email, r.name ?? null, r.password, r.role, r.id, r.createdAt);
    });
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!row) return null;
    return row[0] ?? null;
  }
}
