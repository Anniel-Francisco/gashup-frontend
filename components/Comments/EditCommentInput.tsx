import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { useUpdateComment, useUpdateSubComment } from "@/hooks/usePost";
import { useAuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { IComment, ISubComment } from "@/types/post";
import EditorButtons from "../Post/EditorButtons";
import { Spinner } from "../Spinner/Spinner";

interface Props {
  className?: string;
  item: IComment;
  callback: (item: IComment) => void;
  cancel: () => void;
  isSubComment?: boolean;
}

export default function EditCommentInput({
  className,
  item,
  callback,
  cancel,
  isSubComment,
}: Props) {
  const { session, removeSession } = useAuthProvider();
  const router = useRouter();
  const [showAlert] = useAlert();
  const [commentData, setCommentData] = useState<any>(item);
  const [loading, load] = useUpdateComment(
    item._id as string,
    commentData as IComment
  );
  const [loadingUpdate, loadUpdate] = useUpdateSubComment(
    item._id as string,
    commentData as ISubComment
  );

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
        class: "p-2 rounded-lg focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      setCommentData((prev: any) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(item.description);
    }
  }, [editor, item.description]);

  const clearData = () => {
    editor?.commands.setContent("");
  };

  const onSubmit = async () => {
    const { response, error } = await load();

    if (error) {
      return showAlert(
        "error",
        error && error.response
          ? error.response.data.mensaje
          : "El servidor puede estar experimentando problemas"
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

  const onSubmitSubComment = async () => {
    const { response, error } = await loadUpdate();

    if (error) {
      return showAlert(
        "error",
        error && error.response
          ? error.response.data.mensaje
          : "El servidor puede estar experimentando problemas"
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

  return (
    <div className={`${className} flex flex-col py-2`}>
      <EditorButtons editor={editor} />
      <div className="flex flex-col w-full border rounded-lg">
        <EditorContent
          editor={editor}
          className="w-full text-sm border-none mb-1"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={cancel}
            className="bg-[#5f5f5f] rounded-md outline-none p-1 text-white px-5 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              isSubComment ? onSubmitSubComment() : onSubmit();
            }}
            disabled={
              commentData.description === "<p></p>" || !commentData.description
            }
            className={`${
              commentData.description === "<p></p>" || !commentData.description
                ? "bg-[#afafaf] cursor-not-allowed"
                : "bg-[#c258df]"
            } rounded-md outline-none p-1 text-white px-5 text-sm`}
          >
            Editar
          </button>
        </div>
      </div>
      <Spinner loading={loading} />
      {/* <ToastContainer /> */}
    </div>
  );
}
