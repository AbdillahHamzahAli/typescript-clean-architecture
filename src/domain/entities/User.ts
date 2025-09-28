import { randomUUID } from "crypto";

export class User {
  public constructor(
    public readonly email: string,
    public readonly name: string | null,
    public readonly password: string,
    public readonly role: number,
    public readonly id: string = randomUUID(),
    public readonly createdAt: Date = new Date()
  ) {}
}
