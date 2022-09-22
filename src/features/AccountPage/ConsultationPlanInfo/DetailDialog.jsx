import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedInDoctorId,
  getConsultationPlanAddingStatus,
  getConsultationPlanAddingError,
} from "./selector";
import { addConsultationPlan } from "./consultationPlanSlice";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const DetailDialog = ({ data }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const ADD_CONSULTATION_PLAN_SUCCEESFUL_MSG =
    "Consultation Plans Updated Successfully!";
  const ADD_CONSULTATION_PLAN_FAILURE_MSG =
    "Consultation Plans Updating Failed!";

  const [consultationPlan, setConsultationPlan] = useState(
    (data && data.appoinmentType) || null
  );
  const [amount, setAmount] = useState((data && data.amount) || null);
  const sessionTime = 15;
  const personId = useSelector(getLoggedInDoctorId);

  const cPlanAddingStatus = useSelector(getConsultationPlanAddingStatus);
  const cPlanAddingError = useSelector(getConsultationPlanAddingError);

  useEffect(() => {
    if (cPlanAddingStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_CONSULTATION_PLAN_SUCCEESFUL_MSG);
    } else if (cPlanAddingStatus === "failed") {
      notify(enqueueSnackbar, ADD_CONSULTATION_PLAN_FAILURE_MSG, "error");
    }
  }, [cPlanAddingStatus, cPlanAddingError, enqueueSnackbar]);

  return (
    <div>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  disabled={data ? true : false}
                  id="combo-box-demo"
                  options={appointmentType}
                  getOptionLabel={(option) => option.title}
                  defaultValue={{ title: consultationPlan || null }}
                  onChange={(e, x) => setConsultationPlan(x.title)}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type of Appointment"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Amount (INR)"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          disabled={cPlanAddingStatus === "loading" ? true : false}
          color="primary"
          variant="contained"
          onClick={() => {
            dispatch(
              addConsultationPlan({
                personId,
                appoinmentType: consultationPlan,
                sessionTime,
                amount,
              })
            );
          }}
        >
          {cPlanAddingStatus === "loading" ? "Loading.." : "Add / Update Plan"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default DetailDialog;

const appointmentType = [
  { title: "Telemedicine" },
  { title: "Home Vaccination" },
  { title: "General" },
];
