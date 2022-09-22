import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Button
} from "@material-ui/core";
import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';
import {
  GENDER_BOTH, GENDER_MALE, GENDER_FEMALE,
  STATUS_ACTIVE, STATUS_INACTIVE
} from '../../../../constants/vaccineConstants';
import {
  validateFormInput,
  generateAddVaccinePayload,
  validateAddVaccinePayload,
  generateAddVaccineFormErrors
} from '../../../../utils/vaccineUtils';

import { addNewVaccine, updateVaccine } from '../vaccineSlice';

const KEYS = [
  'id',
  'name',
  'protectAgainst',
  'adverseEffect',
  'notes',
  'gender'
];

const generateInitialInputs = (props) => {
  const inputs = {
    id: null,
    name: '',
    protectAgainst: '',
    adverseEffect: '',
    notes: '',
    gender: GENDER_BOTH,
    status: STATUS_ACTIVE
  }
  if (props.data) {
    KEYS.forEach((key) => {
      inputs[key] = props.data[key] || '';
    });
  }

  return inputs;
};

const generateInitialStatus = (props) => {
  if (props.data) {
    return props.data.status === STATUS_ACTIVE;
  }
  return true;
};

const Index = (props) => {
  const [status, setStatus] = useState(generateInitialStatus(props));

  const [inputs, setInputs] = useState(generateInitialInputs(props));

  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value }}) => {
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
            <Grid container spacing={3}>
              <Grid item row xs={12}>
                <Grid item xs={6}>
                  <TextField
                    id="vac_name"
                    name="name"
                    label="Vaccine Name"
                    variant="outlined"
                    disabled={!!props.data}
                    onChange={handleChange}
                    value={inputs.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="vac_protect_against"
                  name="protectAgainst"
                  label="Protect Against"
                  variant="outlined"
                  onChange={handleChange}
                  value={inputs.protectAgainst}
                  error={!!errors.protectAgainst}
                  helperText={errors.protectAgainst}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="vac_adverse_effects"
                  name="adverseEffect"
                  label="Adverse Effects"
                  onChange={handleChange}
                  value={inputs.adverseEffect}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel required component="legend">
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
                    value={GENDER_BOTH}
                    control={<Radio color="primary" />}
                    label="Both"
                  />
                  <FormControlLabel
                    value={GENDER_MALE}
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value={GENDER_FEMALE}
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={3}
                  label="Notes"
                  name="notes"
                  variant="outlined"
                  onChange={handleChange}
                  value={inputs.notes}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Vaccine Status</FormLabel>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Disable</Grid>
                    <Grid item>
                      <Switch
                        checked={status}
                        onChange={({ target: { checked }}) => setStatus(checked)}
                        color="primary"
                      />
                    </Grid>
                    <Grid item>Enable</Grid>
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
            const payload = generateAddVaccinePayload(inputs, status);
            if (validateAddVaccinePayload(payload)) {
              console.log('validation success');
              console.log(JSON.stringify(payload, null, 2));
              if (props.data) {
                dispatch(updateVaccine(payload));
              } else {
                dispatch(addNewVaccine(payload));
              }              
            } else {
              const e = generateAddVaccineFormErrors(inputs);
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

export default Index;
