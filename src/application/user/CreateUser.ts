import { User } from "@/domain/entities/User";
import type { IUserRespository } from "../interfaces/IUserRespository";
import type { CreateUserRequest, UserResponse } from "@/domain/dto/User";

export class CreateUser {
  constructor(private repo: IUserRespository) {}

  async execute(req: CreateUserRequest): Promise<UserResponse> {
    // Ensure there's no duplicate email
    const existing = await this.repo.findByEmail(req.email);
    if (existing) throw new Error("Email already exists");

    // Map optional name undefined -> null to match entity type
    const name = req.name ?? null;
    const hashPassword = await Bun.password.hash(req.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // Create and persist the user
    const user = new User(req.email, name, hashPassword, req.role);
    const created = await this.repo.create(user);

    // Map to response DTO
    const resp: UserResponse = {
      id: created.id,
      name: created.name ?? "",
      email: created.email,
      role: created.role,
    };

    return resp;
  }
}
