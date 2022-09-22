import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import Doctorapprovaldatatable from "./DoctorList/";
import FilterToolbar from "./DoctorList/FilterToolbar";
import { cloneArray} from "../../../../utils/commonUtils";
import { formatDoctors } from "../../../../utils/doctorListUtils";
import { getAppointmentTypes, getSpecializations, searchDoctors } from './doctorListSlice';
import { selectDoctors, selectSpecializations } from './selector';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = () => {
  const classes = useStyles();
  const doctors = useSelector(selectDoctors);
  const specializations = useSelector(selectSpecializations);
  const data = useMemo(() => {
    return formatDoctors(doctors, specializations);
  }, [doctors, specializations]);
  // cloneArray(doctors)

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <FilterToolbar />
        </Box>
        <Box mt={3}>
          <Doctorapprovaldatatable data={data}/>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
