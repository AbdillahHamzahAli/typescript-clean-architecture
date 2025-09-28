export type ErrorCategory = "validation" | "application" | "infrastructure" | "runtime";

export class ApplicationError extends Error {
  category: ErrorCategory = "application";
  code?: string;
  status?: number;
  constructor(message: string, opts?: { code?: string; status?: number; cause?: unknown }) {
    super(message);
    this.name = "ApplicationError";
    this.code = opts?.code;
    this.status = opts?.status;
    if (opts?.cause) (this as any).cause = opts.cause;
  }
}

export class InfrastructureError extends Error {
  category: ErrorCategory = "infrastructure";
  code?: string;
  constructor(message: string, opts?: { code?: string; cause?: unknown }) {
    super(message);
    this.name = "InfrastructureError";
    this.code = opts?.code;
    if (opts?.cause) (this as any).cause = opts.cause;
  }
}

export class RuntimeError extends Error {
  category: ErrorCategory = "runtime";
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "RuntimeError";
    if (cause) (this as any).cause = cause;
  }
}
