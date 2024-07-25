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
  confirmButtonText: string;
  callback: Function;
}

const MessageDialog = ({
  open,
  setOpen,
  titleText,
  confirmationText,
  confirmButtonText,
  callback
}: Props) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">
          {titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            callback();
            setOpen(false)
            }}>{confirmButtonText}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageDialog;
