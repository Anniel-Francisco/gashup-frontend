"use client";
import { useRouter, usePathname } from "next/navigation";
import "@/styles/general/rightbar.css";
import { useGetHotCommunities } from "@/hooks/useCommunity";
import { useEffect, useState } from "react";
import { ICommunity } from "@/types/community";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "@mui/material";

export interface Rightbar {
  image?: string;
  name: string;
  followers: number;
}

export default function RightBar() {
  const router = useRouter();
  const path = usePathname();
  const [loading, load] = useGetHotCommunities();
  const [communities, setCommunities] = useState<Array<ICommunity>>([]);

  useEffect(() => {
    getHotCommunities();
  }, []);

  const getHotCommunities = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setCommunities(response.data.data);
    }
  };

  function formatNumber(number: number) {
    return number.toLocaleString("en-US");
  }

  const goToCommunity = (id: string) => {
    router.push(`/communities/${id}`);
  };

  function RightBar() {
    return (
      <div className="hidden sm:flex flex-col bg-gray-200 w-[25%] px-2 py-4 md:p-4 ">
        <h3 className="rightbar-head text-md md:text-lg font-semibold mb-5">
          Comunidades más famosas
        </h3>
        <div className="rightbar-item-container overflow-y-scroll pr-1 flex flex-col gap-3">
          {communities.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-row gap-3 items-center">
                <Avatar
                  className="w-8 h-8 md:w-10 md:h-10 lg:h-12 lg:w-12 rounded-full"
                  image={item?.img?.toString()}
                  onClick={() => goToCommunity(item?._id ?? "")}
                  styles={{ cursor: "pointer" }}
                />
                <div className="text-span flex flex-col">
                  <span
                    onClick={() => goToCommunity(item?._id ?? "")}
                    className="text-xs md:text-sm lg:text-md font-medium hover:text-gray-700 cursor-pointer"
                  >
                    {item.name}
                  </span>
                  <span className="text-xs md:text-sm lg:text-md font-light">
                    {item.members_id?.length} Miembros
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <Button
                  variant="contained"
                  color="primary"
                  href={`/communities/${item._id}`}
                >
                  <span className="text-sm">Unirte</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return path === "/" ||
    path === "/popular" ||
    path === "/communities" ||
    path === "/user" ? (
    <RightBar />
  ) : (
    ""
  );
}
