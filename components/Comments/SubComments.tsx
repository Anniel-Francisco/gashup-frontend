import {  ISubComment } from "@/types/post";
import { Avatar } from "../Avatar/Avatar";
import { useRouter } from "next/navigation";
import SubCommentInput from "./SubCommentInput";

interface props {
  item: ISubComment;
//   subCommentActive: string | null;
//   toggleSubCommentActive: Function;
//   callback: (item: ISubComment) => void;
}

export default function SubComment({
  item,
//   callback,
}: props) {
  const router = useRouter();

  return (
    <>
      <div key={item?._id} className="">
        <div className="flex flex-row gap-1">
          {typeof item?.user_id !== "string" && (
            <Avatar
              size={30}
              image={item?.user_id?.img}
              onClick={() => router.push("/profile/posts")}
              pointer
            />
          )}
          <div>
            <div className="px-2 bg-gray-200 rounded-md">
              <div className="flex gap-1 py-1 items-center">
                {typeof item?.user_id !== "string" && (
                  <span
                    className="font-bold text-sm cursor-pointer"
                    onClick={() => router.push("/profile/posts")}
                  >
                    {item?.user_id?.name}
                  </span>
                )}
                <span>{"•"}</span>
                <span className="text-sm">{item?.commentDate}</span>
              </div>
              <div
                className="pb-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>

            <div className="flex pl-2 gap-2 mt-1">
              <span>Like</span>
              <span
                className="cursor-pointer"
                // onClick={() => toggleSubCommentActive(item?._id ?? "")}
              >
                Comment
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
