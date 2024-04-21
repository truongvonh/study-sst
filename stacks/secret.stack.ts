import { AppConfigEnum } from "@core/shared";
import { Config, StackContext } from "sst/constructs";

export function getSecret({ stack }: StackContext) {
  return Object.values(AppConfigEnum).map(
    (config) => new Config.Secret(stack, config)
  );
}
