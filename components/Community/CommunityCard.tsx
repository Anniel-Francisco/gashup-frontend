import { ICategory } from "@/types/Categories";
import { ICommunity } from "@/types/community";
import { Button, Chip } from "@mui/material";
import Image from "next/image";

interface props {
  data: ICommunity;
}

export default function CommunityCard({ data }: props) {
  return (
    <div className="w-full flex flex-row gap-4 bg-[#e0e0e0] rounded-md max-h-40 overflow-hidden">
      <div className="bg-slate-400 w-[20%] md:w-[15%] rounded-l-md overflow-hidden">
        <Image
          src={data.img}
          alt={data.name}
          height={100}
          width={100}
          className="w-full h-full rounded-l-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 pr-2 py-4 w-[80%] h-full">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-bold text-lg truncate">{data.name}</span>
          <span>{"•"}</span>
          {Array.isArray(data.communityCategory_id) &&
            (data.communityCategory_id as ICategory[]).map((item) => (
              <Chip
                key={item._id}
                label={item.name}
                color="primary"
                variant="outlined"
              />
            ))}
        </div>
        <span className="line-clamp-2 text-gray-500 text-sm overflow-hidden">
          {data.description}
        </span>
        <div className="w-20">
          <Button
            variant="contained"
            color="primary"
            href={`/communities/${data._id}`}
          >
            Unirse
          </Button>
        </div>
      </div>
    </div>
  );
}
