import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { countryToFlag } from "../../../../../utils/commonUtils";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

import { getConsultationTimesAsync } from "../consultationTimesSlice";
import { getCountries } from "../../../../Country/countrySlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCountryLoadingStatus, selectCountries } from "../selectors";

const Filtertoolbar = () => {
  const dispatch = useDispatch();

  const countries = useSelector(selectCountries);
  const countryLoadingState = useSelector(selectCountryLoadingStatus);

  const [retryCount, setCount] = useState(0);
  useEffect(() => {
    if (countryLoadingState === "idle" || countryLoadingState === "failed") {
      if (retryCount < 3) {
        dispatch(getCountries());
        setCount(retryCount + 1);
      }
    }
    console.log(countryLoadingState);
  }, [dispatch, countryLoadingState, retryCount, setCount]);

  useEffect(() => {
    dispatch(getConsultationTimesAsync());
  }, [dispatch]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorName, setDoctorName] = useState(null);
  const [country, setCountry] = useState(null);

  const search = () => {
    dispatch(
      getConsultationTimesAsync({
        fromDate: selectedDate,
        doctorName,
        country,
      })
    );
  };

  const clearButton = () => {
    dispatch(getConsultationTimesAsync());
    setCountry(null);
    setDoctorName(null);
    setSelectedDate(null);
  };

  return (
    <div>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              id="doc_name"
              size="small"
              style={{ width: 300 }}
              fullWidth
              label="Type Doctor Name"
              variant="outlined"
              type="string"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              autoComplete={false}
              id="country-select-demo"
              size="small"
              style={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.countryName}
              onChange={(e, value) => setCountry(value.id)}
              closeIcon={() => <div></div>}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{countryToFlag(option.countryCode)}</span>
                  {option.countryName} ({option.countryCode})
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="From"
                size="small"
                fullWidth
                format="MM/dd/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) =>
                  setSelectedDate(moment(date).format("YYYY-MM-DD"))
                }
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <Box component="span" mr={1}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                mr={2}
                onClick={() => search()}
              >
                Search
              </Button>
            </Box>
            <Box component="span" ml={1}>
              <Button
                variant="text"
                color="inherit"
                size="medium"
                disabled={false}
                onClick={() => clearButton()}
              >
                Remove All Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Filtertoolbar;
