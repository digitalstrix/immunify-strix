import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';

import { selectVaccines } from '../selector';
import { loadVaccines } from '../vacSchedulesSlice';
import { cloneArray } from '../../../../utils/commonUtils';
import {
  initDoses,
  generateScheduleDetailPayload,
  validateScheduleDetailPayload
} from '../../../../utils/vacSchedulesUtils';
import { addVacScheduleDetails } from '../vacSchedulesSlice';



const PERIOD_TYPES = [ 
  { label: 'Days', name: 'Day'},
  { label: 'Weeks', name: 'Week'},
  { label: 'Months', name: 'Month'},
  { label: 'Years', name: 'Year'}
];

const DOSES = [1, 2, 3, 4, 5];


const renderDoses = (variations, setDoses) => {
  return variations.map((variety, index) => (
    <React.Fragment>
      <Grid container row item xs={12} md={6} spacing={1}>
        <Grid item xs={12}>
        <Typography>Dose {index + 1}</Typography>
        </Grid>
      
      {PERIOD_TYPES.map(({ label, name }) => (
        <Grid item xs={3}>
        <TextField
          key={label}
          id={label}
          label={label}
          name={`start${name}`}
          value={variety[`start${name}`]}
          variant="outlined"
          onChange={({ target: { name, value }}) => {
            const cloned = cloneArray(variations);
            cloned[index][name] = value;
            setDoses(cloned);
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      ))}
      </Grid>
    <Grid container row item xs={12} md={6} spacing={1}>
      <Grid item xs={12}>
        <Typography>Dose {index + 1} - Catchup period</Typography>
      </Grid>      
      {PERIOD_TYPES.map(({ label, name }) => (
        <Grid item xs={3}>
        <TextField
          key={`${label}_catchup`}
          id={`${label}_catchup`}
          label={label}
          name={`catchup${name}`}
          value={variety[`catchup${name}`]}
          variant="outlined"
          onChange={({ target: { name, value }}) => {
            const cloned = cloneArray(variations);
            cloned[index][name] = value;
            setDoses(cloned);
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      ))}
    </Grid>
    </React.Fragment>
  ));
};


const Addvaccinedialog = (props) => {


  const vaccines = useSelector(selectVaccines);
  const dispatch = useDispatch();

  const [doseCount, setDoseCount] = useState(1);
  const [doses, setDoses] = useState(initDoses(1));
  const [vaccine, setVaccine] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (vaccines.length === 0) {
      dispatch(loadVaccines());
    }
  }, [dispatch, vaccines]);

  return (
    <React.Fragment>
      <DialogContent dividers>
      <form noValidate autoComplete="off">
        <Box p={3}>
          <Grid container row spacing={3}>
            <Grid item row xs={12}>
              <Grid item xs={6}>
                <Autocomplete
                  id="vaccines"
                  options={vaccines}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  value={vaccine}
                  onChange={(e, value) => setVaccine(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vaccine"
                      variant="outlined"
                      error={!vaccine && !!error}
                      helperText={error}
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="tradename"
                options={[]}
                getOptionLabel={(option) => option}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Tradename"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="dose"
                options={DOSES}
                value={doseCount}
                getOptionLabel={(option) => `${option}`}
                onChange={(e, value) => {
                  // const newDoseCount = Number(value);
                  setDoseCount(value);
                  setDoses(initDoses(value));
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Dose Count"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {renderDoses(doses, setDoses)}
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
            const payload = generateScheduleDetailPayload(props.data, vaccine, doses)
            if (validateScheduleDetailPayload(payload)) {
              dispatch(addVacScheduleDetails(payload));
            } else {
              setError('Required');
              // handle errors
            }
          }}
          type='button'
          color="primary"
          variant="contained"
        >
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
      </React.Fragment>
  );
};

// const vaccines = ["AAA", "BBB", "CCC"];
// const tradename = ["AAA", "BBB", "CCC"];
// const dose = ["AAA", "BBB", "CCC"];

export default Addvaccinedialog;
