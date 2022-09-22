import React, { useState } from "react";
import { Box, TextField, Button, DialogContentText } from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import validator from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { emailVacSchedule } from "./ParentSideVaccineSlice";
import { selectEmailVacScheduleStatus } from "./selector";

const EmailDialog = ({ data }) => {
  const dispatch = useDispatch();
  const emailStatus = useSelector(selectEmailVacScheduleStatus);
  const [email, setEmail] = useState(null);
  return (
    <div>
      <DialogContent>
        <Box px={3}>
          <DialogContentText>
            Enter the email address you want to send
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!validator.validate(email) || emailStatus === "loading"}
          onClick={() =>
            dispatch(emailVacSchedule({ ...data, emailToSend: email }))
          }
        >
          {emailStatus === "loading" ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default EmailDialog;
