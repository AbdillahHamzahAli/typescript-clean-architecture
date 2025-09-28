import type { UserResponse } from "@/domain/dto/User";
import type { IUserRepository } from "../interfaces/IUserRepository";

export class GetUsers {
  constructor(private repo: IUserRepository) {}

  async execute(): Promise<UserResponse[]> {
    const users = await this.repo.findAll();
    return users.map((u) => ({
      id: u.id,
      name: u.name ?? "",
      email: u.email,
      role: u.role,
    }));
  }
}
