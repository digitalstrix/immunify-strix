import React from "react";
import { Box, TextField, Grid } from "@material-ui/core";

const Toolbar = () => {
  return (
    <div>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Box component="span" m={1}>
          <TextField
            id="years"
            label="Years"
            variant="outlined"
            type="number"
            size="small"
          />
        </Box>
        <Box component="span" m={1}>
          <TextField
            id="months"
            label="Months"
            variant="outlined"
            type="number"
            size="small"
          />
        </Box>
      </Grid>
    </div>
  );
};

export default Toolbar;
