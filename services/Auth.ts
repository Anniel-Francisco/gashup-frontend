import http from "@/utils/http";

// TYPES
import { IUser } from "@/types/user";

type LogiDataType = Pick<IUser, "email" | "password">;

export async function logIn(body: LogiDataType) {
  return http.post(`/api/auth/login`, body).then((data) => data);
}
export async function signUp(body: IUser) {
  const formData = new FormData();
  formData.append("code", body.code);
  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password);
  formData.append("phone", body.phone);
  if (body.img) {
    formData.append("img", body.img);
  }
  return http.post(`/api/user/createUser`, formData).then((data) => data);
}

export async function updateUser(id: string, body: IUser) {
  return http.put(`/api/user/updateUser/${id}`, body).then((data) => data);
}
