"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
// TYPES
import { IPost } from "@/types/post";
import { IDataResponse } from "@/types/response";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// COMPONENTS
import { Avatar } from "@/components/Avatar/Avatar";
import Post from "@/components/Post/Post";
import { Button } from "@mui/material";
import { Spinner } from "@/components/Spinner/Spinner";
// HOOKS
import { useGetPostByUserId } from "@/hooks/usePost";
import { useFollowUser, useUnFollowUser } from "@/hooks/useUser";
export default function User({ params }: { params: { id: string } }) {
  const { session } = useAuthProvider();
  const [post, setPosts] = useState<IPost[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [data, setData] = useState<IDataResponse | null>(null);
  const [, loadFollow] = useFollowUser(session?._id ?? "");
  const [, loadUnFollow] = useUnFollowUser(session?._id ?? "");
  const [loading, load] = useGetPostByUserId(params.id);
  async function loadUserProfile() {
    const { response, error } = await load();
    if (response) {
      setData(response.data);
      setPosts(response.data.posts);
    }
  }
  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session]);

  useEffect(() => {
    const isUserFollowed = session?.followed.includes(params.id);
    setIsFollowing(!!isUserFollowed);
    loadUserProfile();
  }, [params.id]);

  const handleFollow = async () => {
    const findUser = session?.followed.includes(params.id);
    if (findUser) {
      await loadUnFollow({ userToFollow: params.id });
    } else {
      await loadFollow({ userToFollow: params.id });
    }
  };

  return (
    <>
      {data && data?.user?.banner ? (
        <div
          className="relative flex items-end w-full h-44 bg-cover bg-center pl-8 bg-no-repeat"
          style={{
            backgroundImage: data?.user?.banner
              ? `url(${data?.user?.banner})`
              : "none",
          }}
        >
          {params.id ? (
            <div className="flex items-end gap-2 absolute bottom-[-40px]">
              <Avatar
                size={100}
                image={data?.user?.img}
                session={null}
                styles={{ borderWidth: 3, borderColor: "#fff" }}
              />
              <span className="text-3xl drop-shadow-lg text-[#2c3e50] font-bold">
                {data?.user?.name}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        data && (
          <div className="flex items-center gap-2 w-full mt-2">
            <Avatar
              size={90}
              name={data?.user?.name}
              image={data?.user?.img}
              session={null}
            />
            <div>
              <span className="text-3xl drop-shadow-lg text-[#2c3e50] font-bold">
                {data?.user?.name}
              </span>
              <div className="flex mt-2">
                <Button
                  variant="contained"
                  onClick={handleFollow}
                  style={{
                    backgroundColor: isFollowing ? "#9b26b6" : "#afafaf",
                  }}
                >
                  <span className="text-sm">
                    {isFollowing ? "Siguiendo" : "Seguir"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )
      )}
      {data?.user?.banner ? (
        <div
          className="flex justify-end pb-2"
          style={{
            borderColor: "#999999",
            borderBottomWidth: 1,
            marginTop: data?.user?.banner ? 30 : 0,
          }}
        >
          <Button
            onClick={handleFollow}
            variant="contained"
            style={{
              backgroundColor: isFollowing ? "#9b26b6" : "#afafaf",
            }}
          >
            <span className="text-sm">
              {isFollowing ? "Siguiendo" : "Seguir"}
            </span>
          </Button>
        </div>
      ) : (
        ""
      )}
      <div>
        {data?.posts &&
          data?.posts.map((item, index) => {
            return (
              <Post key={index} data={item} post={post} setPosts={setPosts} />
            );
          })}
      </div>
      {/* Spinner */}
      <Spinner loading={loading} message="cargando" />
    </>
  );
}
