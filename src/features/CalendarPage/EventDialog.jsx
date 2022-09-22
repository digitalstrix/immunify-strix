import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { InputLabel, Grid, TextField, Box } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "@material-ui/core/Slider";

import {
  EVENT_TYPES,
  AGE_MEASURING_UNITS,
  AGE_UNIT_MONTH_LABEL,
  AGE_UNIT_YEAR_LABEL,
  AGE_UNIT_MONTH_MAX,
  AGE_UNIT_YEAR_MAX,
} from "../../constants/calenderConstants";

import {
  validateEventInputs,
  isHolidayEventTypeSelected,
  validateAddEventPayload,
  createAddEventPayload,
  generateSliderMarks,
  generateInitialInputs,
  generateInputErrors,
} from "../../utils/calenderUtils";
import { getLoggedInUserId } from "./selector";
import { addUserEvent, updateUserEvent } from "./calenderSlice";
import moment from "moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const valuetext = (value) => {
  return `${value}°C`;
};

const CustomDateTimeInput = ({ value, onClick, label }) => (
  <div>
    <Box mb={1}>
      <InputLabel variant='standard'>{label}</InputLabel>
    </Box>
    <Button className='example-custom-input' onClick={onClick} variant='outlined'>
      {value}
    </Button>
  </div>
);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const marksMonth = generateSliderMarks([0, 3, 6, 9, 12]);
const marksYear = generateSliderMarks([0, 3, 6, 9, 12, 15, 18, 21]);

const initialErrors = {
  title: null,
  atAgeUnit: null,
  eventType: null,
  description: null,
};

const getAgeSliderLabel = (ageUnitSelected) => {
  if (ageUnitSelected && ageUnitSelected.value === AGE_MEASURING_UNITS[1].value) {
    return AGE_UNIT_YEAR_LABEL;
  }
  return AGE_UNIT_MONTH_LABEL;
};

const getMaxSliderValue = (ageUnitSelected) => {
  if (ageUnitSelected && ageUnitSelected.value === AGE_MEASURING_UNITS[1].value) {
    return AGE_UNIT_YEAR_MAX;
  }
  return AGE_UNIT_MONTH_MAX;
};

const renderAgeSelection = (inputs) => {
  return !isHolidayEventTypeSelected(inputs);
};

export default function Eventdialog({ slot, open, closeAction, holidays, user, selectedEvent }) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(generateInitialInputs(slot, selectedEvent));

  useEffect(() => {
    setInputs(generateInitialInputs(slot, selectedEvent));
  }, [slot]);
  const [errors, setErrors] = useState(initialErrors);
  const isUpdate = !!selectedEvent;
  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({
      ...errors,
      [name]: validateEventInputs({ name, value }, inputs),
    });
  };

  const doctorId = useSelector(getLoggedInUserId);

  return (
    <div>
      <Dialog
        onClose={closeAction}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth={true}
        maxWidth='sm'>
        <DialogTitle id='customized-dialog-title' onClose={closeAction}>
          Add Event
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                id='combo-box-demo'
                options={EVENT_TYPES}
                getOptionLabel={(option) => option.title}
                fullWidth
                required
                disableClearable
                error={!!errors.eventType}
                helperText={errors.eventType}
                size='small'
                value={inputs.eventType}
                onChange={(event, value) => {
                  handleChange({ target: { name: "eventType", value } });
                }}
                disabled={isUpdate}
                renderInput={(params) => (
                  <TextField {...params} label='Select Event Type*' variant='outlined' />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Event Title'
                name='title'
                value={inputs.title}
                error={!!errors.title}
                helperText={errors.title}
                size='small'
                required
                variant='outlined'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={inputs.description}
                label='Event Description'
                name='description'
                variant='outlined'
                size='small'
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                selected={inputs.dateFrom}
                onChange={(date) => handleChange({ target: { name: "dateFrom", value: date } })}
                showTimeSelect
                showYearDropdown
                showMonthDropdown
                timeFormat='HH:mm'
                timeIntervals={15}
                dropdownMode='select'
                timeCaption='time'
                customInput={<CustomDateTimeInput label={"From*"} />}
                dateFormat='MMMM d, yyyy h:mm aa'
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                selected={inputs.dateTo}
                onChange={(date) => handleChange({ target: { name: "dateTo", value: date } })}
                showTimeSelect
                showYearDropdown
                showMonthDropdown
                timeFormat='HH:mm'
                timeIntervals={15}
                dropdownMode='select'
                timeCaption='time'
                customInput={<CustomDateTimeInput label={"To*"} />}
                dateFormat='MMMM d, yyyy h:mm aa'
              />
            </Grid>
            {renderAgeSelection(inputs) ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Autocomplete
                    id='combo-box-demo'
                    options={AGE_MEASURING_UNITS}
                    getOptionLabel={(option) => option.title}
                    value={inputs.atAgeUnit}
                    fullWidth
                    size='small'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Age Measure By'
                        variant='outlined'
                        error={!!errors.atAgeUnit}
                        helperText={errors.atAgeUnit}
                        required
                      />
                    )}
                    onChange={(event, option) => {
                      handleChange({
                        target: { name: "atAgeUnit", value: option },
                      });
                      if (
                        option?.value === AGE_MEASURING_UNITS[0].value &&
                        inputs.ageRange[1] > 12
                      ) {
                        const { ageRange } = inputs;
                        ageRange[1] = 12;
                        if (ageRange[0] > 12) {
                          ageRange[0] = 12;
                        }
                        handleChange({
                          target: { name: "ageRange", value: ageRange },
                        });
                      }
                    }}
                  />
                </Grid>
                {inputs.atAgeUnit ? (
                  <Grid item xs={12}>
                    <Typography id='range-slider' gutterBottom>
                      {getAgeSliderLabel(inputs.atAgeUnit)}
                    </Typography>
                    <Slider
                      value={inputs.ageRange}
                      name='ageRange'
                      onChange={(event, value) => {
                        handleChange({ target: { name: "ageRange", value } });
                      }}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      getAriaValueText={valuetext}
                      marks={inputs.atAgeUnit?.value === "MONTHS" ? marksMonth : marksYear}
                      max={getMaxSliderValue(inputs.atAgeUnit)}
                      disabled={!inputs.atAgeUnit}
                    />
                  </Grid>
                ) : null}
              </React.Fragment>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color='primary'
            variant='contained'
            disabled={
              !isUpdate
                ? !validateAddEventPayload({
                    ageUnit: inputs?.atAgeUnit?.value,
                    doctorId,
                    eventDesc: inputs.description,
                    eventName: inputs.title,
                    fromDate: moment(inputs.dateFrom).format("YYYY-MM-DD"),
                    fromTime: moment(inputs.dateFrom).format("hh:mm A"),
                    isHoliday: inputs.eventType.value === "holiday" ? true : false,
                    minAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[0],
                    maxAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[1],
                    toDate: moment(inputs.dateTo).format("YYYY-MM-DD"),
                    toTime: moment(inputs.toTime).format("hh:mm A"),
                  })
                : false
            }
            onClick={() => {
              if (isUpdate) {
                if (selectedEvent.isHoliday !== true) {
                  dispatch(
                    updateUserEvent({
                      ageUnit: inputs?.atAgeUnit?.value,
                      id: inputs.id,
                      doctorId,
                      eventDesc: inputs.description,
                      eventName: inputs.title,
                      fromDate: moment(inputs.dateFrom).format("YYYY-MM-DD"),
                      fromTime: moment(inputs.dateFrom).format("hh:mm A"),
                      toDate: moment(inputs.dateTo).format("YYYY-MM-DD"),
                      toTime: moment(inputs.dateTo).format("hh:mm A"),
                      isHoliday: selectedEvent.isHoliday,
                      minAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[0],
                      maxAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[1],
                    })
                  );
                }
              } else {
                dispatch(
                  addUserEvent({
                    ageUnit: inputs?.atAgeUnit?.value || "MONTHS",
                    doctorId,
                    eventDesc: inputs.description,
                    eventName: inputs.title,
                    fromDate: moment(inputs.dateFrom).format("YYYY-MM-DD"),
                    fromTime: moment(inputs.dateFrom).format("hh:mm A"),
                    toDate: moment(inputs.dateTo).format("YYYY-MM-DD"),
                    toTime: moment(inputs.dateTo).format("hh:mm A"),
                    isHoliday: inputs.eventType.value === "holiday" ? true : false,
                    minAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[0],
                    maxAgeRange: inputs?.ageRange.length > 0 && inputs?.ageRange[1],
                  })
                );
              }
            }}>
            {isUpdate ? "Update" : "Add"}
          </Button>
          <Button autoFocus onClick={closeAction} color='primary' variant='outlined'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
