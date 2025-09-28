export type Response<T> = {
  status: string;
  message: string;
  data?: T;
  error?: any;
};

export const buildResponse = <T>(status: string, message: string, data?: T, error?: any): Response<T> => {
  return {
    status,
    message,
    data,
    error,
  };
};
