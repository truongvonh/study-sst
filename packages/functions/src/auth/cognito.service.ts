import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Config } from "sst/node/config";

const poolData = {
  UserPoolId: Config.USER_POOL_ID,
  ClientId: Config.CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

export interface IRegisterPayload {
  email: string;
  password: string;
}

const register = (
  payload: IRegisterPayload
): Promise<[Error | undefined, unknown]> => {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      payload.email,
      payload.password,
      [],
      [],
      (err, authResponse) => {
        return resolve([err, authResponse]);
      }
    );
  });
};

export interface IConfirmPayload {
  email: string;
  verifyCode: string;
}

const confirm = (
  payload: IConfirmPayload
): Promise<[Error | undefined, unknown]> => {
  const cognitoUser = new CognitoUser({
    Username: payload.email,
    Pool: userPool,
  });

  return new Promise((resolve, reject) =>
    cognitoUser.confirmRegistration(
      payload.verifyCode,
      true,
      function (err, confirmResponse) {
        return resolve([err, confirmResponse]);
      }
    )
  );
};

export { confirm, register };
