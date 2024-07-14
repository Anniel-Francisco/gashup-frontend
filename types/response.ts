import { IUser } from "./user";

export interface IResponse {
  data: IDataResponse | any;
  status: number;
  statusText: string;
}

export interface IDataResponse {
  mensaje?: string;
  message: string;
  ok: boolean;
  user?: IUser;
}

export interface IError {
  message: string;
  response: IResponse;
}
