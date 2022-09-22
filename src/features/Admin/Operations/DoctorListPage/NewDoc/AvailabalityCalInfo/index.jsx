import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  makeStyles,
  Tooltip,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import Table from "../../../../../../common/components/Admin/Table";
import edit from "../../../../../../assets/icons/Edit.svg";
import add from "../../../../../../assets/icons/Add.svg";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import SessionDetails from "../../../../../../common/components/Admin/Dialog";
import DetailDialog from "./DetailDialog";
import {
  removeArrayElement,
  formatAvailabilityData,
  notify,
} from "../../../../../../utils/commonUtils";
import { formatSessions, formatConsultationPlan } from "../../../../../../utils/doctorListUtils";
import { useSnackbar } from "notistack";

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

const Index = ({
  updateAction,
  values,
  plans,
  errorProps,
  updateErrorProps,
  appointmentTypes,
  isUpdate = false,
  sessionUpdateStatus,
  consultationPlan,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const data = useMemo(() => formatSessions(values), [values]);
  const classes = useStyles();

  const SESSION_DELETION_SUCCESSFUL_MSG = "Session Deleted Successfully";

  useEffect(() => {
    if (sessionUpdateStatus === "succeeded") {
      setOpen(false);
    }
  }, [sessionUpdateStatus]);

  const availablePlans = isUpdate ? consultationPlan?.map(p=>p.appoinmentType) : plans?.map((plan) => plan.appoinmentType);

  return (
    <div className={classes.root}>
      <SessionDetails
        tooltip="Edit"
        dialogtitle="Edit Session Information"
        dialogcontent={
          <DetailDialog
            updateAction={updateAction}
            values={values}
            errorProps={errorProps}
            updateErrorProps={updateErrorProps}
            setOpenDialog={setOpen}
            selected={selected}
            setSelected={setSelected}
            isUpdate={isUpdate}
            appointmentTypes={availablePlans}
          />
        }
        maxWidth="sm"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Grid container justify="center">
        <Box>
          <Table
            title="Session Details"
            columns={[
              { title: "Session Name", field: "sessionName" },
              {
                title: "Type",
                field: "appoinment",
              },
              {
                title: "Start Time",
                field: "start",
              },
              {
                title: "End Time",
                field: "end",
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
                      tdata: formatAvailabilityData(rowData.days, "days"),
                    },
                    {
                      thead: "Available Months",
                      tdata: formatAvailabilityData(rowData.months, "months"),
                    },
                    {
                      thead: "Available Years",
                      tdata: formatAvailabilityData(rowData.years),
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
            rowClick={(event, rowData, togglePanel) => togglePanel()}
            actions={[
              {
                icon: "edit",
                onClick: (event, rowData) => {
                  console.log("this is clikkkkkkkkking");
                  alert(
                    "this onclick wpnt do anything,remove & check console" +
                      rowData.name
                  );
                },
              },
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
                onClick: (event, rowData) =>
                  alert(
                    "this onclick wpnt do anything,remove & check console " +
                      rowData.name
                  ),
              },
            ]}
            components={{
              Action: (props) => {
                switch (props.action.icon) {
                  case "edit":
                    return (
                      <div />
                      // <Tooltip title={"Edit"}>
                      //   <IconButton
                      //     onClick={() => {
                      //       setSelected(props.data);
                      //       setOpen(true);
                      //     }}
                      //     disabled={false}
                      //     color="inherit"
                      //   >
                      //     <EditIcon />
                      //   </IconButton>
                      // </Tooltip>
                    );
                  case "add":
                    return (
                      <Tooltip title={"Add New Session"}>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => {
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
                            const { id: index } = props.data.tableData;
                            updateAction(removeArrayElement(values, index));
                            notify(
                              enqueueSnackbar,
                              SESSION_DELETION_SUCCESSFUL_MSG
                            );
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
      </Grid>
    </div>
  );
};

export default Index;
