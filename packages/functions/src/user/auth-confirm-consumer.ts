import { SQSEvent } from "aws-lambda";

export const handler = (event: SQSEvent) => {
  const records: any[] = event.Records;
  console.log(`Message processed: "${records[0].body}"`);

  return {};
};
