import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Grid } from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { sendAppointmentSummaryEmail } from "../DocSearchForm/findADoctorSlice";
import { sendingPaymentSummaryEmailStatus } from "./selector";
import validator from "email-validator";

const EmailPaymentSummaryDialog = ({ data }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(sendingPaymentSummaryEmailStatus);
  const [email, setEmail] = useState(null);
  return (
    <div>
      <DialogContent style={{ margin: 10 }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={
            !validator.validate(email) || isLoading === "loading" ? true : false
          }
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(
              sendAppointmentSummaryEmail({ emailToSend: email, params: data })
            )
          }
        >
          {isLoading === "loading" ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default EmailPaymentSummaryDialog;
