import { DatabaseCollectionEnum, connectToMongo } from "@core/databases";
import { AppResponse } from "@core/shared";
import {
  APIGatewayProxyHandlerV2WithJWTAuthorizer,
  LambdaFunctionURLEvent,
} from "aws-lambda";

const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (
  lambdaEvent: LambdaFunctionURLEvent
) => {
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

export { handler };
