"use client";
import { useState, useEffect } from "react";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// HOOKS
import {
  useGetCommunityChats,
  useGetChats,
  useFindChat,
  useDeleteMessage,
} from "@/hooks/useChats";
// TYPES
import { IDataResponse } from "@/types/response";
import { IChat, ICommunityChats } from "@/types/chats";
// COMPONENTS
import { CommunityChats } from "@/components/Chats/CommunityChats";
import { Chat } from "@/components/Chats/Chat";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@/components/Spinner/Spinner";

// STYLES
import "@/styles/chats/chats.css";

export default function Chats() {
  const { session } = useAuthProvider();
  const [data, setData] = useState<IDataResponse | null>(null);
  const [search, setSearch] = useState<string>("");
  const windowWidth = window.innerWidth;
  const chatsRef = document.querySelector(".chats-container");
  const chatRef = document.querySelector(".messages-container");
  const [filterChats, setFilterChats] = useState<ICommunityChats[] | null>(
    null
  );
  const [selectedChat, setSelectedChat] = useState<ICommunityChats | null>(
    null
  );
  const [, loadFindChat] = useFindChat(search, session?._id ?? "");
  const [loading, load] = useGetCommunityChats(session?._id ?? "");

  const [messages, loadMessages, loadingMessages] = useGetChats(
    selectedChat?.community_id ?? "",
    selectedChat?._id ?? ""
  );

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
  const clearSelectedChat = () => {
    setSelectedChat(null);
    chatRef.style.display = "none";
    chatsRef.style.display = "block";
  };
  const setChat = (selectedChat: ICommunityChats) => {
    if (windowWidth >= 768) {
      setSelectedChat(selectedChat);
    } else {
      setSelectedChat(selectedChat);
      chatRef.style.display = "flex";
      chatsRef.style.display = "none";
    }
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
        clearCurrentChat={clearSelectedChat}
      />
      {/* Spinner */}
      <Spinner loading={loadingMessages || loading} message="cargando" />
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
