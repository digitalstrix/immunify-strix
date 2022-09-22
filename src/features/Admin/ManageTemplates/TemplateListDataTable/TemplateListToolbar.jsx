import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, TextField, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { notify, countryToFlag, extractDateStr } from '../../../../utils/commonUtils';
import { getArtworks } from '../manageTemplateSlice';
import { selectArtworks } from '../selector';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const TEMPLATE_STATUSES = [
  'ACTIVE',
  'INACTIVE',
  'DELETED'
];

const SEARCH_OPTIONS = [
  'COUNTRY',
  'CENTER'
];

const TemplateListToolbar = ({ countries, vacStates, vacCities, vacNames, vacTypes }) => {

  const classes = useStyles();

  const artworks = useSelector(selectArtworks);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (artworks.length === 0) {
  //     dispatch(getArtworks({}));
  //   }
  // }, [dispatch, artworks])

  const [inputs, setInputs] = useState({
    country: '',
    state: '',
    status: TEMPLATE_STATUSES[0],
    vacName: '',
    vacType: ''
  });

  const handleChange = ({ target: { name, value }}) => {
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
            style={{ width: 300 }}
            options={countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.countryName}
            onChange={(e, value) => { 
              handleChange({ target: { name: 'country', value }})
            }}
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
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                size="small"
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
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="searchOption"
            options={SEARCH_OPTIONS}
            // getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Search Option" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="templateType"
            options={vacTypes}
            getOptionLabel={(option) => option.vacType}
            style={{ width: 300 }}
            size="small"
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
            options={TEMPLATE_STATUSES}            
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="vacName"
            options={vacNames}
            getOptionLabel={(option) => option.vacName}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Name" variant="outlined" />
            )}
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
                // todo parmateterize
                dispatch(getArtworks({}));
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

const countries = [
  { title: "Sri Lanka" },
  { title: "India" },
  { title: "Pakistan" },
  { title: "Ireland" },
  { title: "Sweden" },
];
const cities = [
  { title: "Kandy" },
  { title: "Kegalle" },
  { title: "NuwaraEliya" },
  { title: "Ireland" },
  { title: "Sweden" },
];
const template_type = [{ title: "AAA" }, { title: "BBB" }, { title: "CCC" }];
const search_option = [{ title: "Country" }, { title: "Center" }];
const status = [
  { title: "ACTIVE" },
  { title: "INACTIVE" },
  { title: "DELETED" },
];

export default TemplateListToolbar;
