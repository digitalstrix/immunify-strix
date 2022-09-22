import React from "react";
import { Container, Box, makeStyles, Grid } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TabBar from "../../common/components/TabBar";
import ProfileInfo from "./ProfileInfo";
import EducationInfo from "./EducationInfo";
import WorkExpInfo from "./WorkExpInfo";
import ConsultationPlanInfo from "./ConsultationPlanInfo";
import AvailabiltyCal from "./AvailabalityCalInfo";
import HospitalInfo from "./HospitalInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <>
      <Box mt={3}>
        <Grid container direction="row" justify="center" alignItems="center">
          <TabBar
            tab1title="General"
            tab1data={<ProfileInfo />}
            tab2title="Education"
            tab2data={<EducationInfo />}
            tab3title="Work Experience"
            tab3data={<WorkExpInfo />}
            tab4title="Consultation Plan"
            tab4data={<ConsultationPlanInfo />}
            tab5title="Availabality Calendar"
            tab5data={<AvailabiltyCal />}
            tab6title="Hospital"
            tab6data={<HospitalInfo />}
            variant="scrollable"
          />
        </Grid>
      </Box>
    </>
  );
};

export default Index;
