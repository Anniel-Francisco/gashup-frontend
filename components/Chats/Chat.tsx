import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
// COMPONENTS
import { Avatar } from "../Avatar/Avatar";
import { Message } from "./Message";
import { Button } from "@mui/material";
// TYPES
import { ICommunityChats, IChat } from "@/types/chats";
// HOOKS
import { usePostMessage, useJoinChat, useLeaveChat } from "@/hooks/useChats";
import { useAlert } from "@/hooks/useAlert";
interface Props {
  currentChat: ICommunityChats | null;
  messages: IChat[] | null;
  userID: string;
  isJoined: boolean;
  handleJoinChat: () => void;
}
export function Chat({
  currentChat,
  messages,
  userID,
  isJoined,
  handleJoinChat,
}: Props) {
  const [message, setMessage] = useState<string>("");
  const [showAlert] = useAlert();
  const [loadingJoin, laodJoin] = useJoinChat(
    { chatID: currentChat?._id, userID },
    currentChat?.community_id ?? ""
  );
  const [loadingLeave, laodLeave] = useLeaveChat(
    { userID },
    currentChat?._id ?? ""
  );
  const [loading, load] = usePostMessage(
    { message, userID },
    currentChat?.community_id ?? "",
    currentChat?._id ?? ""
  );
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSetMessage = (message: string) => {
    setMessage(message);
  };
  const sendMessage = async () => {
    if (message) {
      const { response, error } = await load();
      if (error) {
        showAlert("error", error.response.data.mensaje);
      } else {
        setMessage("");
      }
    } else {
      showAlert("warning", "Debes escribir un mensaje");
    }
  };
  const onPressEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleChatState = async () => {
    if (isJoined) {
      await laodLeave();
      handleJoinChat();
    } else {
      await laodJoin();
      handleJoinChat();
    }

    // window.location.reload();
  };

  return currentChat ? (
    <div className="flex flex-col w-[75%] max-lg:w-[100%] mb-4">
      {/* Community Name */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          borderColor: "#999999",
          borderBottomWidth: 1,
        }}
      >
        <div className="flex flex-row items-center gap-3">
          <Avatar size={50} image={currentChat?.img ? currentChat.img : ""} />
          <span className="font-bold text-xl text-[#2c3e50]">
            {currentChat?.name}
          </span>
        </div>
        <div>
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
      </div>
      {/* Chats */}
      <div
        className="flex-grow px-4 overflow-auto"
        style={{ height: "calc(100vh - 76px)" }}
      >
        {messages?.map((message, index) => {
          return <Message key={index} message={message} userID={userID} />;
        })}
        <div ref={chatEndRef} />
      </div>
      {/* Input */}
      {isJoined ? (
        <div className="px-4">
          <div className="relative">
            <input
              placeholder="Ingrese su mensaje"
              className="bg-transparent py-2 pl-4 w-full rounded-md outline-none"
              style={{ borderColor: "#999999", borderWidth: 1 }}
              onInput={(e) =>
                onSetMessage((e.target as HTMLInputElement).value)
              }
              onKeyUp={onPressEnterKey}
              value={message}
            />
            <IoSend
              onClick={sendMessage}
              className="absolute right-2 top-3 cursor-pointer"
              color="#9b26b6"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className="flex flex-grow items-center justify-center  w-[75%]">
      <span className="font-semibold text-3xl text-[#2c3e50]">
        Selecciona un chat
      </span>
    </div>
  );
}
