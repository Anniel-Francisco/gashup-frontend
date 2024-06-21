import React, { useRef } from "react";

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
      <button onClick={handleClick}>Seleccionar imagen</button>
    </div>
  );
};
