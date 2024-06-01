import { Sidebar } from "@/types/sidebar";
import Link from "next/link";
// ICONS
import { BiSolidHome } from "react-icons/bi";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
// STYLE
import "@/styles/sidebar.css";
export default function SideBar() {
  const links: Sidebar[] = [
    { icon: <BiSolidHome fontSize={20} className="icon" />, name: "Home", link: "/" },
    { icon: <IoMdTrendingUp fontSize={20} className="icon"/>, name: "Popular", link: "/popular" },
    { icon: <FaRegFaceSmile fontSize={20} className="icon"/>, name: "Communities", link: "/communities" },
    {icon: <GoPerson fontSize={25} className="icon"/>, name: "Profile", link: "/profile"}
  ];
  return (
    <div className="sidebar flex flex-col p-2 gap-4">
      {links.map((item, index) => {
        return (
          <Link
            href={item.link}
            key={index}
            className="link flex items-center pt-2 pb-2 pl-4 rounded-lg "
          >
            {item.icon}
            <span className="ml-3 name font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
