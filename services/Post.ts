import http from "@/utils/http";

// TYPES
import { IPost, ISubComment } from "@/types/post";
import { IComment } from "@/types/post";

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

export async function responseComment(body: ISubComment) {
  return http.post(`post/responseComment`, body).then((data) => data);
}

// GET

export async function getAllPostByCommunity(id: string) {
  const noCache = `noCache=${new Date().getTime()}`;
  return http
    .get(`post/getAllPostByCommunity/${id}??${noCache}`)
    .then((data) => data);
}

export async function getPostById(id: string) {
  return http.get(`post/getPostById/${id}`).then((data) => data);
}

export async function getCommentsByPost(id: string) {
  return http.get(`post/getCommentsByPost/${id}`).then((data) => data);
}

export async function getSubCommentsByComment(id: string) {
  return http.get(`post/getSubCommentsByComment/${id}`).then((data) => data);
}

export async function getTimeLine(id: string | null) {
  const noCache = `noCache=${new Date().getTime()}`;
  return http.post(`post/timeLine??${noCache}`, { id }).then((data) => data);
}

export async function getPolular() {
  return http.get(`post/popularPost`).then((data) => data);
}

export async function getPostByUserId(id: string) {
  return http.get(`post/userProfile/${id}`).then((data) => data);
}

// PUT

export async function updatePost(id: string, body: IPost) {
  return http.put(`post/updatePost/${id}`, body).then((data) => data);
}

export async function likePost(id: string, user: string) {
  return http.put(`post/likePost/${id}`, { user }).then((data) => data);
}

export async function likeComment(id: string, user: string) {
  return http.put(`post/likeComment/${id}`, { user }).then((data) => data);
}

export async function likeSubComment(id: string, user: string) {
  return http.put(`post/likeSubComment/${id}`, { user }).then((data) => data);
}

export async function updateComment(id: string, body: IComment) {
  return http.put(`post/updateComment/${id}`, body).then((data) => data);
}

export async function updateSubComment(id: string, body: ISubComment) {
  return http
    .put(`post/updateResponseComment/${id}`, body)
    .then((data) => data);
}

// DELETE

export async function deletePost(id: string) {
  return http.delete(`post/deletePost/${id}`).then((data) => data);
}

export async function deleteComment(id: string) {
  return http.delete(`post/deleteComment/${id}`).then((data) => data);
}

export async function deleteSubComment(id: string) {
  return http.delete(`post/deleteResponseComment/${id}`).then((data) => data);
}
