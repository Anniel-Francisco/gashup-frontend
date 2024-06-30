import http from "@/utils/http";

// TYPES
import { IPost } from "@/types/post";

// POST

export async function createPost(body: IPost) {
  console.log(body)
  const formData = new FormData();

  Object.keys(body).forEach((key) => {
    if (key !== "images") {
      const value = body[key as keyof IPost];
      if (typeof value === "string") {
        formData.append(key, value);
      }
    }
  });

  // Verifica si body.images existe y tiene elementos
  if (body.images && body.images.length > 0) {
    for (let file of body.images) {
      formData.append("img", file);
    }
  }

  return http.post(`post/createPost`, formData).then((data) => data);
}

// GET

export async function getAllPostByCommunity(id: string) {
  return http.get(`post/getAllPostByCommunity/${id}`).then((data) => data);
}

// PUT

export async function updatePost(id: string, body: IPost) {
  return http.put(`post/updatePost/${id}`, body).then((data) => data);
}

export async function likePost(id: string, user: string) {
  return http.put(`post/likePost/${id}`, { user }).then((data) => data);
}

// DELETE

export async function deletePost(id: string) {
  return http.delete(`post/deletePost/${id}`).then((data) => data);
}
