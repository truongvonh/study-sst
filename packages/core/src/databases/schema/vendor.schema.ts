import { ObjectId } from "mongodb";

export interface VendorSchema {
  _id: ObjectId;
  name: VendorName;
  apiUrl: string;
}

export enum VendorName {
  Coinstrat = "coinstrat",
  Binance = "binance",
}
