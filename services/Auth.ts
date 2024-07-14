import http from "@/utils/http";

// TYPES
import { IUser } from "@/types/user";

type LogiDataType = Pick<IUser, "email" | "password">;

export async function logIn(body: LogiDataType) {
  return http.post(`/auth/login`, body).then((data) => data);
}
export async function signUp(body: FormData) {
  return http.post(`/user/createUser`, body).then((data) => data);
}
