import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Tooltip,
  IconButton,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import Table from "../../../common/components/Table";
import edit from "../../../assets/icons/Edit.svg";
import add from "../../../assets/icons/Add.svg";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Dialog from "../../../common/components/Admin/Dialog";
import DetailDialog from "./DetailDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  getDoctorConsultationPlans,
  getConsultationPlanAddingStatus,
  getLoggedInDoctorId,
  getConsultationPlanDeletingStatus,
  getConsultationPlanDeletingError,
  selectDoctorSessions,
} from "./selector";
import { deleteConsultationPlan } from "./consultationPlanSlice";
import { notify } from "../../../utils/commonUtils";
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
}));

const Index = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [updatingData, setUpdatingData] = useState(null);
  const classes = useStyles();

  const loggedInDoctor = useSelector(getLoggedInDoctorId);
  const consultationPlans = useSelector(getDoctorConsultationPlans);
  const consultationPlanAddingStatus = useSelector(
    getConsultationPlanAddingStatus
  );
  const doctorSessions = useSelector(selectDoctorSessions);

  const DELETE_CONSULTATION_PLAN_SUCCEESFUL_MSG =
    "Consultation Plan Deleted Successfully!";
  const DELETE_CONSULTATION_PLAN_FAILURE_MSG =
    "Consultation Plans Deleting Failed!";

  const consultationPlansDeletingStatus = useSelector(
    getConsultationPlanDeletingStatus
  );
  const consultationPlansDeletingError = useSelector(
    getConsultationPlanDeletingError
  );

  useEffect(() => {
    if (consultationPlansDeletingStatus === "succeeded") {
      notify(enqueueSnackbar, DELETE_CONSULTATION_PLAN_SUCCEESFUL_MSG);
    } else if (consultationPlansDeletingStatus === "failed") {
      notify(enqueueSnackbar, DELETE_CONSULTATION_PLAN_FAILURE_MSG, "error");
    }
  }, [
    consultationPlansDeletingStatus,
    consultationPlansDeletingError,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    if (consultationPlanAddingStatus === "succeeded") {
      setUpdatingData(null);
      setOpen(false);
    }
  }, [consultationPlanAddingStatus]);

  const data = consultationPlans.map((i) => {
    const { id, appoinmentType, amount, sessionTime } = i;
    return { id, appoinmentType, amount, sessionTime };
  });

  return (
    <div className={classes.root}>
      <Dialog
        tooltip={dialogType === "CONFIRM_DELETE" ? "Delete" : "Update"}
        dialogtitle={
          dialogType === "CONFIRM_DELETE"
            ? "Warning"
            : "Update Consultation Plan"
        }
        dialogcontent={
          dialogType === "ADD/EDIT" ? (
            <DetailDialog data={updatingData} />
          ) : (
            <Box p={3}>
              <Grid container row spacing={3}>
                <Grid item xs={12}>
                  <Typography>
                    Consultation plans with active sessions cannot be deleted.
                    Please delete the session first.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
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
            title="Consultation Plans"
            columns={[
              { title: "Type of Appointment", field: "appoinmentType" },
              {
                title: "Max Session Time (min)",
                field: "sessionTime",
              },
              {
                title: "Amount (INR)",
                field: "amount",
              },
            ]}
            data={data}
            actions={[
              {
                icon: "edit",
                onClick: (event, rowData) => {},
              },
              {
                icon: "add",
                tooltip: "add plan",
                isFreeAction: true,
                onClick: (event, rowData) => {},
              },
              {
                icon: "delete",
                tooltip: "delete plan",
                onClick: (event, rowData) => {},
              },
            ]}
            components={{
              Action: (props) => {
                switch (props.action.icon) {
                  case "edit":
                    return (
                      <Tooltip title={"Edit"}>
                        <IconButton
                          onClick={() => {
                            setUpdatingData(props.data);
                            setDialogType("ADD/EDIT");
                            setOpen(true);
                          }}
                          disabled={false}
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    );
                  case "add":
                    return (
                      <Tooltip title={"Add New Plan"}>
                        <Button
                          variant="contained"
                          color="inherit"
                          className={classes.button}
                          onClick={() => {
                            setDialogType("ADD/EDIT");
                            setOpen(true);
                          }}
                          startIcon={<AddIcon />}
                        >
                          Add a Plan
                        </Button>
                      </Tooltip>
                    );
                  case "delete":
                    return (
                      <Tooltip title={"Delete"}>
                        <IconButton
                          onClick={() => {
                            if (
                              doctorSessions.find(
                                (item) =>
                                  item.appoinmentType ===
                                  props.data?.appoinmentType
                              )
                                ? true
                                : false
                            ) {
                              setDialogType("CONFIRM_DELETE");
                              setOpen(true);
                            } else {
                              dispatch(
                                deleteConsultationPlan({
                                  id: props.data.id,
                                  appoinmentType: props.data.appoinmentType,
                                  personId: loggedInDoctor,
                                })
                              );
                            }
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
