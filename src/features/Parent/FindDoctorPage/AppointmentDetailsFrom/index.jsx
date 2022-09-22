import useAvatar from "../../../../assets/img/userAvatar.png";
import React, { useCallback, useEffect, useState } from "react";
import Dialog from "../../../../common/components/Admin/Dialog";
import {
  Button,
  Card,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Box,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import {
  Event as EventIcon,
  LocalHospital as SpecializationIcon,
  EventAvailable as Type,
  QueryBuilder as Clock,
  Person as PatientIcon,
} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import {
  downloadingPaymentSummaryError,
  downloadingPaymentSummaryStatus,
  getDoctorSearchInfo,
  getLoggedInParentId,
  getSelectedAppointmentDate,
  getSelectedAppointmentTime,
  getSelectedAppointmentType,
  getSelectedChild,
  retrievingSelectedDoctorAppointmentTypeTimesStatus,
  selectActiveStep,
  selectCapturingAppointmentStatus,
  selectCouponData,
  selectIsFree,
  selectPaymentId,
  selectRetrievingChildrenFreeQuaterListStatus,
  selectRetrievingSelectedDoctorInfoStatus,
  selectSelectedDoctorInfo,
  sendingPaymentSummaryEmailError,
  sendingPaymentSummaryEmailStatus,
} from "./selector";
import { useSelector, useDispatch } from "react-redux";
import {
  downloadPaymentSummaryAsync,
  getSlectedDoctorInfo,
  setActiveStepIndex,
  setAvailableTimes,
  setConsultationPlans,
  setCouponData,
  setForChild,
  setIsAppointmentCreated,
  setPaymentId,
  setSearchInfo,
  setSelectedAppointmentDate,
  setSelectedAppointmentTime,
  setSelectedAppointmentType,
  setSelectedChild,
  setSelectedDoctorAppointmentDates,
  setSelectedDoctorAppointmentTypes,
  setSelectedDoctorInfo,
} from "../DocSearchForm/findADoctorSlice";
import Step1 from "./Step1";
import {
  getMyChildren,
  getMyChildrenServicePlans,
  getMyChildrenQRCodesAsync,
} from "../../MyChildrenPage/myChildrenSlice";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useKeycloak } from "@react-keycloak/web";
import EmailPaymentSummaryDialog from "./EmailPaymentSummaryDialog";

const Index = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const { family_name, given_name } = keycloak.tokenParsed;
  const getSteps = () => { return ["Step 1", "Step 2", "Step 3"] };
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [appointmentFee, setAppointmentFee] = useState(50);
  const steps = getSteps();
  const classes = useStyles();
  const activeStep = useSelector(selectActiveStep);
  const { isFree } = useSelector(getDoctorSearchInfo);
  const parentId = useSelector(getLoggedInParentId);
  const isTimesLoading = useSelector(retrievingSelectedDoctorAppointmentTypeTimesStatus);
  const isLoadingChildrenFreeQuaterData = useSelector(selectRetrievingChildrenFreeQuaterListStatus);
  const retrievingDataStatus = useSelector(selectRetrievingSelectedDoctorInfoStatus);
  const capturingAppointmentStatus = useSelector(selectCapturingAppointmentStatus);
  const selectedDateObj = useSelector(getSelectedAppointmentDate) || {};
  const selectedTimeObj = useSelector(getSelectedAppointmentTime) || {};
  const selectedAppointmentType = useSelector(getSelectedAppointmentType) || {};
  const selectedChildObj = useSelector(getSelectedChild);
  const isFreeState = useSelector(selectIsFree);
  const couponData = useSelector(selectCouponData);
  const paymentId = useSelector(selectPaymentId);
  const doctorObj = useSelector(selectSelectedDoctorInfo)
  const isDownloadingSummaryStatus = useSelector(downloadingPaymentSummaryStatus)
  const isDownloadingSummaryError = useSelector(downloadingPaymentSummaryError)
  const sendingSummaryEmailStatus = useSelector(sendingPaymentSummaryEmailStatus)
  const sendingSummaryEmailError = useSelector(sendingPaymentSummaryEmailError)
  

  const setActiveStep = (step) => dispatch(setActiveStepIndex(step));

  const { firstName, lastName, specializationName, id, profilePicture, specialization } =
    history.location.state;

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 data={history.location.state} />;
      case 1:
        return <Step2 data={history.location.state} />;
      case 2:
        return <Step3 data={history.location.state} />;
      default:
        return "Unknown step";
    }
  };

  const getDetails = useCallback(() => {
    dispatch(getSlectedDoctorInfo({ doctorId: id, isFree }));
  }, [dispatch]);

  useEffect(() => {
    getDetails();
    dispatch(getMyChildrenServicePlans({ parentImmId: parentId }));
    dispatch(getMyChildren({ parentId }));
    dispatch(getMyChildrenQRCodesAsync(parentId));
  }, [dispatch]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFinish = () =>{
    dispatch(setPaymentId(null))
    dispatch(setCouponData(null))
    dispatch(setSelectedChild(null))
    dispatch(setForChild(false))
    dispatch(setSelectedAppointmentTime(null))
    dispatch(setSelectedAppointmentDate(null))
    dispatch(setSelectedAppointmentType(null))
    dispatch(setSelectedDoctorInfo(null))
    dispatch(setSearchInfo(null))
    dispatch(setSelectedDoctorAppointmentTypes([]))
    dispatch(setSelectedDoctorAppointmentDates([]))
    dispatch(setAvailableTimes([]))
    dispatch(setConsultationPlans([]))
    dispatch(setIsAppointmentCreated(false))
    dispatch(setActiveStepIndex(0))
    history.push("/docSearch");
  }


  const PAYMENT_SUMMARY_DOWNLOAD_SUCCESS = "Payment Summary Downloaded Successfully"
  const PAYMENT_SUMMARY_DOWNLOAD_FAIL = "Payment Summary Downloading Failed!"

  const PAYMENT_SUMMARY_EMAIL_SUCCESS = "Email Sent Successfully"
  const PAYMENT_SUMMARY_EMAIL_FAIL = "Email Sending Failed!"

  useEffect(() => {
    if (isDownloadingSummaryStatus === "succeeded") {
      notify(enqueueSnackbar, PAYMENT_SUMMARY_DOWNLOAD_SUCCESS);
    } else if (isDownloadingSummaryStatus === "failed") {
      notify(enqueueSnackbar, PAYMENT_SUMMARY_DOWNLOAD_FAIL, "error");
    }
  }, [isDownloadingSummaryStatus, isDownloadingSummaryError, enqueueSnackbar]);

  useEffect(() => {
    if (sendingSummaryEmailStatus === "succeeded") {
      notify(enqueueSnackbar, PAYMENT_SUMMARY_EMAIL_SUCCESS);
      setOpenDialog(false)
    } else if (sendingSummaryEmailStatus === "failed") {
      notify(enqueueSnackbar, PAYMENT_SUMMARY_EMAIL_FAIL, "error");
    }
  }, [sendingSummaryEmailStatus, sendingSummaryEmailError, enqueueSnackbar]);


  return (
    <div>
        <Dialog
          tooltip="Email Payment Summary"
          dialogtitle="Email Payment Summary"
          dialogcontent={ <EmailPaymentSummaryDialog data={selectedData}/> }
          maxWidth="sm"
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleOpen={() => setOpenDialog(true)}
        />
      <form action="">
        <Card
          style={{
            opacity:
              retrievingDataStatus === "loading" ||
              isLoadingChildrenFreeQuaterData === "loading" ||
              isTimesLoading === "loading" ||
              capturingAppointmentStatus === "loading"
                ? 0.25
                : 1,
            pointerEvents:
              retrievingDataStatus === "loading" ||
              isLoadingChildrenFreeQuaterData === "loading" ||
              isTimesLoading === "loading" ||
              capturingAppointmentStatus === "loading"
                ? "none"
                : "initial",
          }}
        >
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        {activeStep !== 2 && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Alert severity="success">
                  <Typography>Appointment Booked Successfully!</Typography>
                </Alert>
                <Card className={classes.root} style={{ marginTop: 20 }}>
                  <Paper>
                    <Box p={3}>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="button">
                            Payment Summary
                          </Typography>
                        </Grid>
                        <Divider
                          dark
                          variant="full"
                          style={{ width: "100%", marginBottom: 10 }}
                        />
                        <Grid item xs={4}></Grid>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                          style={{
                            marginRight: 10,
                            marginLeft: 20,
                            marginTop: 20,
                            marginBottom: 20,
                          }}
                        />
                        <Grid container row spacing={2}>
                          <Grid item xs={4}>
                            <CardContent>
                              {profilePicture !== "" ? (
                                <img
                                  src={profilePicture}
                                  onError={(e) => (e.target.src = useAvatar)}
                                  style={{
                                    width: 150,
                                    height: "auto",
                                    borderRadius: "50%",
                                  }}
                                  alt="avatar"
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    width: 150,
                                    height: 150,
                                    fontSize: 100,
                                  }}
                                >
                                  {firstName?.charAt(0)}
                                </Avatar>
                              )}
                            </CardContent>
                          </Grid>

                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            style={{
                              marginRight: 10,
                              marginLeft: 20,
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          />
                          <Grid item xs={4}>
                            <Grid md={12}>
                              <Typography
                                style={{ fontSize: 20, fontWeight: 10 }}
                                display="block"
                                gutterBottom
                              >
                                {`Dr. ${firstName || ""} ${lastName || ""}`}
                              </Typography>
                              <Divider
                                dark
                                variant="full"
                                style={{ width: "100%", marginBottom: 10 }}
                              />
                            </Grid>
                            <Grid md={12} style={{ width: "100%" }}>
                              <Typography variant="subtitle2" gutterBottom>
                                <SpecializationIcon
                                  style={{ marginBottom: -7 }}
                                />
                                {specializationName}
                              </Typography>
                            </Grid>
                            <Grid md={12} style={{ width: "100%" }}>
                              <Typography variant="subtitle2" gutterBottom>
                                <Type style={{ marginBottom: -7 }} />
                                {selectedAppointmentType?.appoinmentType}
                              </Typography>
                            </Grid>
                            <br />
                            <Typography variant="body">
                              Appointment Details
                            </Typography>
                            <Divider
                              dark
                              variant="full"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                            <Grid md={12}>
                              <table>
                                <tr>
                                  <td>
                                    <EventIcon />
                                  </td>
                                  <td>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Date:
                                    </Typography>
                                  </td>
                                  <td>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      {selectedDateObj?.date}
                                    </Typography>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <Clock />
                                  </td>
                                  <td>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Time:
                                    </Typography>
                                  </td>
                                  <td>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      {selectedTimeObj?.time}
                                    </Typography>
                                  </td>
                                </tr>
                              </table>
                            </Grid>
                            <br />
                            <Typography variant="body">
                              Patient Details
                            </Typography>
                            <Divider
                              dark
                              variant="full"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                            <Grid md={12}>
                              <Typography variant="subtitle2" gutterBottom>
                                <PatientIcon style={{ marginBottom: -7 }} />
                                {`Patient Name:  ${
                                  selectedChildObj
                                    ? ` ${selectedChildObj.fullName || ""}`
                                    : `${family_name}  ${given_name}`
                                } `}
                              </Typography>
                            </Grid>
                          </Grid>
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
                          <Typography variant="button">
                            Payment Details
                          </Typography>
                        </Grid>
                        <Divider
                          dark
                          variant="full"
                          style={{ width: "100%", marginBottom: 10 }}
                        />
                        <Grid item xs={12}>
                          <List dense={false}>
                            <ListItem>
                              <ListItemText primary="Appointment Fee" />
                              <ListItemText
                                primary={`₹ ${
                                  isFreeState ? 0 : appointmentFee
                                }`}
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
                            {!isFreeState && (
                              <>
                                <ListItem>
                                  <ListItemText primary="Coupon Reduction" />
                                  <ListItemText
                                    primary={`₹ ${
                                      (couponData &&
                                        couponData?.coupon?.amount) ||
                                      "00"
                                    }`}
                                  />
                                </ListItem>
                                <Divider variant="inset" />
                              </>
                            )}
                            <ListItem>
                              <ListItemText primary="Total Fee" />
                              <ListItemText
                                primary={`₹ ${
                                  isFreeState
                                    ? 0
                                    : parseInt(appointmentFee) +
                                      (parseInt(
                                        selectedAppointmentType?.amount
                                      ) || 0) -
                                      (couponData
                                        ? parseInt(couponData.coupon.amount)
                                        : 0)
                                }`}
                              />
                            </ListItem>
                            <Divider variant="inset" />
                            <ListItem>
                              <ListItemText primary="Payment ID" />
                              <ListItemText primary={paymentId} />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                      <Divider variant="full" />
                      <br />
                      <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justify="center"
                      >
                        <Button
                          onClick={() => {
                            setSelectedData({
                                appointmentFee,
                                appointmentNumber: selectedTimeObj.id,
                                appointmentType: selectedAppointmentType?.appoinmentType,
                                company: "",
                                couponData,
                                date: selectedDateObj?.date,
                                doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || "00",
                                doctorImmId: history.location.state.id,
                                doctorName: `${doctorObj?.basicDetails?.firstName||""} ${doctorObj?.basicDetails?.lastName||""}`,
                                endTime: selectedTimeObj.endTime,
                                fcm_token: null,
                                immId: selectedChildObj ? selectedChildObj.id : parentId,
                                patientName: selectedChildObj ? ` ${selectedChildObj?.fullName || ""}` : `${family_name}  ${given_name}`,
                                paymentId,
                                slotId: selectedTimeObj.id,
                                startTime: selectedTimeObj.startTime,
                                total: isFreeState ? 0 : parseInt(appointmentFee) + (parseInt(selectedAppointmentType?.amount) || 0) - (couponData ? parseInt(couponData?.coupon?.amount) : 0),
                                userType: selectedChildObj ? "CHILD" : "PARENT",
                                dataInfo: {
                                  apoointmentFee: appointmentFee,
                                  appointmentNumber: selectedTimeObj.id,
                                  appointmentType: selectedAppointmentType?.appoinmentType,
                                  contact: null,
                                  couponData,
                                  date: selectedDateObj?.date,
                                  doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || "00",
                                  doctorName: `${doctorObj?.basicDetails?.firstName||""} ${doctorObj?.basicDetails?.lastName||""}`,
                                  email: history.location.state.email,
                                  endTime: selectedTimeObj.endTime,
                                  fcm_token: null,
                                  firstName: history.location.state.firstName,
                                  hospitalClinic: history.location.state.hospitalClinic,
                                  id: history.location.state.hospitalClinic,
                                  immId: selectedChildObj ? selectedChildObj.id : parentId,
                                  lastName: history.location.state.lastName,
                                  patientName: selectedChildObj ? ` ${selectedChildObj?.fullName || ""}` : `${family_name}  ${given_name}`,
                                  selectedAppointmentType,
                                  selectedChild: selectedChildObj,
                                  selectedPlan: selectedAppointmentType,
                                  selectedTime: selectedTimeObj,
                                  slotId: selectedTimeObj.id,
                                  specializationName,
                                  specialization,
                                  startTime: selectedTimeObj.startTime,
                                  total: isFreeState ? 0 : parseInt(appointmentFee) + (parseInt(selectedAppointmentType?.amount) || 0) - (couponData ? parseInt(couponData?.coupon?.amount) : 0),
                                  userType: selectedChildObj ? "CHILD" : "PARENT",
                                },
                                isAppointmentSuccess: {}
                            })
                            setOpenDialog(true)}}
                          variant="contained"
                          style={{ marginRight: 30 }}
                          color="primary"
                        >
                          Email
                        </Button>
                        <Button
                          onClick={() => {
                            dispatch(downloadPaymentSummaryAsync({
                                fileName: paymentId,
                                params:{
                                  appointmentFee,
                                  appointmentNumber: selectedTimeObj.id,
                                  appointmentType: selectedAppointmentType?.appoinmentType,
                                  company: "",
                                  couponData,
                                  date: selectedDateObj?.date,
                                  doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || "00",
                                  doctorImmId: history.location.state.id,
                                  doctorName: `${doctorObj?.basicDetails?.firstName||""} ${doctorObj?.basicDetails?.lastName||""}`,
                                  endTime: selectedTimeObj.endTime,
                                  fcm_token: null,
                                  immId: selectedChildObj ? selectedChildObj.id : parentId,
                                  patientName: selectedChildObj ? ` ${selectedChildObj?.fullName || ""}` : `${family_name}  ${given_name}`,
                                  paymentId,
                                  slotId: selectedTimeObj.id,
                                  startTime: selectedTimeObj.startTime,
                                  total: isFreeState ? 0 : parseInt(appointmentFee) + (parseInt(selectedAppointmentType?.amount) || 0) - (couponData ? parseInt(couponData?.coupon?.amount) : 0),
                                  userType: selectedChildObj ? "CHILD" : "PARENT",
                                  dataInfo: {
                                    apoointmentFee: appointmentFee,
                                    appointmentNumber: selectedTimeObj.id,
                                    appointmentType: selectedAppointmentType?.appoinmentType,
                                    contact: null,
                                    couponData,
                                    date: selectedDateObj?.date,
                                    doctorFee: isFreeState ? 0 : selectedAppointmentType?.amount || "00",
                                    doctorName: `${doctorObj?.basicDetails?.firstName||""} ${doctorObj?.basicDetails?.lastName||""}`,
                                    email: history.location.state.email,
                                    endTime: selectedTimeObj.endTime,
                                    fcm_token: null,
                                    firstName: history.location.state.firstName,
                                    hospitalClinic: history.location.state.hospitalClinic,
                                    id: history.location.state.hospitalClinic,
                                    immId: selectedChildObj ? selectedChildObj.id : parentId,
                                    lastName: history.location.state.lastName,
                                    patientName: selectedChildObj ? ` ${selectedChildObj?.fullName || ""}` : `${family_name}  ${given_name}`,
                                    selectedAppointmentType,
                                    selectedChild: selectedChildObj,
                                    selectedPlan: selectedAppointmentType,
                                    selectedTime: selectedTimeObj,
                                    slotId: selectedTimeObj.id,
                                    specializationName,
                                    specialization,
                                    startTime: selectedTimeObj.startTime,
                                    total: isFreeState ? 0 : parseInt(appointmentFee) + (parseInt(selectedAppointmentType?.amount) || 0) - (couponData ? parseInt(couponData?.coupon?.amount) : 0),
                                    userType: selectedChildObj ? "CHILD" : "PARENT",
                                  },
                                  isAppointmentSuccess: {}

                                }
                              }))
                          }}
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 30 }}
                          disabled={isDownloadingSummaryStatus === 'loading'}
                        >
                          { isDownloadingSummaryStatus === 'loading' ? 'Downloading..' : 'Download' }
                        </Button>
                        <Button onClick={() => handleFinish()} variant="contained">
                          Exit
                        </Button>
                      </Grid>
                    </Box>
                  </Paper>
                </Card>
              </Paper>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default withRouter(Index);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
