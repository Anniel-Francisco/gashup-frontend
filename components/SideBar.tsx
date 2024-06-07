"use client";
import { useState, useEffect, ReactElement, cloneElement } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// ICONS
import { BiSolidHome } from "react-icons/bi";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
// STYLES
import "@/styles/sidebar.css";

export interface Sidebar {
  icon: ReactElement;
  name: string;
  link: string;
}

function SideBar() {
  const router = usePathname();
  const [links, setLinks] = useState<Sidebar[]>([
    {
      icon: (
        <BiSolidHome
          fontSize={20}
          className="icon"
        />
      ),
      name: "Home",
      link: "/",
    },
    {
      icon: <IoMdTrendingUp fontSize={20} className="icon" />,
      name: "Popular",
      link: "/popular",
    },
    {
      icon: <FaRegFaceSmile fontSize={20} className="icon" />,
      name: "Communities",
      link: "/communities",
    },
    {
      icon: <GoPerson fontSize={25} className="icon" />,
      name: "Profile",
      link: "/profile",
    },
  ]);
  useEffect(() => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => ({
        ...link,
        icon: cloneElement(link.icon as ReactElement, {
          color: link.link === router ? "#fff" : "",
        }),
      }))
    );
  }, [router]);

  return (
    <div className="sidebar flex flex-col p-2 gap-4">
      {links.map((item, index) => {
        return (
          <Link
            href={item.link}
            key={index}
            style={{
              backgroundColor: item.link === router ? "#16a085" : "",
            }}
            className="link flex items-center pt-2 pb-2 pl-4 rounded-lg "
          >
            {item.icon}
            <span
              className="ml-3 name font-medium"
              style={{
                color: item.link === router ? "#fff" : "",
              }}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default SideBar;
