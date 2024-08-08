"use client";

import "@/styles/general/communities.css";
import { FiSearch } from "react-icons/fi";
import { useGetCommunities } from "@/hooks/useCommunity";
import { useEffect, useState, useMemo } from "react";
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
  const [search, setSearch] = useState<string>("");
  const [showAlert] = useAlert();
  const { session } = useAuthProvider();
  const [loading, load] = useGetCommunities();
  const [communities, setCommunities] = useState<Array<ICommunity>>([]);

  useEffect(() => {
    getCommunity();
  }, []);
  const filterCommunities = useMemo(() => {
    if (search) {
      return communities.filter((community, index) =>
        community.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return communities;
    }
  }, [search, communities]);
  const getCommunity = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setCommunities(response.data.data);
    }
  };
  const onSetSearch = (value: string) => {
    setSearch(value);
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
      <Spinner loading={loading} message="Cargando..." />
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg md:text-3xl my-4 text-[#2c3e50]">
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
      <div className="w-full relative flex flex-row items-center mb-2">
        <FiSearch size={20} className="absolute left-2" color="#2c3e50" />
        <input
          placeholder="Buscar por nombre"
          onInput={(e) => onSetSearch((e.target as HTMLInputElement).value)}
          value={search}
          className="w-full outline-none bg-transparent pl-8 border-2 py-2 rounded-md"
          style={{
            borderColor: "#2c3e50",
          }}
        />
      </div>
      <div className="w-full grid gap-4 sm:grid-cols-2 mb-2">
        {filterCommunities.map((item: ICommunity) => (
          <CommunityCard key={item._id} data={item} onClick={onClick} />
        ))}

        {filterCommunities.length === 0 && (
          <span className="font-medium text-[#2c3e50] text-start">
            No se encontraron comunidades
          </span>
        )}
      </div>
      {/* <MappedPosts className="" _i/> */}
      <ToastContainer />
    </div>
  );
}
