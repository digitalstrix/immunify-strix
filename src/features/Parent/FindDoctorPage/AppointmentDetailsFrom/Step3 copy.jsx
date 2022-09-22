import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import {
  Card,
  Grid,
  Divider,
  Typography,
  Paper,
  Box,
  ListItem,
  List,
  ListItemText,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  captureAppointmentAsync,
  createAppointmentAsync,
  setActiveStepIndex,
} from "../DocSearchForm/findADoctorSlice";
import {
  getLoggedInParentId,
  getSelectedAppointmentTime,
  getSelectedAppointmentType,
  getSelectedChild,
  selectActiveStep,
  selectAppointmentCreationState,
  selectCapturingAppointmentStatus,
  selectCouponData,
  selectIsAppointmentCreationSuccess,
  selectIsFree,
} from "./selector";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import { useKeycloak } from "@react-keycloak/web";

const TimeInfo = ({ remainingTime }) => {
  const pad2 = (number) => {
    return (number < 10 ? "0" : "") + number;
  };
  const hours = Math.floor(remainingTime / 3600);
  const minutes = pad2(Math.floor((remainingTime % 3600) / 60));
  const seconds = pad2(remainingTime % 60);

  return <h2>{`${hours}:${minutes}:${seconds}`}</h2>;
};

const Step3 = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const { family_name, given_name, email } = keycloak.tokenParsed;

  const [appointmentFee, setAppointmentFee] = useState(50);

  const selectedTimeObj = useSelector(getSelectedAppointmentTime) || {};
  const selectedChildObj = useSelector(getSelectedChild);
  const selectedAppointmentType = useSelector(getSelectedAppointmentType) || {};
  const isFreeState = useSelector(selectIsFree);
  const couponData = useSelector(selectCouponData);
  const personId = useSelector(getLoggedInParentId);
  const capturingAppointmentStatus = useSelector(selectCapturingAppointmentStatus);
  const isAppointmentCreationSuccess = useSelector(selectIsAppointmentCreationSuccess);
  const appointmentCreationState = useSelector(selectAppointmentCreationState);
  const activeStep = useSelector(selectActiveStep);

  const CAPTURING_APPOINTMENT_ERROR = "Capturing Appointment Failed!";

  useEffect(() => {
    if (capturingAppointmentStatus === "failed") {
      notify(enqueueSnackbar, CAPTURING_APPOINTMENT_ERROR, "error");
    }
  }, [capturingAppointmentStatus, enqueueSnackbar]);

  useEffect(() => {
    if (
      isAppointmentCreationSuccess &&
      appointmentCreationState === "succeeded"
    ) {
      dispatch(setActiveStepIndex(activeStep + 1));
    }
  }, [isAppointmentCreationSuccess, appointmentCreationState]);

  useEffect(() => {
    dispatch(
      captureAppointmentAsync({
        slotId: selectedTimeObj.id,
        userType: selectedChildObj ? "CHILD" : "PARENT",
        appointmentType: selectedAppointmentType?.appoinmentType,
        apoointmentFee: isFreeState ? 0 : appointmentFee,
        total: isFreeState
          ? 0
          : parseInt(appointmentFee) +
            (parseInt(selectedAppointmentType?.amount) || 0) -
            (couponData ? parseInt(couponData?.coupon?.amount) : 0),
        doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || 0,
        immId: selectedChildObj ? selectedChildObj.id : personId,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const options = {
    theme: { color: "#8c499c" },
    key: "rzp_test_r74aCev2CrNWua",
    amount:
      (parseInt(appointmentFee) +
        (parseInt(selectedAppointmentType?.amount) || 0) -
        (couponData ? parseInt(couponData.coupon.amount) : 0)) *
      100,
    currency: "INR",
    name: `${
      selectedChildObj
        ? ` ${selectedChildObj?.fullName || ""}`
        : `${family_name}  ${given_name}`
    }
`,
    description: "ImmunifyMe - Appointment",
    image: "https://immunifyme.com/assets/imm-img/logoshort.svg",
    method: {
      paylater: "0",
      netbanking: "0",
      card: "1",
      upi: "0",
      wallet: "0",
      emi: "0",
      cardless_emi: "0",
      bank_transfer: "0",
      emandate: "0",
    },
    prefill: {
      name: `${family_name}  ${given_name}`,
      email,
      slotId: selectedTimeObj.id,
      immId: selectedChildObj ? selectedChildObj.id : personId,
    },
    note: {
      slotId: selectedTimeObj.id,
      immId: selectedChildObj ? selectedChildObj.id : personId,
    },
    handler: (response) => {
      const { razorpay_payment_id, org_name } = response;
      dispatch(
        createAppointmentAsync({
          patientName: selectedChildObj
            ? ` ${selectedChildObj?.fullName || ""}`
            : `${family_name}  ${given_name}`,
          slotId: selectedTimeObj.id,
          immId: selectedChildObj ? selectedChildObj.id : personId,
          paymentId: razorpay_payment_id,
          company: org_name,
          userType: selectedChildObj ? "CHILD" : "PARENT",
          couponData,
          doctorName: `${data.firstName || ""} ${data.lastName || ""}`,
          appointmentNumber: selectedTimeObj.id,
          startTime: selectedTimeObj.startTime,
          endTime: selectedTimeObj.endTime,
          appointmentType: selectedAppointmentType?.appoinmentType,
          date: selectedTimeObj?.date,
          fcm_token: null,
          appointmentFee: isFreeState ? 0 : appointmentFee,
          doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || 0,
          total: isFreeState
            ? 0
            : parseInt(appointmentFee) +
              (parseInt(selectedAppointmentType?.amount) || 0) -
              (couponData ? parseInt(couponData?.coupon?.amount) : 0),
          doctorImmId: data.id,
        })
      );
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <Card className={classes.root} style={{ marginTop: 20 }}>
        <Paper>
          <Box p={3}>
            <Grid container direction="row" spacing={2}>
              <Grid md={8}>
                <Typography variant="h4" style={{ marginTop: 50 }}>
                  Time Left To Confirm The Appointment
                </Typography>
              </Grid>
              <Grid md={4}>
                <CountdownCircleTimer
                  onComplete={() => history.push("/docSearch")}
                  isPlaying
                  duration={5 * 60}
                  colors="#443266"
                  children={<TimeInfo remainingTime={10} />}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Card>

      <Card className={classes.root} style={{ marginTop: 20 }}>
        <Paper>
          <Box p={3}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="button">Payment Details</Typography>
              </Grid>
              <Divider
                dark
                variant="full"
                style={{ width: "100%", marginBottom: 10 }}
              />
              <Grid item xs={12}>
                <List dense={false}>
                  <ListItem>
                    <ListItemText primary="Appointment ID" />
                    <ListItemText primary={selectedTimeObj.id} />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemText primary="Appointment Fee" />
                    <ListItemText
                      primary={`₹ ${isFreeState ? 0 : appointmentFee}`}
                    />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemText primary="Doctor Fee" />
                    <ListItemText
                      primary={`₹ ${
                        isFreeState
                          ? 0
                          : selectedAppointmentType?.amount || "  00"
                      }`}
                    />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemText primary="Coupon Reduction" />
                    <ListItemText
                      primary={`₹ ${
                        (couponData && couponData?.coupon?.amount) || "00"
                      }`}
                    />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemText primary="Total Fee" />
                    <ListItemText
                      primary={`₹ ${
                        isFreeState
                          ? 0
                          : parseInt(appointmentFee) +
                            (parseInt(selectedAppointmentType?.amount) || 0) -
                            (couponData
                              ? parseInt(couponData.coupon.amount)
                              : 0)
                      }`}
                    />
                  </ListItem>
                </List>
                <Divider variant="full" />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      !isFreeState ? openPayModal():dispatch(setActiveStepIndex(activeStep + 1));
                    }}
                    disabled={
                      isAppointmentCreationSuccess ||
                      appointmentCreationState === "loading"
                    }
                  >
                    {isFreeState ? "Continue" : "Pay Now"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Card>
    </div>
  );
};

export default withRouter(Step3);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: 2,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
