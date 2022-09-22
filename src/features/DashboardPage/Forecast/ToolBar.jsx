import React, { useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const branches = ["All", "Kegalle", "Kandy", "NuwaraEliya"];

const Toolbar = () => {
  const [value, setValue] = useState(branches[0]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        {/* <Box component="span">gender</Box> */}
        <Box component="span" m={1}>
          {" "}
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
            options={branches}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Branch"
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
