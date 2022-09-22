import React from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
  makeStyles,
  Box,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  selectCountries,
  selectChildFromInputs,
  selectChildFromErrors,
  selectChildFetchingStatus,
  selectChildDetailDialogType,
} from "../selector";

import {
  countryToFlag,
  formatDate,
  processLocationInput,
} from "../../../utils/commonUtils";
import { validateChildFormInputs } from "../../../utils/registrationUtils";
import {
  updateChildFromInputs,
  updateChildFromErrors,
} from "../registrationSlice";
import {
  CHILDREN_DIALOG_TYPE_EDIT,
  RELATIONSHIPS,
  GENDERS,
} from "../../../constants/registrationConstants";

import SearchLocationInput from "../../../common/components/SearchLocationInput";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Childdetaildialog = ({ className, ...rest }) => {
  const classes = useStyles();

  const childFetchingStatus = useSelector(selectChildFetchingStatus);
  const childDialogType = useSelector(selectChildDetailDialogType);

  const values = useSelector(selectChildFromInputs);
  const errors = useSelector(selectChildFromErrors);

  const dispatch = useDispatch();
  const setValues = (payload) => dispatch(updateChildFromInputs(payload));
  const setErrors = (payload) => dispatch(updateChildFromErrors(payload));

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateChildFormInputs({ name, value }),
    });
  };

  const countries = useSelector(selectCountries);
  const isDisabledField = childDialogType === CHILDREN_DIALOG_TYPE_EDIT;

  if (
    childFetchingStatus === "loading" &&
    childDialogType === CHILDREN_DIALOG_TYPE_EDIT
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box p={3}>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Autocomplete
              id="relationship"
              options={RELATIONSHIPS}
              value={values.relationship}
              getOptionLabel={(option) => option.title}
              fullWidth
              onChange={(event, value) =>
                handleChange({ target: { name: "relationship", value } })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Relationship"
                  variant="outlined"
                  required
                  helperText={errors.relationship}
                  error={!!errors.relationship}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Autocomplete
              id="gender"
              options={GENDERS}
              value={values.gender}
              getOptionLabel={(option) => option.title}
              fullWidth
              onChange={(event, value) =>
                handleChange({ target: { name: "gender", value } })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Gender"
                  variant="outlined"
                  required
                  helperText={errors.gender}
                  error={!!errors.gender}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              onChange={handleChange}
              value={values.middleName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Hospital"
              name="hospital"
              onChange={handleChange}
              value={values.hospital}
              variant="outlined"
              required
              helperText={errors.hospital}
              error={!!errors.hospital}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                fullWidth
                id="Date of Birth"
                label="Date of Birth"
                disabled={isDisabledField}
                format="MM/dd/yyyy"
                value={values.dateOfBirth}
                onChange={(date) =>
                  handleChange({
                    target: { name: "dateOfBirth", value: formatDate(date) },
                  })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={6} xs={12}>
            <Autocomplete
              id="country-select-demo"
              fullWidth
              options={countries}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              disabled={isDisabledField}
              getOptionLabel={(option) => option.countryName}
              onChange={(event, value) =>
                handleChange({ target: { name: "country", value } })
              }
              renderOption={(option) => (
                <React.Fragment>
                  <span>{countryToFlag(option.countryCode)}</span>
                  {option.countryName} ({option.countryCode})
                </React.Fragment>
              )}
              value={values.country}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  disabled={isDisabledField}
                  error={!!errors.country}
                  helperText={errors.country}
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchLocationInput
              country={values.country ? values.country.countryCode : ""}
              value={values.city}
              onChange={(value) => {
                const processedLocation = processLocationInput(value);
                setValues({
                  ...values,
                  ...processedLocation,
                });
              }}
              error={!!errors.city}
              disabled={
                isDisabledField ||
                !values.country ||
                !values.country.countryCode
              }
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

Childdetaildialog.propTypes = {
  className: PropTypes.string,
};

export default Childdetaildialog;
