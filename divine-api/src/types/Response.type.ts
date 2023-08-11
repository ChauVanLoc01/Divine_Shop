export type SuccessResponse<T> = {
  message: string;
  data: T;
};
export type FailResponse = {
  status_code: number;
  message: string;
};
export type ValidationFailResponse = {
  status_code: number;
  message: string;
  errors: {
    [key: string]: {
      [property: string]: string;
    };
  };
};
