import { useState } from "react";
import { IResponse, IError } from "@/types/response";
import { IPost } from "@/types/post";
import { createPost, getAllPostByCommunity, likePost } from "@/services/Post";
import {
  getCommunities,
  getCommunity,
  getHotCommunity,
  joinCommunity,
  leaveCommunity,
  findCommunity,
} from "@/services/Community";

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
  objectData: Object
): UseReponseType => {
  const [loadingCommunity, setLoadingCommunity] = useState<boolean>(false);
  async function loadCommunity(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoadingCommunity(true);
      const data = await getCommunity(id);
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
