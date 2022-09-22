import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import {
  DialogActions,
  DialogContent,
} from "../../../../../common/components/Admin/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  input: {
    display: "none",
  },
}));

const Doctordetails = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <DialogContent>
        <Card style={{ padding: 20 }}>
          <Grid container row spacing={4}>
            <Grid item xs={12} lg={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      className={classes.large}
                    />
                  </Box>
                  <Typography variant="h5" align="center">
                    <Box fontWeight={500} mt={2}>
                      demo@name.io
                    </Box>
                  </Typography>
                  <Box mt={1} textAlign="center">
                    <Typography variant="p" paragraph={true}>
                      Status: <Typography component="a">Active</Typography>
                    </Typography>
                  </Box>
                </CardContent>
                <Box fullWidth m={2}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    fullWidth
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="inherit"
                      component="span"
                      size="small"
                      fullWidth={true}
                    >
                      Upload Image
                    </Button>
                  </label>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} lg={8}>
              <form>
                <Card className={classes.card} mt={3}>
                  <CardHeader
                    title="Profile"
                    titleTypographyProps={{
                      variant: "h6",
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          id="filled-name"
                          label="Dr. Name"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="Email"
                          label="Email Address"
                          required
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="Number"
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="Num"
                          label="Reg Num"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="City"
                          label="City"
                          variant="outlined"
                          value="Colombo"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="Hospital Name"
                          label="Hospital Name"
                          variant="outlined"
                          value="Apollo"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="Special"
                          label="Specialized In"
                          variant="outlined"
                          value="Dermatology"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Card>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Box display="flex" justifyContent="end" m={2}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </React.Fragment>
  );
};

export default Doctordetails;
