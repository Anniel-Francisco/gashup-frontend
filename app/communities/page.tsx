"use client";

import Post from "@/components/Post/Post";
import "@/styles/general/communities.css";
import { useEffect, useState } from "react";
import { useGetAllPostByCommunity } from "@/hooks/usePost";
import { IPost } from "@/types/post";
import CreatePost from "@/components/Post/CreatePost";

export default function Communities() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, load] = useGetAllPostByCommunity("666f2c85cdb1f3d0279f892d");

  const getPosts = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setPosts(response.data.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <CreatePost />
      <div className="flex flex-col w-full pb-2">
        {posts.map((item, index) => (
          <Post key={index} data={item} />
        ))}
      </div>
    </>
  );
}
