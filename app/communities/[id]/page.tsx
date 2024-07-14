"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuthProvider } from "@/context/AuthContext";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityControls from "@/components/Community/CommunityControls";
import CommunityDescription from "@/components/Community/CommunityDescription";
import MembersBar from "@/components/Community/MembersBar";
import MappedPosts from "@/components/Post/MappedPosts";
import { useEffect, useState } from "react";
import { useGetCommunity } from "@/hooks/useCommunity";
import { ICommunity } from "@/types/community";

export default function CommunityPage() {
  const router = useRouter();
  const pathName = usePathname();
  const { session } = useAuthProvider();

  const [community, setCommunity] = useState<ICommunity>();
  const [loading, load] = useGetCommunity("666f2c85cdb1f3d0279f892d", {
    user_id: session?._id,
  });

  const getPosts = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setCommunity(response.data.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const communityData = {
    name: "League of Legends",
    description: "HOLA MIS AMORES",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <CommunityHeader name={community?.name} img={community?.img} />

      {/* Body */}
      <div className="w-full flex flex-row">
        <div className="w-[70%]">
          {/* Controls */}
          <CommunityControls />
          {/* Posts */}
          <MappedPosts className="w-full pr-2" />
        </div>

        <div className="w-[30%] border-l-1 border-black flex flex-col gap-2">
          <CommunityDescription name={communityData.name} />
          <MembersBar />
        </div>
      </div>

      {/* <div className="flex navigation-container items-center w-full gap-4 p-2">
        {navigation.map((nav, index) => {
          return (
            <Link
              key={index}
              href={nav.route}
              className="text-md font-semibold navigation-text rounded-full"
              onMouseOver={onMouseOver}
            >
              <span className="text-[#2c3e50]">{nav.name}</span>
              {nav.route === pathName ? (
                <div className="w-full rounded-full h-1  bg-[#16a085]" />
              ) : (
                ""
              )}
            </Link>
          );
        })}
      </div> */}
    </div>
  );
}
