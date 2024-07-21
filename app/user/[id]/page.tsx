"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
// TYPES
import { IPost } from "@/types/post";
import { IDataResponse } from "@/types/response";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// COMPONENTS
import { Avatar } from "@/components/Avatar/Avatar";
import Post from "@/components/Post/Post";
import { Spinner } from "@/components/Spinner/Spinner";
// HOOKS
import { useGetPostByUserId } from "@/hooks/usePost";
export default function User({ params }: { params: { id: string } }) {
  const [post, setPosts] = useState<IPost[]>([]);
  const [data, setData] = useState<IDataResponse | null>(null);
  const { session } = useAuthProvider();
  const [loading, load] = useGetPostByUserId(params.id);
  async function loadUserProfile() {
    const { response, error } = await load();
    if (response) {
      setData(response.data);
      setPosts(response.data.posts);
    }
  }
  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session]);

  useEffect(() => {
    loadUserProfile();
  }, [params.id]);
  return (
    <>
      {data?.user?.banner ? (
        <div
          className="relative flex items-end w-full h-44 bg-cover bg-center pl-8 bg-no-repeat"
          style={{
            backgroundImage: data?.user?.banner
              ? `url(${data?.user?.banner})`
              : "none",
          }}
        >
          {params.id ? (
            <div className="flex items-end gap-2 absolute bottom-[-40px]">
              <Avatar
                size={100}
                image={data?.user?.img}
                session={null}
                styles={{ borderWidth: 3, borderColor: "#fff" }}
              />
              <span className="text-3xl drop-shadow-lg text-[#2c3e50] font-bold">
                {data?.user?.name}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex items-center w-full gap-4 mt-2">
          <Avatar size={90} image={data?.user?.img} session={null} />
          <span className="text-3xl drop-shadow-lg text-[#2c3e50] font-bold">
            {data?.user?.name}
          </span>
        </div>
      )}

      <div className="mt-16">
        {data?.posts &&
          data?.posts.map((item, index) => {
            return (
              <Post key={index} data={item} post={post} setPosts={setPosts} />
            );
          })}
      </div>
      {/* Spinner */}
      <Spinner loading={loading} message="wait" />
    </>
  );
}
