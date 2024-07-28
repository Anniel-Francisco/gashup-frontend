import { useEffect, useState } from "react";
// HOOKS
import { useJoinChat, useLeaveChat } from "@/hooks/useChats";
// COMPONENTS
import { Avatar } from "../Avatar/Avatar";
import { Button } from "@mui/material";
// TYPES
import { ICommunityChats } from "@/types/chats";
// ICONS
import { MdGroups } from "react-icons/md";
interface Props {
  chat: ICommunityChats;
  userID?: string;
  getCommunityChats: () => void;
}
export function ChatItem({ chat, userID, getCommunityChats }: Props) {
  const [loadingJoin, laodJoin] = useJoinChat(
    { chatID: chat?._id, userID },
    chat?.community_id ?? ""
  );
  const [loadingLeave, laodLeave] = useLeaveChat({ userID }, chat?._id ?? "");

  const [isJoined, setIsJoined] = useState<boolean>(false);
  useEffect(() => {
    if (chat.isMember) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [chat]);
  async function handleChatState() {
    if (isJoined) {
      await laodLeave();
      handleJoinChat();
    } else {
      await laodJoin();
      handleJoinChat();
    }
  }
  function handleJoinChat() {
    setIsJoined(!isJoined);
    getCommunityChats();
  }
  return (
    <div className="flex flex-row items-center justify-between gap-2 border-b-2 pb-2 border-[#2c3e50] ">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          image={chat.img}
          size={60}
          borderColor="#2c3e50"
          borderWidth={3}
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[#2c3e50]">
            {chat.name}
          </span>
          <div className="flex flex-row items-center gap-2">
            <MdGroups size={25} color="#2c3e50" />
            <span className="text-md font-normal">
              {chat.members_id?.length}
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        style={{
          backgroundColor: isJoined ? "#9b26b6" : "#afafaf",
        }}
        onClick={handleChatState}
      >
        <span className="text-sm">{isJoined ? "Unido" : "Unirse"}</span>
      </Button>
    </div>
  );
}
