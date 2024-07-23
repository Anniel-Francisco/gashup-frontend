import moment from "moment";
// TYPES
import { IChat } from "@/types/chats";
import { useRouter } from "next/navigation";
// COMPONENTS
import { Avatar } from "../Avatar/Avatar";

interface Props {
  message: IChat;
  userID: string;
}
export function Message({ message, userID }: Props) {
  const router = useRouter();
  function formatHour(time: string) {
    if (time) {
      const hour = moment(time, "YYYY-MM-DD HH:mm:ss");
      return hour.format("h:mm A");
    }
  }
  function goToPerfil(id: string) {
    if (id === userID) {
      router.push(`/profile/posts`);
    } else {
      router.push(`/user/${id}`);
    }
  }
  return (
    <div
      className="flex flex-row my-2 justify-end"
      style={{
        justifyContent: message.userID === userID ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="flex gap-2"
        style={{
          flexDirection: message.userID === userID ? "row-reverse" : "row",
        }}
      >
        <div className="flex flex-col justify-end">
          <Avatar
            size={30}
            image={message.img}
            name={message.username}
            onClick={() => goToPerfil(message.userID)}
            pointer
          />
        </div>
        <div
          className="bg-[#e5e7eb] py-1 pl-3 max-w-52 pr-2 flex flex-col"
          style={
            message.userID === userID
              ? {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }
              : {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }
          }
        >
          <div>
            <span className="font-semibold" style={{ fontSize: 14 }}>
              {message.username}
            </span>
          </div>
          <div className="flex justify-start">
            <span className="font-normal">{message.message}</span>
          </div>
          <div className="flex justify-end text-sm ml-6">
            <span className="font-light">
              {formatHour(message.publicationDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
