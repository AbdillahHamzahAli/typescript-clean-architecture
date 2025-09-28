export type CreateUserRequest = {
  name?: string;
  email: string;
  password: string;
  role: number;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  role: number;
};
