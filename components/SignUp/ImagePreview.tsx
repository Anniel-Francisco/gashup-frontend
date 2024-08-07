import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import { IoCloseOutline } from "react-icons/io5";

import "@/styles/signup/image-preview.css";

interface Props {
  modal: boolean;
  onClose: () => void;
  image: Blob | string | null | undefined;
}

export function ImagePreview({ modal, onClose, image }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof Blob) {
      const objectUrl = URL.createObjectURL(image);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageSrc(image ?? null);
    }
  }, [image]);
  return (
    <Modal
      open={modal}
      onClose={onClose}
      className="flex flex-col items-center flex-grow justify-center"
    >
      <div className="flex flex-col modal w-2/6 max-md:w-11/12 outline-none items-center justify-center bg-white h-3/6  p-4 rounded-md">
        <div className="flex items-center justify-between w-full mb-2">
          <span className="font-semibold text-xl primary">Preview</span>
          <span onClick={onClose} className="cursor-pointer">
            <IoCloseOutline
              fontSize={25}
              onClick={onClose}
              className="icon cursor-pointer rounded-full"
            />
          </span>
        </div>

        <div className="flex flex-grow w-full items-center justify-center">
          {imageSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt="Preview Image"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <span className="text-xl font-semibold">Seleciona una imagen</span>
          )}
        </div>
      </div>
    </Modal>
  );
}
