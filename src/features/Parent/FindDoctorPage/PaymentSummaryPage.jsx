import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Link,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import { Price, DocInfo, AppointmentInfo, PaymentInfo } from "./PaymentInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Paymentsummarypage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
              <Typography color="textPrimary">Payment Summary</Typography>
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
              <AppointmentInfo appId={"flex"} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PaymentInfo promocode={"none"} payId={"flex"} />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            startIcon=""
            style={{ marginRight: "12px" }}
          >
            Email
          </Button>
          <Button variant="contained" color="primary" startIcon="">
            Download
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Paymentsummarypage;
