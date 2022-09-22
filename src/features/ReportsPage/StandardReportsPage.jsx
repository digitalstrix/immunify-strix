import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
// import TabBar from "../../common/components/TabBar";
import GeneratedReport from "./GeneratedReport";
import { initVaccination } from "../ChildVaccinationPage/vaccinationSlice";
import { initGrowth } from "../ChildVaccinationPage/growthSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ReportsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initVaccination());
    dispatch(initGrowth());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false}>
        <MainToolbar breadcrumb='Standard Reports' />
        <Box mt={3}>
          <GeneratedReport />
        </Box>
      </Container>
    </>
  );
};

export default ReportsPage;
