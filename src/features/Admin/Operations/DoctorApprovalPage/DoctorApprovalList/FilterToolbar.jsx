import React from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";

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
              label="Type Doctor Name"
              variant="outlined"
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

export default Filtertoolbar;
