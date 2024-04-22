import { SSTConfig } from "sst";
import { StackAPIAuthenticate } from "stacks/api-auth.stack";
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
    app.stack(SecretStack).stack(StackAPIAuthenticate).stack(StackPrivateStack);
  },
} satisfies SSTConfig;
