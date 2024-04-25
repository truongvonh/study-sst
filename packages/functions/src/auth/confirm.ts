import { AppResponse, throwExceptionIf } from "@core/shared";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { LambdaFunctionURLEvent } from "aws-lambda";
import createHttpError from "http-errors";
import { IConfirmPayload, confirm } from "./cognito.service";

const process = async (evt: LambdaFunctionURLEvent) => {
  const [err, res] = await confirm(evt.body as unknown as IConfirmPayload);

  throwExceptionIf(err, createHttpError.BadRequest, err?.message);

  return new AppResponse()
    .setData(res)
    .setMessage("confirm-user-success")
    .responseServerless();
};

export const handler = middy(process)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
