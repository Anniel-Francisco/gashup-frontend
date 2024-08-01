import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  setOpen: Function;
  titleText: string;
  confirmationText: string;
  cancelButtonText: string;
  confirmButtonText: string;
  callback: Function;
}

const AlertDialog = ({
  open,
  setOpen,
  titleText,
  confirmationText,
  cancelButtonText,
  confirmButtonText,
  callback,
}: Props) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        style={{zIndex: 5}}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{cancelButtonText}</Button>
          <Button onClick={() => callback()} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
