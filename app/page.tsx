"use client"
import Post from "@/components/Post/Post";
import { Spinner } from "@/components/Spinner/Spinner";
import { useAuthProvider } from "@/context/AuthContext";
import { useGetTimeLine } from "@/hooks/usePost";
import "@/styles/pages/home.css";
import { IPost } from "@/types/post";
import { useEffect, useState } from "react";
export default function Home() {
    const { session } = useAuthProvider();
  const [loading, load] = useGetTimeLine(session?._id ?? "");
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

  console.log(posts, "DATA")

  return (
    <div className="w-full">
      <Spinner loading={loading} />
      {/* <h1 className="font-bold text-3xl my-5">Comunidades</h1> */}
      <div className="w-full flex flex-col gap-2">
        {posts.length > 0 && posts?.map((item: IPost) => (
          <Post key={item._id} data={item} />
        ))}
      </div>
      {/* <MappedPosts className="" _i/> */}
    </div>
  );
}
