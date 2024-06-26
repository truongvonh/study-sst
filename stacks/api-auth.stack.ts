import { routerAuth } from "@function/auth/router-define";
import { ApiGatewayV1Api, StackContext } from "sst/constructs";
import { secrets } from "./secret.stack";

export function StackAPIPublicForAuth({ stack }: StackContext) {
  const restAPIAuth = new ApiGatewayV1Api(stack, "restAPIAuthPublic", {
    defaults: {},
  });
  restAPIAuth.addRoutes(stack, routerAuth);
  restAPIAuth.bind(secrets);

  stack.addOutputs({
    ApiGatewayV1Api: restAPIAuth.url,
  });
}
