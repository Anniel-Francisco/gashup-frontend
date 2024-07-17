"use client";
import { Avatar } from "@/components/Avatar/Avatar";

interface CommunityHeaderProps {
  img?: string;
  name?: string;
  banner?: string;
}

export default function CommunityHeader({
  img,
  name,
  banner,
}: CommunityHeaderProps) {
  return (
    <div
      className={`relative flex items-end w-full h-44 bg-cover bg-center pl-8 bg-no-repeat`}
      style={{ backgroundImage: banner ? `url(${banner})` : "none" }}
    >
      <div className="flex items-end gap-2 absolute bottom-[-40px]">
        <Avatar
          size={100}
          image={img}
          session={null}
          styles={{ borderWidth: 2, borderColor: "#2c3e50" }}
        />
        <span className="text-3xl drop-shadow-lg text-black font-bold">
          {name}
        </span>
      </div>
    </div>
  );
}
