import React, { useState } from "react";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Link,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import Dialog from "../../../common/components/Admin/Dialog";
import {
  Price,
  DocInfo,
  AppointmentInfo,
  PaymentInfo,
  PaymentConfirm,
} from "./PaymentInfo";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const PaymentDetailPage = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        dialogtitle="Payment Confirmation"
        dialogcontent={<PaymentConfirm />}
        maxWidth="xs"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Container maxWidth={true}>
        <MainToolbar
          breadcrumb={
            <Breadcrumbs>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/")}
              >
                DashboardPage
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/docSearch")}
              >
                Doctor Search
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/searchResult")}
              >
                Available Doctors
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/selectchild")}
              >
                Select Child
              </Link>
              <Typography color="textPrimary">Payment</Typography>
            </Breadcrumbs>
          }
        />
        <Box mt={4}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Price />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <DocInfo />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppointmentInfo appId={"none"} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PaymentInfo payId={"none"} />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Pay Now
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(PaymentDetailPage);
