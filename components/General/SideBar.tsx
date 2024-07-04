"use client";
import { useState, useEffect, ReactElement, cloneElement } from "react";
import { usePathname, useRouter } from "next/navigation";
// ICONS
import { BiSolidHome } from "react-icons/bi";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
// STYLES
import "@/styles/general/sidebar.css";

export interface Sidebar {
  icon: ReactElement;
  name: string;
  link: string;
}

function SideBar() {
  const pathName = usePathname();
  const router = useRouter();
  const [links, setLinks] = useState<Sidebar[]>([
    {
      icon: <BiSolidHome fontSize={20} className="icon" />,
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
      icon: <BsChatLeftText fontSize={25} className="icon" />,
      name: "Chats",
      link: "/chats",
    },
    {
      icon: <IoBookmarkOutline fontSize={25} className="icon" />,
      name: "My Communities",
      link: "/my-communities",
    },
  ]);
  useEffect(() => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => ({
        ...link,
        icon: cloneElement(link.icon as ReactElement, {
          color: link.link === pathName ? "#fff" : "",
        }),
      }))
    );
  }, [pathName]);
  const goToRoute = (route: string) => {
    router.push(route);
  };
  return (
    <div
      style={{ flex: pathName === "/" || pathName === "/popular" ? 2 : 1.4 }}
      className="flex flex-col p-2 gap-4 sidebar bg-[#fdfbfb]"
    >
      {links.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => goToRoute(item.link)}
            style={{
              backgroundColor: item.link === pathName ? "#16a085" : "",
            }}
            className="link flex cursor-pointer items-center pt-2 pb-2 pl-4 rounded-lg "
          >
            {item.icon}
            <span
              className="ml-3 name font-medium"
              style={{
                color: item.link === pathName ? "#fff" : "",
              }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
