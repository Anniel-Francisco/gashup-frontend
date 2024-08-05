import { ICategory } from "@/types/Categories";
import { ICommunity } from "@/types/community";
import { Button, Chip } from "@mui/material";
import Image from "next/image";

interface props {
  data: ICommunity;
  onClick: (value: string) => void;
}

export default function CommunityCard({ data, onClick }: props) {
  return (
    <div
      onClick={() => onClick(data._id ?? "")}
      className="max-w-lg mx-auto flex flex-row items-center min-h-14 w-full gap-2 bg-[#e0e0e0] hover:bg-[#c9c7c7] rounded-md overflow-hidden cursor-pointer"
    >
      <div className="bg-slate-400 w-[25%] h-full rounded-t-md md:rounded-l-md md:rounded-t-none overflow-hidden flex items-center justify-center">
        {data.img ? (
          <Image
            src={(data.img as string) ?? ""}
            alt={data.name}
            // layout="responsive"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        ) : (
          <span
            style={{ fontSize: `30px` }}
            className="text-lg font-semibold text-center text-white"
          >
            {data.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 py-4 px-1 w-[75%] h-full">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-bold text-[4.5vw] sm:text-lg truncate">
            {data.name}
          </span>
          <span>{"•"}</span>
          {Array.isArray(data.communityCategory_id) &&
            (data.communityCategory_id as ICategory[]).map((item) => (
              <Chip
                key={item._id}
                label={item.name}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
        </div>
        <span className="line-clamp-2 text-gray-500 text-[3vw] sm:text-sm overflow-hidden">
          {data.description}
        </span>
        {/* <div className="w-10">
          <Button
            variant="contained"
            color="primary"
            size="small"
            href={`/communities/${data._id}`}
          >
            Unirse
          </Button>
        </div>  */}
      </div>
    </div>
  );
}
