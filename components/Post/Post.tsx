"use client";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import PostButton from "./PostButton";
import { SlOptionsVertical } from "react-icons/sl";
import { IPost } from "@/types/post";
import { Avatar } from "../Avatar/Avatar";
import { useRouter } from "next/navigation";
import { ImageCarousel } from "./ImageCarousel";
import { useLikePost } from "@/hooks/usePost";
import { useAuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// import { useAuthProvider } from "@/context/AuthContext";
export default function Post({ data }: { data: IPost }) {
  const router = useRouter();
  const { session, removeSession } = useAuthProvider();
  const [loading, load] = useLikePost(data?._id ?? "", session?._id ?? "");
  const [active, setActive] = useState(false);

  const [userLikesAmount, setUserLikesAmount] = useState<number>(
    data.user_likes?.length ?? 0
  );

  useEffect(() => {
    const findLike = data.user_likes?.find((item) => item == session?._id);
    if (findLike) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);

  const likePost = async () => {
    const { response, error } = await load();

    if (response?.data.ok) {
      if (response.data.data) {
        setUserLikesAmount(userLikesAmount + 1);
        setActive(true);
      } else {
        setUserLikesAmount(userLikesAmount - 1);
        setActive(false);
      }
    }
  };

  const goToRoute = () => {
    if (data._id === session?._id) {
      router.push("/profile/posts");
    }
  };

  return (
    <div className="flex flex-col gap-3 border w-full border-r-2 rounded-md my-3">
      <div className="flex justify-between px-4 pt-4">
        <div className="flex flex-row items-center gap-3">
          <Avatar
            size={50}
            image={
              typeof data.user !== "string" ? data.user?.img?.toString() : ""
            }
            onClick={goToRoute}
            styles={{ cursor: "pointer" }}
          />
          <div className="flex flex-col">
            <div className="font-bold flex items-center flex-row gap-1">
              {typeof data.user !== "string" ? data.user?.name : ""}
              <span>{"•"}</span>
              <span className="font-normal text-sm">
                {typeof data.community !== "string" && data?.community?.name}
              </span>
            </div>
            <p className="text-xs">{data.postDate}</p>
          </div>
        </div>
        {session?._id ==
          (typeof data.user !== "string" ? data.user?._id : data.user) && (
          <SlOptionsVertical className="w-6 h-6 fill-black cursor-pointer" />
        )}
      </div>
      <div
        className="pl-4"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      {/* 
        {data?.images?.map((item) => (
          <Image
            src={item.toString()} // Display the first image
            alt="Post image"
            width={200}
            height={200}
            className="w-[100%]"
          />
        ))} */}

      {data?.images && data?.images?.length > 0 && (
        <ImageCarousel items={data?.images} />
      )}

      <div className="flex gap-3 px-4 ">
        <PostButton
          Icon={AiFillLike}
          amount={userLikesAmount}
          callback={likePost}
          active={active}
        />
        <PostButton
          Icon={FaComments}
          amount={Number(data.comments?.length)}
          callback={() => router.push(`/post/${data._id}`)}
        />
        <PostButton Icon={FaShare} amount={0} callback={() => {}} />
      </div>
    </div>
  );
}
