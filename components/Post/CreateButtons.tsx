"use client";
import "../../styles/general/communities.css";
import { BiPoll } from "react-icons/bi";
import {  ImageInputButton } from "./ImageInputButton";
import { ChangeEvent } from "react";

export default function CreateButtons({
  setImages,
  images,
  setCurrentSlide,
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
      setCurrentSlide(0);
      setPostData({...postData, images: files});
    }
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de las imágenes al backend
    console.log("Submit images:", images);
  };

  return (
    <div className="flex justify-between ">
      <div className="flex gap-3 items-center">
        <ImageInputButton handleFileChange={handleImageSelection} />
        <button>
          <BiPoll className="fill-slate-500 w-7 h-7" />
        </button>
      </div>

      <button
        onClick={onSubmit}
        className="rounded-md p-2 bg-[#16a085] text-white px-5"
      >
        Post
      </button>
    </div>
  );
}
