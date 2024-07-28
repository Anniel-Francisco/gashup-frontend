import http from "@/utils/http";

// TYPES
import { IPost } from "@/types/post";
import { ICommunity } from "@/types/community";

// POST

// export async function createPost(body: IPost) {
//   return http.post(`post/createPost`, formData).then((data) => data);
// }

// GET

export async function getCommunities() {
  return http.get(`community/getCommunities`).then((data) => data);
}

export async function getCommunity(id: string, user_id: string) {
  const noCache = `noCache=${new Date().getTime()}`;
  return http
    .get(`community/getCommunity/${id}/${user_id}??${noCache}`)
    .then((data) => data);
}

export async function getHotCommunity() {
  return http.get(`community/hotCommunity`).then((data) => data);
}

export async function getCategories() {
  return http.get(`community/getCategories`).then((data) => data);
}

export async function findCommunity(id: string) {
  return http.get(`community/findCommunity/${id}`).then((data) => data);
}

export async function findCommunityChats(id: string, userId: string) {
  return http
    .get(`community/findCommunityChats/${id}/${userId}`)
    .then((data) => data);
}

// POST

export async function createCommunity(data: ICommunity) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICommunity];
    //  if (typeof value === "string") {
    //  formData.append(key, value);
    //  }

    if (typeof value !== "string" && !(value instanceof Blob)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return http.post(`community/createCommunity`, formData).then((data) => data);
}

export async function joinCommunity(id: string, data: Object) {
  return http.post(`community/joinCommunity/${id}`, data).then((data) => data);
}

export async function leaveCommunity(id: string, data: Object) {
  return http.post(`community/leaveCommunity/${id}`, data).then((data) => data);
}

export async function createCommunityChat(body: FormData) {
  return http.post(`community/createChatCommunity`, body).then((data) => data);
}
// PUT

export async function updateCommunity(id: string, data: ICommunity) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICommunity];
    //  if (typeof value === "string") {
    //  formData.append(key, value);
    //  }

    if (typeof value !== "string" && !(value instanceof Blob)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });
  const noCache = `noCache=${new Date().getTime()}`;

  return http
    .put(`community/updateCommunity/${id}??${noCache}`, formData)
    .then((data) => data);
}

export async function likePost(id: string, user: string) {
  return http.put(`post/likePost/${id}`, { user }).then((data) => data);
}

// DELETE

export async function deletePost(id: string) {
  return http.delete(`post/deletePost/${id}`).then((data) => data);
}
