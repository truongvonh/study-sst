import { routerSample } from "@function/sample/router-define";
import { routerWallet } from "@function/wallet/router-define";
import { ApiGatewayV1Api, Cognito, StackContext } from "sst/constructs";
import { secrets } from "./secret.stack";

export function StackPrivateStack({ stack }: StackContext) {
  const auth = new Cognito(stack, "Auth", {
    login: ["email", "phone"],
  });

  const restAPIPrivate = new ApiGatewayV1Api(stack, "restAPIPrivate", {
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

  auth.attachPermissionsForAuthUsers(stack, [restAPIPrivate]);
  restAPIPrivate.addRoutes(stack, routerSample);
  restAPIPrivate.addRoutes(stack, routerWallet);
  restAPIPrivate.bind(secrets);

  stack.addOutputs({
    ApiGatewayV1Api: restAPIPrivate.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });
}
