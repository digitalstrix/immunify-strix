import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
  TimePicker,
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@material-ui/lab";
import { useSnackbar } from "notistack";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";

import {
  getDaysOfTheWeek,
  getMonthsOfTheYear,
  getYears,
  notify,
} from "../../../../../../utils/commonUtils";

import {
  validateSessionInput,
  validateSessionPayload,
  generateSessionInputValidationErrors,
} from "../../../../../../utils/doctorListUtils";

import moment from "moment";
import { updateDoctorSession } from "../../doctorListSlice";
import {
  selectAppointmentTypes,
  selectConsultationPlans,
  selectSessionUpdateStatus,
} from "../../selector";

const useStyles = makeStyles((theme) => ({
  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: "purple",
      color: "white",
    },
  },
}));

const initInputs = (selected) => {
  if (selected) {
    const {
      id = null,
      sessionName,
      startTime,
      endTime,
      appoinmentType,
      patientSlots,
    } = selected;
    console.log(startTime);
    console.log(endTime);
    return {
      id,
      sessionName,
      startTime,
      endTime,
      appoinmentType,
      patientSlots,
    };
  }

  return {
    startTime: new Date(),
    endTime: new Date(),
  };
};

const initYears = (selected) => {
  if (selected) {
    return selected.years;
  }
  return [];
};

const initMonths = (selected) => {
  if (selected) {
    return selected.months;
  }
  return [];
};

const initDays = (selected) => {
  if (selected) {
    return selected.days;
  }
  return [];
};

const Detaildialog = ({
  updateAction,
  values,
  errorProps,
  updateErrorProps,
  setOpenDialog,
  selected,
  setSelected,
  appointmentTypes,
  isUpdate,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [days, setDays] = useState(initDays(selected));
  const [months, setMonths] = useState(initMonths(selected));
  const [years, setYears] = useState(initYears(selected));
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(initInputs(selected));
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateSessionInput({ name, value }),
    });
  };

  useEffect(() => {
    if (errorProps) {
      setErrors({
        ...errors,
        ...errorProps,
      });
      updateErrorProps(null);
    }
  }, [errorProps, errors, updateErrorProps]);

  useEffect(() => {
    return () => {
      if (selected) {
        setSelected(null);
      }
    };
  }, [selected, setSelected]);

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };
  const handleMonths = (event, newMonths) => {
    console.log(newMonths);
    setMonths(newMonths);
  };
  const handleYears = (event, newYears) => {
    console.log(newYears);
    setYears(newYears);
  };

  const validateTimeDiff = () => {
    return moment(inputs.endTime).diff(moment(inputs.startTime)) <= 0;
  };

  const myConsultationPlans = useSelector(selectConsultationPlans);
  const addSessionStatus = useSelector(selectSessionUpdateStatus);
  const ADD_SESSION_CONFLICT_MSG = "Session Adding Fail, you cannot add overlaping session or session with the same name";
  const ADD_SESSION_SUCCESS_MSG = "Session Adding Successfully. ";

  useEffect(() => {
    if(addSessionStatus =='failed_duplicate_request'){
      notify(enqueueSnackbar, ADD_SESSION_CONFLICT_MSG, "warning");
    }
    if(addSessionStatus == 'succeeded'){
      const payload = { ...inputs, years, months, days };
      notify(enqueueSnackbar, ADD_SESSION_SUCCESS_MSG);
      if(addSessionStatus == 'succeeded'){
        updateAction([...values, payload]);
        setOpenDialog(false)
      }
    }
  }, [addSessionStatus]);

  const availableConsultationPlans =
    (myConsultationPlans &&
      myConsultationPlans.length > 0 &&
      myConsultationPlans.map((item, index) => ({
        value: index,
        label: item.appoinmentType,
      }))) ||
    [];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="sessionName"
                  label="Session Name"
                  variant="outlined"
                  value={inputs.sessionName}
                  error={!!errors.sessionName}
                  helperText={errors.sessionName}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  label="Start Time"
                  value={inputs.startTime}
                  onChange={(value) =>
                    handleChange({ target: { name: "startTime", value } })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  label="End Time"
                  value={inputs.endTime}
                  onChange={(value) =>
                    handleChange({ target: { name: "endTime", value } })
                  }
                />
              </Grid>
              {validateTimeDiff() && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    End Time must be greater than the Start Time
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="item"
                  options={appointmentTypes}
                  getOptionLabel={(option) => option.label}
                  value={inputs.appoinmentType}
                  fullWidth
                  onChange={(e, value) =>
                    handleChange({ target: { name: "appoinmentType", value } })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Session Type"
                      variant="outlined"
                      error={!!errors.appoinmentType}
                      helperText={errors.appoinmentType}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="patientSlots"
                  label="Appointments Per Session"
                  variant="outlined"
                  type="number"
                  value={inputs.patientSlots}
                  error={!!errors.patientSlots}
                  helperText={errors.patientSlots}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Days
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={days}
                  onChange={handleDays}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  {getDaysOfTheWeek().map(({ label, value }) => (
                    <ToggleButton
                      value={value}
                      aria-label={label}
                      size="small"
                      className={classes.buttonColor}
                    >
                      {label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Months
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={months}
                  onChange={handleMonths}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  {getMonthsOfTheYear().map(({ label, value }) => (
                    <ToggleButton
                      value={value}
                      aria-label={label}
                      size="small"
                      className={classes.buttonColor}
                    >
                      {label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="caption" color="initial" display="block">
                    Years
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={years}
                  onChange={handleYears}
                  size="small"
                  aria-label="text formatting"
                  color="primary"
                >
                  {getYears().map((year) => (
                    <ToggleButton
                      value={year}
                      aria-label={year}
                      size="small"
                      className={classes.buttonColor}
                    >
                      {year}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          disabled={
            validateTimeDiff() || 
            inputs.sessionName === '' || 
            inputs.sessionName === undefined || 
            inputs.patientSlots === '' ||
            inputs.appoinmentType === null ||
            years.length === 0 || 
            months.length === 0 || 
            days.length === 0 
          }
          color="primary"
          variant="contained"
          onClick={() => {
            const payload = { ...inputs, years, months, days };
            if (validateSessionPayload(payload)) {
              dispatch(updateDoctorSession(payload));
              if(addSessionStatus == 'succeeded'){
                const updatedValues = [...values];
                const index = selected.tableData.id;
                updatedValues[index] = payload;
                updateAction(updatedValues);
                setOpenDialog(false)
              }
              // if (isUpdate) {
              //   dispatch(updateDoctorSession(payload));
              // } else {
              //   if (selected) {
              //     const updatedValues = [...values];
              //     const index = selected.tableData.id;
              //     updatedValues[index] = payload;
              //     updateAction(updatedValues);
              //     dispatch(updateDoctorSession(payload));
              //   } else {
              //     updateAction([...values, payload]);
              //     dispatch(updateDoctorSession(payload));
              //   }
              //   setOpenDialog(false);
              // }
            } else {
              const inputValidationErrors =
                generateSessionInputValidationErrors(inputs);
              console.log(inputValidationErrors);
              setErrors(inputValidationErrors);
            }
          }}
        >
          Add Session
        </Button>
      </DialogActions>
    </MuiPickersUtilsProvider>
  );
};

export default Detaildialog;
