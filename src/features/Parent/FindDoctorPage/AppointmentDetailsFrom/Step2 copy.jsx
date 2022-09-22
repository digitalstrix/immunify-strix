import React, { useEffect, useState } from "react";
import useAvatar from "../../../../assets/img/userAvatar.png";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Typography,
  Paper,
  Box,
  TextField,
  ListItem,
  List,
  ListItemText,
  Button,
} from "@material-ui/core";
import {
  LocalHospital as SpecializationIcon,
  EventAvailable as Type,
  Event as EventIcon,
  QueryBuilder as Clock,
  Person as PatientIcon,
  VerifiedUser as Verified,
} from "@material-ui/icons";
import {
  getLoggedInParentObj,
  getSelectedAppointmentDate,
  getSelectedAppointmentTime,
  getSelectedAppointmentType,
  getSelectedChild,
  selectCouponData,
  selectCouponValidationStatus,
  selectIsFree,
} from "./selector";
import {
  getConultationPlans,
  setCouponData,
  validateCouponAsync,
} from "../DocSearchForm/findADoctorSlice";
import { useKeycloak } from "@react-keycloak/web";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const Step2 = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { keycloak } = useKeycloak();
  const { family_name, given_name } = keycloak.tokenParsed;
  const dispatch = useDispatch();
  const classes = useStyles();

  const { firstName, lastName, specializationName, id, profilePicture } = data;

  const selectedAppointmentType = useSelector(getSelectedAppointmentType) || {};
  const selectedDateObj = useSelector(getSelectedAppointmentDate) || {};
  const selectedTimeObj = useSelector(getSelectedAppointmentTime) || {};
  const selectedChildObj = useSelector(getSelectedChild);
  const loggedInParentObj = useSelector(getLoggedInParentObj) || {};
  const isFreeState = useSelector(selectIsFree);
  const couponData = useSelector(selectCouponData);
  const couponValidationStatus = useSelector(selectCouponValidationStatus);

  const [appointmentFee, setAppointmentFee] = useState(50);
  const [couponText, setCouponText] = useState(
    couponData?.coupon?.couponCode || null
  );

  const COUPON_VALIDATION_SUCCESS = "Coupon added successfully!";
  const COUPON_VALIDATION_ERROR = "This coupon is not valid!";

  useEffect(() => {
    if (couponValidationStatus === "succeeded") {
      notify(enqueueSnackbar, COUPON_VALIDATION_SUCCESS);
    } else if (couponValidationStatus === "failed") {
      notify(enqueueSnackbar, COUPON_VALIDATION_ERROR, "error");
    }
  }, [couponValidationStatus, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getConultationPlans({ immId: id }));
  }, [dispatch]);

  const [total, setTotal] = useState(
    parseInt(appointmentFee) + (parseInt(selectedAppointmentType?.amount) || 0)
  );

  const setRealTotal = () => {
    let cTotal = total;
    if (couponData) {
      cTotal = cTotal - (couponData?.coupon?.amount || 0);
      if (cTotal > 0) {
        setTotal(cTotal);
      }
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <Grid container row spacing={2}>
          <Grid item xs={4}>
            <CardContent>
              {profilePicture !== "" ? (
                <img
                  src={profilePicture}
                  onError={(e) => (e.target.src = useAvatar)}
                  style={{ width: 150, height: "auto", borderRadius: "50%" }}
                  alt="avatar"
                />
              ) : (
                <Avatar style={{ width: 150, height: 150, fontSize: 100 }}>
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
                <SpecializationIcon style={{ marginBottom: -7 }} />
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
            <Typography variant="body">Appointment Details</Typography>
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
                    <Typography variant="caption" display="block" gutterBottom>
                      Date:
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {selectedDateObj?.date}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Clock />
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      Time:
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {selectedTimeObj?.time}
                    </Typography>
                  </td>
                </tr>
              </table>
            </Grid>
            <br />
            <Typography variant="body">Patient Details</Typography>
            <Divider
              dark
              variant="full"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <Grid md={12}>
              <Typography variant="subtitle2" gutterBottom>
                <PatientIcon style={{ marginBottom: -7 }} />
                {`Patient Name: 
                       ${
                         selectedChildObj
                           ? ` ${selectedChildObj.fullName || ""}`
                           : `${family_name}  ${given_name}`
                       }
                `}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
                  {!isFreeState && (
                    <>
                      <ListItem>
                        <ListItemText primary="Coupon Reduction" />
                        <ListItemText
                          primary={`₹ ${
                            (couponData && couponData?.coupon?.amount) || "00"
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
                            (parseInt(selectedAppointmentType?.amount) || 0) -
                            (couponData
                              ? parseInt(couponData.coupon.amount)
                              : 0)
                      }`}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Divider variant="full" style={{ marginBottom: 20 }} />
            {!isFreeState && (
              <CardContent>
                <Grid container direction="row" spacing={2}>
                  <Grid md={4}>
                    <TextField
                      variant="outlined"
                      id="standard-basic"
                      label="Enter Coupon Code Here"
                      onChange={(e) => setCouponText(e.target.value)}
                      value={couponText}
                    />
                    {couponData?.coupon && (
                      <Verified
                        style={{
                          marginLeft: 20,
                          marginTop: 17,
                          color: "green",
                        }}
                      />
                    )}
                  </Grid>

                  <Grid md={6}>
                    <Button
                      disabled={
                        !couponText || couponValidationStatus === "loading"
                      }
                      onClick={() => {
                        if (!couponData) {
                          dispatch(
                            validateCouponAsync({
                              couponCode: couponText,
                              personId: loggedInParentObj.personId,
                            })
                          );
                          setRealTotal();
                        } else {
                          dispatch(setCouponData(null));
                          setCouponText(null);
                          setRealTotal();
                        }
                      }}
                      variant="contained"
                      className={classes.button}
                    >
                      {couponData?.coupon?.couponCode
                        ? "Remove Coupon"
                        : couponValidationStatus === "loading"
                        ? "Checking..."
                        : "Apply Coupon"}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Box>
        </Paper>
      </Card>
    </div>
  );
};

export default Step2;

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
