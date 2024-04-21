import { getFuncHandler } from "src/0.1.shared/lambda.shared";
import { ApiGatewayV1ApiRouteProps } from "sst/constructs";

const routerAuth: Record<string, ApiGatewayV1ApiRouteProps<string>> = {
  "POST /auth/register": getFuncHandler("auth/register.handler"),
  "POST /auth/confirm": getFuncHandler("auth/confirm.handler"),
};
export { routerAuth };
