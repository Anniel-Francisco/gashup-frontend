import { fetchData } from "@/store/httpRequests";

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  message: string;
  data?: T;
}

export const getCommunities = async (callback: Function): Promise<[]> => {
  const url = "/community/getcommunities";
  const response = (await fetchData(url)) as ApiResponse<[]>;
  if (response.ok && response.data) {
    // return response.data;
    callback(response.data)
  }
  console.error(
    response.message || response.mensaje
  );
};
