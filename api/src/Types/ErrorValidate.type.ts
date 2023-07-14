export type ErrorValidate = {
  property: string;
  errors: {
    [index: string]: string;
  };
};
