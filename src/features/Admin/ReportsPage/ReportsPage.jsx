import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import ImmCardReportDataTable from "./ImmCardReport/ImmCardReportDataTable";
import ImmCardReportToolbar from "./ImmCardReport/ImmCardReportToolbar";
import { selectCountryLoadingStatus } from './selector';
import { getCountries } from '../../Country/countrySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Reportspage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const countryLoadingStatus = useSelector(selectCountryLoadingStatus);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (countryLoadingStatus === "idle" || countryLoadingStatus === "failed") {
      if (retryCount < 3) {
        dispatch(getCountries());
        setRetryCount(retryCount + 1);
      }
    }
    console.log(countryLoadingStatus);
  }, [dispatch, countryLoadingStatus, retryCount, setRetryCount]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box m={4}>
          <ImmCardReportToolbar />
        </Box>
        <Box mt={3}>
          <ImmCardReportDataTable />
        </Box>
      </Container>
    </div>
  );
};

export default Reportspage;
