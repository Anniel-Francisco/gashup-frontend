import React, { useRef } from "react";
import { FaImage } from "react-icons/fa6";

export const ImageInputButton = ( {handleFileChange}: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={handleClick}>
        <FaImage className="fill-slate-500 w-7 h-7" />
      </button>
    </div>
  );
};
