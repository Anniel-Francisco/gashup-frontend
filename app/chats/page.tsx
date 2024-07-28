"use client";
import { useState, useEffect } from "react";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// HOOKS
import {
  useGetCommunityChats,
  useGetChats,
  useFindChat,
} from "@/hooks/useChats";
// TYPES
import { IDataResponse } from "@/types/response";
import { IChat, ICommunityChats } from "@/types/chats";
// COMPONENTS
import { CommunityChats } from "@/components/Chats/CommunityChats";
import { Chat } from "@/components/Chats/Chat";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@/components/Spinner/Spinner";
import "@/styles/chats/chats.css";
export default function Chats() {
  const { session } = useAuthProvider();
  const [data, setData] = useState<IDataResponse | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isResponsive, setIsResponsive] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [filterChats, setFilterChats] = useState<ICommunityChats[] | null>(
    null
  );
  const [selectedChat, setSelectedChat] = useState<ICommunityChats | null>(
    null
  );
  const [, loadFindChat] = useFindChat(search, session?._id ?? "");
  const [loading, load] = useGetCommunityChats(session?._id ?? "");
  const [messages, loadMessages, loadingMessages] = useGetChats(
    {
      name: selectedChat?.name,
      message: lastMessage,
      img: selectedChat?.img,
      userId: session?._id ?? "",
    },
    selectedChat?.community_id ?? "",
    selectedChat?._id ?? ""
  );
  const onSetLastMessage = (value: string) => {
    console.log(value);
    setLastMessage(value);
  };
  async function getCommunityChats() {
    const { response } = await load();
    if (response) {
      setData(response.data);
    }
  }

  async function getChats() {
    loadMessages();
  }
  const onSetSearch = (value: string) => {
    setSearch(value);
  };
  const setChat = (selectedChat: ICommunityChats) => {
    setSelectedChat(selectedChat);
  };

  const onFindChat = async () => {
    const { response } = await loadFindChat();
    if (response) {
      setFilterChats([...response.data.data]);
    }
  };
  useEffect(() => {
    if (search) {
      onFindChat();
    } else {
      setFilterChats(null);
    }
  }, [search]);

  useEffect(() => {
    if (!session) {
      setData(null);
      setSelectedChat(null);
    } else {
      getCommunityChats();
    }
  }, [session]);

  useEffect(() => {
    if (selectedChat) {
      getChats();
    }
  }, [selectedChat]);

  return (
    <div className="flex flex-row" style={{ height: "calc(100vh - 60px)" }}>
      <CommunityChats
        onSetSearch={onSetSearch}
        communityChats={filterChats ? filterChats : data?.data}
        setChat={setChat}
        search={search}
        selectedChat={selectedChat}
      />
      <Chat
        currentChat={selectedChat}
        messages={messages}
        userID={session?._id ?? ""}
        onSetLastMessage={onSetLastMessage}
      />
      {/* Spinner */}
      <Spinner loading={loadingMessages || loading} message="cargando" />
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
