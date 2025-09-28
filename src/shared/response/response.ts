import { logger } from "../logging/logging";

export type Response<T> = {
  status: string;
  message: string;
  data?: T;
  error?: any;
};

export const buildResponseSuccess = <T>(status: string, message: string, data?: T): Response<T> => {
  return {
    status,
    message,
    data,
  };
};

export const buildResponseError = <T>(status: string, message: string, error?: any): Response<T> => {
  return {
    status,
    message,
    error,
  };
};
