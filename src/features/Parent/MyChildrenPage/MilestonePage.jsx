import React, { useEffect } from "react";
import { withRouter } from "react-router";
import {
  Container,
  makeStyles,
  Breadcrumbs,
  Link,
  Typography,
  Box,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TabBar from "../../../common/components/TabBar";
import Milestonecards from "./Milestones/MilestoneDetails/MilestoneCards";
import { useSelector, useDispatch } from "react-redux";
import { selectedMilestone } from "./Milestones/ChildSummary/selector";
import { getChildMilestoneDetails } from "./Milestones/milestoneSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { image, childId, atAgeUnit, atAge, index } =
    useSelector(selectedMilestone);

  useEffect(() => {
    dispatch(
      getChildMilestoneDetails({
        childId,
        atAgeUnit,
        atAge,
      })
    );
  }, [childId, atAge, atAgeUnit, dispatch]);

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
                onClick={() => props.history.push("/mychildren")}
              >
                Children List
              </Link>
              <Typography color="textPrimary">Child Milestones</Typography>
            </Breadcrumbs>
          }
        />
      </Container>

      <Container maxWidth="md">
        <Box mt={3}>
          <TabBar
            tab1title="Social"
            tab1data={<Milestonecards dataType="social" />}
            tab2title="Communication"
            tab2data={<Milestonecards dataType="communication" />}
            tab3title="Cognitive"
            tab3data={<Milestonecards dataType="cognitive" />}
            tab4title="Physical Development"
            tab4data={<Milestonecards dataType="physical" />}
            tab5hide="none"
            tab6hide="none"
            variant="fullWidth"
          />
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Index);
