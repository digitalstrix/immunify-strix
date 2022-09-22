import React from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Qrcodelisttoolbar = () => {
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
            id="country"
            options={countries}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Country"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="city"
            options={cities}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Select City" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="center_type"
            options={center_type}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Center Type"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="status"
            options={status}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Select Status" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="vendor_card_center"
            size="small"
            style={{ width: 300 }}
            fullWidth
            label="Type Center Name"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Box component="span" mr={1}>
            <Button variant="contained" color="primary" size="medium" mr={2}>
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
const center_type = [
  { title: "Hospital" },
  { title: "Public" },
  { title: "Private" },
];
const status = [
  { title: "ACTIVE" },
  { title: "INACTIVE" },
  { title: "DELETED" },
];

export default Qrcodelisttoolbar;
