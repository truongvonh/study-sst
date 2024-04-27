import { getFuncHandler } from "src/shared/lambda.shared";
import { QueueProps } from "sst/constructs";

const userQueueConsumer: QueueProps = {
  consumer: getFuncHandler("user/auth-confirm-consumer.handler"),
};
export { userQueueConsumer };
