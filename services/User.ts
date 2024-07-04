import http from "@/utils/http";

// TYPES
import { IUser } from "@/types/user";

export async function updateUser(id: string, body: IUser) {
  return http.put(`/user/updateUser/${id}`, body).then((data) => data);
}

export async function getUserById(id: string) {
  return http.get(`/user/getuser/${id}`).then((data) => data);
}
