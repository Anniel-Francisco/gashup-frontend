import { useState } from "react";
import { updateUser, getUserById } from "@/services/User";
import { useAuthProvider } from "@/context/AuthContext";
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
  const { setSessionState } = useAuthProvider();
  const formData = new FormData();
  formData.append("code", body.code ?? "");
  formData.append("email", body.email);
  formData.append("name", body.name);
  formData.append("password", body.password ?? "");
  formData.append("phone", body.phone);
  formData.append("img", body.img ?? "");
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await updateUser(id, formData);
      setSessionState(data.data.update);
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
