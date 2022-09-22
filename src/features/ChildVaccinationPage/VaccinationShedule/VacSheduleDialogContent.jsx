import "date-fns";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Typography,
  TextField,
  Link,
  Grid,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  selectVaccineTradeNames,
  selectVaccines,
  selectChildren,
  selectAddNewVaccineFormInputs,
} from "../selector";
import {
  getVaccineTradeNames,
  getVaccines,
  setVaccineTradeNames,
  updateAddNewVaccineInputs,
  getVaccinesByTradeName,
} from "../vaccinationSlice";

import { initVariations } from "../../../utils/vaccinationUtils";
import { cloneArray } from "../../../utils/commonUtils";

const PERIOD_TYPES = [
  { label: "Days", name: "Day" },
  { label: "Weeks", name: "Week" },
  { label: "Months", name: "Month" },
  { label: "Years", name: "Year" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const filter = createFilterOptions();

const dosecount = ["1", "2", "3", "4", "5"];

const renderVariations = (variations, inputs, dispatch) => {
  return variations.map((variety, index) => (
    <React.Fragment>
      <Grid container row item xs={12} md={6} spacing={2}>
        <Grid item xs={12}>
          <Typography>Dose {index + 2}</Typography>
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
              onChange={({ target: { name, value } }) => {
                const variations = cloneArray(inputs.variations);
                variations[index][name] = value;
                dispatch(
                  updateAddNewVaccineInputs({
                    ...inputs,
                    variations,
                  })
                );
              }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container row item xs={12} md={6} spacing={2}>
        <Grid item xs={12}>
          <Typography>Dose {index + 2} - Catchup period</Typography>
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
              onChange={({ target: { name, value } }) => {
                const variations = cloneArray(inputs.variations);
                variations[index][name] = value;
                dispatch(
                  updateAddNewVaccineInputs({
                    ...inputs,
                    variations,
                  })
                );
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
const Vacsheduledialogcontent = () => {
  const [value, setValue] = React.useState("female");
  const [dose, setDose] = React.useState(dosecount[0]);
  const [inputDose, setInputDose] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [catchupselectedDate, setCatchupSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleCatchupDateChange = (date) => {
    setCatchupSelectedDate(date);
  };

  const handleDateChange = (date) => {
    console.log(date);
    console.log(new Date(date).getTime());
    setSelectedDate(date);
  };

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   console.log(event.target.name);

  //   setValue(event.target.value);
  // };
  const classes = useStyles();

  const vaccineTradeNames = useSelector(selectVaccineTradeNames);
  const vaccines = useSelector(selectVaccines);
  const inputs = useSelector(selectAddNewVaccineFormInputs);
  const [child] = useSelector(selectChildren);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vaccineTradeNames === null) {
      dispatch(getVaccineTradeNames());
    }
  }, [vaccineTradeNames, dispatch]);
  return (
    <div className={classes.root}>
      <Box p={2}>
        <Paper variant="outlined">
          <Box align="center">
            <Typography variant="overline">
              You can add new vaccines to this specific user's shedule using
              this <br />
              form. Please click <Link href="#">here</Link> if you need any
              help.
            </Typography>
          </Box>
        </Paper>
        <Box m={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AutoCompTextField
                id="tradename"
                label="Add Tradename"
                labelKey={"tradeName"}
                onChange={(option) => {
                  if (option && typeof option === "object") {
                    dispatch(
                      getVaccinesByTradeName({
                        gender: child.gender,
                        tradeName: option.tradeName,
                      })
                    );
                  }
                }}
                onChangeSecondary={() => {
                  dispatch(getVaccines());
                }}
                updateState={(option) =>
                  dispatch(
                    updateAddNewVaccineInputs({
                      ...inputs,
                      tradeNameInfo: option,
                    })
                  )
                }
                options={vaccineTradeNames}
              />
            </Grid>
            <Grid item xs={12}>
              <AutoCompTextField
                id="vaccine"
                label="Add Vaccine"
                options={vaccines}
                updateState={(option) =>
                  dispatch(
                    updateAddNewVaccineInputs({
                      ...inputs,
                      vaccineInfo: option,
                    })
                  )
                }
                labelKey={"name"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="protect"
                label={"Protect Against"}
                onChange={({ target: { value } }) => {
                  dispatch(
                    updateAddNewVaccineInputs({
                      ...inputs,
                      vaccineInfo: {
                        ...inputs.vaccineInfo,
                        protectAgainst: value,
                      },
                    })
                  );
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Applicant Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={inputs.vaccineInfo.gender}
                onChange={({ target: { value } }) => {
                  dispatch(
                    updateAddNewVaccineInputs({
                      ...inputs,
                      vaccineInfo: { ...inputs.vaccineInfo, gender: value },
                    })
                  );
                }}
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
                  label="Both"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                onChange={({ target: { value } }) => {
                  dispatch(
                    updateAddNewVaccineInputs({
                      ...inputs,
                      vaccineInfo: { ...inputs.vaccineInfo, notes: value },
                    })
                  );
                }}
                value={inputs.vaccineInfo.notes}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={dose}
                onChange={(event, newDose) => {
                  if (newDose && newDose > 1) {
                    dispatch(
                      updateAddNewVaccineInputs({
                        ...inputs,
                        variations: initVariations(newDose - 1),
                      })
                    );
                  } else {
                    dispatch(
                      updateAddNewVaccineInputs({
                        ...inputs,
                        variations: [],
                      })
                    );
                  }
                  // dispatch()
                  setDose(newDose);
                }}
                inputValue={inputDose}
                onInputChange={(event, newInputDose) => {
                  if (newInputDose && newInputDose > 1) {
                    dispatch(
                      updateAddNewVaccineInputs({
                        ...inputs,
                        variations: initVariations(newInputDose - 1),
                      })
                    );
                  } else {
                    dispatch(
                      updateAddNewVaccineInputs({
                        ...inputs,
                        variations: [],
                      })
                    );
                  }
                  setInputDose(newInputDose);
                }}
                id="controllable-states-demo"
                options={dosecount}
                style={{ width: 300 }}
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

            <Grid
              container
              item
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={2}
              xs={12}
            >
              <Grid container row item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <Typography>Dose 1</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={inputs.vaccineStarts}
                      onChange={(date) => {
                        dispatch(
                          updateAddNewVaccineInputs({
                            ...inputs,
                            vaccineStarts: date.toDateString(),
                          })
                        );
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid container row item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <Typography>Dose 1 Catchup Period</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={catchupselectedDate}
                      onChange={handleCatchupDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              {renderVariations(inputs.variations, inputs, dispatch)}
              {/* <Grid container row item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <Typography>Dose 2</Typography>
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
              </Grid> */}

              {/* <Grid container row item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <Typography>Dose 2 - Catchup period</Typography>
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
              </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
//labelKey = tradeName
const AutoCompTextField = ({
  id,
  label,
  labelKey,
  options,
  updateState = () => {},
  onChange = () => {},
  onChangeSecondary = () => {},
}) => {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            [labelKey]: newValue,
          });
          updateState({
            [labelKey]: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          console.log("lower");
          setValue({
            [labelKey]: newValue.inputValue,
          });
          updateState({
            [labelKey]: newValue.inputValue,
          });
          onChangeSecondary();
        } else {
          setValue(newValue);
          updateState(newValue);
          onChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            [labelKey]: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={id}
      options={options || []}
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
        return option[labelKey];
      }}
      renderOption={(option) => option[labelKey]}
      style={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );
};

export default Vacsheduledialogcontent;
