import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  Grid,
  CardContent,
  Divider,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import validator from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { selectEmailSendingStatus } from "./selector";
import { emailHealthFile } from "./healthFilesSlice";

const EmailReport = ({ data }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectEmailSendingStatus);
  const [email, setEmail] = useState(null);
  return (
    <div>
      <form action="">
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            disabled={!validator.validate(email) || status === "loading"}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              dispatch(
                emailHealthFile({
                  email: email,
                  imageUrl: data.url,
                })
              );
            }}
          >
            {status === "loading" ? "Loading.." : "Send Email"}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default EmailReport;
