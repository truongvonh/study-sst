import { routerSample } from "@function/sample";
import { ApiGatewayV1Api, StackContext } from "sst/constructs";
import { getSecret } from "./secret.stack";

export function APIStack({ stack }: StackContext) {
  const secrets = getSecret({ stack } as StackContext);

  const restAPIV2 = new ApiGatewayV1Api(stack, "restAPI");

  restAPIV2.addRoutes(stack, routerSample);

  restAPIV2.bind(secrets);

  stack.addOutputs({ ApiGatewayV1Api: restAPIV2.url });
}
