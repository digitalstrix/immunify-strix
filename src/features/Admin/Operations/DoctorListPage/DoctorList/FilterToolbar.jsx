import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { searchDoctors } from "../doctorListSlice";

const SEARCH_FIELD_VALIDATION_ERROR = "Search word should be at least 3 characters";
const SEARCH_FIELD_REQUIRED_ERROR = "Required";

const Filtertoolbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (name) {
            if (name.length >= 3) {
              dispatch(searchDoctors(name));
            } else {
              setError(SEARCH_FIELD_VALIDATION_ERROR);
            }
          } else {
            setError(SEARCH_FIELD_REQUIRED_ERROR);
          }
        }}
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              onChange={({ target: { value } }) => {
                if (value) {
                  setName(value);
                  setError(null);
                } else {
                  setError(SEARCH_FIELD_REQUIRED_ERROR);
                }
              }}
              id="doc_name"
              size="small"
              style={{ width: 300 }}
              fullWidth
              label="Type Doctor Name"
              variant="outlined"
              error={!!error}
              helperText={error}
              value={name}
            />
          </Grid>
          <Grid item>
            <Box component="span" mr={1}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            {/* if one or more input fields have active values this btn needs to be enabled & function as a clear all value btn */}
            <Box component="span" ml={1}>
              <Button
                type="submit"
                variant="text"
                color="inherit"
                size="medium"
                disabled={name === "" ? true : false}
                onClick={() => setName("")}
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
