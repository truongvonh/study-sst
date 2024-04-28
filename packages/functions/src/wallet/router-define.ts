import { getFuncHandler } from "src/shared/lambda.shared";
import { ApiGatewayV1ApiRouteProps } from "sst/constructs";

const routerWallet: Record<string, ApiGatewayV1ApiRouteProps<"jwt">> = {
  "GET /wallet/sync": getFuncHandler("wallet/sync/lambda.handler"),
};
export { routerWallet };
