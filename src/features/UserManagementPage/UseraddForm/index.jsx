import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";

export default function Index() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="fname"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  name="fname"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  id="lname"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  name="lname"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="uname"
                  label="Username"
                  variant="outlined"
                  size="small"
                  name="uname"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  name="email"
                  type="email"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  size="small"
                  name="password"
                  type="password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="conpassword"
                  label="Confirm Password"
                  variant="outlined"
                  size="small"
                  name="confirmPassword"
                  type="password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  size="small"
                  options={userType}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="User Groups"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Inactive</Grid>
                    <Grid item>
                      <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                    <Grid item>Active</Grid>
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Add
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const userType = [
  { title: "All" },
  { title: "Parents" },
  { title: "Doctors" },
  { title: "Vac Centers" },
];
