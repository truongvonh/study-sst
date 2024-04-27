export interface ILambdaEventWithJWTAuth {
  resource: string;
  path: string;
  httpMethod: string;
  headers: Headers;
  multiValueHeaders: { [key: string]: string[] };
  queryStringParameters: null;
  multiValueQueryStringParameters: null;
  pathParameters: null;
  stageVariables: null;
  requestContext: RequestContext;
  body: null;
  isBase64Encoded: boolean;
}

export interface Headers {
  Accept: string;
  "Accept-Encoding": string;
  Authorization: string;
  "Cache-Control": string;
  "CloudFront-Forwarded-Proto": string;
  "CloudFront-Is-Desktop-Viewer": string;
  "CloudFront-Is-Mobile-Viewer": string;
  "CloudFront-Is-SmartTV-Viewer": string;
  "CloudFront-Is-Tablet-Viewer": string;
  "CloudFront-Viewer-ASN": string;
  "CloudFront-Viewer-Country": string;
  Host: string;
  "Postman-Token": string;
  "User-Agent": string;
  Via: string;
  "X-Amz-Cf-Id": string;
  "X-Amzn-Trace-Id": string;
  "X-Forwarded-For": string;
  "X-Forwarded-Port": string;
  "X-Forwarded-Proto": string;
}

export interface RequestContext {
  resourceId: string;
  authorizer: Authorizer;
  resourcePath: string;
  httpMethod: string;
  extendedRequestId: string;
  requestTime: string;
  path: string;
  accountId: string;
  protocol: string;
  stage: string;
  domainPrefix: string;
  requestTimeEpoch: number;
  requestId: string;
  identity: Identity;
  domainName: string;
  deploymentId: string;
  apiId: string;
}

export interface Authorizer {
  claims: Claims;
}

export interface Claims {
  sub: string;
  email_verified: string;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: string;
  exp: string;
  iat: string;
  jti: string;
  email: string;
}

export interface Identity {
  cognitoIdentityPoolId: null;
  accountId: null;
  cognitoIdentityId: null;
  caller: null;
  sourceIp: string;
  principalOrgId: null;
  accessKey: null;
  cognitoAuthenticationType: null;
  cognitoAuthenticationProvider: null;
  userArn: null;
  userAgent: string;
  user: null;
}
export interface Welcome {
  resource: string;
  path: string;
  httpMethod: string;
  headers: Headers;
  multiValueHeaders: { [key: string]: string[] };
  queryStringParameters: null;
  multiValueQueryStringParameters: null;
  pathParameters: null;
  stageVariables: null;
  requestContext: RequestContext;
  body: null;
  isBase64Encoded: boolean;
}

export interface Headers {
  Accept: string;
  "Accept-Encoding": string;
  Authorization: string;
  "Cache-Control": string;
  "CloudFront-Forwarded-Proto": string;
  "CloudFront-Is-Desktop-Viewer": string;
  "CloudFront-Is-Mobile-Viewer": string;
  "CloudFront-Is-SmartTV-Viewer": string;
  "CloudFront-Is-Tablet-Viewer": string;
  "CloudFront-Viewer-ASN": string;
  "CloudFront-Viewer-Country": string;
  Host: string;
  "Postman-Token": string;
  "User-Agent": string;
  Via: string;
  "X-Amz-Cf-Id": string;
  "X-Amzn-Trace-Id": string;
  "X-Forwarded-For": string;
  "X-Forwarded-Port": string;
  "X-Forwarded-Proto": string;
}

export interface RequestContext {
  resourceId: string;
  authorizer: Authorizer;
  resourcePath: string;
  httpMethod: string;
  extendedRequestId: string;
  requestTime: string;
  path: string;
  accountId: string;
  protocol: string;
  stage: string;
  domainPrefix: string;
  requestTimeEpoch: number;
  requestId: string;
  identity: Identity;
  domainName: string;
  deploymentId: string;
  apiId: string;
}

export interface Authorizer {
  claims: Claims;
}

export interface Claims {
  sub: string;
  email_verified: string;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: string;
  exp: string;
  iat: string;
  jti: string;
  email: string;
}

export interface Identity {
  cognitoIdentityPoolId: null;
  accountId: null;
  cognitoIdentityId: null;
  caller: null;
  sourceIp: string;
  principalOrgId: null;
  accessKey: null;
  cognitoAuthenticationType: null;
  cognitoAuthenticationProvider: null;
  userArn: null;
  userAgent: string;
  user: null;
}
