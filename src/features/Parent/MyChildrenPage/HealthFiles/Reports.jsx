import React, { useState, useEffect } from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import NewReport from "./NewReport";
import Dialog from "../../../../common/components/Admin/Dialog";
import Table from "../../../../common/components/Table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import UploadIcon from "@material-ui/icons/CloudUploadOutlined";
import { getChildLabReports } from "./healthFilesSlice";
import {
  getSelectedChildLabReports,
  selectEmailSendingError,
  selectEmailSendingStatus,
  selectDeletingStatus,
  selectDeletingError,
  selectAddingStatus,
  selectAddingError,
} from "./selector";
import moment from "moment";
import EmailReport from "./EmailReport";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import DeleteLabReport from "./DeleteLabReport";

const Reports = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const raw = useSelector(getSelectedChildLabReports);
  const emailStatus = useSelector(selectEmailSendingStatus);
  const emailError = useSelector(selectEmailSendingError);
  const deletingStatus = useSelector(selectDeletingStatus);
  const deletingError = useSelector(selectDeletingError);
  const addingStatus = useSelector(selectAddingStatus);
  const addingError = useSelector(selectAddingError);
  const labReports = raw.map((i) => {
    return {
      id: i.id,
      name: i.labReportName,
      date: i.date,
      url: i.labreportUrl,
    };
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(getChildLabReports(data.id));
    return () => {};
  }, [dispatch, deletingStatus, addingStatus]);

  const EMAIL_REPORT = "Email Report";
  const DELETE_REPORT = "Delete Report";
  const ADD_REPORT = "Add New Report";

  const EMAIL_SUCCEESFUL_MSG = "Email Sent Successfully!";
  const EMAIL_FAILURE_MSG = "Email Sending Failed!";

  const DELETE_SUCCEESFUL_MSG = "Lab Report Deleted Successfully!";
  const DELETE_FAILURE_MSG = "Lab Report Deleting Failed!";

  const ADD_SUCCEESFUL_MSG = "Lab Report Added Successfully!";
  const ADD_FAILURE_MSG = "Lab Report Adding Failed!";

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
    if (deletingStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType(null);
      notify(enqueueSnackbar, DELETE_SUCCEESFUL_MSG);
    } else if (deletingStatus === "failed") {
      notify(enqueueSnackbar, DELETE_FAILURE_MSG, "error");
    }
  }, [deletingStatus, deletingError, enqueueSnackbar]);

  useEffect(() => {
    if (emailStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType(null);
      notify(enqueueSnackbar, EMAIL_SUCCEESFUL_MSG);
    } else if (emailStatus === "failed") {
      notify(enqueueSnackbar, EMAIL_FAILURE_MSG, "error");
    }
  }, [emailStatus, emailError, enqueueSnackbar]);

  const getDialogContent = () => {
    if (dialogType === ADD_REPORT) {
      return <NewReport data={selected} />;
    }
    if (dialogType === EMAIL_REPORT) {
      return <EmailReport data={selected} />;
    }
    if (dialogType === DELETE_REPORT) {
      return <DeleteLabReport data={selected} />;
    }
    return null;
  };

  return (
    <div>
      <Dialog
        dialogtitle={dialogType}
        dialogcontent={getDialogContent()}
        maxWidth="xs"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Table
        title="Report List"
        columns={[
          { title: "Report Name", field: "name" },
          {
            title: "Upload Date",
            field: "date",
            render: (rowData) => `${moment(rowData.date).format("YYYY-MM-DD")}`,
          },
        ]}
        data={labReports}
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
                  <Tooltip title={"Preview"}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        window.open(
                          props.data.url,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                );
              case "EmailIcon":
                return (
                  <Tooltip title={"Email"}>
                    <IconButton
                      color="primary"
                      aria-label="Email Report"
                      component="span"
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
                      color="primary"
                      aria-label="upload picture"
                      component="span"
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
                    onClick={(e) => {
                      setSelected(data);
                      setDialogType(ADD_REPORT);
                      setOpenDialog(true);
                    }}
                  >
                    Upload New
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

export default Reports;
