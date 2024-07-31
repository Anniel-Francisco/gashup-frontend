import { useState } from "react";
import { IResponse, IError } from "@/types/response";
import { IPost } from "@/types/post";
import { createPost, getAllPostByCommunity, likePost } from "@/services/Post";
import {
  createCommunity,
  getCategories,
  getCommunities,
  getCommunity,
  getHotCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
  findCommunity,
  createCommunityChat,
  updateCommunityChat,
  findCommunityChats,
} from "@/services/Community";
import { ICommunity } from "@/types/community";

type UseReponseType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useGetCommunities = (): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getCommunities();
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

export const useGetCommunity = (
  id: string,
  user_id: string
): UseReponseType => {
  const [loadingCommunity, setLoadingCommunity] = useState<boolean>(false);
  async function loadCommunity(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingCommunity(true);
      const data = await getCommunity(id, user_id);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingCommunity(false);
    }
  }

  return [
    //states
    loadingCommunity,
    //methods
    loadCommunity,
  ];
};

export const useGetHotCommunities = (): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getHotCommunity();
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

export const useGetCategories = (): UseReponseType => {
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  async function loadCategories(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingCategories(true);
      const data = await getCategories();
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingCategories(false);
    }
  }

  return [
    //states
    loadingCategories,
    //methods
    loadCategories,
  ];
};

export const useJoinCommunity = (
  id: string,
  objectData: Object
): UseReponseType => {
  const [loadingJoin, setLoadingJoin] = useState<boolean>(false);
  async function loadJoin(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingJoin(true);
      const data = await joinCommunity(id, objectData);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingJoin(false);
    }
  }

  return [
    //states
    loadingJoin,
    //methods
    loadJoin,
  ];
};

export const useLeaveCommunity = (
  id: string,
  objectData: Object
): UseReponseType => {
  const [loadingLeave, setLoadingLeave] = useState<boolean>(false);
  async function loadLeave(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingLeave(true);
      const data = await leaveCommunity(id, objectData);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingLeave(false);
    }
  }

  return [
    //states
    loadingLeave,
    //methods
    loadLeave,
  ];
};

export const useCreateCommunity = (objectData: ICommunity): UseReponseType => {
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  async function loadCreate(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingCreate(true);
      const data = await createCommunity(objectData);
      return { response: data, error: null };
    } catch (error: any) {
      return { response: null, error: error };
    } finally {
      setLoadingCreate(false);
    }
  }

  return [
    //states
    loadingCreate,
    //methods
    loadCreate,
  ];
};

export const useUpdateCommunity = (
  id: string,
  objectData: ICommunity
): UseReponseType => {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  async function loadUpdate(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingUpdate(true);
      const data = await updateCommunity(id, objectData);
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

export const useFindCommunity = (id: string): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await findCommunity(id);
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

export const useCreateCommunityChat = (body: any): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("img", body.img);
  formData.append("chatOwner_id", body.chatOwner_id);
  formData.append("community_id", body.community_id);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await createCommunityChat(formData);
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
export const useUpdateCommunityChat = (
  id: string,
  body: any
): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("img", body.img);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await updateCommunityChat(id, formData);
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
export const useFindCommunityChats = (
  id: string,
  userId: string
): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await findCommunityChats(id, userId);
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
