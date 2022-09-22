import React, { useEffect, useState } from "react";
//material
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";

//
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { withRouter, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useKeycloak } from "@react-keycloak/web";
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

const useStyles = makeStyles({
  infoBtn: {
    textTransform: "none",
    borderRadius: 50,
  },
  specilization: {
    fontWeight: "bold",
  },
  listTitle: {
    color: "#637381",
    fontWeight: "bold",
  },
  heading: {
    fontWeight: "bold",
  },
  consPlanPrice: {
    fontWeight: "bold",
  },
  coupen: {
    fontWeight: "bold",
    color: "#32c953",
  },
  total: {
    fontWeight: "bold",
    color: "#d64646",
  },
});

const CustomListItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

const TimeInfo = ({ remainingTime }) => {
  const pad2 = (number) => {
    return (number < 10 ? "0" : "") + number;
  };
  const hours = Math.floor(remainingTime / 3600);
  const minutes = pad2(Math.floor((remainingTime % 3600) / 60));
  const seconds = pad2(remainingTime % 60);

  return <h2>{`${hours}:${minutes}:${seconds}`}</h2>;
};

function Step3({ data }) {
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
  const capturingAppointmentStatus = useSelector(
    selectCapturingAppointmentStatus
  );
  const isAppointmentCreationSuccess = useSelector(
    selectIsAppointmentCreationSuccess
  );
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
    <>
      <form action="#" autoComplete={false} noValidate>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper elevation={4}>
              <Box p={3} align="center">
                <Box>
                  <CountdownCircleTimer
                    onComplete={() => history.push("/docSearch")}
                    isPlaying
                    duration={5 * 60}
                    colors="#443266"
                    children={<TimeInfo remainingTime={10} />}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h6">
                    Time Left To Confirm The Appointment
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper elevation={4}>
              <Box p={3}>
                <Typography variant="h6" className={classes.heading}>
                  Payment Summery
                </Typography>
                <Box my={2}>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Appointment ID:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {selectedTimeObj.id ? selectedTimeObj.id : "-"}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Appointment Fee:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      ₹ {isFreeState ? 0 : appointmentFee}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Doctor Fee:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      ₹{" "}
                      {isFreeState
                        ? 0
                        : selectedAppointmentType?.amount || "00"}
                    </Typography>
                  </CustomListItem>

                  <Box my={2}>
                    <CustomListItem>
                      <Typography
                        variant="overline"
                        className={classes.heading}
                      >
                        Coupen Reduction:
                      </Typography>
                      <Typography variant="p" className={classes.coupen}>
                        ₹ {(couponData && couponData?.coupon?.amount) || "00"}
                      </Typography>
                    </CustomListItem>
                  </Box>

                  <Box my={2}>
                    <Divider />
                    <CustomListItem>
                      <Typography
                        variant="overline"
                        className={classes.heading}
                      >
                        Total:
                      </Typography>
                      <Typography variant="p" className={classes.total}>
                        ₹{" "}
                        {isFreeState
                          ? 0
                          : parseInt(appointmentFee) +
                            (parseInt(selectedAppointmentType?.amount) || 0) -
                            (couponData
                              ? parseInt(couponData.coupon.amount)
                              : 0)}
                      </Typography>
                    </CustomListItem>
                  </Box>

                  <Box mt={3} align="right" color="primary">
                    <Button color="primary" variant="contained">
                      Proceed to Pay
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Step3;
