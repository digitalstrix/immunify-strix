import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';
import SearchLocationInput from '../../../../common/components/SearchLocationInput';
import { countryToFlag, processLocationInput } from '../../../../utils/commonUtils';
import {
  validateVacCenterFields,
  generateRegisterVacCenterPayload,
  validateRegVacCenterPayload,
  generateVacCenterRegFormErrors
} from '../../../../utils/vacCenterUtils';
import { CENTER_STATUS_OPTIONS } from '../../../../constants/vacCenterConstants';
import { selectCountries, selectMainCenters, selectUser } from '../selector';
import { registerVacCenter, updateVacCenter } from '../vacCenterSlice';

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
  vacCode: '',
  vacType: '',
  country: '',
  mainHospitalId: null,
  city: '',
  address1: '',
  address2: null,
  postalCode: '',
  contactPerson: '',
  contactNumber: '',
  email: '',
  fax: '',
  status: CENTER_STATUS_OPTIONS[0],
  vendorId: null
};

const INITIAL_CHECKS = {
  isGovernment: false,
  isChain: false,
  isMain: false,
};

const TEXT_INPUTS_META = [
  { key: 'name', defaultValue: '' },
  { key: 'vacCode', defaultValue: '' },
  { key: 'vacType', defaultValue: '' },
  { key: 'mainHospitalId', defaultValue: null },
  { key: 'city', defaultValue: '' },
  { key: 'address1', defaultValue: '' },
  { key: 'address2', defaultValue: null },
  { key: 'postalCode', defaultValue: '' },
  { key: 'contactPerson', defaultValue: '' },
  { key: 'contactNumber', defaultValue: '' },
  { key: 'email', defaultValue: '' },
  { key: 'fax', defaultValue: '' },
  { key: 'vendorId', defaultValue: null },
  { key: 'status', defaultValue: CENTER_STATUS_OPTIONS[0] }
];

const CHECKS_META = [
  { key: 'isGovernment'},
  { key: 'isChain'},
  { key: 'isMain' }
]

const initialChecks = ({ data }) => {
  if (data) {
    return CHECKS_META.map(({ key }) => ({ [key]: !!data[key] }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
  }
  return INITIAL_CHECKS;
}

const initialInputs = ({ data }, countries=[], centers=[]) => {
  if (data) {
    const inputs = TEXT_INPUTS_META.map(({ key, defaultValue }) => ({ [key]: data[key] || defaultValue }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
    inputs.country = countries.find(({ id }) => id === data.country);
    if (data.mainHospitalId) {
      inputs.mainHospitalId = centers.find(({ id }) => id === data.mainHospitalId);
    }
    inputs.vacCenterId = data.id;
    return inputs; 
  }
  return INITIAL_INPUTS;
};

const Index = (props) => {
  const classes = useStyles();
  const countries = useSelector(selectCountries);
  const centers = useSelector(selectMainCenters);
  const loggedInUser = useSelector(selectUser);
  const [checks, setChecks] = useState(initialChecks(props));
  const [inputs, setInputs] = useState(initialInputs(props, countries, centers));
  const [errors, setErrors] = useState({});
  const [filteredCenters, setFilteredCenters] = useState([]);

  const handleChange = ({ target: { name, value }}) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: validateVacCenterFields({ name, value }, checks)});
  };

  const handleCheck = ({ target: { name, checked }}) => {
    setChecks({ ...checks, [name]: checked });
  } 

  const dispatch = useDispatch();

  

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={4}>
                <TextField
                  id="name"
                  name="name"
                  value={inputs.name}
                  error={!!errors.name}
                  helperText={errors.name}
                  label="Vaccination Center Name"
                  variant="outlined"
                  disabled={false}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="vacCode"
                  name="vacCode"
                  value={inputs.vacCode}
                  error={!!errors.vacCode}
                  helperText={errors.vacCode}
                  label="Vaccination Center Code"
                  variant="outlined"
                  disabled={false}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="vacType"
                  name="vacType"
                  value={inputs.vacType}
                  error={!!errors.vacType}
                  helperText={errors.vacType}
                  label="Vaccination Center Type"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    disabled={props.readonly}
                    control={
                      <Checkbox
                        checked={checks.isGovernment}
                        onChange={handleCheck}
                        name="isGovernment"
                        color="primary"
                      />
                    }
                    label="Is Government"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checks.isGovernment || checks.isChain}
                        disabled={checks.isGovernment}
                        onChange={handleCheck}
                        name="isChain"
                        color="primary"
                      />
                    }
                    label="Is Chain"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checks.isMain}
                        onChange={handleCheck}
                        name="isMain"
                        color="primary"
                      />
                    }
                    label="Is Main"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="country-select-demo"
                  options={countries}
                  classes={{
                    option: classes.option,
                  }}
                  autoHighlight
                  fullWidth
                  getOptionLabel={(option) => option.countryName}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{countryToFlag(option.countryCode)}</span>
                      {option.countryName} ({option.countryCode})
                    </React.Fragment>
                  )}
                  value={inputs.country}
                  onChange={(e, value) => { 
                    handleChange({ target: { name: 'country', value }});
                    if (value && value.id) {
                      setFilteredCenters(centers.filter(({ country }) => country === value.id ));
                    } else {
                      setFilteredCenters([]);
                    }                    
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
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
              <Grid item xs={6}>
                <Autocomplete
                  id="main_vac_center"
                  options={filteredCenters}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  disabled={checks.isMain}
                  value={inputs.mainHospitalId}                  
                  onChange={(e, value) => handleChange({ target: { name: 'mainHospitalId', value }})}
                  renderInput={(params) => (
                    <TextField
                      {...params}                      
                      label="Select Main Vaccination Center"
                      variant="outlined"
                      error={!checks.isMain && !!errors.mainHospitalId}
                      helperText={!checks.isMain ? errors.mainHospitalId : null}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <Autocomplete
                  id="city"
                  options={city}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                /> */}
                <SearchLocationInput
                  country={inputs.country ? inputs.country.countryCode : ""}
                  value={inputs.city}
                  onChange={(value) => {
                    const processedLocation = processLocationInput(value, true);
                    setInputs({
                      ...inputs,
                      ...processedLocation
                    });                  
                  }}                
                  error={!!errors.city}
                  disabled={!inputs.country || !inputs.country.countryCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="address"
                  name="address1"
                  value={inputs.address1}
                  error={!!errors.address1}
                  helperText={errors.address1}
                  onChange={handleChange}
                  label="Address Line 1"
                  type="Address"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid row item container>
                <Grid item xs={6}>
                  <TextField
                    id="postalCode"
                    name="postalCode"
                    value={inputs.postalCode}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                    onChange={handleChange}
                    label="Postal Code/Zip Code"
                    type="Address"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="contactPerson"
                  name="contactPerson"
                  value={inputs.contactPerson}
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson}
                  label="Contact Person"
                  onChange={handleChange}
                  placeholder="Vaccination Department Contact Person"
                  type="String"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  value={inputs.contactNumber}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber}
                  onChange={handleChange}
                  placeholder="Vaccination Department Contact Number"
                  type="String"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  name="email"
                  value={inputs.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  label="Email Address(username)"
                  placeholder="Vaccination Department Email"
                  type="String"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="fax"
                  name="fax"
                  value={inputs.fax}
                  error={!!errors.fax}
                  helperText={errors.fax}
                  onChange={handleChange}
                  label="Fax"
                  placeholder="Vaccination Department Fax"
                  type="String"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="vendorId"
                  name="vendorId"
                  value={inputs.vendorId}
                  onChange={handleChange}
                  label="Vendor ID"
                  type="Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="status"
                  disableClearable
                  options={CENTER_STATUS_OPTIONS}
                  getOptionLabel={(option) => option}
                  fullWidth
                  value={inputs.status}
                  onChange={(e, value) => handleChange({ target: { name: 'status', value }})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vaccination Center Status"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
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
            const payload = generateRegisterVacCenterPayload(inputs, checks, loggedInUser);
            if (validateRegVacCenterPayload(payload, checks)) {
              console.log('validation success');
              console.log(JSON.stringify(payload, null, 2));
              if (props.data) {
                dispatch(updateVacCenter(payload));
              } else {
                dispatch(registerVacCenter(payload));
              }              
            } else {
              setErrors(generateVacCenterRegFormErrors(inputs, checks));
            }
          }}
          type='button'
          disabled={props.disableAction}
          color="primary"
          variant="contained"
        >
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
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
// ];


// const vac_centers = ["AAA", "BBB", "CCC"];
// const city = ["Kegalle", "Kandy", "NuwaraEliya"];
// const center_type = ["Is Government", "Is Chain", "Is Main"];
// const status = ["ACTIVE", "INACTIVE", "DELETED"];

export default Index;
