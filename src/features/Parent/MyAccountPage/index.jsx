import React, { useState, useRef, useEffect } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Fade,
} from "@material-ui/core";
import validator from "email-validator";
import { processLocationInput } from "../../../utils/commonUtils";
import SearchLocationInput from "../../../common/components/SearchLocationInput";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import {
  getLoggedInUserId,
  selectParentProfilePictureUrl,
  selectRetrievingAdditionalDataStatus,
  selectRetrievingBasicDataStatus,
  selectParentBasicData,
  selectUpdatingBasicDataStatus,
  selectUpdatingBasicDataError,
  selectParentAdditionalData,
  selectUpdatingAdditionalDataStatus,
  selectUpdatingAdditionalDataError,
} from "./selector";
import {
  getAdditionalProfileData,
  getBasicProfileData,
  getProfilePictureById,
  updateAdditionalProfileData,
  updateBasicProfileData,
} from "./parentProfileSlice";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const autoCompleteRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getProfilePictureById(loggedInParentId));
    dispatch(getBasicProfileData({ parentId: loggedInParentId }));
    dispatch(getAdditionalProfileData(loggedInParentId));
  }, [dispatch]);

  const loggedInParentId = useSelector(getLoggedInUserId);
  const profilePicture = useSelector(selectParentProfilePictureUrl);
  const basicDataRetievingStatus = useSelector(selectRetrievingBasicDataStatus);
  const basicDataUpdatingStatus = useSelector(selectUpdatingBasicDataStatus);
  const basicDataUpdatingError = useSelector(selectUpdatingBasicDataError);
  const additionalDataUpdatingStatus = useSelector(
    selectUpdatingAdditionalDataStatus
  );
  const additionalDataUpdatingError = useSelector(
    selectUpdatingAdditionalDataError
  );
  const additionalDataRetievingStatus = useSelector(
    selectRetrievingAdditionalDataStatus
  );
  const parentBasicData = useSelector(selectParentBasicData);
  const parentAdditionalData = useSelector(selectParentAdditionalData);

  const UPDATE_DATA_SUCCESS = "Update Success";
  const UPDATE_DATA_FAILED = "Update Failed!";

  useEffect(() => {
    if (basicDataUpdatingStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_DATA_SUCCESS);
    } else if (basicDataUpdatingStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_DATA_FAILED, "error");
    }
  }, [basicDataUpdatingStatus, basicDataUpdatingError, enqueueSnackbar]);

  useEffect(() => {
    if (additionalDataUpdatingStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_DATA_SUCCESS);
    } else if (additionalDataUpdatingStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_DATA_FAILED, "error");
    }
  }, [
    additionalDataUpdatingStatus,
    additionalDataUpdatingError,
    enqueueSnackbar,
  ]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState({ address2: "", city: "", state: "" });
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [kg, setKg] = useState("");
  const [grams, setGrams] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [medicSwitch, setMedicSwitch] = useState(false);
  const [allergiesSwitch, setAllergiesSwitch] = useState(false);
  const [vacSwitch, setVacSwitch] = useState(false);

  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [vaccinations, setVaccinations] = useState("");

  useEffect(() => {
    setFirstName(parentBasicData?.firstName);
    setLastName(parentBasicData?.lastName);
    setEmail(parentBasicData?.email);
    setPhone(parentBasicData?.contact);
    setCity({
      ...city,
      address2: parentBasicData?.address2,
      city: parentBasicData?.city,
      state: parentBasicData?.state,
    });
    setAddress(parentBasicData?.address1);
    setDob(moment(parentAdditionalData?.dob).format("YYYY-MM-DD"));
    const heightProcessed = Number(parentAdditionalData?.height)
      .toFixed(2)
      .split(/\.(?=[^\.]+$)/);
    setFeet(
      (heightProcessed && heightProcessed.length > 0 && heightProcessed[0]) || 0
    );
    setInches(
      (heightProcessed && heightProcessed.length > 0 && heightProcessed[1]) || 0
    );
    const wightProcessed = Number(parentAdditionalData?.weight)
      .toFixed(2)
      .split(/\.(?=[^\.]+$)/);
    setKg(
      (wightProcessed && wightProcessed.length > 0 && wightProcessed[0]) || 0
    );
    setGrams(
      (wightProcessed && wightProcessed.length > 0 && wightProcessed[1]) || 0
    );
    setBloodType(parentAdditionalData?.blood);
    setBloodType(parentAdditionalData?.blood);
    setMedicSwitch(parentAdditionalData?.meditations === null ? false : true);
    setAllergiesSwitch(parentAdditionalData?.alergies === null ? false : true);
    setVacSwitch(parentAdditionalData?.vaccines === null ? false : true);
    setMedications(parentAdditionalData?.meditations || null);
    setAllergies(parentAdditionalData?.alergies || null);
    setVaccinations(parentAdditionalData?.vaccines || null);
  }, [basicDataRetievingStatus, additionalDataRetievingStatus]);

  const isLoading =
    basicDataRetievingStatus === "loading" ||
    additionalDataRetievingStatus === "loading" ||
    basicDataUpdatingStatus === "loading";

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="avatar"
                  src={profilePicture}
                  className={classes.large}
                  style={{
                    height: 150,
                    width: 150,
                  }}
                />
              </Box>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={(e) => {}}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                  Change Image
                </Button>
              </label>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              title="Basic Details"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent
              style={{
                opacity: isLoading ? 0.25 : 1,
                pointerEvents: isLoading ? "none" : "initial",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    id="First Name"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName || ""}
                    error={!firstName}
                    helperText={!firstName && "First Name is Required"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Last Name"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName || ""}
                    error={!lastName}
                    helperText={!lastName && "Last Name is Required"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                    error={!email || !validator.validate(email)}
                    helperText={
                      (!email && "Email is Required") ||
                      (email &&
                        !validator.validate(email) &&
                        "Enter a valid email")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Phone"
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone || ""}
                    error={!phone}
                    helperText={!phone && "Phone Number is Required"}
                  />
                </Grid>
                <Grid item xs={6} style={{ marginTop: 17 }}>
                  <SearchLocationInput
                    country={193}
                    value={city.city || ""}
                    onChange={(value) => {
                      const processedLocation = processLocationInput(value);
                      setCity(processedLocation);
                    }}
                    autoCompleteRef={autoCompleteRef}
                    error={!city.city}
                    helperText={!city.city && "City is Required"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                    value={address || ""}
                    error={!address}
                    helperText={!address && "Address is Required"}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <React.Fragment>
              <Divider />
              <Box display="flex" justifyContent="end" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    !firstName ||
                    !lastName ||
                    !email ||
                    !phone ||
                    !city.city ||
                    !address ||
                    !validator.validate(email) ||
                    basicDataUpdatingStatus === "loading" ||
                    isLoading
                  }
                  onClick={() => {
                    dispatch(
                      updateBasicProfileData({
                        pid: loggedInParentId,
                        phone,
                        city: city.city,
                        address,
                        firstName,
                        lastName,
                      })
                    );
                  }}
                >
                  {basicDataUpdatingStatus === "loading"
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </Box>
            </React.Fragment>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              title="Additional Details"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent
              style={{
                opacity: additionalDataUpdatingStatus === "loading" ? 0.25 : 1,
                pointerEvents:
                  additionalDataUpdatingStatus === "loading"
                    ? "none"
                    : "initial",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      margin="normal"
                      fullWidth
                      id="Date"
                      label="Birthday"
                      format="MM/dd/yyyy"
                      value={dob || ""}
                      maxDate={new Date()}
                      onChange={(date) => setDob(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="Feet"
                    name="feet"
                    label="Height (Feet)"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    onChange={(e) => setFeet(e.target.value)}
                    value={feet || ""}
                    error={feet < 0}
                    helperText={feet < 0 && "Enter Valid Input"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="Feet"
                    name="feet"
                    label="Height (Inches)"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    onChange={(e) => setInches(e.target.value)}
                    value={inches || ""}
                    error={inches < 0}
                    helperText={inches < 0 && "Enter Valid Input"}
                  />
                </Grid>

                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel style={{ padding: -20 }} id="BloodType">
                        Blood Type
                      </InputLabel>
                      <Select
                        labelId="BloodType"
                        id="BloodType"
                        margin="dense"
                        fullWidth
                        value={12}
                        onChange={(e) => setBloodType(e.target.value)}
                        label="Blood Type"
                        renderValue={() =>
                          bloodType ? (
                            <MenuItem value={bloodType}>{bloodType}</MenuItem>
                          ) : (
                            <MenuItem value={null}>None</MenuItem>
                          )
                        }
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={3}>
                    <TextField
                      id="kg"
                      name="kg"
                      label="Weight (Kg)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="number"
                      onChange={(e) => setKg(e.target.value)}
                      value={kg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="grams"
                      name="grams"
                      label="Weight (Grams)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="number"
                      onChange={(e) => setGrams(e.target.value)}
                      value={grams}
                    />
                  </Grid> */}
                  <Grid item xs={3}>
                    <TextField
                      id="kg"
                      name="kg"
                      label="Weight (Kg)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="number"
                      onChange={(e) => setKg(e.target.value)}
                      value={kg || ""}
                      error={kg < 0}
                      helperText={kg < 0 && "Enter Valid Input"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="grams"
                      name="grams"
                      label="Weight (Grams)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="number"
                      onChange={(e) => setGrams(e.target.value)}
                      value={grams || ""}
                      error={grams < 0}
                      helperText={grams < 0 && "Enter Valid Input"}
                    />
                  </Grid>
                </Grid>

                <Divider
                  dark
                  variant="full"
                  style={{ width: "100%", marginBottom: 10 }}
                />
                <Grid container>
                  <Grid item xs={3}>
                    <FormControlLabel
                      style={{ marginTop: 25 }}
                      value="start"
                      control={
                        <Switch
                          color="primary"
                          checked={medicSwitch}
                          onChange={() => setMedicSwitch(!medicSwitch)}
                        />
                      }
                      label="Any Medications?"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Fade in={medicSwitch}>
                      <TextField
                        id="meds"
                        name="meds"
                        label="Medications"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setMedications(e.target.value)}
                        value={medications || ""}
                      />
                    </Fade>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3}>
                    <FormControlLabel
                      style={{ marginTop: 25 }}
                      value="start"
                      control={
                        <Switch
                          color="primary"
                          checked={allergiesSwitch}
                          onChange={() => setAllergiesSwitch(!allergiesSwitch)}
                        />
                      }
                      label="Any Allergies?"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Fade in={allergiesSwitch}>
                      <TextField
                        id="allergies"
                        name="allergies"
                        label="Allergies"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setAllergies(e.target.value)}
                        value={allergies || ""}
                      />
                    </Fade>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3}>
                    <FormControlLabel
                      style={{ marginTop: 25 }}
                      value="start"
                      control={
                        <Switch
                          color="primary"
                          checked={vacSwitch}
                          onChange={() => setVacSwitch(!vacSwitch)}
                        />
                      }
                      label="Any Vaccinations?"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Fade in={vacSwitch}>
                      <TextField
                        id="vac"
                        name="vac"
                        label="Vaccinations"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setVaccinations(e.target.value)}
                        value={vaccinations || ""}
                      />
                    </Fade>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            <React.Fragment>
              <Divider />
              <Box display="flex" justifyContent="end" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    additionalDataUpdatingStatus === "loading" ||
                    kg < 0 ||
                    grams < 0 ||
                    feet < 0 ||
                    inches < 0
                  }
                  onClick={() => {
                    dispatch(
                      updateAdditionalProfileData({
                        immId: loggedInParentId,
                        height: feet + "." + inches,
                        weight: kg + "." + grams,
                        blood: bloodType,
                        dob: moment(dob).format("YYYY-MM-DD HH:MM"),
                        allergies,
                        medications,
                        vaccinations,
                      })
                    );
                  }}
                >
                  {additionalDataUpdatingStatus === "loading"
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </Box>
            </React.Fragment>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;

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
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));
