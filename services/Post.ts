import http from "@/utils/http";

// TYPES
import { IPost } from "@/types/post";
import { BiBody } from "react-icons/bi";

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
export async function getAllPostByCommunity(id: string) {
  return http.get(`post/getAllPostByCommunity/${id}`).then((data) => data);
}

export async function updatePost(id: number, body: IPost) {
  return http.put(`post/updatePost/${id}`, body).then((data) => data);
}

export async function deletePost(id: number) {
  return http.delete(`post/deletePost/${id}`).then((data) => data);
}
