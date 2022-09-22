import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  makeStyles,
  Tooltip,
  IconButton,
  Grid,
  Avatar as DefaultAvatar,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import Table from "../../../common/components/Table";
import PatientContainer from "./PatientContainer";
import Dialog from "../../../common/components/Admin/Dialog";
import TabBar from "../../../common/components/TabBar";
import SheduleAp from "./SheduleAp";
import UploadPrescription from "./AddPrescription";
import { useDispatch, useSelector } from "react-redux";
import Shedule from "../../../assets/icons/Date.svg";
import Upload from "../../../assets/icons/Upload.svg";
import {
  getLoggedInDoctorId,
  getPrescriptionUploadingError,
  getPrescriptionUploadingStatus,
  getSchedulingAppointmentError,
  getSchedulingAppointmentStatus,
  selectMyChildPatients,
  selectMyAdultPatients,
} from "./selector";
import { cloneArray, notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

import { getMyAdultPatients, getMyChildPatients } from "./myPatientsSlice";
import Avatar from "./Avatar";

const SheduleIcon = () => (
  <img src={Shedule} width="24" height="24" alt="shedule a appointment icon" />
);
const UploadIcon = () => (
  <img src={Upload} width="24" height="24" alt="upload prescription icon" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const ADD_PRESCRIPTION_SUCCEESFUL_MSG = "Prescription Added Successfully!";
  const ADD_PRESCRIPTION_FAILURE_MSG = "Prescription Uploading Failed!";

  let prescriptionUploadStatus = useSelector(getPrescriptionUploadingStatus);
  let prescriptionUploadError = useSelector(getPrescriptionUploadingError);

  const SCHEDULE_AP_SUCCEESFUL_MSG = "Scheduled Successfully!";
  const SCHEDULE_AP_FAILURE_MSG = "Scheduling Failed!";

  let scheduleApStatus = useSelector(getSchedulingAppointmentStatus);
  let scheduleApError = useSelector(getSchedulingAppointmentError);

  const childPatients = useSelector(selectMyChildPatients);
  const adultPatients = useSelector(selectMyAdultPatients);

  useEffect(() => {
    if (scheduleApStatus === "succeeded") {
      notify(enqueueSnackbar, SCHEDULE_AP_SUCCEESFUL_MSG);
    } else if (scheduleApStatus === "failed") {
      notify(enqueueSnackbar, SCHEDULE_AP_FAILURE_MSG, "error");
    }
    setOpenDialog(false);
  }, [scheduleApStatus, scheduleApError, enqueueSnackbar]);

  useEffect(() => {
    if (prescriptionUploadStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_PRESCRIPTION_SUCCEESFUL_MSG);
    } else if (prescriptionUploadStatus === "failed") {
      notify(enqueueSnackbar, ADD_PRESCRIPTION_FAILURE_MSG, "error");
    }
    setOpenDialog(false);
  }, [prescriptionUploadStatus, prescriptionUploadError, enqueueSnackbar]);

  let doctorId = useSelector(getLoggedInDoctorId);
  const [openDialog, setOpenDialog] = useState(false);
  const [screen, setScreen] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const classes = useStyles();
  const tableTitle = "";

  useEffect(() => {
    dispatch(getMyChildPatients(doctorId));
    dispatch(getMyAdultPatients(doctorId));
  }, [dispatch]);

  return (
    <>
      <Dialog
        tooltip="Shedule"
        dialogtitle={
          screen === "schedule" ? "Schedule Appointment" : "Upload Prescription"
        }
        dialogcontent={
          screen === "schedule" ? (
            <SheduleAp data={selectedRowData} />
          ) : (
            <UploadPrescription data={selectedRowData} />
          )
        }
        maxWidth="xs"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />

      <Container maxWidth={true}>
        <MainToolbar />
        <Box mt={3}>
          {/* <Grid container direction="row" justify="center" alignItems="center"> */}
          <TabBar
            tab1title="Children"
            tab1data={
              <Box pt={3}>
                <Table
                  title={tableTitle}
                  columns={[
                    {
                      title: "Profile Picture",
                      render: (rowData) =>
                        rowData.profilePicture ? (
                          <Avatar picture={rowData.profilePicture} />
                        ) : (
                          <DefaultAvatar>
                            {rowData?.firstName?.charAt(0)}
                          </DefaultAvatar>
                        ),
                    },
                    {
                      title: "Name",
                      render: (rowData) =>
                        `${rowData.firstName} ${rowData.lastname}`,
                    },
                    {
                      title: "Gender",
                      field: "gender",
                    },
                  ]}
                  data={cloneArray(childPatients)}
                  detailPanel={(rowData) => {
                    return (
                      <PatientContainer
                        userType={"CHILD"}
                        immId={rowData?.childId}
                        doctorId={doctorId}
                      />
                    );
                  }}
                  actions={[
                    {
                      icon: "schedule",
                      tooltip: "add plan",
                      onClick: (event, rowData) => {},
                    },
                    {
                      icon: "upload",
                      tooltip: "upload",
                      onClick: (event, rowData) => {},
                    },
                  ]}
                  components={{
                    Action: (props) => {
                      switch (props.action.icon) {
                        case "schedule":
                          return (
                            <Tooltip title={"Shedule Appointment"}>
                              <IconButton
                                onClick={() => {
                                  setSelectedRowData(props.data);
                                  setScreen("schedule");
                                  setOpenDialog(true);
                                }}
                                disabled={false}
                                color="inherit"
                              >
                                <SheduleIcon />
                              </IconButton>
                            </Tooltip>
                          );
                        case "upload":
                          return (
                            <Tooltip title={"Upload Prescription"}>
                              <IconButton
                                onClick={() => {
                                  setSelectedRowData(props.data);
                                  setScreen("uploadPrescription");
                                  setOpenDialog(true);
                                }}
                                disabled={false}
                                color="inherit"
                              >
                                <UploadIcon />
                              </IconButton>
                            </Tooltip>
                          );
                        default:
                          break;
                      }
                    },
                  }}
                  options={{
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    actionsColumnIndex: -1,
                  }}
                />
              </Box>
            }
            tab2title="Parents"
            tab2data={
              <Box mt={3}>
                <Table
                  title={tableTitle}
                  columns={[
                    {
                      title: "Profile Picture",
                      field: "profilePicture",
                      render: (rowData) =>
                        rowData.profilePicture ? (
                          <Avatar picture={rowData.profilePicture} />
                        ) : (
                          <DefaultAvatar>
                            {rowData?.firstName?.charAt(0)}
                          </DefaultAvatar>
                        ),
                    },
                    {
                      title: "Name",
                      render: (rowData) =>
                        `${rowData?.firstName} ${rowData?.lastname}`,
                    },
                    {
                      title: "Gender",
                      field: "gender",
                    },
                  ]}
                  data={cloneArray(adultPatients)}
                  detailPanel={(rowData) => {
                    return (
                      <PatientContainer
                        userType={"PARENT"}
                        immId={rowData.personId}
                        doctorId={doctorId}
                      />
                    );
                  }}
                  actions={[
                    {
                      icon: "schedule",
                      tooltip: "add plan",
                      onClick: (event, rowData) => {},
                    },
                    {
                      icon: "upload",
                      tooltip: "upload",
                      onClick: (event, rowData) => {},
                    },
                  ]}
                  components={{
                    Action: (props) => {
                      switch (props.action.icon) {
                        case "schedule":
                          return (
                            <Tooltip title={"Shedule Appointment"}>
                              <IconButton
                                onClick={() => {
                                  setSelectedRowData(props.data);
                                  setScreen("schedule");
                                  setOpenDialog(true);
                                }}
                                disabled={false}
                                color="inherit"
                              >
                                <SheduleIcon />
                              </IconButton>
                            </Tooltip>
                          );
                        case "upload":
                          return (
                            <Tooltip title={"Upload Prescription"}>
                              <IconButton
                                onClick={() => {
                                  setSelectedRowData(props.data);
                                  setScreen("uploadPrescription");
                                  setOpenDialog(true);
                                }}
                                disabled={false}
                                color="inherit"
                              >
                                <UploadIcon />
                              </IconButton>
                            </Tooltip>
                          );
                        default:
                          break;
                      }
                    },
                  }}
                  options={{
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    actionsColumnIndex: -1,
                  }}
                />
              </Box>
            }
            tab3hide="none"
            tab4hide="none"
            tab5hide="none"
            tab6hide="none"
            tab7hide="none"
            variant="fullWidth"
          />
          {/* </Grid> */}
        </Box>
      </Container>
    </>
  );
};

export default Index;
