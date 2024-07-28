"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// COMPONENTS
import { CommunityItem } from "@/components/MyCommunities/CommunityItem";
import { Spinner } from "@/components/Spinner/Spinner";
// HOOKS
import { useFindCommunity } from "@/hooks/useCommunity";
// TYPES
import { ICommunity } from "@/types/community";

interface MyCommunities {
  Owner: ICommunity[];
  Menber: ICommunity[];
}
export default function MyCommunities() {
  const { session } = useAuthProvider();
  const router = useRouter();
  const [data, setData] = useState<MyCommunities | null>(null);
  const [loading, laod] = useFindCommunity(session?._id ?? "");
  const laodCommunities = async () => {
    const { response } = await laod();
    if (response) {
      setData(response.data);
    }
  };
  const goToCommunity = (id: string) => {
    router.push(`/communities/${id}`);
  };
  useEffect(() => {
    laodCommunities();
  }, []);
  useEffect(() => {
    if (!session) setData(null);
  }, [session]);
  return (
    <>
      <div className="flex flex-col w-full mt-2">
        {data?.Owner && data?.Owner.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-[#2c3e50]">Creadas</h2>
            <div className="mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-2">
              {data?.Owner.map((community, index) => {
                return (
                  <CommunityItem
                    key={index}
                    community={community}
                    onClick={goToCommunity}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {data?.Menber && data?.Menber.length > 0 ? (
          <div
            className="w-full"
            style={{ marginTop: data?.Owner.length > 0 ? 10 : 0 }}
          >
            <h2 className="text-2xl w-full font-semibold text-[#2c3e50]">
              Miembro
            </h2>
            <div className="mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-2">
              {data?.Menber.map((community, index) => {
                return (
                  <CommunityItem
                    key={index}
                    community={community}
                    onClick={goToCommunity}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Spinner loading={loading} message="cargando" />
    </>
  );
}
