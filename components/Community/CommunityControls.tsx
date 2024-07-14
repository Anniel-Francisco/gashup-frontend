"use client";
import { Avatar } from "@/components/Avatar/Avatar";

export default function CommunityControls() {
  return (
    <div className="flex w-full mt-14 justify-between px-3 pb-2 items-center border-b-2 border-black">
      <div>
        <span>500k Miembros</span>

        <div></div>
      </div>

      <button className="p-2 rounded-md bg-slate-500 text-white">Unirse</button>
    </div>
  );
}
