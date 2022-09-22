import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
  Link,
  Box,
  Grid,
} from "@material-ui/core";
import ChildInfoTable from "./ChildInfoTable";
import MainToolbar from "./MainToolbar";
import TabBar from "../../../common/components/TabBar";
import ChildGrowth from "./ChildGrowth";
import VacShedule from "./VacShedule";
import Milestones from "./Milestones";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSingleChildInfo, setSelectedChildAllInfo } from "./myChildrenSlice";
import {
  getSelectedChildInfo,
  selectChildInfoPageLoadingStatus,
} from "./selector";
import { getSelectedChildGrowthInfo } from "./ChildGrowth/ParentSideChildGrowthSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Childinfopage = (props) => {
  const dispatch = useDispatch();
  const {
    location: { state },
  } = props;

  useEffect(() => {
    dispatch(getSingleChildInfo({ childId: state?.id }));
    dispatch(getSelectedChildGrowthInfo(state?.id));
    return () => {
      dispatch(setSelectedChildAllInfo({}));
    };
  }, [dispatch]);

  const selectedChildData = useSelector(getSelectedChildInfo);
  const isLoading = useSelector(selectChildInfoPageLoadingStatus);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
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
                onClick={() => props.history.push("/mychildren")}
              >
                Children List
              </Link>
              <Typography color="textPrimary">Child Info</Typography>
            </Breadcrumbs>
          }
        />
        <Box mt={4} display="flex" justifyContent="center">
          <Grid item xs={12} md={8}>
            <ChildInfoTable data={selectedChildData} />
          </Grid>
        </Box>
        <Box mt={6} display="flex" justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            style={{
              opacity: isLoading ? 0.25 : 1,
              pointerEvents: isLoading ? "none" : "initial",
            }}
          >
            <TabBar
              tab1title={"Growth Graph"}
              tab1data={<ChildGrowth />}
              tab2title={"Vaccination Shedule"}
              tab2data={<VacShedule />}
              tab3title={"Milestones"}
              tab3data={<Milestones />}
              tab4disable={true}
              tab4hide="none"
              tab5disable={true}
              tab5hide="none"
              tab6disable={true}
              tab6hide="none"
              centered={true}
              variant="fullWidth"
            />
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Childinfopage);
