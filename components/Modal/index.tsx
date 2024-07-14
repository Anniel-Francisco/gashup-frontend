import { ReactNode } from "react";
// MUI
import ModalMUI from "@mui/material/Modal";

interface Props {
  modal: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
  children: ReactNode;
}

export default function Modal({
  modal,
  onClose,
  width,
  height,
  children,
}: Props) {
  return (
    <ModalMUI
      open={modal}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      closeAfterTransition
      disableEscapeKeyDown
      className="flex justify-center items-center"
    >
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        className="w-2/6 max-md:w-11/12 bg-white outline-none rounded-lg"
      >
        {children}
      </div>
    </ModalMUI>
  );
}
