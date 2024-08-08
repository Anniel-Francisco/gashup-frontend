import { useState } from "react";
import { IResponse, IError } from "@/types/response";
import { IPost, ISubComment } from "@/types/post";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  deleteSubComment,
  getAllPostByCommunity,
  getPolular,
  getPostById,
  getSubCommentsByComment,
  getTimeLine,
  likeComment,
  likePost,
  likeSubComment,
  responseComment,
} from "@/services/Post";
import { getPostByUserId } from "@/services/Post";
import { IComment } from "@/types/post";
import { getCommentsByPost } from "@/services/Post";

type UseReponseType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useCreatePost = (body: IPost): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await createPost(body);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useCreateComment = (body: IComment): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await createComment(body);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useCreateSubComment = (body: ISubComment): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await responseComment(body);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useGetAllPostByCommunity = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getAllPostByCommunity(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useGetPostByUserId = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getPostByUserId(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useGetCommentsByPost = (id: string): UseReponseType => {
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  async function loadComments(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingComments(true);
      const data = await getCommentsByPost(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingComments(false);
    }
  }

  return [
    //states
    loadingComments,
    //methods
    loadComments,
  ];
};

export const useGetSubCommentsByComment = (id: string): UseReponseType => {
  const [loadingSubComments, setLoadingSubComments] = useState<boolean>(false);
  async function loadSubComments(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingSubComments(true);
      const data = await getSubCommentsByComment(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingSubComments(false);
    }
  }

  return [
    //states
    loadingSubComments,
    //methods
    loadSubComments,
  ];
};

export const useGetPostById = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getPostById(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useGetTimeLine = (id: string | null): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getTimeLine({ _id: id });
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useGetPopular = (): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getPolular();
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useLikePost = (id: string, userId: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await likePost(id, userId);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useLikeComment = (id: string, userId: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await likeComment(id, userId);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useUpdateComment = (id: string, body: IComment): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await updateComment(id, body);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useUpdateSubComment = (id: string, body: ISubComment): UseReponseType => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  async function loadUpdate(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingUpdate(true);
      const data = await updateSubComment(id, body);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingUpdate(false);
    }
  }

  return [
    //states
    loadingUpdate,
    //methods
    loadUpdate,
  ];
};

export const useDeletePost = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await deletePost(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useDeleteComment = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await deleteComment(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useLikeSubComment = (id: string, userId: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await likeSubComment(id, userId);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoading(false);
    }
  }

  return [
    //states
    loading,
    //methods
    load,
  ];
};

export const useDeleteSubComment = (id: string): UseReponseType => {
  const [loadingDeleteSub, setLoadingDeleteSub] = useState<boolean>(false);
  async function loadDeleteSub(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingDeleteSub(true);
      const data = await deleteSubComment(id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingDeleteSub(false);
    }
  }

  return [
    //states
    loadingDeleteSub,
    //methods
    loadDeleteSub,
  ];
};

