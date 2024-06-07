import Modal from "@mui/material/Modal";

interface Props {
  modal: boolean;
  showModal: () => void;
}

export function Auth({modal, showModal}: Props) {
  return (
    <Modal open={modal} onClose={showModal}>
      <span>Hola</span>
    </Modal>
  );
}
