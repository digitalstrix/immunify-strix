import React from "react";
import {
  Container,
  Box,
  makeStyles,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { v4 as uuidv4 } from "uuid";
import { browserName, CustomView } from "react-device-detect";
import EmailEntry from "./EmailEntry";
import TabBar from "../../../common/components/TabBar";
import { useEffect } from "react";
import OtpScreen from "./OtpScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Entry = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (!localStorage.getItem("deviceId")) {
      const id = uuidv4();
      const deviceId = `${browserName}${id}`;
      localStorage.setItem("deviceId", deviceId);
    }
  }, []);

  const deviceId = localStorage.getItem("deviceId");

  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <Box mt={6}>
          <EmailEntry />
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Rest Password"
            />
          </Grid>
          {state.checkedA && <OtpScreen />}
        </Box>
      </Container>
    </div>
  );
};

export default Entry;
