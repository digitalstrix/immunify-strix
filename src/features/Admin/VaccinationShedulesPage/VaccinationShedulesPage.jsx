import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import AllShedulesDataTable from "./AllShedules/AllShedulesDataTable";
import AllShedulesToolBar from "../VaccinationShedulesPage/AllShedules/AllShedulesToolBar";
import { selectCountries, selectCountryLoadingStatus } from './selector';
import { getCountries } from '../../Country/countrySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VaccinationSchedulesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const countryLoadingState = useSelector(selectCountryLoadingStatus);

  const [retryCount, setCount] = useState(0);
  useEffect(()=>{
    if (countryLoadingState === 'idle' || countryLoadingState === 'failed') {
      if (retryCount < 3) {
        dispatch(getCountries());
        setCount(retryCount + 1);
      }       
    }  
    console.log(countryLoadingState);  
  }, [dispatch, countryLoadingState, retryCount, setCount]); 



  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <AllShedulesToolBar countries={countries}/>
        </Box>
        <Box mt={3}>
          <AllShedulesDataTable countries={countries}/>
        </Box>
      </Container>
    </div>
  );
};

export default VaccinationSchedulesPage;
