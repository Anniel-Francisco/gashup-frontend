"use client";

import Post from "@/components/Post/Post";
import "@/styles/general/communities.css";
import { useEffect, useState } from "react";
import { useGetAllPostByCommunity } from "@/hooks/usePost";
import { IPost } from "@/types/post";
import CreatePost from "@/components/Post/CreatePost";

export default function Communities() {
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
    <div className="p-3 pr-5">
      <h1>Communities</h1>
      <CreatePost />
      {post.map((item: IPost) => (
        // <p key={item._id}>{item.description}</p>
        <Post key={item._id} data={item} />
      ))}
    </div>
  );
}
