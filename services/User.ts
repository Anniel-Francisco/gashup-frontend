import http from "@/utils/http";

export async function updateUser(id: string, body: FormData) {
  return http.put(`user/updateUser/${id}`, body).then((data) => data);
}

export async function getUserById(id: string) {
  return http.get(`user/getuser/${id}`).then((data) => data);
}

export async function followUser(body: { userToFollow: string }, id: string) {
  return http.put(`user/follow/${id}`, body).then((data) => data);
}

export async function unfollowUser(body: { userToUnFollow: string }, id: string) {
  return http.put(`user/unfollow/${id}`, body).then((data) => data);
}
