import React, { useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const vaccines = ["Both", "Male", "Female"];

const Toolbar = () => {
  const [value, setValue] = useState(vaccines[0]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Box m={1}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={vaccines}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Vaccine"
                variant="outlined"
                size="small"
              />
            )}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default Toolbar;
