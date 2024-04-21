import * as mongodb from "mongodb";
import { Config } from "sst/node/config";
import { DatabaseEnum } from "./mongodb.collection";

const MongoClient = mongodb.MongoClient;

let cachedDb: mongodb.Db | null = null;

export async function connectToMongo(db = DatabaseEnum.PotTrade) {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(Config.MONGODB_CONNECTION_URL);

  cachedDb = client.db(db);
  return cachedDb;
}
