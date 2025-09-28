import z, { email } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email(),
  password: z.string(),
  role: z.number().default(1),
});
