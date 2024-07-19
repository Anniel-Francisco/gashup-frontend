"use client";
import { useRouter, usePathname } from "next/navigation";
// STYLES
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
  const [communities, setCommnuties] = useState<Array<ICommunity>>([]);

  useEffect(() => {
    getHotCommunities();
  }, []);

  const getHotCommunities = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      console.log(response.data.data, "FAMOUS");
      setCommnuties(response.data.data);
    }
  };

  // const data: Rightbar[] = [
  //   { name: "Vegeta777", followers: 1000000 },
  //   { name: "Save The World", followers: 235000 },
  //   { name: "Anime", followers: 220000 },
  //   { name: "Anime Zone", followers: 200000 },
  //   { name: "Food War", followers: 300000 },
  //   { name: "Sport", followers: 5000000 },
  // ];

  function formatNumber(number: number) {
    return number.toLocaleString("en-US");
  }

  const goToCommunity = (id: string) => {
    router.push(`/communities/${id}`);
  };

  function RightBar() {
    return (
      <div className="rightbar pt-2">
        <div className="rightbar-element p-4 max-md">
          <h3 className="rightbar-head text-lg font-semibold">
            Comunidades mas famosas
          </h3>
          <div className="rightbar-item-container overflow-y-scroll pr-1">
            {communities.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center
                   mt-2 pt-2 pr-2 pb-2"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <Avatar
                      size={50}
                      image={item?.img?.toString()}
                      onClick={() => goToCommunity(item?._id ?? "")}
                      styles={{ cursor: "pointer" }}
                    />
                    <div className="text-span flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-light">
                        {item.members_id?.length} Miembros
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/communities/${item._id}`}
                    >
                      Unirte
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return path === "/" || path === "/popular" || path === "/communities" ? (
    <RightBar />
  ) : (
    ""
  );
}
