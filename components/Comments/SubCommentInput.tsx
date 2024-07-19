"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButtons from "../Post/EditorButtons";
import { Spinner } from "../Spinner/Spinner";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useCreateSubComment } from "@/hooks/usePost";
import { useAuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { IComment, ISubComment } from "@/types/post";

interface props {
  className?: string;
  comment_id: string;
  callback: (item: ISubComment) => void;
  setSubCommentActive: Function;
}

export default function SubCommentInput({
  className,
  comment_id,
  callback,
  setSubCommentActive,
}: props) {
  const { session, removeSession } = useAuthProvider();
  const comment: ISubComment = {
    description: "",
    comment_id: comment_id,
    user_id: session?._id ? session?._id : null,
  };

  const router = useRouter();
  const [showAlert] = useAlert();
  const [commentData, setCommentData] = useState<ISubComment>(comment);
  const [loading, load] = useCreateSubComment(commentData);

  useEffect(() => {
    if (session?._id) {
      setCommentData({ ...comment, user_id: session?._id });
    }
  }, [session]);

  const clearData = () => {
    setCommentData(comment);
    editor?.commands?.setContent("");
  };

  const onSubmit = async () => {
    if (!commentData?.user_id) {
      return showAlert("warning", "Debes iniciar sesión para comentar");
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
      callback(response.data.data);
      return showAlert("success", response?.data.mensaje);
    } else {
      return showAlert("warning", response?.data.mensaje);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Añade un comentario",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
    ],
    content: "",
    injectCSS: true,
    editorProps: {
      attributes: {
        class: "p-2 rounded-lg",
      },
    },

    onUpdate({ editor }) {
      setCommentData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
    // onFocus(() => console.log("hola")),
  });

  return (
    <div className={`${className} flex flex-col gap-3 py-2`}>
      <EditorButtons editor={editor} />
      <div className="flex flex-col w-full border rounded-lg">
        <EditorContent
          editor={editor}
          className="w-full text-sm border-none mb-1"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setSubCommentActive(false)}
            className={`bg-[#5f5f5f] rounded-md outline-none p-1 text-white px-5 text-sm`}
          >
            Cancelar
          </button>

          <button
            onClick={onSubmit}
            disabled={
              commentData.description == "<p></p>" || !commentData.description
            }
            className={`${
              commentData.description == "<p></p>" || !commentData.description
                ? "bg-[#afafaf] cursor-not-allowed"
                : "bg-[#c258df]"
            } rounded-md outline-none p-1 text-white px-5 text-sm`}
          >
            Publicar
          </button>
        </div>
      </div>
      <Spinner loading={loading} />
      <ToastContainer />
    </div>
  );
}
