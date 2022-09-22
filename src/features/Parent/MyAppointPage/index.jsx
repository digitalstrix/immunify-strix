import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
  Link,
  Box,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TabBar from "../../../common/components/TabBar";
import UpcomingAppoint from "./UpcomingAppoint";
import PastAppoint from "./PastAppoint";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentsData } from "./myAppointmentsSlice";
import { getLoggedInUserId } from "./selector";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const parentId = useSelector(getLoggedInUserId);

  useEffect(() => {
    dispatch(getAppointmentsData({ personId: parentId }));
    return () => {};
  }, [dispatch]);

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
              <Typography color="textPrimary">My Appointments</Typography>
            </Breadcrumbs>
          }
        />
      </Container>

      <Container maxWidth="md">
        <Box mt={4}>
          <TabBar
            tab1title="Upcoming Appointments"
            tab1data={<UpcomingAppoint />}
            tab2title="Past Appointments"
            tab2data={<PastAppoint />}
            tab3hide="none"
            tab4hide="none"
            tab5hide="none"
            tab6hide="none"
            variant="fullWidth"
          />
        </Box>
      </Container>
    </div>
  );
};

export default Index;
