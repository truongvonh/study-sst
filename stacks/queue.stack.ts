import { Queue, StackContext } from "sst/constructs";

import { userQueueConsumer } from "@function/user/consumer-define";

export function QueueConfirmAuthStack({ stack }: StackContext) {
  const queue = new Queue(stack, "QueueUserConfirmAuth", {
    ...userQueueConsumer,
  });

  stack.addOutputs({
    QueueConfirmAuth: queue.queueUrl,
  });
}
