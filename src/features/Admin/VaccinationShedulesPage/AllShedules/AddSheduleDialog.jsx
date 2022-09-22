import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { countryToFlag } from '../../../../utils/commonUtils';
import { selectCountries } from '../selector';
import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';
import {
  generateRegVacSchedulePayload,
  validateScheduleRegPayload,
  generateVacScheduleFormErrors,
  validateFormInput
} from '../../../../utils/vacSchedulesUtils';
import { registerVacSchedule, updateVacSchedule } from '../vacSchedulesSlice';
import { SCHEDULE_STATUS_OPTIONS } from '../../../../constants/vacScheduleConstants';

const useStyles = makeStyles(() => ({
  option: {
    fontSize: 15,
    "& > span": {
      fontSize: 18,
    },
  },
}));

const INITIAL_INPUTS = {
  name: '',
  country: '',
  state: '',
  description: '',
  status: ''
};

const TEXT_INPUTS_META = [
  { key: 'name', defaultValue: '' },
  { key: 'description', defaultValue: '' },
  { key: 'state', defaultValue: '' }
];

const initialInputs = ({ data }, countries=[]) => {
  if (data) {
    const inputs = TEXT_INPUTS_META.map(({ key, defaultValue }) => ({ [key]: data[key] || defaultValue }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
    inputs.country = countries.find(({ id }) => id === data.countryId);
    inputs.id = data.id;
    return inputs; 
  }
  return INITIAL_INPUTS;
}

const initialScheduleStatus = ({ data }) => {
  if (data && data.status !== SCHEDULE_STATUS_OPTIONS[0]) {
    return false;
  }
  return true;
}

const AddScheduleDialog = (props) => {
  const classes = useStyles();
  const [active, setActive] = useState(initialScheduleStatus(props));

  const handleSwitch = ({ target: { checked }}) => {
    setActive(checked);
  };

  const countries = useSelector(selectCountries);
  const [inputs, setInputs] = useState(initialInputs(props, countries));

  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value, required }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: validateFormInput({ name, value })
    })
  };

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={4}>
                <TextField
                  id="shedule_name"
                  label="Shedule Name"
                  variant="outlined"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="country-select-demo"
                  options={countries}
                  classes={{
                    option: classes.option,
                  }}
                  value={inputs.country}
                  autoHighlight
                  fullWidth
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      required
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="state"
                  name="state"
                  label="State/City"
                  variant="outlined"
                  value={inputs.state}
                  error={!!errors.state}
                  helperText={errors.state}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={3}
                  label="Notes"
                  variant="outlined"
                  name="description"
                  value={inputs.description}
                  error={!!errors.description}
                  helperText={errors.description}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Schedule Status</FormLabel>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Inactive</Grid>
                    <Grid item>
                      <Switch
                        checked={active}
                        onChange={handleSwitch}
                        color="primary"
                        name="scheduleStatus"
                      />
                    </Grid>
                    <Grid item>Active</Grid>
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.handleClose()}
          disabled={false}
          color="primary"
          variant="outlined"
        >
          Close 
        </Button>
        <Button
          autoFocus
          onClick={() => {
            const payload = generateRegVacSchedulePayload(inputs, active);
            if (validateScheduleRegPayload(payload)) {
              console.log('validation success');
              console.log(JSON.stringify(payload, null, 2));
              if (props.data) {
                dispatch(updateVacSchedule(payload));
              } else {
                dispatch(registerVacSchedule(payload));
              }              
            } else {
              const e = generateVacScheduleFormErrors(inputs);
              console.log(e)
              setErrors(e);
            }
          }}
          type='button'
          color="primary"
          variant="contained"
          disabled={props.disableAction}
        >
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default AddScheduleDialog;
