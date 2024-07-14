import { useState } from "react";
import { IResponse, IError } from "@/types/response";
import { IPost } from "@/types/post";
import { createPost, getAllPostByCommunity, likePost } from "@/services/Post";
import { getCommunity } from "@/services/Community";

type UseReponseType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

// export const useCreatePost = (body: IPost): UseReponseType => {
//   const [loading, setLoading] = useState<boolean>(false);
//   async function load(): Promise<{
//     response: IResponse | null;
//     error: IError | null;
//   }> {
//     try {
//       setLoading(true);
//       const data = await createPost(body);
//       return { response: data, error: null };
//     } catch (error: any) {
//       return { response: null, error: error };
//     } finally {
//       setLoading(false);
//     }
//   }

//   return [
//     //states
//     loading,
//     //methods
//     load,
//   ];
// };

export const useGetCommunity = (id: string, objectData: Object): UseReponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getCommunity(id, objectData);
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
