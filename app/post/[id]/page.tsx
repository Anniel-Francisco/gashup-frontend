"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useGetCommentsByPost, useGetPostById } from "@/hooks/usePost";
import { IPost } from "@/types/post";
import Post from "@/components/Post/Post";
import CommentInput from "@/components/Post/CommentInput";
import { IComment } from "@/types/community";
import { Avatar } from "@/components/Avatar/Avatar";
import { useRouter } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const { session } = useAuthProvider();
  const router = useRouter();

  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<Array<IComment>>([]);

  const [loading, load] = useGetPostById(params.id);
  const [loadingComments, loadComments] = useGetCommentsByPost(params.id);

  const getPost = async () => {
    const { response, error } = await load();
    if (response?.data.ok) {
      setPost(response.data.data);
    } else {
      setPost(null);
    }
  };

  const getCommentsByPost = async () => {
    const { response, error } = await loadComments();
    if (response?.data.ok) {
      setComments(response.data.data);
    } else {
      setComments([]);
    }
  };
  
  const addNewComment = (item: IComment) => {
     getPost();
    setComments((prev) => [item, ...prev])
  }

  useEffect(() => {
    getPost();
    getCommentsByPost();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {post ? <Post data={post} /> : null}

      <CommentInput post_id={params.id} callback={addNewComment} />

      <div className="flex flex-col gap-3 mt-3">
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <div key={item?._id} className="flex flex-row gap-1">
              {typeof item?.user_id !== "string" && (
                <Avatar
                  size={30}
                  image={item?.user_id?.img}
                  onClick={() => router.push("/profile/posts")}
                  pointer
                />
              )}
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

              <div></div>
            </div>
          ))
        ) : (
          <p>No comments found</p>
        )}
      </div>
    </div>
  );
}
