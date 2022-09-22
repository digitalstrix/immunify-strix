import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import VaccinationCentersDataTable from "./VaccinationCentersDataTable/VaccinationCentersDataTable";
import VaccinationCentersToolBar from "./VaccinationCentersDataTable/VaccinationCentersToolBar";
import { cloneArray } from "../../../utils/commonUtils";
import {
  selectCountryLoadingStatus,
  selectCenterFetchStatus,
  selectVacCenters
} from './selector'; 
import { fetchVacCenterMetadata } from './vacCenterSlice';
import { getCountries } from '../../Country/countrySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VaccinationCentersPage = () => {
  const classes = useStyles();
  const countryLoadingStatus = useSelector(selectCountryLoadingStatus);
  const centerFetchStatus = useSelector(selectCenterFetchStatus);
  const vacCenters = useSelector(selectVacCenters);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (centerFetchStatus === "idle") {
      dispatch(fetchVacCenterMetadata());
    }
  }, [dispatch, centerFetchStatus]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <VaccinationCentersToolBar />
        </Box>
        <Box mt={3}>
          <VaccinationCentersDataTable data={cloneArray(vacCenters)} />
        </Box>
      </Container>
    </div>
  );
}; 

export default VaccinationCentersPage;
