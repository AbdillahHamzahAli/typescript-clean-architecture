import { User } from "@/domain/entities/User";
import type { IUserRepository } from "../interfaces/IUserRepository";
import type { CreateUserRequest, UserResponse } from "@/domain/dto/User";
import { ApplicationError } from "@/shared/errors/errors";

export class CreateUser {
  constructor(private repo: IUserRepository) {}

  async execute(req: CreateUserRequest): Promise<UserResponse> {
    const existing = await this.repo.findByEmail(req.email);
    if (existing)
      throw new ApplicationError("Email already exists", {
        status: 409,
        code: "EMAIL_DUPLICATE",
      });

    const name = req.name ?? null;
    const hashPassword = await Bun.password.hash(req.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = new User(req.email, name, hashPassword, req.role);
    const created = await this.repo.create(user);

    const resp: UserResponse = {
      id: created.id,
      name: created.name ?? "",
      email: created.email,
      role: created.role,
    };

    return resp;
  }
}
