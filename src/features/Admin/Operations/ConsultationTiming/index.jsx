import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import ConsultationTiming from "./ConsultationTimeList/ConsulationTimeDatatable";
import FilterToolbar from "./ConsultationTimeList/FilterToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <FilterToolbar />
        </Box>
        <Box mt={3}>
          <ConsultationTiming />
        </Box>
      </Container>
    </div>
  );
}
