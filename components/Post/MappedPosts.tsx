"use client";

import Post from "@/components/Post/Post";
import "@/styles/general/communities.css";
import { useEffect, useState } from "react";
import { useGetAllPostByCommunity } from "@/hooks/usePost";
import { IPost } from "@/types/post";

interface props {
    className: string;
    _id: string
}

export default function MappedPosts({ className, _id }: props) {
  const [post, setPosts] = useState<IPost[]>([]);
  const [loading, load] = useGetAllPostByCommunity(_id);

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
        <Post key={item._id} data={item} post={post} setPosts={setPosts} />
      ))}
    </div>
  );
}
