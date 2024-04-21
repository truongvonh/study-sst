import createHttpError from "http-errors";

export const throwExceptionIf = (
  errorCondition: unknown | string | boolean,
  errorExceptionAble: new (message: string) => createHttpError.HttpError,
  message?: string,
  cbFn?: () => void
) => {
  if (errorCondition) {
    cbFn?.();
    throw new errorExceptionAble(message || "Internal Server Error");
  }
};
