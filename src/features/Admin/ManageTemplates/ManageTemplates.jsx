import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TemplateListDataTable from "./TemplateListDataTable/TemplateListDataTable";
import TemplateListToolbar from "./TemplateListDataTable/TemplateListToolbar";
import {
  selectCountries,
  selectCountryLoadingStatus,
  selectVacStates,
  selectVacCities,
  selectVacNames,
  selectVacTypes,
  selectVacCenters,
  selectArtworks
} from './selector';
import { loadFormMetadata } from './manageTemplateSlice';
import { getCountries } from '../../Country/countrySlice';
import { getVacCenters } from '../../Admin/VaccinationCentersPage/vacCenterSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Managetemplates = () => {
  const classes = useStyles();
  const countries = useSelector(selectCountries);
  const countryLoadingState = useSelector(selectCountryLoadingStatus);
  const vacStates = useSelector(selectVacStates)
  const vacCitites = useSelector(selectVacCities);
  const vacNames = useSelector(selectVacNames);
  const vacTypes = useSelector(selectVacTypes);
  const vacCenters = useSelector(selectVacCenters);
  const artworks = useSelector(selectArtworks);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFormMetadata());
  }, [dispatch]);

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
  
  useEffect(() => {
    dispatch(getVacCenters({}));
  }, [dispatch]);

  console.log(countries);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar countries={countries} vacNames={vacNames} vacCenters={vacCenters}/>
        <Box mt={4}>
          <TemplateListToolbar
            countries={countries}
            vacStates={vacStates}
            vacCitites={vacCitites}
            vacNames={vacNames}
            vacTypes={vacTypes}            
          />
        </Box>
        <Box mt={3}>
          <TemplateListDataTable artworks={artworks} vacCenters={vacCenters} countries={countries}/>
        </Box>
      </Container>
    </div>
  );
};

export default Managetemplates;
