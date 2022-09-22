import MoreActions from "./MoreActions";
import More from "@material-ui/icons/MoreVertOutlined";
import Avatar from "./Avatar";
import { getDoctorMoreInfo, getMyAppointments } from "./myAppointmentsSlice";
import {
  getLoggedInUserId,
  selectCancellingAppointmentError,
  selectCancellingAppointmentStatus,
  selectMyAppointments,
  selectMyAppointmentsRaw,
} from "./selector";
import { Info as InfoIcon } from "@material-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MainToolbar from "./MainToolbar";
import Table from "../../../common/components/Table";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "../../../common/components/Admin/Dialog";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import { getDoctorProfileInfo } from "../../AccountPage/ProfileInfo/profileInfoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = ({ history }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedPerson, setSelectedPerson] = useState(null);

  const logedInUserId = useSelector(getLoggedInUserId);
  const appointments = useSelector(selectMyAppointments);
  const appointmentsRaw = useSelector(selectMyAppointmentsRaw);

  const CANCELLING_SUCCESS = "Appointment Cancelled Successfully!";
  const CANCELLING_FAILURE = "Appointment Cancelling Failed!";

  const cancellingAppointmentStatus = useSelector(
    selectCancellingAppointmentStatus
  );
  const cancellingAppointmentError = useSelector(
    selectCancellingAppointmentError
  );

  useEffect(() => {
    dispatch(getDoctorProfileInfo({ doctorId: logedInUserId }));
  }, [dispatch]);

  useEffect(() => {
    if (cancellingAppointmentStatus === "succeeded") {
      setOpenDialog(false);

      notify(enqueueSnackbar, CANCELLING_SUCCESS);
    } else if (cancellingAppointmentStatus === "failed") {
      notify(enqueueSnackbar, CANCELLING_FAILURE, "error");
    }
  }, [
    cancellingAppointmentStatus,
    cancellingAppointmentError,
    enqueueSnackbar,
  ]);

  const ConvertDate = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const getAppointments = useCallback(
    (info) => dispatch(getMyAppointments({ immId: logedInUserId, ...info })),
    [dispatch]
  );

  useEffect(() => {
    getAppointments({
      immId: logedInUserId,
      date: ConvertDate(selectedDate),
    });
  }, [selectedDate]);

  useEffect(() => {
    getAppointments({
      immId: logedInUserId,
      date: ConvertDate(new Date()),
    });
    dispatch(getDoctorMoreInfo({ doctorId: logedInUserId }));
  }, [dispatch]);

  return (
    <>
      <Dialog
        tooltip="More Actions"
        dialogtitle={"Actions"}
        dialogcontent={
          <MoreActions data={selectedPerson} date={selectedDate} />
        }
        maxWidth="xs"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Container maxWidth={true}>
        <MainToolbar />
        <Box mt={3}>
          <Grid item md={12}>
            <Box my={4}>
              <Grid container row spacing={2}>
                <Grid item md={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      fullWidth
                      size="small"
                      label="Select Date"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Box>
            <Table
              title=""
              columns={[
                {
                  title: "",
                  field: "profilePicture",
                  render: (rowData) => (
                    <Avatar picture={rowData.profilePicture} />
                  ),
                },
                {
                  title: "Patient Name",
                  render: (rowData) =>
                    `${rowData.firstName || ""} ${rowData.lastName || ""}`,
                },
                {
                  title: "Appointment Number",
                  field: "appoinmentId",
                  type: "numeric",
                },
                { title: "Appointment type", field: "appoinmentType" },
                { title: "Date", field: "date" },
                {
                  title: "Time",
                  render: (rowData) =>
                    `${rowData.startTime || ""} to ${rowData.endTime || ""}`,
                },
                {
                  title: "Status",
                  field: "status",
                  cellStyle: { color: "#8F479B" },
                },
              ]}
              data={appointments.length > 0 ? appointments : []}
              actions={[
                {
                  icon: "Info",
                  onClick: (event, rowData) => {},
                },
                {
                  icon: "More",
                  onClick: (event, rowData) => {},
                },
              ]}
              components={{
                Action: (props) => {
                  switch (props.action.icon) {
                    case "More":
                      return (
                        <Tooltip title={"More"}>
                          <IconButton
                            disabled={false}
                            color="inherit"
                            onClick={() => {
                              const rawDataObj = appointmentsRaw.find(
                                (item) =>
                                  item.appoinmentId === props.data.appoinmentId
                              );
                              setSelectedPerson(rawDataObj);
                              setOpenDialog(true);
                            }}
                          >
                            <More />
                          </IconButton>
                        </Tooltip>
                      );

                    case "Info":
                      return (
                        <Tooltip title={"Info"}>
                          <IconButton
                            disabled={false}
                            color="inherit"
                            onClick={() => {
                              history.push({
                                pathname: "/patient-info",
                                state: {
                                  data: { ...props.data, logedInUserId },
                                },
                              });
                            }}
                          >
                            <InfoIcon />
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
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Index;
