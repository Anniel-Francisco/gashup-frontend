"use client";

import { getCommunities } from "@/api/Communities";
import Post from "@/components/Post/Post";
import "@/styles/communities.css";
import { useEffect, useState } from "react";
export default function Communities() {

  const [communities, setCommunities] = useState([])

  useEffect(() => {
    getCommunities(setCommunities);
  }, []);

  return (
    <div className="p-3">
      <h1>Communities</h1>
      {communities.map((item: any) => (
        <p>{item.name}</p>
      ))}


      <Post />
    </div>
  );
}
