import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import Dialog from "../../../../common/components/Admin/Dialog";
import DialogContent from "./DialogContent";
import TabBar from "../../../../common/components/TabBar";
import Due from "./Due";
import Vaccinated from "./Vaccinated";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  childScheduleDetails,
  getSelectedChildInfo,
  selectDownloadVacScheduleStatus,
  selectDownloadVacScheduleError,
  selectEmailVacScheduleStatus,
  selectEmailVacScheduleError,
} from "./selector";
import { downloadVacSchedule } from "./ParentSideVaccineSlice";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import EmailDialog from "./EmailDialog";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const raw = useSelector(childScheduleDetails);
  const childInfo = useSelector(getSelectedChildInfo);

  const downloadStatus = useSelector(selectDownloadVacScheduleStatus);
  const downloadError = useSelector(selectDownloadVacScheduleError);
  const emailStatus = useSelector(selectEmailVacScheduleStatus);
  const emailError = useSelector(selectEmailVacScheduleError);

  const DOWNLOAD_SUCCESSFUL_MSG =
    "Child Vaccination Schedule Downloaded Successfully!";
  const DOWNLOAD_FAILURE_MSG = "Child Vaccination Schedule Downloading Failed!";
  const EMAIL_SUCCESSFUL_MSG =
    "Child Vaccination Schedule Emailed Successfully!";
  const EMAIL_FAILURE_MSG = "Child Vaccination Schedule Emailing Failed!";

  useEffect(() => {
    if (downloadStatus === "succeeded") {
      notify(enqueueSnackbar, DOWNLOAD_SUCCESSFUL_MSG);
    } else if (downloadStatus === "failed") {
      notify(enqueueSnackbar, DOWNLOAD_FAILURE_MSG, "error");
    }
  }, [downloadStatus, downloadError, enqueueSnackbar]);

  useEffect(() => {
    if (emailStatus === "succeeded") {
      setOpenDialog(false);
      setDialogType("");
      notify(enqueueSnackbar, EMAIL_SUCCESSFUL_MSG);
    } else if (emailStatus === "failed") {
      setOpenDialog(false);
      setDialogType("");
      notify(enqueueSnackbar, EMAIL_FAILURE_MSG, "error");
    }
  }, [emailStatus, emailError, enqueueSnackbar]);

  const { firstName, lastName, id, BirthInformation, Person } = childInfo;

  const { due, vaccinated } = raw;

  return (
    <div>
      <Dialog
        dialogtitle={dialogType}
        dialogcontent={
          <EmailDialog
            data={{
              childDob: BirthInformation?.dateOfBirth,
              childFirstName: firstName,
              childLastName: lastName,
              childRegNo: id,
              due,
              parentName: Person?.fullName,
              vaccinated,
            }}
          />
        }
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Box m={3}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudDownloadIcon />}
            onClick={() => {
              dispatch(
                downloadVacSchedule({
                  childDob: BirthInformation?.dateOfBirth,
                  childFirstName: firstName,
                  childLastName: lastName,
                  childRegNo: id,
                  due,
                  parentName: Person.fullName,
                  vaccinated,
                })
              );
            }}
          >
            Download Schedule as PDF
          </Button>

          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<EmailIcon />}
            onClick={() => {
              setDialogType("Email Vaccination Schedule");
              setOpenDialog(true);
            }}
          >
            Email Schedule
          </Button>

          <TabBar
            tab1title={"Due"}
            tab1data={<Due />}
            tab2title={"Vaccinated"}
            tab2data={<Vaccinated />}
            tab3disable={true}
            tab3hide="none"
            tab4disable={true}
            tab4hide="none"
            tab5disable={true}
            tab5hide="none"
            tab6disable={true}
            tab6hide="none"
            centered={true}
            variant="fullWidth"
          />
        </Grid>
      </Box>
    </div>
  );
};

export default Index;
