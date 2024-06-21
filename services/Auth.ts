import http from "@/utils/http";

// TYPES
import { IUser } from "@/types/user";

type LogiDataType = Pick<IUser, "email" | "password">;

export async function LogIn(body: LogiDataType) {
  return http.post(`/api/auth/login`, body).then((data) => data);
}
export async function SignUp(body: IUser) {
  return http.post(`/api/user/createUser`, body).then((data) => data);
}
