import { UserRespository } from "@/infrastructure/repositories/UserRepository";
import { UserController } from "../controllers/UserController";
import { CreateUser } from "@/application/user/CreateUser";
import { GetUsers } from "@/application/user/GetUser";
import { DeleteUser } from "@/application/user/DeleteUser";

const repo = new UserRespository();
const controller = new UserController(new CreateUser(repo), new GetUsers(repo), new DeleteUser(repo));

type Handler = (req: Request) => Promise<Response>;
type RouteMap = Record<string, Partial<Record<"GET" | "POST" | "DELETE", Handler>>>;

export const userRoutes: RouteMap = {
  "/users": {
    GET: controller.list,
    POST: controller.create,
    DELETE: controller.delete,
  },
};
