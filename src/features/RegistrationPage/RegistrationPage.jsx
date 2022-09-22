import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, makeStyles, Box } from "@material-ui/core";
import Maintoolbar from "./Maintoolbar";
import Parentdatatable from "./Parent/ParentDataTable";
import { getCountries } from "../Country/countrySlice";
import { initVaccination } from "../ChildVaccinationPage/vaccinationSlice";
import { initGrowth } from "../ChildVaccinationPage/growthSlice";
import { initRegistration } from "./registrationSlice";
import { selectCountryLoadingStatus, selectParents } from "./selector";
import { cloneArray } from "../../utils/commonUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegistationPage = () => {
  const classes = useStyles();

  const countryLoadingState = useSelector(selectCountryLoadingStatus);
  const parents = useSelector(selectParents);
  const dispatch = useDispatch();

  const [retryCount, setCount] = useState(0);

  useEffect(() => {
    if (countryLoadingState === "idle" || countryLoadingState === "failed") {
      if (retryCount < 3) {
        dispatch(getCountries());
        setCount(retryCount + 1);
      }
    }
    console.log(countryLoadingState);
  }, [dispatch, countryLoadingState, retryCount, setCount]);

  useEffect(() => {
    dispatch(initVaccination());
    dispatch(initGrowth());
    return () => {
      dispatch(initRegistration());
      console.log("unmounting from the screen Registration page");
    };
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false}>
        <Maintoolbar />
        <Box mt={3}>
          <Parentdatatable parents={cloneArray(parents)} />
        </Box>
      </Container>
    </>
  );
};

export default RegistationPage;
