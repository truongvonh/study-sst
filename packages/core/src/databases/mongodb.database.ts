import * as mongodb from "mongodb";
import { AppConfigEnum, getAppConfig } from "src/shared";
import { DatabaseEnum } from "./mongodb.collection";

const MongoClient = mongodb.MongoClient;

let cachedDb: mongodb.Db | null = null;

export async function connectToMongo(db = DatabaseEnum.PotTrade) {
  if (cachedDb) return cachedDb;

  const connectionUrl = getAppConfig(AppConfigEnum.MONGODB_CONNECTION_URL);
  const client = await MongoClient.connect(connectionUrl);

  cachedDb = client.db(db);
  return cachedDb;
}
