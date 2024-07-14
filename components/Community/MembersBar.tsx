"use client";
import "@/styles/general/rightbar.css";
import { Avatar } from "../Avatar/Avatar";
export interface Rightbar {
  image?: string;
  name: string;
  followers: number;
}

export default function MembersBar() {
  const data: Rightbar[] = [
    { name: "Vegeta777", followers: 1000000 },
    { name: "Save The World", followers: 235000 },
    { name: "Anime", followers: 220000 },
    { name: "Anime Zone", followers: 200000 },
    { name: "Food War", followers: 300000 },
    { name: "Sport", followers: 5000000 },
  ];

  return (
    <div className="rightbar-element p-4 w-full ">
      <h3 className="rightbar-head text-lg font-semibold">
        Famous Communities
      </h3>
      <div className="rightbar-item-container overflow-y-scroll pr-1">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="rightbar-item flex flex-row justify-between items-end mt-2 pt-2 pr-2 pb-2"
            >
              <div className=" flex flex-row gap-4 items-center ">
                {/* <div className="image-container cursor-pointer"></div> */}

                <Avatar
                  size={30}
                  image={null}
                  session={null}
                  styles={{ borderWidth: 2, borderColor: "#2c3e50" }}
                />

                <div className="text-span flex flex-col">
                  <span className="font-medium">{item.name}</span>
                </div>
              </div>
              <div>
                <button type="button" className="join-button rounded-sm">
                  Join
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
