import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  FormControlLabel,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  updateChecks,
  updateInputs,
  updateErrors,
  updateParentCityInput,
  updateParentStateInput,
  updateParentAddress2Input,
} from "../registrationSlice";
import { sentenceCase } from "sentence-case";
import {
  selectCountries,
  selectInputs,
  selectErrors,
  selectChecks,
  selectDisplayParentEditDialog,
} from "../selector";
import { validateParentFormInputs } from "../../../utils/registrationUtils";
import {
  countryToFlag,
  processLocationInput,
} from "../../../utils/commonUtils";
import {
  PARENT_FORM_INPUTS,
  GENDERS,
} from "../../../constants/registrationConstants";
import SearchLocationInput from "../../../common/components/SearchLocationInput";

const useStyles = makeStyles(() => ({
  root: {},
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const Parentdetaildialog = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [checks, setChecks] = React.useState({
  //   checkedNoEmail: false,
  //   checkedNoESmartPhone: false,
  // });
  // const [values, setValues] = useState({
  //   firstName: null,
  //   lastName: null,
  //   idNumber: null,
  //   email: null,
  //   phone: null,
  //   country: null,
  //   address1: null,
  //   city: null,
  //   postalCode: null
  // });

  // const [errors, setErrors] = useState({
  //   firstName: null,
  //   lastName: null,
  //   idNumber: null,
  //   email: null,
  //   phone: null,
  //   address1: null,
  //   city: null,
  //   postalCode: null
  // });
  const checks = useSelector(selectChecks);
  const values = useSelector(selectInputs);
  const errors = useSelector(selectErrors);

  const dispatch = useDispatch();
  const setChecks = (payload) => dispatch(updateChecks(payload));
  const setValues = (payload) => dispatch(updateInputs(payload));
  const setErrors = (payload) => dispatch(updateErrors(payload));

  const autoCompleteRef = useRef(null);

  const countries = useSelector(selectCountries);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    if (type === "checkbox") {
      setChecks({ ...checks, [name]: checked });
      if (name === PARENT_FORM_INPUTS.NO_EMAIL.NAME) {
        setValues({
          ...values,
          email: "",
        });
        setErrors({
          ...errors,
          email: null,
        });
      } else {
        setValues({
          ...values,
          email: "",
          contact: "",
        });
        setErrors({
          ...errors,
          email: null,
          contact: null,
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: validateParentFormInputs({ name, value }, checks),
      });
    }
  };

  if (autoCompleteRef) {
    console.log(autoCompleteRef);
  }

  return (
    <Box m={3}>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name={PARENT_FORM_INPUTS.FIRST_NAME.NAME}
              onChange={handleChange}
              required
              value={values.firstName}
              variant="outlined"
              helperText={errors.firstName}
              error={!!errors.firstName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name={PARENT_FORM_INPUTS.LAST_NAME.NAME}
              onChange={handleChange}
              required
              value={values.lastName}
              variant="outlined"
              helperText={errors.lastName}
              error={!!errors.lastName}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Autocomplete
              id="gender-select-demo"
              fullWidth
              options={GENDERS}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              error={!!errors.gender}
              helperText={errors.gender}
              getOptionLabel={(option) => option.title}
              defaultValue={{
                title: (values.gender && sentenceCase(values.gender)) || null,
              }}
              onChange={(e, value) =>
                handleChange({
                  target: {
                    name: PARENT_FORM_INPUTS.GENDER.NAME,
                    value: value?.value,
                  },
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gender"
                  variant="outlined"
                  error={!!errors.gender}
                  helperText={errors.gender}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  required
                />
              )}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Passport or Adhar Card No"
              name={PARENT_FORM_INPUTS.ID_NUMBER.NAME}
              onChange={handleChange}
              required
              value={values.idNumber}
              variant="outlined"
              helperText={errors.idNumber}
              error={!!errors.idNumber}
            />
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
              getOptionLabel={(option) => option.countryName}
              onChange={(e, value) =>
                handleChange({
                  target: { name: PARENT_FORM_INPUTS.COUNTRY.NAME, value },
                })
              }
              renderOption={(option) => (
                <React.Fragment>
                  <span>{countryToFlag(option.countryCode)}</span>
                  {option.countryName} ({option.countryCode})
                </React.Fragment>
              )}
              // defaultValue={values.country}
              value={values.country}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name={PARENT_FORM_INPUTS.PHONE.NAME}
              onChange={handleChange}
              value={values.contact}
              variant="outlined"
              helperText={errors.contact}
              error={!!errors.contact}
              required={!checks.checkedNoESmartPhone}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.checkedNoESmartPhone}
                  onChange={handleChange}
                  name={PARENT_FORM_INPUTS.NO_SMART_PHONE.NAME}
                  color="primary"
                />
              }
              label="No Smart Phone"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name={PARENT_FORM_INPUTS.EMAIL.NAME}
              onChange={handleChange}
              required={!(checks.checkedNoESmartPhone || checks.checkedNoEmail)}
              value={values.email}
              variant="outlined"
              disabled={checks.checkedNoEmail}
              helperText={errors.email}
              error={!!errors.email}
            />
            {!checks.checkedNoESmartPhone ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checks.checkedNoEmail}
                    onChange={handleChange}
                    name={PARENT_FORM_INPUTS.NO_EMAIL.NAME}
                    color="primary"
                  />
                }
                label="No Email Address"
              />
            ) : null}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Zip/Postal Code"
              name={PARENT_FORM_INPUTS.POSTAL_CODE.NAME}
              onChange={handleChange}
              required
              value={values.postalCode}
              variant="outlined"
              helperText={errors.postalCode}
              error={!!errors.postalCode}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="House / Apartment / Suite No / Street Address"
              name={PARENT_FORM_INPUTS.ADDRESS_1.NAME}
              onChange={handleChange}
              required
              value={values.address1}
              variant="outlined"
              helperText={errors.address1}
              error={!!errors.address1}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchLocationInput
              country={values.country ? values.country.countryCode : ""}
              value={values.city}
              onChange={(value) => {
                const processedLocation = processLocationInput(value);
                dispatch(updateParentCityInput(processedLocation?.city));
                dispatch(updateParentStateInput(processedLocation?.state));
                dispatch(
                  updateParentAddress2Input(processedLocation?.address2)
                );
              }}
              autoCompleteRef={autoCompleteRef}
              error={!!errors.city}
              disabled={!values.country || !values.country.countryCode}
            />
            {/* <div style={{height: '100px'}}></div> */}
            {/* <Input disableUnderline fullWidth='true' inputComponent={() => <TextField 
              fullWidth
              variant="outlined" 
              label="City"
              name={PARENT_FORM_INPUTS.CITY.NAME}
              onChange={handleChange}
              required
              value={values.city}
              helperText={errors.city}
              error={!!errors.city}
              />}/> */}
            {/* <Input
                fullWidth
                inputComponent="input"
                label="City"
                name={PARENT_FORM_INPUTS.CITY.NAME}
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
                helperText={errors.city}
                error={!!errors.city}
              /> */}
            {/* <SearchLocationInput /> */}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

Parentdetaildialog.propTypes = {
  className: PropTypes.string,
};

// const countries = [
//   { code: "AD", label: "Andorra", phone: "376" },
//   { code: "AE", label: "United Arab Emirates", phone: "971" },
//   { code: "GL", label: "Greenland", phone: "299" },
//   { code: "GM", label: "Gambia", phone: "220" },
//   { code: "GN", label: "Guinea", phone: "224" },
//   { code: "GP", label: "Guadeloupe", phone: "590" },
//   { code: "GQ", label: "Equatorial Guinea", phone: "240" },
//   { code: "GR", label: "Greece", phone: "30" },
//   {
//     code: "GS",
//     label: "South Georgia and the South Sandwich Islands",
//     phone: "500",
//   },
//   { code: "GT", label: "Guatemala", phone: "502" },
//   { code: "GU", label: "Guam", phone: "1-671" },
//   { code: "IQ", label: "Iraq", phone: "964" },
//   { code: "IR", label: "Iran, Islamic Republic of", phone: "98" },
//   { code: "IS", label: "Iceland", phone: "354" },
//   { code: "IT", label: "Italy", phone: "39" },
//   { code: "JE", label: "Jersey", phone: "44" },
//   { code: "JM", label: "Jamaica", phone: "1-876" },
//   { code: "JO", label: "Jordan", phone: "962" },
//   { code: "JP", label: "Japan", phone: "81", suggested: true },
//   { code: "KE", label: "Kenya", phone: "254" },
//   { code: "KG", label: "Kyrgyzstan", phone: "996" },
//   { code: "KH", label: "Cambodia", phone: "855" },
//   { code: "KI", label: "Kiribati", phone: "686" },
//   {
//     code: "MK",
//     label: "Macedonia, the Former Yugoslav Republic of",
//     phone: "389",
//   },
//   { code: "ML", label: "Mali", phone: "223" },
//   { code: "MM", label: "Myanmar", phone: "95" },
//   { code: "MN", label: "Mongolia", phone: "976" },
//   { code: "MO", label: "Macao", phone: "853" },
//   { code: "MP", label: "Northern Mariana Islands", phone: "1-670" },
//   { code: "MQ", label: "Martinique", phone: "596" },
//   { code: "MR", label: "Mauritania", phone: "222" },
//   { code: "MS", label: "Montserrat", phone: "1-664" },
//   { code: "ZA", label: "South Africa", phone: "27" },
//   { code: "ZM", label: "Zambia", phone: "260" },
//   { code: "ZW", label: "Zimbabwe", phone: "263" },
// ];

export default Parentdetaildialog;
