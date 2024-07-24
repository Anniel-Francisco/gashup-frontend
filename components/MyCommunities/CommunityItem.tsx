// TYPES
import { ICommunity } from "@/types/community";
// COMPONENTS
import { Avatar } from "../Avatar/Avatar";
interface Props {
  community: ICommunity;
  onClick: (value: string) => void;
}
export function CommunityItem({ community, onClick }: Props) {
  return (
    <div
      className="p-2"
      style={{ borderWidth: 2, borderRadius: 10, borderColor: "#9b26b6" }}
    >
      <div className="flex flex-row items-center gap-2 ">
        <Avatar
          size={50}
          image={community.img}
          name={community.name}
          pointer
          onClick={() => onClick(community?._id ?? "")}
        />
        <div className="flex flex-col">
          <span className="font-medium">{community.name}</span>
          <span className="font-light">
            {community.members_id?.length}
            {community.members_id && community.members_id?.length > 1
              ? " miembros"
              : " miembro"}
          </span>
        </div>
      </div>
      <div
        className="mt-2 text-sm overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          height: 45,
        }}
      >
        {community.description}
      </div>
    </div>
  );
}
