"use client";
import { Avatar } from "@/components/Avatar/Avatar";

interface props {
  name?: string;
  description?: string;
}

export default function CommunityDescription({ name, description }: props) {
  return (
    <div className="flex justify-between items-center pt-5 p-4  bg-gray-200">
      <div className="flex gap-3 flex-col">
        <h2 className="text-2xl">{name}</h2>

        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}
