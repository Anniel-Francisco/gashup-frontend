import http from "@/utils/http";

// TYPES
import { IPost } from "@/types/post";

// POST

// export async function createPost(body: IPost) {
//   return http.post(`post/createPost`, formData).then((data) => data);
// }

// GET

export async function getCommunity(id: string) {
  return http.get(`community/getCommunity/${id}`).then((data) => data);
}

export async function getHotCommunity() {
  return http.get(`community/hotCommunity`).then((data) => data);
}

// POST

export async function joinCommunity(id: string, data: Object) {
  return http.post(`community/joinCommunity/${id}`, data).then((data) => data);
}

export async function leaveCommunity(id: string, data: Object) {
  return http.post(`community/leaveCommunity/${id}`, data).then((data) => data);
}

// PUT

export async function updateCommunity(id: string, body: IPost) {
  return http.put(`community/updateCommunity/${id}`, body).then((data) => data);
}

export async function likePost(id: string, user: string) {
  return http.put(`post/likePost/${id}`, { user }).then((data) => data);
}

// DELETE

export async function deletePost(id: string) {
  return http.delete(`post/deletePost/${id}`).then((data) => data);
}
