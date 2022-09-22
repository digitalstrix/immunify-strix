import React from "react";

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
import TabBar from "../../../common/components/TabBar";
import ChildGrowthDetails from "./ChildGrowth/ChildGrowthDetails";
import VaccinationShedule from "./VaccinationShedule";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Childinformationpage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
          <Childdetails />
        </Box>
        <Box mt={6}>
          <TabBar
            tab1title={"Growth Graph"}
            tab1data={<ChildGrowthDetails />}
            tab2title={"Vaccination Shedule"}
            tab2data={<VaccinationShedule />}
            tab3disable={true}
          />
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Childinformationpage);
