import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { countryToFlag } from '../../../../../utils/commonUtils';
import {
  generateGetVacCentersPayload,
  validateGetVacCentersPayload
} from '../../../../../utils/vacCenterUtils';
import { CENTER_STATUS_OPTIONS } from '../../../../../constants/vacCenterConstants';
import {
  selectCountries,
  selectVacStates,
  selectVacTypes
} from '../../selector';
import { getVacCenters } from '../../../VaccinationCentersPage/vacCenterSlice';

const QrcodeListToolbar = () => {

  const countries = useSelector(selectCountries);
  const vacStates = useSelector(selectVacStates);
  const vacTypes = useSelector(selectVacTypes);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    country: '',
    state: '',
    status: CENTER_STATUS_OPTIONS[0],
    vacName: '',
    vacType: ''
  });

  const handleChange = ({target: { name, value }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Autocomplete
            id="country-select-demo"
            size="small"
            style={{ width: 300 }}
            options={countries}
            autoHighlight
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
            value={inputs.country}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                variant="outlined"
                // error={!!errors.country}
                // helperText={errors.country}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="state"
            options={vacStates}
            getOptionLabel={(option) => option.state}
            style={{ width: 300 }}
            size="small"
            value={inputs.state}
            onChange={(e, value) => handleChange({ target: { name: 'state', value }})}
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="center_type"
            options={vacTypes}
            getOptionLabel={(option) => option.vacType}
            style={{ width: 300 }}
            size="small"
            value={inputs.vacType}
            onChange={(e, value) => handleChange({ target: { name: 'vacType', value }})}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="status"
            disableClearable
            options={CENTER_STATUS_OPTIONS}
            value={inputs.status}
            onChange={(e, value) => handleChange({ target: { name: 'status', value }})}
            // getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="center"
            size="small"
            style={{ width: 300 }}
            fullWidth
            name="vacName"
            label="Name"
            onChange={handleChange}
            value={inputs.vacName}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Box component="span" mr={1}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              mr={2}
              onClick={() => {
                const payload = generateGetVacCentersPayload(inputs);
                if (validateGetVacCentersPayload(payload)) {
                  dispatch(getVacCenters(payload));
                } else {
                  // 
                }
              }}
            >
              Apply
            </Button>
          </Box>
          {/* if one or more input fields have active values this btn needs to be enabled & function as a clear all value btn */}
          <Box component="span" ml={1}>
            <Button
              variant="text"
              color="inherit"
              size="medium"
              disabled={true}
            >
              Remove All Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default QrcodeListToolbar;
