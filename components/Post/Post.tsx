import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import PostButton from "./PostButton";
import { SlOptionsVertical } from "react-icons/sl";
import { IPost } from "@/types/post";
import { Avatar } from "../Avatar/Avatar";
import { useRouter } from "next/navigation";
import { ImageCarousel } from "./ImageCarousel";

import { useAuthProvider } from "@/context/AuthContext ";
export default function Post({ data }: { data: IPost }) {
  const { session } = useAuthProvider();
  const router = useRouter();
  const goToRoute = () => {
    if (data._id === session?._id) {
      router.push("/profile/posts");
    }
  };
  return (
    <div className="flex flex-col gap-3 mt-5 border max-md:w-[100%] w-[70%] border-r-2 rounded-md">
      <div className="flex justify-between p-4">
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
            <p className="font-bold">
              {typeof data.user !== "string" ? data.user?.name : ""}
            </p>
            <p className="text-sm font-medium">
              {data.postDate === "Just now"
                ? data.postDate
                : data.postDate + " ago"}
            </p>
          </div>
        </div>
        <SlOptionsVertical className="w-6 h-6 fill-black cursor-pointer" />
      </div>
      <div
        className="pl-4"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
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

      <div className="flex gap-3 p-4">
        <PostButton
          Icon={AiFillLike}
          amount={Number(data.user_likes?.length)}
        />
        <PostButton
          Icon={FaComments}
          amount={Number(data.user_likes?.length)}
        />
        <PostButton Icon={FaShare} amount={0} />
      </div>
    </div>
  );
}
