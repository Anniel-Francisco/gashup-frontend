import { useState } from "react";
import { logIn, signUp } from "@/services/Auth";
import { IResponse, IError } from "@/types/response";
import { useAuthProvider } from "@/context/AuthContext ";
import { IUser } from "@/types/user";

type UseLogInType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

type LogiDataType = Pick<IUser, "email" | "password">;

export const useLogIn = (body: LogiDataType): UseLogInType => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSessionState } = useAuthProvider();
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await logIn(body);
      setSessionState(data.data.user);
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

type UseSingUpType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useSingUp = (body: IUser): UseSingUpType => {
  const [loading, setLoading] = useState<boolean>(false);
  const formData = new FormData();
  formData.append("code", body.code ?? "");
  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password ?? "");
  formData.append("phone", body.phone);
  if (body.img) formData.append("img", body.img);

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await signUp(formData);
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
