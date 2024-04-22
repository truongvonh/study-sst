import { AppConfigEnum } from "@core/shared";
import { Config, StackContext } from "sst/constructs";
import { Secret } from "sst/constructs/Secret";

let secrets: Secret[] = [];

export function SecretStack({ stack }: StackContext) {
  secrets = Object.values(AppConfigEnum).map(
    (secretVal) => new Config.Secret(stack, secretVal)
  );
}

export { secrets };
