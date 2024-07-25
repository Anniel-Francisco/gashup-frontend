import { IUser } from "./user";
import { IPost } from "./post";
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
  posts?: IPost[];
  data?: any;
}

export interface IError {
  message: string;
  response: IResponse;
}
