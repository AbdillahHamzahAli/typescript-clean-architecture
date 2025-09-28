import type { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { db } from "../db/drizzleClient";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { InfrastructureError } from "@/shared/errors/errors";

export class UserRespository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
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
        throw new InfrastructureError("Failed to insert user", { code: "DB_INSERT_EMPTY" });
      }

      return new User(row.email, row.name ?? null, row.password, row.role, row.id, row.createdAt);
    } catch (e) {
      throw new InfrastructureError("Database error on creating user", { cause: e, code: "DB_CREATE_FAILED" });
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const rows = await db.select().from(users);
      return rows.map((r) => new User(r.email, r.name ?? null, r.password, r.role, r.id, r.createdAt));
    } catch (e) {
      throw new InfrastructureError("Database error on fetching users", { cause: e, code: "DB_SELECT_FAILED" });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.delete(users).where(eq(users.id, id));
    } catch (e) {
      throw new InfrastructureError("Database error on deleting user", { cause: e, code: "DB_DELETE_FAILED" });
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const row = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (row.length === 0) return null;
      const r = row[0];
      return r ? new User(r.email, r.name ?? null, r.password, r.role, r.id, r.createdAt) : null;
    } catch (e) {
      throw new InfrastructureError("Database error on findByEmail", { cause: e, code: "DB_FIND_BY_EMAIL_FAILED" });
    }
  }
}
