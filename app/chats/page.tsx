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
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [filterChats, setFilterChats] = useState<ICommunityChats[] | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<ICommunityChats | null>(
    null
  );
  const [, loadFindChat] = useFindChat(search, session?._id ?? "");
  const [, load] = useGetCommunityChats(session?._id ?? "");
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
  const setChat = (selectedChat: ICommunityChats) => {
    setSelectedChat(selectedChat);
  };
  const handleJoinChat = () => {
    setIsJoined(!isJoined);
    getCommunityChats();
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
    if (selectedChat?.isMember) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [selectedChat, session]);
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
        isJoined={isJoined}
        handleJoinChat={handleJoinChat}
      />
      {/* Spinner */}
      <Spinner loading={loadingMessages} message="cargando" />
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
