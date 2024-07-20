"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuthProvider } from "@/context/AuthContext";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityControls from "@/components/Community/CommunityControls";
import CommunityDescription from "@/components/Community/CommunityDescription";
import MembersBar from "@/components/Community/MembersBar";
import MappedPosts from "@/components/Post/MappedPosts";
import { useEffect, useState } from "react";
import { useGetCommunity, useJoinCommunity } from "@/hooks/useCommunity";
import { ICommunity } from "@/types/community";
import CreatePost from "@/components/Post/CreatePost";
import { IUser } from "@/types/user";
import { Spinner } from "@/components/Spinner/Spinner";
import { Divider } from "@mui/material";

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { session } = useAuthProvider();

  const [community, setCommunity] = useState<ICommunity>();
  const [loading, load] = useGetCommunity(params.id, {
    user_id: session?._id,
  });

  const getCommunity = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setCommunity(response.data.data);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  const members =
    Array.isArray(community?.members_id) &&
    (community.members_id as IUser[]).every(
      (member) => typeof member === "object"
    )
      ? (community.members_id as IUser[])
      : [];

  const admins =
    Array.isArray(community?.admins_id) &&
    (community.admins_id as IUser[]).every(
      (member) => typeof member === "object"
    )
      ? (community.admins_id as IUser[])
      : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Spinner loading={loading} />

      {/* Header */}
      <CommunityHeader
        name={community?.name}
        img={community?.img}
        banner={community?.banner}
      />

      {/* Body */}
      <div className="w-full flex flex-row">
        <div className="w-full md:w-[70%]">
          {/* Controls */}
          <CommunityControls id={params.id} members={members} />
          <Divider
            component="li"
            className="flex justify-center items-center mb-3"
          />

          <div className="w-full pr-2">
            {/* Create post */}
            <CreatePost className="w-full" community_id={params.id} />
            {/* Posts */}
            <MappedPosts className="w-full" _id={params.id} />
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-2 w-[30%] border-l-1 border-black">
          <div className="flex flex-col gap-2 sticky top-12 overflow-y-scroll">
            <CommunityDescription
              name={community?.name}
              description={community?.description}
              owner={community?.owner_id}
              admins={admins}
              members={members}
              rank={community?.rank ?? 0}
            />
            <MembersBar />
          </div>
        </div>
      </div>
    </div>
  );
}
