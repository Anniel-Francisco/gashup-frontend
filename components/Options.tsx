import { useState, ReactNode } from "react";
// ICONS
import { MdLogin } from "react-icons/md";
import { GoPerson } from "react-icons/go";
// COMPONENTS
import { Auth } from "./Auth";
// STYLES
import "@/styles/options.css";
interface Option {
  name: string;
  icon: ReactNode;
  type: string;
}

export default function Options() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<boolean>(false);
  const options: Option[] = [
    {
      icon: <MdLogin color="white" fontSize={20} className="font-semibold" />,
      name: "Log In / Sign Up",
      type: "auth",
    },
    {
      icon: <GoPerson color="white" fontSize={20} className="font-semibold" />,
      name: "Profile",
      type: "profile",
    },
  ];
  const showDropDown = (): void => {
    setIsOpen(!isOpen);
  };
  const showModal = (type: string): void => {
    if (type == "auth") {
      setAuthModal(!authModal);
    }
  };

  return (
    <div className="relative inline-block ">
      <button
        onClick={showDropDown}
        style={{ backgroundColor: "#2c3e50" }}
        className="relative z-10 text-white block p-2 border border-transparent rounded-md"
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
      {isOpen ? (
        <div className="absolute-element absolute right-0 top-12 rounded-lg p-2">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => showModal(option.type)}
                className="flex items-center cursor-pointer rounded-md p-4 gap-2 hover:bg-slate-500"
              >
                {option.icon}
                <span className="text-white font-semibold">{option.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <Auth modal={authModal} showModal={() => showModal(options[0].type)} />
    </div>
  );
}
