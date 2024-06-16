"use client";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import PostButton from "./PostButton";
import { SlOptionsVertical } from "react-icons/sl";
import Image from "next/image";

export default function Post() {
  const posts = [
    {
      description: "Que pasa?",
      userName: "Romanti",
      time: "2 hours ago",
      images: ["", "", ""],
    },
  ];

  return (
    <div>
      {posts.map((item) => (
        <div className="flex flex-col gap-3 border p-4 w-[100%] border-r-2">
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-3">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div className="flex flex-col">
                <p className="font-bold">{item.userName}</p>
                <p className="text-xs">{item.time}</p>
              </div>
            </div>

            <SlOptionsVertical className="w-6 h-6 fill-black cursor-pointer" />
          </div>

          <div>{item.description}</div>

          {item.images.length > 0 && (
            <div>
              <Image
                src="https://img.clubimagenes.com/ci/re/hola/hola_009.webp"
                alt="hola"
                width={200}
                height={200}
                className="w-[100%]"
              />
            </div>
          )}

          <div className="flex gap-3">
            <PostButton Icon={AiFillLike} amount="10k" />
            <PostButton Icon={FaComments} amount="10k" />
            <PostButton Icon={FaShare} amount="10k" />
          </div>
        </div>
      ))}
    </div>
  );
}
