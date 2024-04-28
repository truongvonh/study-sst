import { DatabaseCollectionEnum, connectToMongo } from "@core/databases";
import {
  ActionName,
  VendorName,
  WalletAsset,
  WalletSchema,
} from "@core/databases/schema";
import { AssetSymbol, WalletType } from "@core/databases/schema/wallet.schema";
import { AppResponse } from "@core/shared";
import { ILambdaEventWithJWTAuth } from "@functions/shared/interfaces";
import { connectToVendor, getVendorAction } from "@functions/vendor/service";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import axios from "axios";
import dayjs from "dayjs";
import { IBalanceResponse } from "./balance-response.interface";

interface IQueryParams {
  asset: WalletAsset;
}

const run = async (lambdaEvent: ILambdaEventWithJWTAuth) => {
  const myEmail = lambdaEvent.requestContext.authorizer.claims.email;
  const query = lambdaEvent.queryStringParameters as unknown as IQueryParams;
  const mongoDB = await connectToMongo();

  const { auth, user, vendor } = await connectToVendor(
    myEmail,
    VendorName.Coinstrat
  );

  const getBalanceAction = await getVendorAction(vendor, ActionName.GetBalance);

  const balance = await axios<IBalanceResponse>({
    method: getBalanceAction.method,
    headers: { Cookie: auth.response["Cookie"] as string },
    baseURL: vendor.apiUrl,
    url: getBalanceAction.endpoint.replace("$coinKey", query.asset),
  });

  const wallet: Partial<WalletSchema> = {
    user: user._id,
    vendor: vendor._id,
    asset: query.asset,
    balance: balance?.data?.data?.detail?.coinAmount,
    updatedAt: dayjs().toDate(),
    // @ts-ignore
    symbol: AssetSymbol[query.asset],
    type: query.asset == WalletAsset.USDT ? WalletType.Buy : WalletType.Sell,
  };

  const walletDB = await mongoDB
    .collection(DatabaseCollectionEnum.Wallet)
    .findOneAndUpdate(
      { user: user._id, asset: query.asset } as WalletSchema,
      { $set: { ...wallet } },
      { upsert: true }
    );

  return new AppResponse()
    .setData(walletDB ?? wallet)
    .setMessage("sync-vendor-wallet-success")
    .responseServerless();
};

export const handler = middy().use(httpErrorHandler()).handler(run);
