import { StatusCodes } from "http-status-codes";
export interface IMetadata {
  page?: number;
  limit?: number;
  total?: number;
}

export interface IResponseSuccess<T, M = IMetadata> {
  success: string;
  data: T;
  metaData?: M;
}

export interface IServerlessResponse {
  statusCode: StatusCodes;
  body: string;
}

export class AppResponse<T, M = IMetadata> {
  private data!: T;
  private metaData!: M;
  private message!: string;
  private status: StatusCodes = StatusCodes.OK;
  constructor() {}

  public setStatus(status: StatusCodes) {
    this.status = status;
    return this;
  }

  public setData(data: T) {
    this.data = data;
    return this;
  }

  public setMetaData(metaData: M) {
    this.metaData = metaData;
    return this;
  }
  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  private combineData() {
    const resData: IResponseSuccess<T, M> = {
      success: this.message,
      data: this.data,
      metaData: this.metaData,
    };

    return resData;
  }

  public responseServerless() {
    const serverlessRes: IServerlessResponse = {
      statusCode: this.status,
      body: JSON.stringify(this.combineData()),
    };

    return serverlessRes;
  }

  public response() {
    return this.combineData();
  }
}
