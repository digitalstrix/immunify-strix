import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorProfileInfo,
  getDoctorProfilePicture,
  setDoctorProfileGeneralTabEditingState,
  updateDoctorProfileInfo,
} from "./profileInfoSlice";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import { getDoctorSpecializationsList } from "../../Common/commonSlice";
import { getCountries } from "../../Country/countrySlice.js";
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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  selectDoctorProfilePicture,
  selectDoctorBasicData,
  selectSpecializationsList,
  selectCountriesList,
  selectDoctorProfileGeneralTabEditingState,
  getLoggedInDoctorId,
  getProfileInfoStatus,
  getProfileInfoError,
  getProfilePictureStatus,
  getProfilePictureError,
  getProfileDataUpdatingStatus,
  getProfileDataUpdatingError,
  selectRetrievingSpecializationsListStatus,
  selectisLoading,
} from "./selector";

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
  status: {
    backgroundColor: theme.palette.success.main,
    padding: "3px 15px",
    borderRadius: 50,
    color: "#fff",
    textTransform: "lowercase",
  },
  cardAction: {
    justifyContent: "center",
  },
  cardBtn: {
    fontWeight: "bold",
  },
}));

const Index = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoaded, setIsLoaded] = useState(false);
  const UPDATE_PROFILE_SUCCEESFUL_MSG = "Profile Updated Successfully!";
  const UPDATE_PROFILE_FAILURE_MSG = "Profile Update Failed!";

  const doctorId = useSelector(getLoggedInDoctorId);

  useEffect(() => {
    dispatch(getDoctorSpecializationsList());
    dispatch(getCountries());
    dispatch(getDoctorProfileInfo({ doctorId }));
    dispatch(getDoctorProfilePicture(doctorId));
  }, [doctorId, dispatch]);

  const profilePicture = useSelector(selectDoctorProfilePicture);
  const isEditing = useSelector(selectDoctorProfileGeneralTabEditingState);
  const doctorData = useSelector(selectDoctorBasicData);
  const specializations = useSelector(selectSpecializationsList);
  const countries = useSelector(selectCountriesList);

  const profileDataReceivingStatus = useSelector(getProfileInfoStatus);
  const profilePictureReceivingStatus = useSelector(getProfilePictureStatus);
  const receivingSpecializationListStatus = useSelector(
    selectRetrievingSpecializationsListStatus
  );
  const profileUpdatingStatus = useSelector(getProfileDataUpdatingStatus);
  const profileUpdatingError = useSelector(getProfileDataUpdatingError);
  const isLoading = useSelector(selectisLoading);

  useEffect(() => {
    if (profileUpdatingStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_PROFILE_SUCCEESFUL_MSG);
    } else if (profileUpdatingStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_PROFILE_FAILURE_MSG, "danger");
    }
    dispatch(getDoctorProfileInfo({ doctorId }));
  }, [
    profileUpdatingStatus,
    profileUpdatingError,
    doctorId,
    enqueueSnackbar,
    dispatch,
  ]);

  const [firstName, setFirstName] = useState(doctorData.firstName || null);
  const [lastName, setLastName] = useState(doctorData.lastName || null);
  const [registrationNumber, setRegistrationNumber] = useState(
    doctorData.registrationNumber || null
  );
  const [address1, setAddress1] = useState(doctorData.address1 || null);
  const [city, setCity] = useState(doctorData.city || null);

  useEffect(() => {
    setFirstName(doctorData.firstName);
    setLastName(doctorData.lastName);
    setRegistrationNumber(doctorData.registrationNumber);
    setAddress1(doctorData.address1);
    setCity(doctorData.city);
  }, [dispatch, profileDataReceivingStatus, receivingSpecializationListStatus]);

  useEffect(() => {
    if (
      profileDataReceivingStatus !== "loading" &&
      receivingSpecializationListStatus !== "loading"
    ) {
      setIsLoaded(true);
    }
  }, [dispatch]);

  const getCountryNameFromId = (id) => {
    const data = countries.find((i) => {
      if (i.id === id) {
        return i.countryName;
      } else {
        return "";
      }
    });

    return data?.countryName || null;
  };

  const handleUpdate = () => {
    dispatch(
      updateDoctorProfileInfo({
        docId: doctorId,
        firstName,
        lastName,
        email: doctorData.email,
        phone: doctorData.contact,
        regNo: registrationNumber,
        specializationId: doctorData.specialization,
        city,
        address: address1,
        // hospital,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Card className={classes.card}>
            <CardContent>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="Remy Sharp"
                  src={profilePicture || "/static/images/avatar/1.jpg"}
                  className={classes.large}
                />
              </Box>
              <Typography variant="h5" align="center">
                <Box fontWeight={500} mt={2}>
                  {doctorData?.email}
                </Box>
              </Typography>
              <Box mt={1} textAlign="center">
                <Typography variant="p" paragraph={true}>
                  Status:{" "}
                  <Box component="span" className={classes.status}>
                    {doctorData.status}
                  </Box>
                </Typography>
              </Box>
            </CardContent>
            <CardActions className={classes.cardAction}>
              <Button
                size="small"
                variant="text"
                className={classes.cardBtn}
                color="primary"
              >
                Change Image
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {isLoaded && !isLoading && (
          <Grid item xs={12} lg={8}>
            <form>
              <Card className={classes.card}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mx={3}
                >
                  <CardHeader
                    title="Profile"
                    titleTypographyProps={{
                      variant: "h6",
                    }}
                  />
                  <Box>
                    <Button
                      onClick={() => {
                        dispatch(
                          setDoctorProfileGeneralTabEditingState(!isEditing)
                        );
                      }}
                      variant="outlined"
                      color={isEditing ? "primary" : "secondary"}
                      size="small"
                      startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </Box>
                </Box>

                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-name"
                        label="Firstname"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled={isEditing ? false : true}
                        value={firstName || ""}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled={isEditing ? false : true}
                        id="filled-name"
                        label="Lastname"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={lastName || ""}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="Email"
                        label="Email Address"
                        required
                        disabled={true}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={doctorData.email || ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="number"
                        disabled={true}
                        label="Contact Number"
                        variant="outlined"
                        fullWidth
                        value={doctorData.contact || ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled={isEditing ? false : true}
                        id="reg_num"
                        label="Registration Number"
                        variant="outlined"
                        fullWidth
                        value={registrationNumber || ""}
                        onChange={(e) => {
                          setRegistrationNumber(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl1}
                        fullWidth
                      >
                        <InputLabel id="demo-controlled-open-select-label">
                          Specialization
                        </InputLabel>
                        <Select
                          disabled={true}
                          labelId="demo-controlled-open-select-label"
                          id="specialization"
                          value={doctorData.specialization || ""}
                          onChange={() => {}}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          {specializations.length > 0 &&
                            specializations.map((i) => {
                              return (
                                <MenuItem value={i.value}>{i.label}</MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled={isEditing ? false : true}
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={address1 || ""}
                        fullWidth
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled={isEditing ? false : true}
                        id="City"
                        label="City"
                        variant="outlined"
                        value={city || ""}
                        fullWidth
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        disabled={isEditing ? false : true}
                        id="Country"
                        label="Country"
                        variant="outlined"
                        disabled={true}
                        value={getCountryNameFromId(doctorData.country) || ""}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                {isEditing && (
                  <Box display="flex" justifyContent="end" m={2}>
                    <Button
                      onClick={handleUpdate}
                      variant="contained"
                      color="primary"
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </Card>
            </form>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Index;
