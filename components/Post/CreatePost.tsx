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
import AlertDialog from "../ConfirmationDialog";

interface props {
  className?: string;
  community_id: string;
  callback: (item: IPost) => void
}

export default function CreatePost({ className, community_id, callback }: props) {
  const { session, removeSession } = useAuthProvider();
  const post: IPost = {
    title: "",
    description: "",
    community: community_id,
    user: session?._id ? session?._id : null,
    images: [],
  };

  const router = useRouter();
  const [showAlert] = useAlert();
  const [images, setImages] = useState([]);
  const [postData, setPostData] = useState<IPost>(post);
  const [loading, load] = useCreatePost(postData);
  const [openConfimationModal, setOpenConfirmationModal] = useState(false);

  const clearData = () => {
    editor?.commands.setContent("");
    setPostData(post);
    setImages([]);
  };

  const openConfirmation = () => {
    if (!postData.description) {
      return showAlert("warning", "Debes escribir algo");
    }

    setOpenConfirmationModal(true);
  };

  const onSubmit = async () => {
    setOpenConfirmationModal(false);

    const { response, error } = await load();
    if (error) {
      return showAlert(
        "error",
        error && error.response
          ? error.response.data.mensaje
          : "The server may be experiencing problems"
      );
    }

    if (response?.data.ok) {
      callback(response.data.post)
      clearData();
      return showAlert("success", response?.data.mensaje);
    } else {
      return showAlert("warning", response?.data.mensaje);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Que estas pensando?",
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
    <div
      className={`${className} flex flex-col gap-3 border px-4 pt-4 pb-2 border-r-2 rounded-md`}
    >
      <AlertDialog
        setOpen={setOpenConfirmationModal}
        open={openConfimationModal}
        titleText={"Publicar post"}
        confirmationText={"Estas seguro de publicar este post"}
        cancelButtonText={"Cancelar"}
        confirmButtonText={"Publicar"}
        callback={onSubmit}
      />

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
      {images.length > 0 && <ImageCarousel key={0} items={images} />}

      <div>
        <CreateButtons
          setImages={setImages}
          images={images}
          onSubmit={openConfirmation}
          setPostData={setPostData}
          postData={postData}
        />
      </div>
      {/* Alert */}
      <ToastContainer />
      {/* Spinner */}
      <Spinner loading={loading} message="Publicando..." />
    </div>
  );
}
