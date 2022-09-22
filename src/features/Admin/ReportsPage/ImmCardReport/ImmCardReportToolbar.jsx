import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { countryToFlag, extractDateStr, getEndOfDay } from '../../../../utils/commonUtils';
import { selectCountries } from '../selector';
import { fetchBatches, setReportType } from '../reportsSlice';

const REPORT_TYPES = [
  { name: 'Vaccination Center', value: 'VAC' },
  { name: 'Vendor', value: 'VENDOR' },
];

const Immcardreporttoolbar = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const [inputs, setInputs] = useState({
    country: '',
    reportType: REPORT_TYPES[0],
    from: new Date(),
    to: new Date()    
  });

  const handleChange = ({target: { name, value }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
        <Autocomplete
            id="country-select-demo"
            size="small"
            style={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.countryName}
            onChange={(e, value) =>
              handleChange({
                target: { name: 'country', value },
              })
            }
            renderOption={(option) => (
              <React.Fragment>
                <span>{countryToFlag(option.countryCode)}</span>
                {option.countryName} ({option.countryCode})
              </React.Fragment>
            )}
            // defaultValue={values.country}
            value={inputs.country}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                variant="outlined"
                // error={!!errors.country}
                // helperText={errors.country}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        {/* <Grid item>
          <Autocomplete
            id="city"
            options={cities}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Select City" variant="outlined" />
            )}
          />
        </Grid> */}
        {/* <Grid item>
          <Autocomplete
            id="vac_center"
            options={center_type}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vaccination Center"
                variant="outlined"
              />
            )}
          />
        </Grid> */}
        <Grid item>
          <Autocomplete
            id="report_type"
            disableClearable
            options={REPORT_TYPES}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            size="small"
            value={inputs.reportType}
            onChange={(e, type) => {
              handleChange({
                target: {
                  name: 'reportType',
                  value: type
                }
              });
              dispatch(setReportType(type.value))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Report Type"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Fragment>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="From"
                  format="MM/dd/yyyy"
                  size="small"
                  fullWidth
                  value={inputs.from}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => handleChange({ target: { name: 'from', value: date }})}
                />
              </Fragment>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Fragment>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="To"
                  format="MM/dd/yyyy"
                  size="small"
                  fullWidth
                  value={inputs.to}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => handleChange({ target: { name: 'to', value: date }})}
                />
              </Fragment>
            </MuiPickersUtilsProvider>
          </Grid>

        <Grid item>
          <Box component="span" mr={1}>
            <Button variant="contained" color="primary" size="medium" mr={2}
              onClick={() => {
                const payload = {
                  from: extractDateStr(inputs.from),
                  to: getEndOfDay(inputs.to),
                  type: inputs.reportType.value,
                  country: inputs.country ? inputs.country.id : null
                };                
                dispatch(fetchBatches(payload)); 
              }}
            >
              Apply
            </Button>
          </Box>
          {/* if one or more input fields have active values this btn needs to be enabled & function as a clear all value btn */}
          <Box component="span" ml={1}>
            <Button
              variant="text"
              color="inherit"
              size="medium"
              disabled={true}
            >
              Remove All Filters
            </Button>
          </Box>
        </Grid>
      </Grid>

    </form>
  );
};

export default Immcardreporttoolbar;
