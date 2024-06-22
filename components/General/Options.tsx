import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ICONS
import { MdLogin } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { CgLogOut } from "react-icons/cg";
// SESSION
import { useAuthProvider } from "@/context/AuthContext ";

// COMPONENTS
import { Auth } from "./Auth";
import { Avatar } from "../Avatar/Avatar";
// STYLES
import "@/styles/general/options.css";

export default function Options() {
  const router = useRouter();
  const { session, removeSession } = useAuthProvider();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const showDropDown = (): void => {
    setIsOpen(!isOpen);
  };
  const showOption = (type: string): void => {
    if (type === "login") {
      setAuthModal(!authModal);
      setIsOpen(false);
    } else if (type === "profile") {
      router.push("/profile");
      setIsOpen(false);
    } else if (type === "logout") {
      setIsOpen(false);
      removeSession();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {session ? (
        <Avatar
          size={40}
          image={session?.img}
          onClick={showDropDown}
          styles={{ cursor: "pointer" }}
        />
      ) : (
        <button
          onClick={showDropDown}
          style={{ backgroundColor: "#2c3e50" }}
          className="btn relative z-10 flex justify-center items-center text-white outline-none border border-transparent rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      )}
      {isOpen ? (
        <div className="absolute-element absolute z-20 right-0 top-12 rounded-lg p-2">
          {/* Log In / Sign Up */}
          {session ? (
            ""
          ) : (
            <div
              onClick={() => showOption("login")}
              className="flex items-center cursor-pointer rounded-md p-4 gap-2 hover:bg-slate-500"
            >
              <MdLogin color="white" fontSize={20} className="font-semibold" />
              <span className="text-white font-semibold">Log In / Sign Up</span>
            </div>
          )}
          {/* Profile */}
          {session ? (
            <div
              onClick={() => showOption("profile")}
              className="flex items-center cursor-pointer rounded-md p-4 gap-2 hover:bg-slate-500"
            >
              <GoPerson color="white" fontSize={20} className="font-semibold" />
              <span className="text-white font-semibold">Profile</span>
            </div>
          ) : (
            ""
          )}
          {/*  Log Out */}
          <div>
            {session ? (
              <div
                onClick={() => showOption("logout")}
                className="flex items-center cursor-pointer rounded-md p-4 gap-2 hover:bg-slate-500"
              >
                <CgLogOut
                  color="white"
                  fontSize={20}
                  className="font-semibold"
                />
                <span className="text-white font-semibold">Log Out</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <Auth modal={authModal} showModal={() => showOption("login")} />
    </div>
  );
}
