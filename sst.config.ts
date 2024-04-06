import { SSTConfig } from "sst";
import { APIStack } from "./stacks/api.stack";

export default {
  config(_input) {
    return {
      name: "study-sst",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(APIStack);
  },
} satisfies SSTConfig;
