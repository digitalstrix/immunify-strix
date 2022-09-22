import React from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Filtertoolbar = () => {
  return (
    <div>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              id="doc_name"
              size="small"
              style={{ width: 300 }}
              fullWidth
              label="Type Name"
              variant="outlined"
            />
          </Grid>
          or
          <Grid item>
            <Autocomplete
              id="dsfilter"
              options={status}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Status"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Box component="span" mr={1}>
              <Button variant="contained" color="primary" size="medium" mr={2}>
                Search
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
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const status = [{ title: "Pending" }, { title: "Settled" }];

export default Filtertoolbar;
