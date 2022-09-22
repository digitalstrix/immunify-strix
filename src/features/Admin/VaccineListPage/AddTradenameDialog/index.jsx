import React from "react";
import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';


const Index = (props) => {
  const dosecount = ["1", "2", "3", "4", "5"]; 

  const [dose, setDose] = React.useState(dosecount[0]);
  const [inputDose, setInputDose] = React.useState("");

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item row xs={12}>
                <Grid item xs={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={vaccines}
                    getOptionLabel={(option) => option}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Vaccine"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <AutoCompTextField id="tradename" label="Add Tradename" />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={dose}
                  onChange={(event, newDose) => {
                    setDose(newDose);
                  }}
                  inputValue={inputDose}
                  onInputChange={(event, newInputDose) => {
                    setInputDose(newInputDose);
                  }}
                  id="controllable-states-demo"
                  options={dosecount}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dose Count"
                      variant="outlined"
                      size="medium"
                    />
                  )}
                />
              </Grid>
              <Grid container row item xs={12} md={6} spacing={1}>
                <Grid item xs={12}>
                  <Typography>Dose 1</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="days"
                    label="Days"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="weeks"
                    label="Weeks"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="months"
                    label="Months"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="years"
                    label="Years"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container row item xs={12} md={6} spacing={1}>
                <Grid item xs={12}>
                  <Typography>Dose 1 - Catchup period</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="dayscatch"
                    label="Days"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="weekscatch"
                    label="Weeks"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="monthscatch"
                    label="Months"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="yearscatch"
                    label="Years"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
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
            // const payload = generateRegVacSchedulePayload(inputs, active);
            // console.log(payload);
            // if (validateScheduleRegPayload(payload)) {
            //   console.log('validation success');
            //   console.log(JSON.stringify(payload, null, 2));
            //   if (props.data) {
            //     dispatch(updateVacSchedule(payload));
            //   } else {
            //     dispatch(registerVacSchedule(payload));
            //   }              
            // } else {
            //   const e = generateVacScheduleFormErrors(inputs);
            //   console.log(e)
            //   setErrors(e);
            // }
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

const AutoCompTextField = (props) => {
  const [value, setValue] = React.useState(null);
  const filter = createFilterOptions();
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={props.id}
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

const top100Films = [
  { title: "DCM", year: 1994 },
  { title: "BCG", year: 1972 },
  { title: "Polio", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
];

const vaccines = ["AAA", "BBB", "CCC"];

export default Index;
