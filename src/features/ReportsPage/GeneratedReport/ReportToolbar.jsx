import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  REPORT_FORMATS,
  DOSES,
  ALL_DOSES,
  ALL_VACCINES_ID
} from '../../../constants/reportsConstants';

import {
  selectVaccines,
  selectVaccinesLoadingStatus,
  selectReportLoadingStatus
} from '../selector';

import {
  loadVaccines,
  loadReport,
  setColumns,
  setData
} from '../reportsSlice';

import { extractDateStr } from '../../../utils/commonUtils';

const initialInputState = {
  from: new Date(),
  to: new Date(),
  reportFormat: '',
  vaccine: [],
  doseId: [],
};

const Reporttoolbar = () => {
  const [inputs, setInputs] = useState(initialInputState);
  const [errors, setErrors] = useState({
    reportFormat: false,
    doseId: false,
    vaccine: false
  });

  const handleChange = ({ target: { name, value }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
    
    if (value) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const vaccines = useSelector(selectVaccines);
  const vaccinesLoadingStatus = useSelector(selectVaccinesLoadingStatus);
  const reportLaoadingStatus = useSelector(selectReportLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (vaccinesLoadingStatus === 'idle') {
      dispatch(loadVaccines());
    }
  });

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <Autocomplete
            id="combo-box-demo"
            options={REPORT_FORMATS}
            onChange={(e, value) => {              
              handleChange({ target: { name: 'reportFormat', value }})
            }}
            value={inputs.reportFormat}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Report Format"
                variant="outlined"
                error={errors.reportFormat}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="combo-box-demo"
            options={vaccines}
            onChange={(e, value) => {
              const vaccines = value.filter(({ id }) => id !== ALL_VACCINES_ID);
              if (vaccines.length === 0) {
                handleChange({ target: { name: 'vaccine', value }});
              } else {
                handleChange({ target: { name: 'vaccine', value: vaccines }});
              }              
            }}
            value={inputs.vaccine}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Vaccine"
                variant="outlined"
                error={errors.vaccine}
                required
              />
            )}
            multiple
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="combo-box-demo"
            options={DOSES}
            onChange={(e, value) => {
              const doses = value.filter((option) => option !== ALL_DOSES);
              if (doses.length === 0) {
                handleChange({ target: { name: 'doseId', value }});
              } else {
                handleChange({ target: { name: 'doseId', value: doses }});
              }
            }}
            value={inputs.doseId}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Dose"
                variant="outlined"
                error={errors.doseId}
                required
              />
            )}
            multiple
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              fullWidth
              margin="normal"
              id="date-from"
              label="Date From"
              format="MM/dd/yyyy"
              value={inputs.from}
              onChange={(date) => handleChange({ target: { name: 'from', value: date }})}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              fullWidth
              margin="normal"
              id="date-to"
              label="Date To"
              format="MM/dd/yyyy"
              value={inputs.to}
              onChange={(date) => handleChange({ target: { name: 'to', value: date }})}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Grid container row spacing={2}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" fullWidth size="large"
              onClick={() => {
                if (reportLaoadingStatus !== 'loading') {
                  if (inputs.reportFormat && inputs.doseId.length && inputs.vaccine.length) {
                    dispatch(loadReport({
                      ...inputs,
                      reportFormat: inputs.reportFormat.value,
                      from: extractDateStr(inputs.from),
                      to: extractDateStr(inputs.to)
                    }));
                  } else {
                    setErrors({
                      reportFormat: !inputs.reportFormat,
                      doseId: !inputs.doseId.length,
                      vaccine: !inputs.vaccine.length
                    });
                  }                  
                }
              }}
            >
             Generate Report
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" color="default" fullWidth size="large"
              onClick={() => {
                setInputs(initialInputState);
                dispatch(setData([]));
                dispatch(setColumns([]));
              }}
            >
              Clear All
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Reporttoolbar;
