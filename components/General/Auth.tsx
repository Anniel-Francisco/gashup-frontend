import { useState } from "react";
// MUI
import Modal from "@mui/material/Modal";

import { LogIn, SignUp } from "../Auth";

interface Props {
  modal: boolean;
  showModal: () => void;
}

export function Auth({ modal, showModal }: Props) {
  const [auth, setAuth] = useState<boolean>(true);
  const onClose = (): void => {
    setAuth(true);
    showModal();
  };
  const setAuthState = (): void => {
    setAuth(!auth);
  };

  return (
    <Modal
      open={modal}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <div
        style={{ height: auth ? "400px" : "600px" }}
        className="w-2/6 max-md:w-11/12 bg-white outline-none rounded-lg"
      >
        {auth ? (
          <LogIn onClose={onClose} setAuthState={setAuthState} />
        ) : (
          <SignUp setAuthState={setAuthState} />
        )}
      </div>
    </Modal>
  );
}
