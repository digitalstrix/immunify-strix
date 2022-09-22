import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../../../../common/components/Admin/Dialog";
import ConsultationInfo from "../ConsultationInfo";
import PrescriptionInfo from "../PrescriptionInfo";
import VaccinationInfo from "../VaccinationInfo";
import LabreportInfo from "../LabreportInfo";
import MedicineInfo from "../MedicineInfo";
import MedicalInfo from "../MedicalInfo";
import Allergies from "../Allergies";

import Prescriptions from "../../../../assets/icons/prescriptions.svg";
import Consultation from "../../../../assets/icons/consultation.svg";
import Labreports from "../../../../assets/icons/labreport.svg";
import vaccination from "../../../../assets/icons/vaccination.svg";
import medicines from "../../../../assets/icons/medicine.svg";
import growth from "../../../../assets/icons/growth.svg";

import { useDispatch } from "react-redux";
import { getPatientAllData } from "../myPatientsSlice";
import {
  getAdditionalProfileData,
  getBasicProfileData,
} from "../../../Parent/MyAccountPage/parentProfileSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  },
}));

const PrescriptionsIcon = () => (
  <img src={Prescriptions} width="48" height="48" alt="Video call icon" />
);
const ConsultationIcon = () => (
  <img src={Consultation} width="48" height="48" alt="Video call icon" />
);
const LabreportsIcon = () => (
  <img src={Labreports} width="48" height="48" alt="Video call icon" />
);
const VaccinationIcon = () => (
  <img src={vaccination} width="48" height="48" alt="Video call icon" />
);
const MedicinesIcon = () => (
  <img src={medicines} width="48" height="48" alt="Video call icon" />
);
const GrowthIcon = () => (
  <img src={growth} width="48" height="48" alt="Video call icon" />
);
const Index = ({ doctorId, userType, immId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientAllData({ doctorId, userType, immId }));
    if (userType === "PARENT") {
      dispatch(getBasicProfileData({ parentId: immId }));
      dispatch(getAdditionalProfileData(immId));
    }
    return () => {};
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogtype, setDialogtype] = useState("");

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        tooltip="Consultation"
        dialogtitle={
          dialogtype === "consultation"
            ? "Consultation History"
            : dialogtype === "prescriptions"
            ? "Prescriptions"
            : dialogtype === "lab reports"
            ? "Lab Reports"
            : dialogtype === "vaccinations"
            ? "Vaccinations"
            : dialogtype === "medicines"
            ? "Medicines"
            : dialogtype === "medicalInfo"
            ? "Medical Info"
            : dialogtype === "allergies"
            ? "Allergies"
            : null
        }
        dialogcontent={
          dialogtype === "consultation" ? (
            <ConsultationInfo userType={userType} />
          ) : dialogtype === "prescriptions" ? (
            <PrescriptionInfo userType={userType} />
          ) : dialogtype === "lab reports" ? (
            <LabreportInfo userType={userType} />
          ) : dialogtype === "vaccinations" ? (
            <VaccinationInfo userType={userType} />
          ) : dialogtype === "medicines" ? (
            <MedicineInfo userType={userType} />
          ) : dialogtype === "medicalInfo" ? (
            <MedicalInfo userType={userType} />
          ) : dialogtype === "allergies" ? (
            <Allergies userType={userType} />
          ) : null
        }
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />

      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ minHeight: 130 }}>
              <GrowthIcon />
              <Typography variant="h6" color="primary">
                Medical Info
              </Typography>
              <Typography variant="body1" color="initial">
                Height, Weight...
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpenDialog(true);
                setDialogtype("medicalInfo");
              }}
            >
              View Info
            </Button>
          </Paper>
        </Grid>
        {userType === "PARENT" && (
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <div style={{ minHeight: 130 }}>
                <GrowthIcon />
                <Typography variant="h6" color="primary">
                  Allergies
                </Typography>
              </div>
              <br />
              <Divider />
              <br />
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => {
                  setOpenDialog(true);
                  setDialogtype("allergies");
                }}
              >
                View Info
              </Button>
            </Paper>
          </Grid>
        )}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ minHeight: 130 }}>
              <ConsultationIcon />
              <Typography variant="h6" color="primary">
                Consultation History
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpenDialog(true);
                setDialogtype("consultation");
              }}
            >
              View Info
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ minHeight: 130 }}>
              <PrescriptionsIcon />
              <Typography variant="h6" color="primary">
                Prescriptions
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpenDialog(true);
                setDialogtype("prescriptions");
              }}
            >
              View Info
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ minHeight: 130 }}>
              <LabreportsIcon />
              <Typography variant="h6" color="primary">
                Lab Reports
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpenDialog(true);
                setDialogtype("lab reports");
              }}
            >
              View Info
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div style={{ minHeight: 130 }}>
              <VaccinationIcon />
              <Typography variant="h6" color="primary">
                Vaccinations
              </Typography>
              <Typography variant="body1" color="initial">
                Due Vaccines, Vaccinated ...
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpenDialog(true);
                setDialogtype("vaccinations");
              }}
            >
              View Info
            </Button>
          </Paper>
        </Grid>
        {userType === "PARENT" && (
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <div style={{ minHeight: 130 }}>
                <MedicinesIcon />
                <Typography variant="h6" color="primary">
                  Medicines
                </Typography>
                <Typography variant="body1" color="initial">
                  Medicines ...
                </Typography>
              </div>
              <br />
              <Divider />
              <br />
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => {
                  setOpenDialog(true);
                  setDialogtype("medicines");
                }}
              >
                View Info
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Index;
