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
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useAuthProvider } from "@/context/AuthContext";
export default function Communities() {
  const router = useRouter();
  const [showAlert] = useAlert();
  const { session } = useAuthProvider();
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

  const onClick = (id: string) => {
    if (session) {
      router.push(`/communities/${id}`);
    } else {
      showAlert("warning", "Debes iniciar sesión");
    }
  };
  return (
    <div className="w-full">
      <Spinner loading={loading} message="cargando" />
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg md:text-3xl my-5 text-[#2c3e50]">
          Comunidades
        </h1>
        <div>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            href={`/create-community`}
          >
            Crear comunidad
          </Button>
        </div>
      </div>
      <div className="w-full grid gap-4 sm:grid-cols-2 mb-2">
        {communities.map((item: ICommunity) => (
          <CommunityCard key={item._id} data={item} onClick={onClick} />
        ))}
      </div>
      {/* <MappedPosts className="" _i/> */}
      <ToastContainer />
    </div>
  );
}
