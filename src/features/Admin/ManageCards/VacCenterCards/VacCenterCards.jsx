import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import Vaccentercardsdatatable from "./VaccinationCentersList/VaccinationCentersList";
import QRcodeListToolbar from "./VaccinationCentersList/QRcodeListToolbar";
import { fetchVacCenterMetadata } from '../../VaccinationCentersPage/vacCenterSlice';
import { getCountries } from '../../../Country/countrySlice';
import { cloneArray } from '../../../../utils/commonUtils';
import {
  selectCountryLoadingStatus,
  selectCenterFetchStatus,
  selectVacCenters
} from '../selector'; 


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Vaccentercards = () => {

  const classes = useStyles();
  const countryLoadingStatus = useSelector(selectCountryLoadingStatus);
  const centerFetchStatus = useSelector(selectCenterFetchStatus);
  const vacCenters = useSelector(selectVacCenters);
  const dispatch = useDispatch();

  const [retryCount, setRetryCount] = useState(0);

  useEffect(()=>{
    if (countryLoadingStatus === 'idle' || countryLoadingStatus === 'failed') {
      if (retryCount < 3) {
        dispatch(getCountries());
        setRetryCount(retryCount + 1);
      }       
    }  
    console.log(countryLoadingStatus);  
  }, [dispatch, countryLoadingStatus, retryCount, setRetryCount]);

  useEffect(() => {
    if (centerFetchStatus === 'idle') {
      dispatch(fetchVacCenterMetadata());
    }
  }, [dispatch, centerFetchStatus]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <QRcodeListToolbar />
        </Box>
        <Box mt={3}>
          <Vaccentercardsdatatable data={cloneArray(vacCenters)}/>
        </Box>
      </Container>
    </div>
  );
};

export default Vaccentercards;
