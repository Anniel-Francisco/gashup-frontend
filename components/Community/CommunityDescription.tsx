"use client";
import { Avatar } from "@/components/Avatar/Avatar";
import { IUser } from "@/types/user";
import Divider from "@mui/material/Divider";

interface props {
  name?: string;
  description?: string;
  owner: IUser;
  admins: Array<IUser>;
  members: Array<IUser>;
  rank: number;
}

export default function CommunityDescription({
  name,
  description,
  owner,
  admins,
  members,
  rank
}: props) {
  return (
    <div className="flex flex-col justify-between items-center pt-5 p-4 bg-gray-100 mt-2 rounded-md">
      <div className="flex gap-3 flex-col">
        <h2 className="text-2xl font-semibold">{name}</h2>

        <span className="text-sm">{description}</span>
      </div>
      <Divider component="li" />

      <div className="w-full flex flex-col gap-2 font-medium text-gray-600">
        <span>Creador</span>
        <AdminCard item={owner} />
      </div>

      <Divider component="li" />

      <div className="w-full flex flex-col gap-2 font-medium text-gray-600">
        <span>Moderadores</span>
        {admins.map((item: IUser) => (
          <AdminCard item={item} />
        ))}
      </div>
      <Divider component="li" />

      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col items-center gap-1 font-medium">
          {members.length}
          <span className="text-sm font-light text-gray-600">Miembros</span>
        </div>

        <div className="flex flex-col items-center gap-1 font-medium">
          {rank
          
          }
          <span className="text-sm font-light text-gray-600">Rango</span>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ item }: { item: IUser }) {
  return (
    <div className="w-full flex flex-row items-center gap-3">
      <Avatar
        size={40}
        image={item?.img?.toString()}
        // onClick={goToRoute}
        styles={{ cursor: "pointer" }}
      />
      <div className="font-bold flex items-center flex-row gap-1">
        <span
          className="cursor-pointer hover:text-gray-700"
          // onClick={goToRoute}
        >
          {item?.name}
        </span>
      </div>
    </div>
  );
}
