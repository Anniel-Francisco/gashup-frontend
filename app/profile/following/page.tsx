"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// TYPES
import { IUser } from "@/types/user";
// COMPONENTS
import { Spinner } from "@/components/Spinner/Spinner";
import { Card } from "@/components/Profile/Card";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// HOOKS
import { useGetFollowed } from "@/hooks/useUser";
interface IFollowed {
  followed: IUser[];
}
export default function Following() {
  const { session } = useAuthProvider();
  const router = useRouter();
  const [loading, load] = useGetFollowed(session?._id ?? "");
  const [data, setData] = useState<IFollowed | null>(null);
  const loadFollowingUsers = async () => {
    const { response } = await load();
    if (response) {
      setData(response.data);
    }
  };
  const goToProfile = (id: string) => {
    router.push(`/user/${id}`);
  };
  useEffect(() => {
    loadFollowingUsers();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-2">
        {data?.followed.map((follow, index) => {
          return <Card key={index} followed={follow} onClick={goToProfile} />;
        })}
      </div>
      {data?.followed?.length === 0 && (
        <h3 className="font-semibold text-center w-full mt-2 text-xl text-[#2c3e50]">
          No estas siguiendo a nadie
        </h3>
      )}
      <Spinner loading={loading} message="cargando" />
    </div>
  );
}
