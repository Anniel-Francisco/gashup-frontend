"use client";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import PostButton from "./PostButton";
import { IPost } from "@/types/post";
import { Avatar } from "../Avatar/Avatar";
import { useRouter } from "next/navigation";
import { ImageCarousel } from "./ImageCarousel";
import { useLikePost } from "@/hooks/usePost";
import { useEffect, useState } from "react";
import Settings from "./Settings";

interface props {
  data: IPost;
  post?: Array<IPost>;
  setPosts?: Function;
}

import { useAuthProvider } from "@/context/AuthContext";
import { useAlert } from "@/hooks/useAlert";
import { ToastContainer } from "react-toastify";
export default function Post({ data, post, setPosts }: props) {
  const router = useRouter();
  const [showAlert] = useAlert();

  const { session, removeSession } = useAuthProvider();
  const [loading, load] = useLikePost(data?._id ?? "", session?._id ?? "");
  const [active, setActive] = useState(false);

  const [userLikesAmount, setUserLikesAmount] = useState<number>(
    data.user_likes?.length ?? 0
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const findLike = data.user_likes?.find((item) => item == session?._id);
    if (findLike) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);

  const likePost = async () => {
    if (!session?._id) {
      return showAlert("warning", "Debes iniciar sessión");
    }

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

  const goToPerfil = (id: string) => {
    if (id === session?._id) {
      router.push(`/profile/posts`);
    } else {
      router.push(`/user/${id}`);
    }
  };

  const goToCommunity = () => {
    if (typeof data.community !== "string")
      router.push(`/communities/${data.community._id}`);
  };

  return (
    <div className="flex flex-col gap-2 border w-full border-r-2 rounded-md my-3">
      {/* Alert */}
      <ToastContainer />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex flex-row items-center gap-3">
          <Avatar
            size={50}
            image={
              typeof data.user !== "string" ? data.user?.img?.toString() : ""
            }
            onClick={() => {
              const id = typeof data?.user !== "string" && data?.user?._id;
              if (typeof id === "string") {
                goToPerfil(id);
              }
            }}
            styles={{ cursor: "pointer" }}
          />
          <div className="flex flex-col">
            <div className="font-bold flex items-center flex-row gap-1">
              <span
                className="cursor-pointer hover:text-gray-700"
                onClick={() => {
                  const id = typeof data?.user !== "string" && data?.user?._id;
                  if (typeof id === "string") {
                    goToPerfil(id);
                  }
                }}
              >
                {typeof data.user !== "string" ? data.user?.name : ""}
              </span>
              <span>{"•"}</span>
              <span
                className="font-normal text-sm cursor-pointer hover:text-gray-700"
                onClick={goToCommunity}
              >
                {typeof data.community !== "string" && data?.community?.name}
              </span>
            </div>
            <p className="text-xs">{data.postDate}</p>
          </div>
        </div>
        {session?._id ==
          (typeof data.user !== "string" ? data.user?._id : data.user) && (
          // <SlOptionsVertical className="w-6 h-6 fill-black cursor-pointer" />
          <Settings
            id={data._id ?? ""}
            post={post ?? []}
            setPosts={setPosts ?? Function}
          />
        )}
      </div>
      <div
        className="pl-4"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

      {data?.images && data?.images?.length > 0 && (
        <ImageCarousel items={data?.images} />
      )}

      <div className="flex gap-3 px-4 ">
        <PostButton
          Icon={AiFillLike}
          amount={userLikesAmount}
          callback={likePost}
          active={active}
          classNameButton={"p-3"}
        />
        <PostButton
          Icon={FaComments}
          amount={
            !Number(data.comments?.length) ? 0 : Number(data.comments?.length)
          }
          callback={() => router.push(`/post/${data._id}`)}
          classNameButton={"p-2"}
        />
        <PostButton
          Icon={FaShare}
          amount={0}
          callback={() => {}}
          classNameButton={"p-3"}
        />
      </div>
    </div>
  );
}
