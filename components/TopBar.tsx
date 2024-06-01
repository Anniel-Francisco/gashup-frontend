import Link from "next/link";
// ICONS
import { HiDotsHorizontal } from "react-icons/hi";

import "@/styles/topbar.css";
export default function TopBar() {
  return (
    <div className="topbar flex flex-row items-center justify-between">
      <Link href="/" className="app-name">
        <h1 className="font-extrabold text-3xl">GashUp</h1>
      </Link>

      <div className="input-container">
        <input type="text" className="rounded-full" placeholder="Buscar..." />
      </div>
      <div className="dots cursor-pointer rounded-full">
        <HiDotsHorizontal />
      </div>
    </div>
  );
}
