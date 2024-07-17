"use client";

import Post from "@/components/Post/Post";
import "@/styles/general/communities.css";
import { useEffect, useState } from "react";
import { useGetAllPostByCommunity } from "@/hooks/usePost";
import { IPost } from "@/types/post";

interface props {
    className: string;
}

export default function MappedPosts({ className }: props) {
  const [post, setPosts] = useState<IPost[]>([]);
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
    <div className={className}>
      {post.map((item: IPost) => (
        <Post key={item._id} data={item} />
      ))}
    </div>
  );
}
