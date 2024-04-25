import { AppResponse, throwExceptionIf } from "@core/shared";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { LambdaFunctionURLEvent } from "aws-lambda";
import createError from "http-errors";
import { IRegisterPayload, register } from "./cognito.service";

const process = async (evt: LambdaFunctionURLEvent) => {
  const [err, res] = await register(evt.body as unknown as IRegisterPayload);

  throwExceptionIf(err, createError.UnprocessableEntity, err?.message);

  return new AppResponse()
    .setData(res)
    .setMessage("sign-up-success")
    .responseServerless();
};
export const handler = middy(process)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
