import React, { useState, useEffect } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import { useSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";

import {
  Box,
  Grid,
  Paper,
  Container,
  makeStyles,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MainToolbar from "./MainToolbar";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";


import { getCountries } from '../Country/countrySlice';
import { requestVaccines } from './requestVaccinesSlice';
import { initVaccination } from '../ChildVaccinationPage/vaccinationSlice';
import { initGrowth } from '../ChildVaccinationPage/growthSlice';
import {
  selectCountryLoadingStatus,
  selectCountries,
  selectRequestStatus
} from './selector';
import { notify, countryToFlag, extractDateStr } from '../../utils/commonUtils';
import {
  validateFormInput,
  generateFormErrors,
  formErrorsExists
} from '../../utils/requestVaccineUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SUBMISSION_SUCCESS_MSG = "Vaccine Request Submitted Successfully!";
const SUBMISSION_FAILED_MSG = "Order Submission Failed, Please try again in 30 seconds!";

const RequestVaccinesPage = (props) => {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [inputs, setInputs] = useState({
    country: '',
    name: '',
    protectAgainst: '',
    gender: '',
    adverseEffect: '',
    dateIntroduced: new Date(),
    notes: ''
  });

  const [errors, setErrors] = useState({
    name: null,
    protectAgainst: null,
    adverseEffect: null,
  });   

  const handleChange = ({ target: { name, value, required }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: validateFormInput({ name, value })
    });    
  };

  const countries = useSelector(selectCountries);
  const countryLoadingState = useSelector(selectCountryLoadingStatus);
  const requestStatus = useSelector(selectRequestStatus);
  const dispatch = useDispatch();

  const [retryCount, setCount] = useState(0);

  useEffect(()=>{
    if (countryLoadingState === 'idle' || countryLoadingState === 'failed') {
      if (retryCount < 3) {
        dispatch(getCountries());
        setCount(retryCount + 1);
      }       
    }  
    console.log(countryLoadingState);  
  }, [dispatch, countryLoadingState, retryCount, setCount]); 

  useEffect(() => {
    if (requestStatus === 'succeeded') {
      notify(enqueueSnackbar, SUBMISSION_SUCCESS_MSG);
    } else if (requestStatus === 'failed') {
      notify(enqueueSnackbar, SUBMISSION_FAILED_MSG, 'error');
    }
    console.log('dispatched');
  }, [enqueueSnackbar, requestStatus]);

  useEffect(() => {
    dispatch(initVaccination());
    dispatch(initGrowth());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <form noValidate autoComplete="off">
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <Box>
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
                        handleChange({ target: { name: 'country', value }})
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
                          label="Choose a country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    </Box>
                  </Grid>
                  <Grid container item row xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Box mt={3}>
                        <TextField
                          variant="outlined"
                          label="Vaccine Name"
                          name="name"
                          value={inputs.name}
                          id="vac_name"
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          required
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box mt={3}>
                        <TextField
                          required
                          variant="outlined"
                          label="Protect Against"
                          name="protectAgainst"
                          value={inputs.protectAgainst}
                          onChange={handleChange}
                          id="protect_against"
                          error={!!errors.protectAgainst}
                          helperText={errors.protectAgainst}
                          fullWidth
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={3}>
                      <FormLabel component="legend">
                        Applicant Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="FEMALE"
                          control={<Radio color="primary" />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="MALE"
                          control={<Radio color="primary" />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="BOTH"
                          control={<Radio color="primary" />}
                          label="Male &#38; Female"
                        />
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid container xs={12} spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        variant="outlined"
                        label="Adverse Effect"
                        name="adverseEffect"
                        value={inputs.adverseEffect}
                        id="adverse_effects"
                        onChange={handleChange}
                        error={!!errors.adverseEffect}
                        helperText={errors.adverseEffect}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                     
                          id="date-picker-inline"
                          label="Introduced in (Date)"
                          value={inputs.dateIntroduced}
                          onChange={(date) => {
                            handleChange({ target: { name: 'dateIntroduced', value: date }});
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>                    
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={3}>
                      <TextField
                        variant="outlined"
                        multiline
                        rows={4}
                        label="Notes"
                        name="notes"
                        value={inputs.notes}
                        id="notes"
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      if (requestStatus !== 'loading') {
                        if (!formErrorsExists(inputs)) {
                          dispatch(requestVaccines({
                            ...inputs, dateIntroduced: extractDateStr(inputs.dateIntroduced)
                          }));
                        } else {
                          setErrors(generateFormErrors(inputs));
                        }
                      }
                    }}
                  >
                    Add to Additional Vaccine Request
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default RequestVaccinesPage;
