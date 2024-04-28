import { connectToMongo, DatabaseCollectionEnum } from "@core/databases";
import {
  ActionName,
  ActionSchema,
  UserSchema,
  VendorName,
  VendorSchema,
} from "@core/databases/schema";
import axios, { AxiosHeaders, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { BadRequest, NotFound } from "http-errors";
import { attempt, isEmpty } from "lodash";

const connectToVendor = async (email: string, vendorName: VendorName) => {
  const mongoDB = await connectToMongo();

  const userPromise = mongoDB
    .collection(DatabaseCollectionEnum.User)
    .findOne<UserSchema>({ email } as UserSchema);

  const vendorPromise = mongoDB
    .collection(DatabaseCollectionEnum.Vendor)
    .findOne<VendorSchema>({ name: vendorName } as VendorSchema);

  const [user, vendor] = await Promise.all([userPromise, vendorPromise]);

  if (isEmpty(user)) throw new NotFound("not-found-user");

  if (isEmpty(vendor)) throw new NotFound("not-found-vendor");

  const auth = await mongoDB
    .collection(DatabaseCollectionEnum.Action)
    .findOne<ActionSchema>({
      user: user._id,
      name: ActionName.Authentication,
    } as ActionSchema);

  if (isEmpty(auth)) throw new NotFound("not-found-auth-action");

  const { lastRequestTime, reConnectAfterMs } = auth;

  const validAuth = lastRequestTime + reConnectAfterMs > dayjs().valueOf();

  if (validAuth) return { auth, user, vendor };

  const authRes = await attempt<Promise<AxiosResponse<string, any>>>(axios, {
    method: auth.method,
    headers: auth.headers as unknown as AxiosHeaders,
    baseURL: vendor.apiUrl.concat(auth?.endpoint),
    data: auth.body,
  });

  if (authRes instanceof Error) throw new BadRequest("connect-vendor-failed");

  auth.response = { Cookie: authRes.headers?.["set-cookie"]?.[0] };
  auth.lastRequestTime = dayjs().valueOf();

  await mongoDB
    .collection(DatabaseCollectionEnum.Action)
    .findOneAndUpdate({ _id: auth._id }, { $set: { ...auth } });

  return { auth, user, vendor };
};

const getVendorAction = async (vendor: VendorSchema, action: ActionName) => {
  const mongoDB = await connectToMongo();

  const actionDB = await mongoDB
    .collection(DatabaseCollectionEnum.Action)
    .findOne<ActionSchema>({
      name: action,
      vendor: vendor._id,
    } as ActionSchema);

  if (isEmpty(actionDB)) throw new NotFound("not-found-action");

  return actionDB;
};

export { connectToVendor, getVendorAction };
