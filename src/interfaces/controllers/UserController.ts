import type { CreateUser } from "@/application/user/CreateUser";
import type { DeleteUser } from "@/application/user/DeleteUser";
import type { GetUsers } from "@/application/user/GetUser";
import type { UserResponse } from "@/domain/dto/User";
import { buildResponseSuccess, buildResponseError } from "@/shared/response/response";
import { errorToHttp } from "@/shared/errors/httpErrorMapper";
import { createUserSchema } from "../validators/userValidator";

export class UserController {
  constructor(private createUser: CreateUser, private getUsers: GetUsers, private deleteUser: DeleteUser) {}

  create = async (req: Request): Promise<Response> => {
    try {
      const body = createUserSchema.parse(await req.json());
      const user = await this.createUser.execute(body);
      return Response.json(buildResponseSuccess<UserResponse>("success", "User created", user), { status: 201 });
    } catch (err: any) {
      const mapped = errorToHttp(err);
      return Response.json(buildResponseError("error", mapped.message, mapped.error), { status: mapped.status });
    }
  };

  list = async (): Promise<Response> => {
    try {
      const users = await this.getUsers.execute();
      return Response.json(buildResponseSuccess<UserResponse[]>("success", "Users fetched", users), { status: 200 });
    } catch (err: any) {
      const mapped = errorToHttp(err);
      return Response.json(buildResponseError("error", mapped.message, mapped.error), { status: mapped.status });
    }
  };

  delete = async (req: Request): Promise<Response> => {
    try {
      const id = new URL(req.url).searchParams.get("id");
      if (!id) return Response.json(buildResponseError("error", "Missing id"), { status: 400 });

      await this.deleteUser.execute(id);
      return Response.json(buildResponseSuccess("success", "User deleted"), { status: 200 });
    } catch (err: any) {
      const mapped = errorToHttp(err);
      return Response.json(buildResponseError("error", mapped.message, mapped.error), { status: mapped.status });
    }
  };
}
