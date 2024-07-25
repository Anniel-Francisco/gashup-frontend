"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/context/AuthContext";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityControls from "@/components/Community/CommunityControls";
import CommunityDescription from "@/components/Community/CommunityDescription";
import MembersBar from "@/components/Community/MembersBar";
import MappedPosts from "@/components/Post/MappedPosts";
import CreatePost from "@/components/Post/CreatePost";
import { Spinner } from "@/components/Spinner/Spinner";
import { Divider } from "@mui/material";
import MessageDialog from "@/components/MessageDialog";
import { useGetCommunity } from "@/hooks/useCommunity";
import { IUser } from "@/types/user";
import { ICommunity } from "@/types/community";

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { session } = useAuthProvider();
  const router = useRouter();

  const [community, setCommunity] = useState<ICommunity | undefined>();
  const [loading, load] = useGetCommunity(params.id, session?._id ?? "");
  const [userBanned, setUserBanned] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const getCommunity = async () => {
    const { response, error } = await load();

    if (response?.data.ok) {
      setCommunity(response.data.data);
      setIsMember(
        response.data.data.members_id?.some(
          (member: IUser) => member._id === session?._id
        )
      );
      setIsAdmin(
        session?._id == response.data.data.owner_id ||
          response.data.data.admins_id?.some(
            (member: IUser) => member._id === session?._id
          )
      );
    } else if (response?.data.banned) {
      setUserBanned(true);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  if (userBanned) {
    return (
      <MessageDialog
        setOpen={setUserBanned}
        open={userBanned}
        titleText="Baneado"
        confirmationText="Has sido baneado de esta comunidad"
        confirmButtonText="OK"
        callback={() => {
          router.push("/");
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Spinner loading={loading} />

      {/* Header */}
      <CommunityHeader
        name={community?.name}
        img={community?.img as string}
        banner={community?.banner as string}
      />

      {/* Body */}
      <div className="w-full flex flex-row">
        <div className="w-full md:w-[70%]">
          {/* Controls */}
          <CommunityControls
            id={params.id}
            members={community?.members_id as IUser[]}
            owner={community?.owner_id as IUser}
          />
          <Divider
            component="li"
            className="flex justify-center items-center mb-3"
          />

          <div className="w-full pr-2">
            {/* Create post */}
            {isMember && (
              <CreatePost className="w-full" community_id={params.id} />
            )}
            {/* Posts */}
            <MappedPosts className="w-full" _id={params.id} />
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-2 w-[30%] border-l-1 border-black">
          <div className="flex flex-col gap-2 sticky top-12 overflow-y-scroll">
            <CommunityDescription
              name={community?.name}
              description={community?.description}
              owner={community?.owner_id as IUser}
              admins={community?.admins_id as IUser[]}
              members={community?.members_id as IUser[]}
              rank={community?.rank ?? 0}
            />
            <MembersBar />
          </div>
        </div>
      </div>
    </div>
  );
}
