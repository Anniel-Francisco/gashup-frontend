import { useState, useEffect } from "react";
import Image from "next/image";

// COMPONENTS
import Modal from "../Modal";
import { Spinner } from "../Spinner/Spinner";

// MUI
import { Button } from "@mui/material";

// ICONS
import { IoCloseOutline } from "react-icons/io5";

// SESSION
import { useAuthProvider } from "@/context/AuthContext";

// TYPES
import { IUser } from "@/types/user";

// HOOKS
import { useUpdateUser } from "@/hooks/useUser";
import { useAlert } from "@/hooks/useAlert";

interface Props {
  image: File | null;
  modal: boolean;
  onClose: () => void;
}

export function BannerPreview({ image, modal, onClose }: Props) {
  const { session } = useAuthProvider();
  const [user, setUser] = useState<IUser | null>({
    code: process.env.NEXT_PUBLIC_USER_CODE ?? "",
    name: session?.name ?? "",
    email: session?.email ?? "",
    phone: session?.phone ?? "",
    img: session?.img ?? null,
    banner: null,
  });
  const [showAlert] = useAlert();
  const [loading, load] = useUpdateUser(session?._id, user);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof Blob) {
      const objectUrl = URL.createObjectURL(image);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageSrc(null);
    }
  }, [image]);

  useEffect(() => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, banner: image } : prevUser
    );
  }, [image]);

  const onUpdate = async () => {
    if (!image) {
      showAlert("warning", "Debes agregar una imagen");
    } else {
      const { response, error } = await load();
      if (error) {
        showAlert("error", error.response.data.message);
      } else if (response) {
        showAlert("success", response.data.message);
      }
    }
  };

  return (
    <Modal modal={modal} height={400}>
      <div className="flex flex-col modal w-full  outline-none items-center justify-center h-full  p-4 rounded-md">
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
            <span className="text-xl font-semibold">Select an image</span>
          )}
        </div>
        <div className="mt-4 w-full">
          <Button
            onClick={onUpdate}
            className="w-full"
            variant="contained"
            style={{ backgroundColor: "#2c3e50" }}
          >
            Update
          </Button>
        </div>
      </div>
      {/* Spinner */}
      <Spinner loading={loading} message="updating" />
    </Modal>
  );
}
