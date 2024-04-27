import AWS from "aws-sdk";
import { Config } from "sst/node/config";

const sqs = new AWS.SQS({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: Config.AUTH_ACCESS_KEY_ID,
    secretAccessKey: Config.AUTH_SECRET_ACCESS_KEY,
  },
});

const dispatchQueue = <T>(queueUrl: string, message: T) => {
  return sqs
    .sendMessage({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
    })
    .promise();
};

export { dispatchQueue };
