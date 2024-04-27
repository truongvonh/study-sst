import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { ILambdaEventWithJWTAuth } from "src/shared/interfaces/lambda-gateway-jwt.interface";

const run = async (lambdaEvent: ILambdaEventWithJWTAuth) => {};

export const handler = middy().use(httpErrorHandler()).handler(run);
