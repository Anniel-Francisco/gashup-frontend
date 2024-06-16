import { useState } from "react";
import { LogIn, SignUp } from "@/services/Auth";
import { IResponse, IError } from "@/types/response";
import { IUser } from "@/types/user";
import useSession from "@/store/session";

type UseLogInType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useLogIn = (body: IUser): UseLogInType => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSession } = useSession();
  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await LogIn(body);
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

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await SignUp(body);
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
