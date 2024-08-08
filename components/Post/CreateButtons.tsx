"use client";
import "../../styles/general/communities.css";
import { BiPoll } from "react-icons/bi";
import {  ImageInputButton } from "./ImageInputButton";
import { ChangeEvent } from "react";

export default function CreateButtons({
  setImages,
  images,
  onSubmit,
  setPostData,
  postData
}: any) {
  const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e?.target?.files; // Tipo corregido: FileList | null
    if (files && files?.length > 0) {
      const imageUrls: string[] = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages(imageUrls);
      setPostData({...postData, images: files});
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center h-full">
        <ImageInputButton handleFileChange={handleImageSelection} />
        {/* <button>
          <BiPoll className="fill-slate-500 w-7 h-7" />
        </button> */}
      </div>

      <button
        onClick={onSubmit}
        disabled={postData.description == "<p></p>" || !postData.description}
        className={`${
          postData.description == "<p></p>" || !postData.description
            ? "bg-[#afafaf] cursor-not-allowed"
            : "bg-[#c258df]"
        } rounded-md outline-none p-2 text-white px-5`}
      >
        Post
      </button>
    </div>
  );
}
