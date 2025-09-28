import type { User } from "@/domain/entities/User";

export interface IUserRespository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
