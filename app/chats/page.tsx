"use client";
import { useState, useEffect } from "react";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// HOOKS
import { useGetCommunityChats, useGetChats } from "@/hooks/useChats";
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
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<ICommunityChats | null>(
    null
  );
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
  const setChat = (selectedChat: ICommunityChats) => {
    setSelectedChat(selectedChat);
  };

  useEffect(() => {
    getCommunityChats();
  }, []);

  useEffect(() => {
    if (selectedChat) getChats();
  }, [selectedChat]);

  return (
    <div className="flex flex-row" style={{ height: "calc(100vh - 60px)" }}>
      <CommunityChats communityChats={data?.data} setChat={setChat} />
      <Chat
        currentChat={selectedChat}
        messages={messages}
        userID={session?._id ?? ""}
      />
      {/* Spinner */}
      <Spinner loading={loading || loadingMessages} message="cargando" />
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
