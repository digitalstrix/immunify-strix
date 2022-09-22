import React, { useState, useEffect } from "react";
import Table from "../../../common/components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUpcommingAppointments,
  getLoggedInUserId,
  selectAppointmentCancellingStatus,
  selectAppointmentCancellingError,
  selectAppointmentsReceivingStatus,
} from "./selector";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { cloneArray } from "../../../utils/commonUtils";
import Dialog from "../../../common/components/Admin/Dialog";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import moment from "moment";
import { cancelAppointmentAsync } from "./myAppointmentsSlice";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const UpcomingAppoint = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const upcomming = useSelector(selectUpcommingAppointments);
  const personId = useSelector(getLoggedInUserId);
  const status = useSelector(selectAppointmentCancellingStatus);
  const error = useSelector(selectAppointmentCancellingError);
  const isLoading = useSelector(selectAppointmentsReceivingStatus);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const CANCELLING_SUCCESS = "Cancelled Successfully!";
  const CANCELLING_ERROR = "Cancelling Failed!";

  useEffect(() => {
    if (status === "succeeded") {
      setSelectedData(null);
      setOpen(false);
      notify(enqueueSnackbar, CANCELLING_SUCCESS);
    } else if (status === "failed") {
      setSelectedData(null);
      setOpen(false);
      notify(enqueueSnackbar, CANCELLING_ERROR, "error");
    }
  }, [status, error, enqueueSnackbar]);

  return (
    <div
      style={{
        opacity: isLoading === "loading" ? 0.25 : 1,
        pointerEvents: isLoading === "loading" ? "none" : "initial",
      }}
    >
      <Dialog
        tooltip="Add"
        dialogtitle="Confirm"
        dialogcontent={
          <div>
            <DialogContent dividers>
              <form noValidate autoComplete="off">
                <Box p={3}>
                  <Grid container row spacing={3}>
                    <Typography>
                      Are you sure you want to cancel the appointment? Please
                      read the FAQ section for more details on cancellation
                      policy.
                    </Typography>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                disabled={status === "loading"}
                color="primary"
                variant="contained"
                onClick={() =>
                  dispatch(
                    cancelAppointmentAsync({
                      slotId: selectedData.slotId,
                      personId,
                    })
                  )
                }
              >
                {status === "loading" ? "Cancelling" : "Cancel"}
              </Button>
            </DialogActions>
          </div>
        }
        maxWidth="sm"
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title=""
        columns={[
          {
            title: "Name",
            render: (rowData) => `Dr. ${rowData.firstName} ${rowData.lastName}`,
          },
          { title: "Appintment Number", field: "slotId" },
          { title: "Appintment Type", field: "appoinmentType" },
          {
            title: "Date",
            render: (rowData) => moment(rowData.date).format("YYYY-MM-DD"),
          },
          {
            title: "Time",
            render: (rowData) => `${rowData.startTime} - ${rowData.endTime}`,
          },
          { title: "Status", field: "status" },
          {
            title: "Actions",
            render: (rowData) => {
              return (
                <Button
                  autoFocus
                  disabled={rowData.status !== "ACCEPTED"}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setSelectedData(rowData);
                    setOpen(true);
                  }}
                >
                  {rowData.status !== "ACCEPTED"
                    ? "Already Cancelled "
                    : "Cancel"}
                </Button>
              );
            },
          },
        ]}
        data={cloneArray(upcomming)}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default UpcomingAppoint;
