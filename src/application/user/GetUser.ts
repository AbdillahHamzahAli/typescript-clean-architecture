import type { IUserRespository } from "../interfaces/IUserRespository";

export class GetUsers {
  constructor(private repo: IUserRespository) {}

  async execute() {
    return await this.repo.findAll();
  }
}
