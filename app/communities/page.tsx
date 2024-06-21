"use client";

import { getCommunities } from "@/api/Communities";
import Post from "@/components/Post/Post";
// import "@/styles/communities.css";
import { useEffect, useState } from "react";
import '@/styles/general/communities.css'
import CreatePost from "@/components/Post/CreatePost";
export default function Communities() {

  const [communities, setCommunities] = useState([])

  useEffect(() => {
    getCommunities(setCommunities);
  }, []);

  return (
    <div className="p-3 pr-5">
      <CreatePost />

      {/* <h1>Communities</h1>
      {communities.map((item: any, key: number) => (
        <p key={item._id}>{item.name}</p>
      ))} */}

      <Post />
    </div>
  );
}
