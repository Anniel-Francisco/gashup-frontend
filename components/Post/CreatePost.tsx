"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { Avatar } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PostButtons from "./EditorButtons";
import EditorButtons from "./EditorButtons";
import CreateButtons from "./CreateButtons";
import { useState } from "react";
import Image from "next/image";
import { useAlert } from "@/hooks/useAlert";
import { useCreatePost } from "@/hooks/usePost";
import { IPost } from "@/types/post";
import { ImageCarousel } from "./ImageCarousel";

export default function CreatePost() {
  const [showAlert] = useAlert();
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [postData, setPostData] = useState<IPost>({
    title: "",
    description: "",
    community_id: "666f2c85cdb1f3d0279f892d",
    user_id: "666aeb6d01dd81d3f00fddde",
    images: []
  });
  const [loading, load] = useCreatePost(postData);

  const clearData = () => {};

  const onSubmit = async () => {
    if (!postData.description) {
      return showAlert("warning", "You must fill out both fields");
    }

    const { response, error } = await load();
    if (error) {
      return showAlert(
        "error",
        error && error.response
          ? error.response.data.message
          : "You may be experiencing connection problems or the server is down"
      );
    }

    if (response?.data.ok) {
      clearData();
      return showAlert("warning", "SENT");
    } else {
      return showAlert("warning", "NOT SENT");
    }
  };

  const showPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
      console.log(editor.getHTML());
      setPostData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  return (
    <div className="flex flex-col gap-3 border p-4 w-full border-r-2 mb-2 rounded-md">
      <EditorButtons editor={editor} />
      <div className="flex flex-row gap-3">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

        <div className="flex flex-col w-full border">
          <EditorContent editor={editor} className="w-full border rounded-md" />
        </div>
      </div>
      {/* {images.length > 0 && (
        <div className="slider w-full flex flex-row items-center justify-center gap-4">
          <button
            id="prevBtn"
            onClick={showPrevSlide}
            disabled={images.length === 0}
          >
            ❮
          </button>

          <div className="slides flex flex-col gap-2 justify-center">
            <span>
              {currentSlide + 1} de {images.length}
            </span>

            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Slide ${index}`}
                style={{ display: index === currentSlide ? "block" : "none" }}
                height={250}
                width={250}
                className="rounded-md"
              />
            ))}
          </div>
          <button
            id="nextBtn"
            onClick={showNextSlide}
            disabled={images.length === 0}
          >
            ❯
          </button>
        </div>
      )} */}
      {images.length > 0 && <ImageCarousel items={images} />}

      <div>
        <CreateButtons
          setImages={setImages}
          images={images}
          setCurrentSlide={setCurrentSlide}
          onSubmit={onSubmit}
          setPostData={setPostData}
          postData={postData}
        />
      </div>
    </div>
  );
}
