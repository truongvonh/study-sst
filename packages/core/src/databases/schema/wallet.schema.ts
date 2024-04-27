import { ObjectId } from "mongodb";

export interface WalletSchema {
  _id: ObjectId;
  user: ObjectId;
  vendor: ObjectId;
  asset: WalletAsset;
  balance: number;
  updatedAt: Date;
  symbol: string;
}

export enum WalletAsset {
  Bitcoin = "bitcoin",
  USDT = "usdt",
  Ethereum = "ethereum",
  Binance = "binancecoin",
}

export const AssetSymbol = {
  [WalletAsset.Bitcoin]: "BTCUSDT",
  [WalletAsset.Ethereum]: "ETHUSDT",
};
