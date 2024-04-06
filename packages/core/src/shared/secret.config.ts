import { Config, ConfigTypes } from "sst/node/config";

export enum AppConfigEnum {
  MONGODB_CONNECTION_URL = "MONGODB_CONNECTION_URL",
}

export interface IAppConfig extends ConfigTypes {
  MONGODB_CONNECTION_URL: string;
}

export const getAppConfig = (config: AppConfigEnum) => {
  return (Config as IAppConfig)[config];
};
