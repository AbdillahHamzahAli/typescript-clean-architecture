import type { IUserRespository } from "../interfaces/IUserRespository";

export class DeleteUser {
  constructor(private repo: IUserRespository) {}

  async execute(id: string) {
    return await this.repo.delete(id);
  }
}
