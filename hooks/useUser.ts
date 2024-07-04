import { useState } from "react";
import { updateUser, getUserById } from "@/services/User";
import { IResponse, IError } from "@/types/response";
import { IUser } from "@/types/user";

type UseUpdateUserType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useUpdateUser = (id: string, body: IUser): UseUpdateUserType => {
  const [loading, setLoading] = useState<boolean>(false);

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await updateUser(id, body);
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

type UseUserByIdType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useUserById = (id: string): UseUserByIdType => {
  const [loading, setLoading] = useState<boolean>(false);

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getUserById(id);
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
