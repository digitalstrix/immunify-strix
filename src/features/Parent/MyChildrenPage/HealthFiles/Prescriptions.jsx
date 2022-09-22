import React, { useState, useEffect } from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import NewPrescription from "./NewPrescription";
import Dialog from "../../../../common/components/Admin/Dialog";
import Table from "../../../../common/components/Table";
import UploadIcon from "@material-ui/icons/CloudUploadOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import { getChildPrescriptions } from "./healthFilesSlice";
import {
  getSelectedChildPrescriptions,
  selectEmailSendingError,
  selectEmailSendingStatus,
  selectDeletingStatus,
  selectDeletingError,
  selectAddingStatus,
  selectAddingError,
} from "./selector";
import EmailReport from "./EmailReport";
import DeletePrescription from "./DeletePrescription";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import moment from "moment";

const Prescriptions = ({ data }) => {
  const EMAIL_REPORT = "Email Prescription";
  const DELETE_REPORT = "Delete Prescription";
  const ADD_REPORT = "Add New Prescription";
  const EMAIL_SUCCEESFUL_MSG = "Email Sent Successfully!";
  const EMAIL_FAILURE_MSG = "Email Sending Failed!";
  const DELETE_SUCCEESFUL_MSG = "Prescription Deleted Successfully!";
  const DELETE_FAILURE_MSG = "Prescription Deleting Failed!";
  const ADD_SUCCEESFUL_MSG = "Prescription Added Successfully!";
  const ADD_FAILURE_MSG = "Prescription Adding Failed!";

  const addingStatus = useSelector(selectAddingStatus);
  const addingError = useSelector(selectAddingError);
  const deletingStatus = useSelector(selectDeletingStatus);
  const deletingError = useSelector(selectDeletingError);
  const emailStatus = useSelector(selectEmailSendingStatus);
  const emailError = useSelector(selectEmailSendingError);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getChildPrescriptions({ immId: data.id, userType: "CHILD" }));
  }, [dispatch, deletingStatus, addingStatus]);

  const raw = useSelector(getSelectedChildPrescriptions);

  const prescriptions = raw.map((i) => {
    return {
      id: i.pid,
      name: i?.fileName
        ? "Dr. " + i.fileName
        : (i?.doctor?.firstName && "Dr. " + i.doctor.firstName) || "",
      date: i.date ? moment(i.date).format("YYYY-MM-DD") : "",
      url: i.prescriptionsUrl,
    };
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (addingStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType(null);
      notify(enqueueSnackbar, ADD_SUCCEESFUL_MSG);
    } else if (addingStatus === "failed") {
      notify(enqueueSnackbar, ADD_FAILURE_MSG, "error");
    }
  }, [addingStatus, addingError, enqueueSnackbar]);

  useEffect(() => {
    if (emailStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType(null);
      notify(enqueueSnackbar, EMAIL_SUCCEESFUL_MSG);
    } else if (emailStatus === "failed") {
      notify(enqueueSnackbar, EMAIL_FAILURE_MSG, "error");
    }
  }, [emailStatus, emailError, enqueueSnackbar]);

  useEffect(() => {
    if (deletingStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType(null);
      notify(enqueueSnackbar, DELETE_SUCCEESFUL_MSG);
    } else if (deletingStatus === "failed") {
      notify(enqueueSnackbar, DELETE_FAILURE_MSG, "error");
    }
  }, [deletingStatus, deletingError, enqueueSnackbar]);

  const getDialogContent = () => {
    if (dialogType === ADD_REPORT) {
      return <NewPrescription data={selected} />;
    }
    if (dialogType === EMAIL_REPORT) {
      return <EmailReport data={selected} />;
    }
    if (dialogType === DELETE_REPORT) {
      return <DeletePrescription data={selected} />;
    }
    return null;
  };

  return (
    <div>
      <Dialog
        dialogtitle={dialogType}
        dialogcontent={getDialogContent()}
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Table
        title="Prescription List"
        columns={[
          { title: "Doctor Name", field: "name" },
          { title: "Upload Date", field: "date" },
        ]}
        data={prescriptions}
        actions={[
          {
            icon: "DownloadIcon",
            tooltip: "Download",
            onClick: (event) => {},
          },
          {
            icon: "EmailIcon",
            tooltip: "Email",
            onClick: (event) => {},
          },
          {
            icon: "RemoveIcon",
            tooltip: "Remove",
            onClick: (event) => {},
          },
          {
            icon: "UploadIcon",
            tooltip: "Upload New",
            isFreeAction: true,
            onClick: (event) => {},
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "DownloadIcon":
                return (
                  <Tooltip title={"Download"}>
                    <IconButton
                      disabled={false}
                      color="inherit"
                      onClick={() =>
                        window.open(
                          props.data.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "EmailIcon":
                return (
                  <Tooltip title={"Email"}>
                    <IconButton
                      disabled={false}
                      color="inherit"
                      onClick={() => {
                        setSelected(props.data);
                        setDialogType(EMAIL_REPORT);
                        setOpenDialog(true);
                      }}
                    >
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "RemoveIcon":
                return (
                  <Tooltip title={"Remove"}>
                    <IconButton
                      disabled={false}
                      color="inherit"
                      onClick={() => {
                        setSelected(props.data);
                        setDialogType(DELETE_REPORT);
                        setOpenDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "UploadIcon":
                return (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<UploadIcon />}
                    onClick={() => {
                      setSelected(data);
                      setDialogType(ADD_REPORT);
                      setOpenDialog(true);
                    }}
                  >
                    Upload a Prescription
                  </Button>
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
    </div>
  );
};

export default Prescriptions;
