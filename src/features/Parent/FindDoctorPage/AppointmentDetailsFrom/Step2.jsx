import React, { useState, useEffect } from "react";
//material
import {
  Avatar,
  Grid,
  Paper,
  Card,
  Box,
  Typography,
  Button,
  makeStyles,
  Divider,
  styled,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Collapse,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

//
import { useSnackbar } from "notistack";
import { useKeycloak } from "@react-keycloak/web";
import { useSelector, useDispatch } from "react-redux";

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
import { notify } from "../../../../utils/commonUtils";
import useAvatar from "../../../../assets/img/userAvatar.png";

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

function Step2({ data }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { keycloak } = useKeycloak();
  const { family_name, given_name } = keycloak.tokenParsed;
  const dispatch = useDispatch();

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
    <>
      <form action="#" autoComplete={false} noValidate>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper elevation={4}>
              <Box p={3} align="center">
                <Box>
                  {profilePicture !== "" ? (
                    <img
                      src={profilePicture}
                      onError={(e) => (e.target.src = useAvatar)}
                      style={{
                        width: 100,
                        height: "auto",
                        borderRadius: "50%",
                      }}
                      alt="avatar"
                    />
                  ) : (
                    <Avatar style={{ width: 150, height: 150, fontSize: 100 }}>
                      {firstName?.charAt(0)}
                    </Avatar>
                  )}
                </Box>
                <Typography variant="h5">
                  {`Dr. ${firstName || ""} ${lastName || ""}`}
                </Typography>
                <Box p={2}>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Specilaization:
                    </Typography>
                    <Typography variant="h6" className={classes.specilization}>
                      {specializationName}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Appointment Type:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {selectedAppointmentType?.appoinmentType}
                    </Typography>
                  </CustomListItem>
                  <Box my={2}>
                    <Typography variant="subtitle1" className={classes.heading}>
                      Appointment Details
                    </Typography>
                    <Divider />
                  </Box>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Appointment Date:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {selectedDateObj?.date}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Appointment Time:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {selectedTimeObj?.time}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Patient Details:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {`
                       ${
                         selectedChildObj
                           ? ` ${selectedChildObj.fullName || ""}`
                           : `${family_name}  ${given_name}`
                       }
                `}
                    </Typography>
                  </CustomListItem>
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

                  {!isFreeState && (
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
                  )}

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

                  <Box>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      disabled={
                        !couponText || couponValidationStatus === "loading"
                      }
                    >
                      <InputLabel htmlFor="outlined-coupen-code">
                        Coupen
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-coupen-code"
                        value={""}
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <Button
                              aria-label="coupen code"
                              variant="text"
                              edge="end"
                              disabled={
                                !couponText ||
                                couponValidationStatus === "loading"
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
                            >
                              {couponData?.coupon?.couponCode
                                ? "Remove Coupon"
                                : couponValidationStatus === "loading"
                                ? "Checking..."
                                : "Apply Coupon"}
                            </Button>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
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

export default Step2;
