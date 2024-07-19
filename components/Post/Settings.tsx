"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { SlOptionsVertical } from "react-icons/sl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDeletePost } from "@/hooks/usePost";
import AlertDialog from "../ConfirmationDialog";
import { ToastContainer } from "react-toastify";
import { useAlert } from "@/hooks/useAlert";
import { IPost } from "@/types/post";

interface props {
  id: string;
  post: Array<IPost>;
  setPosts: Function;
}

export default function Settings({ id, post, setPosts }: props) {
  const [showAlert] = useAlert();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, load] = useDeletePost(id);
  const [openConfimationModal, setOpenConfirmationModal] =
    React.useState(false);

  const deletePost = async () => {
    const { response, error } = await load();
    const filteredPosts = post.filter((item: IPost) => item._id != id)
    
    if (response?.data.ok) {
      setOpenConfirmationModal(false);
      setPosts(filteredPosts);
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
        titleText={"Publicar post"}
        confirmationText={"Estas seguro de eliminar este post"}
        cancelButtonText={"Cancelar"}
        confirmButtonText={"Confirmar"}
        callback={deletePost}
      />

      <button onClick={handleClick}>
        <SlOptionsVertical className="w-6 h-6 fill-black cursor-pointer" />
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
            <ListItemText primary="Editar publicación" />
          </ListItem>
          <ListItem button onClick={openConfirmation}>
            <ListItemText primary="Borrar publicación" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
