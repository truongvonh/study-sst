import { ObjectId } from "mongodb";

export interface ActionSchema {
  _id: ObjectId;
  vendor: ObjectId;
  name: ActionName;
  body: Body;
  headers: Header;
  endpoint: string;
  user: ObjectId;
  description: string;
  method: string;
  response: { [key: string]: unknown };
  lastRequestTime: number;
  reConnectAfterMs: number;
  type: string;
}

export interface ID {
  $oid: string;
}

export interface Body {
  email: string;
  password: string;
}

export interface Header {
  "x-coinstrat-secret": string;
}

export interface LastRequestTime {
  $date: Date;
}

export interface Response {}

export enum ActionName {
  Authentication = "authentication",
  ExchangeToken = "swapToken",
  GetBalance = "getBalance",
}
