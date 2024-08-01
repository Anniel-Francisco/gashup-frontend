"use client";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
// HOOKS
import { useFindCommunityChats } from "@/hooks/useCommunity";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// COMPONENTS
import { ChatItem } from "@/components/Chats/ChatItem";
import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@mui/material";
// TYPES
import { ICommunityChats } from "@/types/chats";
// STYLES
import "@/styles/general/communities.css";
export default function Chats({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { session } = useAuthProvider();
  const [loading, load] = useFindCommunityChats(params.id, session?._id ?? "");
  const [chats, setChats] = useState<Array<ICommunityChats>>([]);

  useEffect(() => {
    getCommunityChats();
  }, []);
  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session]);
  async function getCommunityChats() {
    const body = {
      userId: session?._id ?? "",
    };
    const { response, error } = await load();
    if (response?.data.ok) {
      setChats(response.data.data);
    }
  }
  const goToCreateChat = () => {
    router.push(`/create-chat/${params.id}`);
  };

  const goToEditChat = (id: string) => {
    router.push(`/edit-chat/${id}`);
  };

  return (
    <div className="w-full">
      <Spinner loading={loading} message="cargando" />
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl my-5 text-[#2c3e76]">CHATS</h1>
        <Button variant="outlined" color="primary" onClick={goToCreateChat}>
          Crear Chat
        </Button>
      </div>
      <div className="w-full grid grid-cols-4 max-md:grid-cols-1 gap-6">
        {chats.map((item, index) => (
          <ChatItem
            key={index}
            chat={item}
            userID={session?._id}
            goToEditChat={goToEditChat}
            getCommunityChats={getCommunityChats}
          />
        ))}
      </div>
      {/* <MappedPosts className="" _i/> */}
    </div>
  );
}
