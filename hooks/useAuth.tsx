import { useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { SignUp } from "@/services/Auth";
import { IUser } from "@/types/user";

type UseSingUpType = [
  boolean,
  () => Promise<{
    response: AxiosResponse | null;
    error: AxiosError | null;
  }>
];

export const useSingUp = (body: IUser): UseSingUpType => {
  const [loading, setLoading] = useState<boolean>(false);

  async function load(): Promise<{
    response: AxiosResponse | null;
    error: AxiosError | null;
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
