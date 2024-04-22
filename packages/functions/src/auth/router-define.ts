import { getFuncHandler } from "src/shared/lambda.shared";
import { ApiGatewayV1ApiRouteProps } from "sst/constructs";

const routerAuth: Record<string, ApiGatewayV1ApiRouteProps<string>> = {
  "POST /auth/register": getFuncHandler("auth/register.handler"),
  "POST /auth/confirm": getFuncHandler("auth/confirm.handler"),
  "POST /auth/login": getFuncHandler("auth/login.handler"),
};
export { routerAuth };
