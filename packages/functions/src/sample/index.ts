import { ApiGatewayV1ApiRouteProps } from "sst/constructs";

const getFuncHandler = (func: string) => "packages/functions/src/".concat(func);

const routerSample: Record<string, ApiGatewayV1ApiRouteProps<string>> = {
  "GET /test/v3": getFuncHandler("sample/test.handler"),
};
export { routerSample };
