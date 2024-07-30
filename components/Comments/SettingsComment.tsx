"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { SlOptionsVertical } from "react-icons/sl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDeleteComment } from "@/hooks/usePost";
import AlertDialog from "../ConfirmationDialog";
import { ToastContainer } from "react-toastify";
import { useAlert } from "@/hooks/useAlert";
import { IComment } from "@/types/post";

interface props {
  id: string;
  comments: Array<IComment>;
  setComments: Function;
}

export default function SettingsComment({ id, comments, setComments }: props) {
  const [showAlert] = useAlert();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, load] = useDeleteComment(id);
  const [openConfimationModal, setOpenConfirmationModal] =
    React.useState(false);

  const deleteComment = async () => {
    const { response, error } = await load();
    const filteredComments = comments.filter((item: IComment) => item._id != id);
    
    if (response?.data.ok) {
      setOpenConfirmationModal(false);
      setComments(filteredComments);
       showAlert("success", response?.data.mensaje);
    } else {
      setOpenConfirmationModal(false);
       showAlert("warning", response?.data.mensaje);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openConfirmation = () => {
    setOpenConfirmationModal(true);
  };

  const open = Boolean(anchorEl);
  const idPop = open ? "simple-popover" : undefined;

  return (
    <div>
      <ToastContainer />
      <AlertDialog
        setOpen={setOpenConfirmationModal}
        open={openConfimationModal}
        titleText={"Borrar comentario"}
        confirmationText={"Estas seguro de eliminar este comentario?"}
        cancelButtonText={"Cancelar"}
        confirmButtonText={"Confirmar"}
        callback={deleteComment}
      />

      <button onClick={handleClick}>
        <SlOptionsVertical className="w-5 h-5 pt-1 fill-black cursor-pointer" />
      </button>

      <Popover
        id={idPop}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Editar comentario" />
          </ListItem>
          <ListItem button onClick={openConfirmation}>
            <ListItemText primary="Borrar comentario" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
