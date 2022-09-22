import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Container,
  makeStyles,
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import Childdetails from "./ChildInfo/ChildDetails";
import Maintoolbar from "./Maintoolbar";
import TabBar from "../../common/components/TabBar";
import ChildGrowthDetails from "./ChildGrowth/ChildGrowthDetails";
import VaccinationShedule from "./VaccinationShedule";
import {
  selectChildren,
  selectGrowthFetchingStatus,
  selectStdGraphs,
  selectGrowthInfo,
  selectHeightInfo,
  selectWeightInfo,
  selectHcwInfo,
} from "./selector";
import { getGrowthInfo, initGrowth } from "./growthSlice";
import { initVaccination } from "../ChildVaccinationPage/vaccinationSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Childinformationpage = (props) => {
  const classes = useStyles();
  const [child] = useSelector(selectChildren);
  const growthFetchingStatus = useSelector(selectGrowthFetchingStatus);
  const stdGraphs = useSelector(selectStdGraphs);
  const growthInfo = useSelector(selectGrowthInfo);
  const heightInfo = useSelector(selectHeightInfo);
  const weightInfo = useSelector(selectWeightInfo);
  const hcwInfo = useSelector(selectHcwInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (growthFetchingStatus === "idle" || growthFetchingStatus === "failed") {
      if (child) {
        dispatch(getGrowthInfo({ childId: child.id }));
      }
    }
  }, [growthFetchingStatus, child, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initGrowth());
      dispatch(initVaccination());
    };
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false}>
        <Maintoolbar
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
                onClick={() => props.history.push("/child-vaccination")}
              >
                Child Vaccination
              </Link>
              <Typography color="textPrimary">Child Information</Typography>
            </Breadcrumbs>
          }
        />
        <Box mt={3}>
          <Childdetails data={child} />
        </Box>
        <Box mt={6}>
          <TabBar
            tab1title={"Growth Graph"}
            tab1data={
              <ChildGrowthDetails
                stdGraphs={stdGraphs}
                growthInfo={growthInfo}
                heightInfo={heightInfo}
                weightInfo={weightInfo}
                hcwInfo={hcwInfo}
              />
            }
            tab2title={"Vaccination Shedule"}
            tab2data={<VaccinationShedule />}
            tab3disable={true}
          />
        </Box>
      </Container>
    </>
  );
};

export default withRouter(Childinformationpage);
