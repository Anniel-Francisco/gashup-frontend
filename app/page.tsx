"use client";
import Post from "@/components/Post/Post";
import { Spinner } from "@/components/Spinner/Spinner";
import { useAuthProvider } from "@/context/AuthContext";
import { useGetTimeLine } from "@/hooks/usePost";
import "@/styles/pages/home.css";
import { IPost } from "@/types/post";
import { useEffect, useState } from "react";
export default function Home() {
  const { session } = useAuthProvider();
  const [loading, load] = useGetTimeLine(session?._id ?? null);
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    getTimeLine();
  }, []);

  const getTimeLine = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setPosts(response.data.data);
    }
  };

  return (
    <div className="w-full">
      <Spinner loading={loading} message="cargando" />

      {posts.length > 0 ? (
        <div className="w-full flex flex-col gap-1">
          {posts?.map((item: IPost) => (
            <Post
              key={item._id}
              data={item}
              commentsAmount={item?.commentCount ?? 0}
            />
          ))}
        </div>
      ) : (
        <div className="w-full gap-2 mt-2">
          <h3 className="text-[#2c3e50] text-center text-lg font-semibold">
            No hay publicaciones
          </h3>
        </div>
      )}
    </div>
  );
}
