import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MainToolbar from "./MainToolbar";
import PatientContainer from "../MyPatientsPage/PatientContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Patientinfo = ({ location }) => {
  const {
    state: { data },
  } = location;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <MainToolbar path="patientInfo" />
        <Box mt={3}>
          <Grid item md={12}>
            <Box my={4}>
              <Grid container row spacing={2}>
                <PatientContainer
                  userType={data.userType}
                  immId={data.immId}
                  doctorId={data.logedInUserId}
                />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Patientinfo;
