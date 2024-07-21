import { useState, useEffect } from "react";
import { IResponse, IError } from "@/types/response";
import { getCommunityChats, postMessage } from "@/services/Chats";
import { getChat } from "@/utils/chat";

import { database } from "@/utils/config";
import { ref, push, set, update, remove, onValue } from "firebase/database";
// TYPES
import { IChat, IPostMessage } from "@/types/chats";

type UseChatsType = [
  boolean,
  () => Promise<{
    response: IResponse | null;
    error: IError | null;
  }>
];

export const useGetCommunityChats = (id: string): UseChatsType => {
  const [loading, setLoading] = useState<boolean>(false);

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await getCommunityChats(id);
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

export const useGetChats = (
  communityId: string,
  chatId: string
): [messages: IChat[] | null, () => void, boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<IChat[] | null>(null);

  useEffect(() => {
    if (!communityId || !chatId) return;

    const dbRef = ref(database, `${communityId}/${chatId}`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newMessages: IChat[] = Object.keys(data).map((key) => ({
          id: key,
          userID: data[key].userID,
          username: data[key].username,
          img: data[key].img,
          message: data[key].message,
          publicationDate: data[key].publicationDate,
        }));
        setMessages(newMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [communityId, chatId]);

  async function load() {
    setLoading(true);
    try {
      const data = await getChat(communityId, chatId);
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return [messages, load, loading];
};

export const usePostMessage = (
  body: IPostMessage,
  communityId: string,
  chatId: string
): UseChatsType => {
  const [loading, setLoading] = useState<boolean>(false);

  async function load(): Promise<{
    response: IResponse | null;
    error: IError | null;
  }> {
    try {
      setLoading(true);
      const data = await postMessage(body, communityId, chatId);
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
