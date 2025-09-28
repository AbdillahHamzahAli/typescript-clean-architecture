import type { CreateUser } from "@/application/user/CreateUser";
import type { DeleteUser } from "@/application/user/DeleteUser";
import type { GetUsers } from "@/application/user/GetUser";
import type { UserResponse } from "@/domain/dto/User";
import { buildResponse } from "@/shared/response";
import { createUserSchema } from "../validators/userValidator";

export class UserController {
  constructor(private createUser: CreateUser, private getUsers: GetUsers, private deleteUser: DeleteUser) {}

  create = async (req: Request): Promise<Response> => {
    try {
      const body = createUserSchema.parse(await req.json());
      const user = await this.createUser.execute(body);
      return Response.json(buildResponse<UserResponse>("success", "User created", user), { status: 201 });
    } catch (err: any) {
      return Response.json(buildResponse("error", err.message, undefined, err), { status: 400 });
    }
  };

  list = async (): Promise<Response> => {
    const users = await this.getUsers.execute();
    const items: UserResponse[] = users.map((u) => ({
      id: u.id,
      name: u.name ?? "",
      email: u.email,
      role: u.role,
    }));
    return Response.json(buildResponse<UserResponse[]>("success", "Users fetched", items), { status: 200 });
  };

  delete = async (req: Request): Promise<Response> => {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return Response.json(buildResponse("error", "Missing id"), { status: 400 });

    await this.deleteUser.execute(id);
    return Response.json(buildResponse("success", "User deleted"), { status: 200 });
  };
}
