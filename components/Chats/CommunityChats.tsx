import { CommunityItem } from "./CommunityItem";
import { FiSearch } from "react-icons/fi";
import { ICommunityChats } from "@/types/chats";
interface Props {
  communityChats: ICommunityChats[] | null;
  setChat: (value: ICommunityChats) => void;
}
export function CommunityChats({ communityChats, setChat }: Props) {
  function onSelectCommunity(value: ICommunityChats) {
    setChat(value);
  }
  return (
    <div
      className="w-[25%] max-lg:w-[100%] flex-grow pr-2"
      style={{ borderColor: "#999999", borderRightWidth: 1 }}
    >
      <div>
        <h1 className="font-bold text-xl my-2 text-[#2c3e50]">Chats</h1>
      </div>
      <div className="w-full relative flex flex-row items-center gap-2">
        <FiSearch size={20} className="absolute left-2 " color="#2c3e50" />
        <input
          placeholder="Buscar por nombre"
          className="w-full outline-none bg-transparent pl-8 border-2 py-2 rounded-md"
          style={{
            borderColor: "#2c3e50",
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-1 pb-2 community-chats">
        {communityChats?.map((item, index) => {
          return (
            <CommunityItem
              key={index}
              image={item?.img}
              name={item.name}
              members={item.members_id.length}
              onClick={() => onSelectCommunity(item)}
            />
          );
        })}
      </div>
    </div>
  );
}
