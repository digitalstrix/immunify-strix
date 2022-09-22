import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  makeStyles,
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
  getLoggedInUserId,
  selectAddChildStatus,
  selectAddChildError,
} from "../selector";

import {
  countryToFlag,
  formatDate,
  processLocationInput,
} from "../../../../utils/commonUtils";
import { validateChildFormInputs } from "../../../../utils/registrationUtils";
import {
  updateChildFromInputs,
  updateChildFromErrors,
} from "../../../RegistrationPage/registrationSlice";
import {
  RELATIONSHIPS,
  GENDERS,
} from "../../../../constants/registrationConstants";
import SearchLocationInput from "../../../../common/components/SearchLocationInput";
import { getCountries } from "../../../Country/countrySlice";
import { addChildByParent } from "../myChildrenSlice";
import { selectParentCountryId } from "./selector";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Childdetaildialog = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const values = useSelector(selectChildFromInputs);
  const errors = useSelector(selectChildFromErrors);
  const parentId = useSelector(getLoggedInUserId);
  const status = useSelector(selectAddChildStatus);
  const parentCountryId = useSelector(selectParentCountryId);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

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
  const defaultSelectedCountry = countries.find(
    (i) => i.id === parentCountryId
  );

  useEffect(() => {
    handleChange({
      target: { name: "country", value: defaultSelectedCountry },
    });
  }, [defaultSelectedCountry]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Autocomplete
                id="relationship"
                options={RELATIONSHIPS}
                value={values.relationship}
                getOptionLabel={(option) => option.title}
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
                  required
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
                options={countries}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
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
                placeholderValue="City*"
                onChange={(value) => {
                  const processedLocation = processLocationInput(value);
                  setValues({
                    ...values,
                    ...processedLocation,
                  });
                }}
                error={!!errors.city}
                disabled={!values.country || !values.country.countryCode}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={
                  status === "loading" ||
                  !values.relationship ||
                  !values.gender ||
                  !values.hospital ||
                  !values.dateOfBirth ||
                  !values.city ||
                  values.city === ""
                }
                onClick={() => {
                  dispatch(
                    addChildByParent({
                      bio: {
                        firstName: values.firstName,
                        gender: values.gender?.value,
                        lastName: values.lastName,
                        parentId: parentId,
                        status: "ACTIVE",
                      },
                      birthInformation: {
                        city: values.city,
                        country: values.country?.id,
                        dateOfBirth: new Date(values.dateOfBirth),
                        hospital: values.hospital,
                        latitude: null,
                        longitude: null,
                        placeId: null,
                        state: values.state,
                      },
                      isAppointment: undefined,
                      relationship: {
                        relationship: values.relationship?.value,
                        relativeId: parentId,
                        status: "ACTIVE",
                      },
                    })
                  );
                }}
              >
                {status === "loading" ? "Adding.." : "Add CHild"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

Childdetaildialog.propTypes = {
  className: PropTypes.string,
};

export default Childdetaildialog;
