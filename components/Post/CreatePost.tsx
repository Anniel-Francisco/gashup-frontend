"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { Avatar } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PostButtons from "./EditorButtons";
import EditorButtons from "./EditorButtons";
import CreateButtons from "./CreateButtons";
import { useState } from "react";

export default function CreatePost() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
  });

  return (
    <div className="flex flex-col gap-3 border p-4 w-full border-r-2 mb-2 rounded-md">
      <EditorButtons editor={editor} />
      <div className="flex flex-row gap-3">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

        <div className="flex flex-col w-full">
          <EditorContent editor={editor} className="w-full border rounded-md" />
        </div>
      </div>

     {images.length > 0 && <div className="slider">
        <button
          id="prevBtn"
          onClick={showPrevSlide}
          disabled={images.length === 0}
        >
          ❮
        </button>
        <div className="slides">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={{ display: index === currentSlide ? "block" : "none" }}
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
      </div>}

      <div>
        <CreateButtons
          setImages={setImages}
          images={images}
          setCurrentSlide={setCurrentSlide}
          currentSlide={currentSlide}
          showPrevSlide={showPrevSlide}
          showNextSlide={showNextSlide}
        />
      </div>
    </div>
  );
}
