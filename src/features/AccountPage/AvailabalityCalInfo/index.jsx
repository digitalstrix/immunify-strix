import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Tooltip,
  IconButton,
  Button,
} from "@material-ui/core";
import Table from "../../../common/components/Table";
import edit from "../../../assets/icons/Edit.svg";
import add from "../../../assets/icons/Add.svg";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Dialog from "../../../common/components/Admin/Dialog";
import DetailDialog from "./DetailDialog";
import { useSelector, useDispatch } from "react-redux";
import { getDoctorSessions } from "./availabilityCalendarSlice";
import {
  getLoggedInDoctorId,
  selectDoctorSessions,
  selectAddSessionError,
  selectAddSessionStatus,
  selectDeleteSessionStatus,
  selectDeleteSessionError,
} from "./selector";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import ConfirmDeleteDialog from "./ConfirmDelete";

const AddIcon = () => (
  <img src={add} width="24" height="24" alt="child info icon" />
);

const EditIcon = () => (
  <img src={edit} width="24" height="24" alt="child info icon" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const ADD_SESSION_SUCCEESFUL_MSG = "Session added successfully!";
  const ADD_SESSION_FAILURE_MSG = "Adding session Failed!";

  const DELETE_SESSION_SUCCEESFUL_MSG = "Session deleted successfully!";
  const DELETE_SESSION_FAILURE_MSG =
    "Session cannot be deleted because you have confirmed appointments.";

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedObjectToDelete, setSelectedObjectToDelete] = useState({});
  const classes = useStyles();

  const doctorId = useSelector(getLoggedInDoctorId);
  const sessions = useSelector(selectDoctorSessions);

  const addSessionStatus = useSelector(selectAddSessionStatus);
  const addSessionError = useSelector(selectAddSessionError);

  const deleteSessionStatus = useSelector(selectDeleteSessionStatus);
  const deleteSessionError = useSelector(selectDeleteSessionError);

  const data = sessions.map((i) => {
    const {
      id,
      appoinmentType,
      sessionName,
      startTime,
      endTime,
      patientSlots,
      days,
      months,
      years,
    } = i;
    return {
      id,
      appoinmentType,
      sessionName,
      startTime,
      endTime,
      patientSlots,
      days,
      months,
      years,
    };
  });

  useEffect(() => {
    dispatch(getDoctorSessions({ immId: doctorId }));
  }, [dispatch]);

  useEffect(() => {
    if (addSessionStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_SESSION_SUCCEESFUL_MSG);
      setOpen(false);
      setDialogType(null);
    } else if (addSessionStatus === "failed") {
      notify(enqueueSnackbar, ADD_SESSION_FAILURE_MSG, "error");
    }
  }, [addSessionStatus, addSessionError, enqueueSnackbar]);

  useEffect(() => {
    if (deleteSessionStatus === "succeeded") {
      notify(enqueueSnackbar, DELETE_SESSION_SUCCEESFUL_MSG);
      setOpen(false);
      setDialogType(null);
    } else if (deleteSessionStatus === "failed") {
      notify(enqueueSnackbar, DELETE_SESSION_FAILURE_MSG, "error");
    }
  }, [deleteSessionStatus, deleteSessionError, enqueueSnackbar]);

  return (
    <div className={classes.root}>
      <Dialog
        tooltip="Add"
        dialogtitle={
          dialogType === "ADD" ? "Add New Session" : "Confirm Deleting Session"
        }
        dialogcontent={
          dialogType === "ADD" ? (
            <DetailDialog />
          ) : (
            <ConfirmDeleteDialog
              data={selectedObjectToDelete}
              doctorId={doctorId}
            />
          )
        }
        maxWidth="sm"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Container maxWidth="md">
        <Box>
          <Table
            title="Session Details"
            columns={[
              { title: "Session Name", field: "sessionName" },
              {
                title: "Type",
                field: "appoinmentType",
              },
              {
                title: "Start Time",
                field: "startTime",
              },
              {
                title: "End Time",
                field: "endTime",
              },
              {
                title: "Appointments Per Session",
                field: "patientSlots",
              },
            ]}
            data={data}
            detailPanel={(rowData) => {
              return (
                <Table
                  title="Availabality"
                  columns={[
                    {
                      field: "thead",
                      headerStyle: { display: "none" },
                      cellStyle: { fontWeight: "bold" },
                    },
                    { field: "tdata", headerStyle: { display: "none" } },
                  ]}
                  data={[
                    {
                      thead: "Available Days",
                      tdata: `${rowData.days.includes(0) ? "Sunday " : ""} 
                      ${rowData.days.includes(1) ? "Monday " : ""} ${
                        rowData.days.includes(2) ? "Tuesday " : ""
                      } ${rowData.days.includes(3) ? "Wednesday " : ""}${
                        rowData.days.includes(4) ? "Thursday " : ""
                      }${rowData.days.includes(5) ? "Friday " : ""}${
                        rowData.days.includes(6) ? "Saturday" : ""
                      } 
                        `,
                    },
                    {
                      thead: "Available Months",
                      tdata: `${rowData.months.includes(0) ? "January " : ""} 
                      ${rowData.months.includes(1) ? "February " : ""} ${
                        rowData.months.includes(2) ? "March " : ""
                      } ${rowData.months.includes(3) ? "April " : ""}${
                        rowData.months.includes(4) ? "May " : ""
                      }${rowData.months.includes(5) ? "June " : ""}${
                        rowData.months.includes(6) ? "July" : ""
                      }${rowData.months.includes(7) ? "August " : ""} 
                      ${rowData.months.includes(8) ? "September " : ""} ${
                        rowData.months.includes(9) ? "October " : ""
                      } ${rowData.months.includes(10) ? "November " : ""}${
                        rowData.months.includes(11) ? "December " : ""
                      }`,
                    },
                    {
                      thead: "Available Years",
                      tdata: rowData.years
                        .replace(/'/g, "")
                        .replace(/,/g, " ")
                        .replace(/[\[\]']+/g, "")
                        .replace(/"/g, ""),
                    },
                  ]}
                  options={{
                    search: false,
                    exportButton: false,
                    loadingType: "overlay",
                    showEmptyDataSourceMessage: true,
                    emptyRowsWhenPaging: false,
                    paging: false,
                  }}
                />
              );
            }}
            // rowClick={(event, rowData, togglePanel) => togglePanel()}
            actions={[
              {
                icon: "add",
                tooltip: "add plan",
                isFreeAction: true,
                onClick: (event, rowData) =>
                  alert(
                    "this onclick wpnt do anything,remove & check console " +
                      rowData.name
                  ),
              },
              {
                icon: "delete",
                tooltip: "delete plan",
              },
            ]}
            components={{
              Action: (props) => {
                switch (props.action.icon) {
                  case "add":
                    return (
                      <Tooltip title={"Add New Session"}>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => {
                            setDialogType("ADD");
                            setOpen(true);
                          }}
                          className={classes.button}
                          startIcon={<AddIcon />}
                        >
                          Add a Session
                        </Button>
                      </Tooltip>
                    );
                  case "delete":
                    return (
                      <Tooltip title={"Delete"}>
                        <IconButton
                          onClick={() => {
                            setSelectedObjectToDelete(props.data);
                            setDialogType("DELETE");
                            setOpen(true);
                          }}
                          disabled={false}
                          color="inherit"
                        >
                          <DeleteOutline />
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
              search: false,
              actionsColumnIndex: -1,
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Index;
