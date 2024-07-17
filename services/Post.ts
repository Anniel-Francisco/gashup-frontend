import http from "@/utils/http";

// TYPES
import { IPost } from "@/types/post";
import { IComment } from "@/types/community";

// POST

export async function createPost(body: IPost) {
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

export async function createComment(body: IComment) {
  return http.post(`post/comment`, body).then((data) => data);
}

// GET

export async function getAllPostByCommunity(id: string) {
  return http.get(`post/getAllPostByCommunity/${id}`).then((data) => data);
}

export async function getPostById(id: string) {
  return http.get(`post/getPostById/${id}`).then((data) => data);
}

export async function getCommentsByPost(id: string) {
  return http.get(`post/getCommentsByPost/${id}`).then((data) => data);
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
export async function getPostByUserId(id: string) {
  return http.get(`post/userProfile/${id}`).then((data) => data);
}
