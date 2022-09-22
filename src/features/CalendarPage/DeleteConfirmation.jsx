import React from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createAddEventPayload,
  validateAddEventPayload,
  isHolidayEventTypeSelected,
  generateInitialInputs,
} from "../../utils/calenderUtils";
import { } from "./calenderSlice";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DeleteConfirmation({
  open,
  selectedEvent,
  holidays,
  user,
  closeAction,
  confirmationAction,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={closeAction}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="confirmation-dialog-title">
          Confirm to Delete
        </DialogTitle>
        <DialogContent dividers>Are you sure to do this?</DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => confirmationAction()}
            color="primary"
            variant="outlined"
          >
            yes
          </Button>
          <Button
            autoFocus
            onClick={closeAction}
            color="primary"
            variant="outlined"
          >
            no
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
