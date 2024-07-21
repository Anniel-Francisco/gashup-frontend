import http from "@/utils/http";
import { IPostMessage } from "@/types/chats";
export async function getCommunityChats(id: string) {
  return http.get(`community/getCommunityChats/${id}`).then((data) => data);
}

// BODY USERID Y MESSAGE
export async function postMessage(
  body: IPostMessage,
  communityId: string,
  chatId: string
) {
  return http
    .post(`chat/sendMessage/${communityId}/${chatId}`, body)
    .then((data) => data);
}
