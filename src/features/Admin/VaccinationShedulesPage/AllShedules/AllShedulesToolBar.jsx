import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { notify, countryToFlag, extractDateStr } from '../../../../utils/commonUtils';
import { SCHEDULE_STATUS_OPTIONS } from '../../../../constants/vacScheduleConstants';
import { fetchSchedules } from '../vacSchedulesSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const REQUIRED_ERROR = 'Required';

const AllSchedulesToolbar = ({ countries }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    country: '',
    name: '',
    state: '',
    status: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value, required }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
    if (required) {
      if (!value) {
        setErrors({
          ...errors,
          [name]: REQUIRED_ERROR
        })
      } else {
        setErrors({
          ...errors,
          [name]: null
        })
      }
    }
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
            style={{ width: 300 }}
            options={countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.countryName}
            onChange={(e, value) => { 
              handleChange({ target: { name: 'country', value, required: true }})
            }}
            renderOption={(option) => (
              <React.Fragment>
                <span>{countryToFlag(option.countryCode)}</span>
                {option.countryName} ({option.countryCode})
              </React.Fragment>
            )}
            value={inputs.country}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                size="small"
                error={!!errors.country}
                helperText={errors.country}
                required
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="state"
            name="state"
            value={inputs.state}
            size="small"
            style={{ width: 300 }}
            fullWidth
            label="City/State"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item>
          <Autocomplete
            id="status"
            options={SCHEDULE_STATUS_OPTIONS}
            // getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" />
            )}
            onChange={(e, value) => { 
              handleChange({ target: { name: 'status', value }})
            }}
          />
        </Grid> */}
        <Grid item>
          <TextField
            id="shedule"
            name="name"
            value={inputs.name}
            size="small"
            style={{ width: 300 }}
            fullWidth
            label="Schedule Name"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Box component="span" mr={1}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              mr={2}
              onClick={() => {
                const { country } = inputs;
                if (!country) {
                  setErrors({
                    ...errors,
                    country: REQUIRED_ERROR
                  })
                } else {
                  const payload = {
                    ...inputs
                  }
                  payload.country = country.id;
                  dispatch(fetchSchedules(payload));
                }
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

export default AllSchedulesToolbar; 
