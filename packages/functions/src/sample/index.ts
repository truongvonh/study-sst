import { getFuncHandler } from "src/0.1.shared/lambda.shared";
import { ApiGatewayV1ApiRouteProps } from "sst/constructs";

const routerSample: Record<string, ApiGatewayV1ApiRouteProps<"jwt">> = {
  "GET /test/v3": getFuncHandler("sample/test.handler"),
};
export { routerSample };
