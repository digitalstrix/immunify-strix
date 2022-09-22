import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ open, closeAction }) {
  return (
    <Dialog
      open={open}
      onClose={closeAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent style={{ textAlign: "center" }} dividers>
        <DialogContentText id="alert-dialog-description">
          Date you have chosen is not available.<br/>
          Please select an upcoming date.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAction} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
