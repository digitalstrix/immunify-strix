import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  makeStyles,
  Divider,
  Paper,
} from "@material-ui/core";
import CalendarIcon from "@material-ui/icons/EventTwoTone";
import TimeIcon from "@material-ui/icons/HourglassFullTwoTone";
import TypeIcon from "@material-ui/icons/TouchAppTwoTone";
import PersonIcon from "@material-ui/icons/PersonTwoTone";
import AppointmentIcon from "@material-ui/icons/LocalAtmTwoTone";
import CouponIcon from "@material-ui/icons/LocalOfferTwoTone";
import DoctorFeeIcon from "@material-ui/icons/AssignmentIndTwoTone";
import TotalFeeIcon from "@material-ui/icons/MonetizationOnTwoTone";
import IdIcon from "@material-ui/icons/FingerprintTwoTone";

import Dialog from "../../../../common/components/Admin/Dialog";

import done from "../../../../assets/icons/done.svg";
import notApplied from "../../../../assets/icons/notApplied.svg";
import { yellow } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const DoneIcon = () => (
  <img src={done} width="100" height="100" alt="child info icon" />
);

const ErrorIcon = () => (
  <img src={notApplied} width="100" height="100" alt="child info icon" />
);

const useStyles = makeStyles((theme) => ({
  avatarlarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  paper: {
    backgroundColor: "#eb9a03",
    color: "#fff",
  },
}));

export const Price = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Box align="center">
            <Typography variant="overline" color="initial">
              <Box px={2}>Price</Box>
            </Typography>
            <Typography variant="h5">
              <Box fontWeight={600}> INR(₹) 399.00</Box>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const DocInfo = () => {
  const classes = useStyles();
  return (
    <div>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.avatarlarge}
            />
          </Box>
          <Typography variant="h5" align="center">
            <Box fontWeight={500} mt={2}>
              Dr.Dilini Jayarathna
            </Box>
          </Typography>
          <Typography variant="body2" align="center">
            <Box mt={2}>
              Pardiatric Allergy, Immunology and infectious diseases.
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export const AppointmentInfo = (props) => {
  return (
    <div>
      <Card elavation={4}>
        <CardContent>
          <Box>
            <Typography variant="h5">
              <Box fontWeight={500} pb={1}>
                Appointment Details
              </Box>
            </Typography>
            <Divider />
            <Box
              display={props.appId}
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <TypeIcon />
                  </Box>
                  <Box component="span">Appointment Id :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  91
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <TypeIcon />
                  </Box>
                  <Box component="span">Appointment Type :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  Telemedicine
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <CalendarIcon />
                  </Box>
                  <Box component="span">Appointment Date :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  2021-04-25
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <TimeIcon />
                  </Box>
                  <Box component="span">Appointment Time :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  18:30 - 21:42
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h5">
              <Box fontWeight={500} pb={1}>
                Patient Details
              </Box>
            </Typography>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <PersonIcon />
                  </Box>
                  <Box component="span">Person Name :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  Ayush Kurana
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const CoupenDetails = () => {
  return (
    <div>
      <Box textAlign="center" p={2}>
        <DoneIcon />
        {/* <ErrorIcon /> */}
        <Typography variant="overline" color="initial">
          <Box fontWeight={500}> Coupon #*******7578</Box> Applied !
        </Typography>
      </Box>
    </div>
  );
};

export const PaymentInfo = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog
        dialogcontent={<CoupenDetails />}
        maxWidth="xs"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Card elavation={4}>
        <CardContent>
          <Box>
            <Typography variant="h5">
              <Box fontWeight={500} pb={1}>
                Payment Details
              </Box>
            </Typography>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <AppointmentIcon />
                  </Box>
                  <Box component="span">Appointment Fee :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  ₹200
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <DoctorFeeIcon />
                  </Box>
                  <Box component="span">Doctor Fee :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  ₹200
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={2}
          >
            <Box component="text" mr={1}>
              <Typography variant="subtitle2" color="initial">
                <Box component="span" mr={1}>
                  <CouponIcon />
                </Box>
                <Box component="span">Coupon Reductuion :</Box>
              </Typography>
            </Box>
            <Box component="text" mr={1}>
              <Typography variant="body2" color="initial">
                ₹0
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box component="text" mr={1}>
              <Typography variant="subtitle2" color="initial">
                <Box component="span" mr={1}>
                  <TotalFeeIcon />
                </Box>
                <Box component="span">Total Fee :</Box>
              </Typography>
            </Box>
            <Box component="text" mr={1}>
              <Typography variant="body2" color="initial">
                ₹800
              </Typography>
            </Box>
          </Box>
          <Box
            display={props.payId}
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box component="text" mr={1}>
              <Typography variant="subtitle2" color="initial">
                <Box component="span" mr={1}>
                  <IdIcon />
                </Box>
                <Box component="span">Payment Id :</Box>
              </Typography>
            </Box>
            <Box component="text" mr={1}>
              <Typography variant="body2" color="initial">
                pay_Grhj9d9020i0j0
              </Typography>
            </Box>
          </Box>

          <Box mt={2} display={props.promocode}>
            <form action="">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    id="promo"
                    label="Promo Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    fullWidth
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const PaymentConfirm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog
        dialogcontent={<CoupenDetails />}
        maxWidth="xs"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Card elavation={4}>
        <CardContent>
          <Box>
            <Typography variant="h5">
              <Box fontWeight={500} pb={1} textAlign="center">
                Time left to confirm Appointment
              </Box>
            </Typography>
            <Box my={1}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Paper elevation={3} className={classes.paper}>
                    <Box p={2} fontWeight="fontWeightBold" textAlign="center">
                      <Typography variant="h5" color="initial">
                        00
                      </Typography>
                      <Typography variant="overline" color="initial">
                        Hours
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={3} className={classes.paper}>
                    <Box p={2} fontWeight={600} textAlign="center">
                      <Typography variant="h5" color="initial">
                        00
                      </Typography>
                      <Typography variant="overline" color="initial">
                        Minutes
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={3} className={classes.paper}>
                    <Box p={2} fontWeight={600} textAlign="center">
                      <Typography variant="h5" color="initial">
                        00
                      </Typography>
                      <Typography variant="overline" color="initial">
                        Seconds
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box mt={2}>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <AppointmentIcon />
                  </Box>
                  <Box component="span">Appointment Fee :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  ₹200
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box component="text" mr={1}>
                <Typography variant="subtitle2" color="initial">
                  <Box component="span" mr={1}>
                    <DoctorFeeIcon />
                  </Box>
                  <Box component="span">Doctor Fee :</Box>
                </Typography>
              </Box>
              <Box component="text" mr={1}>
                <Typography variant="body2" color="initial">
                  ₹200
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={2}
          >
            <Box component="text" mr={1}>
              <Typography variant="subtitle2" color="initial">
                <Box component="span" mr={1}>
                  <CouponIcon />
                </Box>
                <Box component="span">Coupon Reductuion :</Box>
              </Typography>
            </Box>
            <Box component="text" mr={1}>
              <Typography variant="body2" color="initial">
                ₹0
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={2}
          >
            <Box component="text" mr={1}>
              <Typography variant="subtitle2" color="initial">
                <Box component="span" mr={1}>
                  <TotalFeeIcon />
                </Box>
                <Box component="span">Total Fee :</Box>
              </Typography>
            </Box>
            <Box component="text" mr={1}>
              <Typography variant="body2" color="initial">
                ₹800
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box mt={2}>
            <Link to="/paymentSummary">
              <Button variant="contained" color="primary" fullWidth>
                Continue
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
