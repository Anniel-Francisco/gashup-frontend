import { IUser } from "./user";

export interface IResponse {
  data: IDataResponse;
  status: number;
  user?: IUser;
}

export interface IDataResponse {
  mensaje: string;
  message: string;
  ok: boolean;
}

export interface IError {
  message: string;
  response: IResponse;
}
