import { SSTConfig } from "sst";
import { StackAPIPublicForAuth } from "stacks/api-auth.stack";
import { QueueConfirmAuthStack } from "stacks/queue.stack";
import { SecretStack } from "stacks/secret.stack";
import { StackPrivateStack } from "./stacks/api.stack";

export default {
  config(_input) {
    return {
      name: "study-sst",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app
      .stack(SecretStack)
      .stack(StackAPIPublicForAuth)
      .stack(StackPrivateStack)
      .stack(QueueConfirmAuthStack);
  },
} satisfies SSTConfig;
