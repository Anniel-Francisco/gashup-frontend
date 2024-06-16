import http from "@/utils/http";

// TYPES
import { IUser } from "@/types/user";

export async function LogIn(body: IUser) {
  return http.post(``);
}
export async function SignUp(body: IUser) {
  return http.post(`/api/user/createUser`, body).then((data) => data);
}