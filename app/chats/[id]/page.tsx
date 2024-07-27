"use client";
import "@/styles/general/communities.css";
import CreatePost from "@/components/Post/CreatePost";
import MappedPosts from "@/components/Post/MappedPosts";
import { useGetCommunities } from "@/hooks/useCommunity";
import { useEffect, useState } from "react";
import { ICommunity } from "@/types/community";
import CommunityCard from "@/components/Community/CommunityCard";
import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@mui/material";

export default function Communities() {
  const [loading, load] = useGetCommunities();
  const [communities, setCommunities] = useState<Array<ICommunity>>([]);

  useEffect(() => {
    getCommunity();
  }, []);

  const getCommunity = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setCommunities(response.data.data);
    }
  };

  return (
    <div className="w-full">
      <Spinner loading={loading} />
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-3xl my-5">CHATS</h1>
        <div className="">
            Crear comunidad
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {communities.map((item: ICommunity) => (
          <CommunityCard key={item._id} data={item} />
        ))}
      </div>
      {/* <MappedPosts className="" _i/> */}
    </div>
  );
}
