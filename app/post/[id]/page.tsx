"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useGetCommentsByPost, useGetPostById } from "@/hooks/usePost";
import { IPost, ISubComment } from "@/types/post";
import Post from "@/components/Post/Post";
import CommentInput from "@/components/Comments/CommentInput";
import { IComment } from "@/types/post";
import { useRouter } from "next/navigation";
import Comment from "@/components/Comments/Comment";
import { Spinner } from "@/components/Spinner/Spinner";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [subComments, setSubComments] = useState<Array<ISubComment>>([]);

  const [loading, load] = useGetPostById(params.id);
  const [loadingComments, loadComments] = useGetCommentsByPost(params.id);
  const [subCommentActive, setSubCommentActive] = useState<string | null>(null);
  // const [loadingSubComments, loadSubComments] = useGetSubCommentsByComment(
  //   params.id
  // );

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

  // const getSubCommentsByComment = async () => {
  //   const { response, error } = await loadSubComments();
  //   if (response?.data.ok) {
  //     setSubComments(response.data.data);
  //   } else {
  //     setSubComments([]);
  //   }
  // };

  const addNewComment = (item: IComment) => {
    getPost();
    setComments((prev) => [item, ...prev]);
  };

  const addNewSubComment = (item: ISubComment) => {
    getPost();
    // setSubComments((prev) => [item, ...prev]);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === item.comment_id
          ? {
              ...comment,
              subComments: comment.subComments
                ? [...comment.subComments, item]
                : [item],
            }
          : comment
      )
    );
  };

  console.log(comments)

  useEffect(() => {
    getPost();
    getCommentsByPost();
    // getSubCommentsByComment();
    window.scrollTo(0, 0);
  }, []);

  const toggleSubCommentActive = (commentId: string) => {
    setSubCommentActive((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Spinner loading={loading} />
      {post ? <Post data={post} /> : null}

      <CommentInput post_id={params.id} callback={addNewComment} />

      <div className="flex flex-col gap-3 mt-3">
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <Comment
              key={index}
              item={item}
              comments={comments}
              setComments={setComments}
              subCommentActive={subCommentActive}
              toggleSubCommentActive={toggleSubCommentActive}
              callback={addNewSubComment}
            />
          ))
        ) : (
          <p>No comments found</p>
        )}
      </div>
    </div>
  );
}
