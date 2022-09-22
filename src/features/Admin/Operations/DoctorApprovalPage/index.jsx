import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import Doctorapprovaldatatable from "./DoctorApprovalList/DoctorApprovalDataTable";
import FilterToolbar from "./DoctorApprovalList/FilterToolbar";
import { cloneArray, notify } from "../../../../utils/commonUtils";
import { getNonApprovedUsers } from "./doctorApprovalSlice";
import {
  selectPendingUsers,
  selectDoctorApprovalStatus,
  selectDoctorRemoveStatus,
  } from "./selector";

const DOCTOR_APPROVAL_SUCCESSFUL_MSG = 'Doctor approved successfully!';
const DOCTOR_APPROVAL_FAILURE_MSG = 'Doctor approval failed! Please try again.';
const DOCTOR_DELETED_SUCCESS = 'Doctor deleted success';
const DOCTOR_DELETED_FAILED = 'Doctor deleted failed';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const pendingUsers = useSelector(selectPendingUsers);
  const doctorApprovalStatus = useSelector(selectDoctorApprovalStatus);
  const statusDelete = useSelector((state) => selectDoctorRemoveStatus(state));

  useEffect(() => {
    dispatch(getNonApprovedUsers());
  }, [dispatch]);

  useEffect(() => {
    if (doctorApprovalStatus === 'succeeded') {
      notify(enqueueSnackbar, DOCTOR_APPROVAL_SUCCESSFUL_MSG);
    } else if (doctorApprovalStatus === 'failed') {
      notify(enqueueSnackbar, DOCTOR_APPROVAL_FAILURE_MSG, 'error');
    }
  }, [doctorApprovalStatus, enqueueSnackbar]);

  useEffect(() => {
    if (statusDelete === 'succeeded') {
      notify(enqueueSnackbar, DOCTOR_DELETED_SUCCESS);
    } else if (statusDelete === 'failed') {
      notify(enqueueSnackbar, DOCTOR_DELETED_FAILED, 'error');
    }
  }, [statusDelete, enqueueSnackbar]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <FilterToolbar />
        </Box>
        <Box mt={3}>
          <Doctorapprovaldatatable data={cloneArray(pendingUsers)} />
        </Box>
      </Container>
    </div>
  );
};

export default Index;
