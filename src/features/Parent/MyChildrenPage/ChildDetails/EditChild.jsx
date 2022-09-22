import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { editChildAsync } from "../myChildrenSlice";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import QRCode from "qrcode.react";
import { selectUpdateChildStatus } from "../selector";

export const EditChildDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [middleName, setMiddleName] = useState(data?.middleName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const updatingStatus = useSelector(selectUpdateChildStatus);

  return (
    <>
      <form action="">
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    variant="outlined"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={updatingStatus === "loading" ? true : false}
            onClick={() => {
              dispatch(
                editChildAsync({
                  bio: {
                    middleName,
                    firstName,
                    lastName,
                    id: data.id,
                  },
                  parentId: data?.parentId,
                })
              );
            }}
          >
            {updatingStatus === "loading" ? "Loading.." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export const QrValue = ({ data }) => {
  const { qrCode } = data;
  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            {qrCode ? (
              <QRCode value={qrCode} />
            ) : (
              <Typography color="textPrimary">No QR Code Assigned.</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
