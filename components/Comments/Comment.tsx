import { IComment, ISubComment } from "@/types/post";
import { Avatar } from "../Avatar/Avatar";
import { useRouter } from "next/navigation";
import SubCommentInput from "./SubCommentInput";
import SubComment from "./SubComments";
import { useRef } from "react";
import { useLikeComment } from "@/hooks/usePost";
import { useAuthProvider } from "@/context/AuthContext";

interface props {
  item: IComment;
  subCommentActive: string | null;
  toggleSubCommentActive: Function;
  callback: (item: ISubComment) => void;
}

export default function Comment({
  item,
  subCommentActive,
  toggleSubCommentActive,
  callback,
}: props) {
  const { session } = useAuthProvider();
  const router = useRouter();
  const inputRef = useRef<HTMLDivElement>(null);

    const [loading, load] = useLikeComment(item?._id ?? "", session?._id ?? "");


  return (
    <>
      <div key={item?._id} className="">
        <div className="flex flex-row gap-1">
          <div className="w-9">
            {typeof item?.user_id !== "string" && (
              <Avatar
                size={35}
                image={item?.user_id?.img}
                onClick={() => router.push("/profile/posts")}
                pointer
              />
            )}
          </div>
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
                onClick={() => toggleSubCommentActive(item?._id ?? "")}
              >
                Comment
              </span>
            </div>
          </div>
        </div>

        <div className="pl-10 mt-2 flex flex-col gap-3">
          {item?.subComments &&
            item.subComments.map((item: ISubComment, index) => (
              <SubComment item={item} />
              // <div key={index}>{item.description}</div>
            ))}
        </div>

        <div className="pl-10" ref={inputRef}>
          {subCommentActive === item?._id && (
            <SubCommentInput
              setSubCommentActive={() => {
                toggleSubCommentActive(item?._id ?? "");
                inputRef?.current?.scrollIntoView({ behavior: "smooth" });
              }}
              comment_id={item?._id ?? ""}
              callback={callback}
            />
          )}
        </div>
      </div>
    </>
  );
}
