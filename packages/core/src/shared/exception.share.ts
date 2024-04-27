import createHttpError from "http-errors";

export const throwExceptionIf = (
  errorCondition: unknown | string | boolean,
  errorExceptionAble: new (message: string) => createHttpError.HttpError,
  message = "",
  stack?: string
) => {
  if (errorCondition) {
    console.log(new Error(stack));
    throw new errorExceptionAble(message || "Internal Server Error");
  }
};
