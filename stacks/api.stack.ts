import { routerAuth } from "@function/auth/router-define";
import { routerSample } from "@function/sample";
import { ApiGatewayV1Api, Cognito, StackContext } from "sst/constructs";
import { getSecret } from "./secret.stack";

export function APIStack({ stack }: StackContext) {
  const secrets = getSecret({ stack } as StackContext);

  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  const restAPIV2 = new ApiGatewayV1Api(stack, "restAPI", {
    authorizers: {
      jwt: {
        type: "user_pools",
        userPoolIds: [auth.userPoolId],
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
    },
  });

  const restAPIAuth = new ApiGatewayV1Api(stack, "restAPIAuth");
  restAPIAuth.addRoutes(stack, routerAuth);
  restAPIAuth.bind(secrets);

  auth.attachPermissionsForAuthUsers(stack, [restAPIV2]);
  restAPIV2.addRoutes(stack, routerSample);
  restAPIV2.bind(secrets);

  stack.addOutputs({
    ApiGatewayV1Api: restAPIV2.url,
    UserPoolIds: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });
}
