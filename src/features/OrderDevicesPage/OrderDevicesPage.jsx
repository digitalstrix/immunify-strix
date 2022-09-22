import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import DeviceRequestForm from "./DeviceRequestForm";
import { initVaccination } from '../ChildVaccinationPage/vaccinationSlice';
import { initGrowth } from '../ChildVaccinationPage/growthSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const OrderDevicesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initVaccination());
    dispatch(initGrowth());
  }, [dispatch]);
  
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={3}>
          <DeviceRequestForm />
        </Box>
      </Container>
    </div>
  );
};

export default OrderDevicesPage;
