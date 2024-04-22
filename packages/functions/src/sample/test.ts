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

  console.log({ lambdaEvent });

  const data = await mongoDB
    .collection(DatabaseCollectionEnum.Strategy)
    .find()
    .toArray();

  return new AppResponse()
    .setData(data)
    .setMessage("test-lambda-success")
    .responseServerless();
};

// const handler = middy<APIGatewayProxyHandlerV2WithJWTAuthorizer>(process)
// .use(jsonBodyParser())
// .use(httpErrorHandler());

export { handler };
