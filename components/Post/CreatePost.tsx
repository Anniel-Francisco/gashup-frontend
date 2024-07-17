"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButtons from "./EditorButtons";
import CreateButtons from "./CreateButtons";
import { Spinner } from "../Spinner/Spinner";
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useCreatePost } from "@/hooks/usePost";
import { IPost } from "@/types/post";
import { ImageCarousel } from "./ImageCarousel";
import { useAuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar } from "../Avatar/Avatar";
import { ToastContainer } from "react-toastify";

export default function CreatePost() {
  const { session, removeSession } = useAuthProvider();
  const post: IPost = {
    title: "",
    description: "",
    community: "666f2c85cdb1f3d0279f892d",
    user: session?._id ? session?._id : null,
    images: [],
  };

  const router = useRouter();
  const [showAlert] = useAlert();
  const [images, setImages] = useState([]);
  const [postData, setPostData] = useState<IPost>(post);
  const [loading, load] = useCreatePost(postData);

  const clearData = () => {
    setPostData(post);
  };

  const onSubmit = async () => {
    if (!postData.description) {
      return showAlert("warning", "You must write something");
    }

    const { response, error } = await load();
    if (error) {
      return showAlert(
        "error",
        error && error.response
          ? error.response.data.message
          : "The server may be experiencing problems"
      );
    }

    if (response?.data.ok) {
      clearData();
      return showAlert("success", "SENT");
    } else {
      return showAlert("warning", "NOT SENT");
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What are you thinking?",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
    ],
    content: "",
    injectCSS: true,
    editorProps: {
      attributes: {
        class: "p-2 rounded-md",
      },
    },
    onUpdate({ editor }) {
      setPostData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  return (
    <div className="flex flex-col gap-3 border p-4 md:w-[70%] w-full border-r-2 rounded-md">
      <EditorButtons editor={editor} />
      <div className="flex flex-row gap-3">
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
        <div>
          <Avatar
            size={40}
            image={session?.img}
            onClick={() => router.push("/profile/posts")}
            pointer
          />
        </div>

        <div className="flex flex-col w-full border">
          <EditorContent editor={editor} className="w-full outline-none" />
        </div>
      </div>
      {images.length > 0 && <ImageCarousel items={images} />}

      <div>
        <CreateButtons
          setImages={setImages}
          images={images}
          onSubmit={onSubmit}
          setPostData={setPostData}
          postData={postData}
        />
      </div>
      {/* Alert */}
      <ToastContainer />
      {/* Spinner */}
      <Spinner loading={loading} message="posting..."/>
    </div>
  );
}
