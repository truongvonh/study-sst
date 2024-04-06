import { AppConfigEnum } from "@core/shared";
import { Config, StackContext } from "sst/constructs";

export function getSecret({ stack }: StackContext) {
  const mongoDBUrl = new Config.Secret(
    stack,
    AppConfigEnum.MONGODB_CONNECTION_URL
  );

  return [mongoDBUrl];
}
