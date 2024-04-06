import { DatabaseCollectionEnum, connectToMongo } from "@core/databases";
import { AppResponse } from "@core/shared";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { LambdaFunctionURLEvent } from "aws-lambda";

const process = async (lambdaEvent: LambdaFunctionURLEvent) => {
  const mongoDB = await connectToMongo();

  const data = await mongoDB
    .collection(DatabaseCollectionEnum.Strategy)
    .find()
    .toArray();

  return new AppResponse()
    .setData(data)
    .setMessage("test-lambda-success")
    .responseServerless();
};

const handler = middy(process)
  // .use(jsonBodyParser())
  .use(httpErrorHandler());

export { handler };
