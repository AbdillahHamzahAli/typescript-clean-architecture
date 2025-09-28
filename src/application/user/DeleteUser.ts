import type { IUserRepository } from "../interfaces/IUserRepository";

export class DeleteUser {
  constructor(private repo: IUserRepository) {}

  async execute(id: string) {
    return await this.repo.delete(id);
  }
}
