import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import {
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDoctorConsultationPlans,
  getLoggedInDoctorId,
  selectAddSessionStatus,
} from "./selector";
import moment from "moment";
import { addDoctorSession } from "./availabilityCalendarSlice";

const useStyles = makeStyles((theme) => ({
  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: "purple",
      color: "white",
    },
  },
}));

const validateTime = (start, end) => {
  if (start && end) {
    if (start.getTime() > end.getTime()) {
      return false;
    } else if (start.getTime() < end.getTime()) {
      return true;
    } else {
      return true;
    }
  }
};

const Detaildialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const consultationPlans = useSelector(selectDoctorConsultationPlans);
  const addSessionStatus = useSelector(selectAddSessionStatus);
  const doctorId = useSelector(getLoggedInDoctorId);
  const formattedConsultationPlans = consultationPlans.map((i) => {
    return { title: i.appoinmentType };
  });
  const [sessionName, setSessionName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [appointmentsPerSession, setAppointmentsPerSession] = useState(null);
  const classes = useStyles();

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };
  const handleMonths = (event, newMonths) => {
    setMonths(newMonths);
  };
  const handleYears = (event, newYears) => {
    setYears(newYears);
  };

  const ADD_SESSION_CONFLICT_MSG =
    "Session Adding Fail, you cannot add overlaping session or session with the same name";

  useEffect(() => {
    if (addSessionStatus === "conflict") {
      notify(enqueueSnackbar, ADD_SESSION_CONFLICT_MSG, "warning");
    }
  }, [addSessionStatus, enqueueSnackbar]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setSessionName(e.target.value)}
                  required
                  label="Session Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  required
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  label="Start Time"
                  value={startDate}
                  onChange={setStartDate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  required
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  label="End Time"
                  value={endDate}
                  onChange={setEndDate}
                  error={!validateTime(startDate, endDate)}
                  helperText={
                    !validateTime(startDate, endDate) &&
                    "End time must be greater than start time."
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="item"
                  options={formattedConsultationPlans}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  onChange={(e, x) => setSelectedPlan(x.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Select a Plan"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Appointment Per Session"
                  variant="outlined"
                  type="number"
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0 },
                    inputmode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => setAppointmentsPerSession(e.target.value)}
                  error={!Number.isInteger(Number(appointmentsPerSession))}
                  helperText={
                    !Number.isInteger(Number(appointmentsPerSession))
                      ? "Please enter an integer"
                      : null
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Days *
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={days}
                  onChange={handleDays}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  <ToggleButton
                    value={0}
                    aria-label="Sunday"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Sunday
                  </ToggleButton>
                  <ToggleButton
                    value={1}
                    aria-label="Monday"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Monday
                  </ToggleButton>
                  <ToggleButton
                    value={2}
                    aria-label="Tuesday"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Tuesday
                  </ToggleButton>
                  <ToggleButton
                    value={3}
                    aria-label="Wednesday"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Wednesday
                  </ToggleButton>
                  <ToggleButton
                    value={4}
                    aria-label="Thursday"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Thursday
                  </ToggleButton>
                  <ToggleButton
                    value={5}
                    aria-label="Friday"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Friday
                  </ToggleButton>
                  <ToggleButton
                    value={6}
                    aria-label="Saturday"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Saturday
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Months *
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={months}
                  onChange={handleMonths}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  <ToggleButton
                    value={0}
                    aria-label="Jan"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Jan
                  </ToggleButton>
                  <ToggleButton
                    value={1}
                    aria-label="Feb"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Feb
                  </ToggleButton>
                  <ToggleButton
                    value={2}
                    aria-label="Mar"
                    size="small"
                    className={classes.buttonColor}
                  >
                    Mar
                  </ToggleButton>
                  <ToggleButton
                    value={3}
                    aria-label="Apr"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Apr
                  </ToggleButton>
                  <ToggleButton
                    value={4}
                    aria-label="May"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    May
                  </ToggleButton>
                  <ToggleButton
                    value={5}
                    aria-label="Jun"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Jun
                  </ToggleButton>
                  <ToggleButton
                    value={6}
                    aria-label="Jul"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Jul
                  </ToggleButton>
                  <ToggleButton
                    value={7}
                    aria-label="Aug"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Aug
                  </ToggleButton>
                  <ToggleButton
                    value={8}
                    aria-label="Sep"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Sep
                  </ToggleButton>
                  <ToggleButton
                    value={9}
                    aria-label="Oct"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Oct
                  </ToggleButton>
                  <ToggleButton
                    value={10}
                    aria-label="Nov"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Nov
                  </ToggleButton>
                  <ToggleButton
                    value={11}
                    aria-label="Dec"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    Dec
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Years *
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={years}
                  onChange={handleYears}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  <ToggleButton
                    value="2020"
                    aria-label="2020"
                    size="small"
                    className={classes.buttonColor}
                  >
                    2020
                  </ToggleButton>
                  <ToggleButton
                    value="2021"
                    aria-label="2021"
                    size="small"
                    className={classes.buttonColor}
                  >
                    2021
                  </ToggleButton>
                  <ToggleButton
                    value="2022"
                    aria-label="2022"
                    size="small"
                    className={classes.buttonColor}
                  >
                    2022
                  </ToggleButton>
                  <ToggleButton
                    value="2023"
                    aria-label="2023"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    2023
                  </ToggleButton>
                  <ToggleButton
                    value="2024"
                    aria-label="2024"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    2024
                  </ToggleButton>
                  <ToggleButton
                    value="2025"
                    aria-label="2025"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    2025
                  </ToggleButton>
                  <ToggleButton
                    value="2026"
                    aria-label="2026"
                    color="primary"
                    className={classes.buttonColor}
                  >
                    2026
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        {/* <Button
          autoFocus
          disabled={
            addSessionStatus === "loading"
              ? true
              : false ||
                !validateTime(startDate, endDate) ||
                ((sessionName === "" || !sessionName) &&
                  (startDate === "" || !startDate) &&
                  (selectedPlan === "" || !selectedPlan) &&
                  (appointmentsPerSession === "" || !appointmentsPerSession) &&
                  days.length === 0) ||
                months.length === 0 ||
                years.length === 0 ||
                !Number.isInteger(Number(appointmentsPerSession))
          }
          color="primary"
          variant="contained"
          onClick={() => {
            dispatch(
              addDoctorSession({
                startTime: moment(startDate).format("HH:mm:ss"),
                doctorId,
                appoinmentType: selectedPlan,
                endTime: moment(endDate).format("HH:mm:ss"),
                sessionName,
                patientSlots: appointmentsPerSession,
                years,
                days,
                months,
              })
            );
          }}
        >
          {addSessionStatus === "loading" ? "Loading.." : " Add Session"}
        </Button> */}
      </DialogActions>
    </MuiPickersUtilsProvider>
  );
};

export default Detaildialog;
