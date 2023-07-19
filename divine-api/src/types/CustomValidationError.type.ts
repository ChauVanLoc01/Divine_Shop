export type CustomValidationError = {
  property: string;
  errors: {
    [index: string]: string;
  };
};
