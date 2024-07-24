"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// COMPONENTS
import Options from "./Options";

// STYLES
import "@/styles/general/topbar.css";
export default function TopBar() {
  const pathName = usePathname();
  return (
    <div className="topbar flex flex-row items-center justify-between w-full bg-[#fdfbfb]">
      <Link href="/" className="app-name outline-none">
        <h1 className="font-extrabold text-3xl">GashUp</h1>
      </Link>

      {pathName === "/" ? (
        <div className="input-container">
          <input
            type="text"
            className="rounded-full"
            style={{ backgroundColor: "#e6e4e4" }}
            placeholder="Buscar..."
          />
        </div>
      ) : (
        ""
      )}
      <Options />
    </div>
  );
}
