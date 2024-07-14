"use client";
import { BubbleMenu, Editor } from "@tiptap/react";
import "../../styles/general/communities.css"

interface PostButtonsProps {
  editor: Editor | null;
}

export default function EditorButtons({ editor }: PostButtonsProps) {
  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex bg-white p-2 border rounded-md shadow-md gap-1"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`border p-1 rounded-md hover:bg-gray-200 ${
              editor.isActive("bold") ? "bg-[#16a085] text-white" : ""
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`border p-1 rounded-md hover:bg-gray-200 ${
              editor.isActive("italic") ? "bg-[#16a085] text-white" : ""
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`border p-1 rounded-md hover:bg-gray-200 ${
              editor.isActive("strike") ? "bg-[#16a085] text-white" : ""
            }`}
          >
            Strike
          </button>
        </BubbleMenu>
      )}
    </>
  );
}
