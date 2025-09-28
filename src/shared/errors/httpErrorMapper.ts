import { ZodError } from "zod";
import { ApplicationError, InfrastructureError } from "./errors";

export const errorToHttp = (err: unknown): { status: number; message: string; error?: any } => {
  // Zod validation
  if (err instanceof ZodError) {
    return {
      status: 400,
      message: "Validation error",
      error: err.flatten(),
    };
  }

  // Application layer errors
  if (err instanceof ApplicationError) {
    return {
      status: err.status ?? 400,
      message: err.message,
      error: err.code ? { code: err.code } : undefined,
    };
  }

  // Infrastructure errors (DB/IO)
  if (err instanceof InfrastructureError) {
    return {
      status: 503,
      message: "Service unavailable",
      error: { code: err.code, message: err.message },
    };
  }

  // Unknown/runtime
  const message = err instanceof Error ? err.message : "Internal server error";
  return { status: 500, message };
};
