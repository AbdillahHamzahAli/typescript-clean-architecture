import type { CreateUser } from "@/application/user/CreateUser";
import type { DeleteUser } from "@/application/user/DeleteUser";
import type { GetUsers } from "@/application/user/GetUser";
import { createUserSchema } from "../validators/userValidator";

export class UserController {
  constructor(private createUser: CreateUser, private getUsers: GetUsers, private deleteUser: DeleteUser) {}

  create = async (req: Request): Promise<Response> => {
    try {
      const body = createUserSchema.parse(await req.json());
      const user = await this.createUser.execute(body);
      return new Response(JSON.stringify(user), { status: 201 });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  list = async (): Promise<Response> => {
    const users = await this.getUsers.execute();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  delete = async (req: Request): Promise<Response> => {
    const id = new URL(req.url).searchParams.get("id");
    if (!id)
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    await this.deleteUser.execute(id);
    return new Response(null, { status: 204 });
  };
}
