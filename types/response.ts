import { IUser } from "./user";

export interface IResponse {
  data: IDataResponse;
  status: number;
  statusText: string;
}

export interface IDataResponse {
  mensaje?: string;
  message: string;
  ok: boolean;
  user?: IUser;
  data?: any
}

export interface IError {
  message: string;
  response: IResponse;
}
