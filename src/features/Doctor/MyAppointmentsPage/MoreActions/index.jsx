import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Dialog from "../../../../common/components/Admin/Dialog";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import VideoIcon from "@material-ui/icons/DuoRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUserId,
  selectCancellingAppointmentStatus,
  selectDoctorBasicData,
} from "../selector";
import { cancelAppointment, initiateCallAsync } from "../myAppointmentsSlice";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import {
  selectInitiateCallError,
  selectInitiateCallStatus,
} from "../../MakeCallPage/selector";

const Index = ({ data, dateSelected }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { date, status, appoinmentType } = data;
  const isToday = date == moment().format("YYYY-MM-DD");
  const isFutureDate = moment(date).isAfter(moment().format("YYYY-MM-DD"));

  const cancellingAppointmentStatus = useSelector(selectCancellingAppointmentStatus);
  const callStatus = useSelector(selectInitiateCallStatus);
  const callError = useSelector(selectInitiateCallError);
  const personId = useSelector(getLoggedInUserId);
  const { firstName, lastName } = useSelector(selectDoctorBasicData);

  useEffect(() => {
    if (cancellingAppointmentStatus === "succeeded") {
      setOpenDialog(false);
    }
  }, [cancellingAppointmentStatus]);

  const CALL_FAILURE = "Cannot call at the moment, User is not logged in";

  useEffect(() => {
    if (callStatus === "failed") {
      notify(enqueueSnackbar, CALL_FAILURE, "error");
    }
  }, [callStatus, callError, enqueueSnackbar]);
  const { immId, appoinmentId, userType } = data;

  useEffect(() => {
    if (callStatus === "succeeded") {
      history.push({
        pathname: "/make-call",
        search: "",
        state: data,
      });
    }
  }, [callStatus]);

  const ConfirmContent = (data, dateSelected) => {
    return (
      <div>
        <DialogContent>
          <Box p={2}>
            <Typography color="initial">
              Are you sure you want to cancel the appointment? Please read the
              FAQ section for more details on cancellation policy.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            disabled={cancellingAppointmentStatus === "loading"}
            color="primary"
            variant="contained"
            onClick={() => {
              dispatch(
                cancelAppointment({
                  ...data,
                  dateSelected,
                  personId,
                  slotId: data.appoinmentId,
                  loggedUser: {
                    Person: {
                      fullName: `${firstName} ${lastName}`,
                    },
                  },
                })
              );
            }}
          >
            {cancellingAppointmentStatus === "loading"
              ? "Updating..."
              : "Confirm"}
          </Button>
        </DialogActions>
      </div>
    );
  };

  return (
    <div>
      <Dialog
        tooltip="Confirm"
        dialogtitle={"Confirm Cancel"}
        dialogcontent={ConfirmContent(data, dateSelected)}
        maxWidth="xs"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Card>
        <Container>
          <Box my={2}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Button
                  disabled={
                    !(
                      isToday &&
                      (status === "ACCEPTED" || status === "CAPTURED") &&
                      appoinmentType === "Telemedicine"
                    )
                  }
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  startIcon={<VideoIcon />}
                  onClick={() => {
                    dispatch(
                      initiateCallAsync({
                        immId,
                        userName: `${firstName} ${lastName}`,
                        userType,
                        slotId: appoinmentId,
                      })
                    );
                  }}
                >
                  Call Patient
                </Button>
              </Paper>
            </Grid>
          </Box>
          <Box my={2}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Button
                  disabled={
                    cancellingAppointmentStatus === "loading" ||
                    !(
                      (isToday || isFutureDate) &&
                      (status === "PENDING" ||
                        status === "ACCEPTED" ||
                        status === "RESCHEDULED")
                    )
                  }
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  {cancellingAppointmentStatus === "loading"
                    ? "Cancelling..."
                    : "Cancel Appointment"}
                </Button>
              </Paper>
            </Grid>
          </Box>
        </Container>
      </Card>
    </div>
  );
};

export default withRouter(Index);
