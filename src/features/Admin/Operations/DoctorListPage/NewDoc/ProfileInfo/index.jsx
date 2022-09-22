import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SearchLocationInput from "../../../../../../common/components/SearchLocationInput";
import {
  countryToFlag,
  processLocationInput,
  getSelectedFileByElementId,
  notify,
} from "../../../../../../utils/commonUtils";
import { validateProfileInput } from "../../../../../../utils/doctorListUtils";
import {
  selectCountries,
  selectCountryLoadingStatus,
  selectProfilePictureUploadingStatus,
  selectProfileDataUpdatingStatus,
  selectProfileDataUpdatingError,
} from "../../selector";
import { getCountries } from "../../../../../Country/countrySlice";
import {
  updateDoctorProfileInfo,
  uploadProfilePicture,
} from "../../doctorListSlice";

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
}));

const PROFILE_IMAGE_INPUT_ID = "contained-button-file-profile";
const PROFILE_IMAGE_PREVIEW_ID = "contained-button-file-profile-preview";

const IMG_WIDTH = 200;
const IMG_HEIGHT = 200;

const PROFILE_PIC_UPDATED_SUCCESSFULLY_MSG = "Profile picture updated successfully!";
const PROFILE_PIC_UPDATED_FAILURE_MSG = "Profile picture updating failed!";
const PROFILE_DATA_UPDATED_SUCCESSFULLY_MSG = "Profile data updated successfully!";
const PROFILE_DATA_UPDATED_FAILURE_MSG = "Profile data updating failed!";

const handleFileSelect = (fileInputId, imageId, stateUpdater) => {
  const image = getSelectedFileByElementId(fileInputId);
  stateUpdater(image);
  if (image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const element = document.getElementById(imageId);
      if (element) {
        element.setAttribute("src", e.target.result);
        element.setAttribute("width", IMG_WIDTH);
        element.setAttribute("height", IMG_HEIGHT);
      }
    };

    reader.readAsDataURL(image);
  }
};

const Index = ({
  updateAction,
  values,
  errorProps,
  updateErrorProps,
  specializations,
  isUpdate = false,
  profilePicture = null,
  doctorCreated = false,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const countries = useSelector(selectCountries);
  const countryLoadingState = useSelector(selectCountryLoadingStatus);
  const profilePicUploadingStatus = useSelector(
    selectProfilePictureUploadingStatus
  );

  const [retryCount, setCount] = useState(0);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (countryLoadingState === "idle" || countryLoadingState === "failed") {
      if (retryCount < 3) {
        dispatch(getCountries());
        setCount(retryCount + 1);
      }
    }
    console.log(countryLoadingState);
  }, [dispatch, countryLoadingState, retryCount, setCount]);

  const [errors, setErrors] = useState({});
  const handleChange = ({ target: { name, value } }) => {
    updateAction({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateProfileInput({ name, value }),
    });
  };

  useEffect(() => {
    if (errorProps) {
      setErrors({
        ...errors,
        ...errorProps,
      });
      updateErrorProps(null);
    }
  }, [errorProps, errors, updateErrorProps]);

  const updatingStatus = useSelector(selectProfileDataUpdatingStatus);
  const updatingError = useSelector(selectProfileDataUpdatingError);

  useEffect(() => {
    if (updatingStatus === "succeeded") {
      notify(enqueueSnackbar, PROFILE_DATA_UPDATED_SUCCESSFULLY_MSG);
    } else if (updatingStatus === "failed") {
      notify(enqueueSnackbar, PROFILE_DATA_UPDATED_FAILURE_MSG, "error");
    }
  }, [updatingStatus, updatingError, enqueueSnackbar]);

  useEffect(() => {
    if (profilePicUploadingStatus === "succeeded") {
      notify(enqueueSnackbar, PROFILE_PIC_UPDATED_SUCCESSFULLY_MSG);
    } else if (profilePicUploadingStatus === "failed") {
      notify(enqueueSnackbar, PROFILE_PIC_UPDATED_FAILURE_MSG, "error");
    }
  }, [profilePicUploadingStatus, enqueueSnackbar]);

  const renderPreview = (profilePicture, selectedImage) => {
    if (!profilePicture && !selectedImage) {
      return (
        <Avatar
          id={PROFILE_IMAGE_PREVIEW_ID}
          alt="Profile"
          src={"/static/images/avatar/1.jpg"}
          className={classes.large}
        />
      );
    }
    return (
      <img
        id={PROFILE_IMAGE_PREVIEW_ID}
        alt="Profile"
        src={profilePicture || "/static/images/avatar/1.jpg"}
        className={classes.large}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Container size="sm">
        <Grid container row spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  {renderPreview(profilePicture, profileImage)}
                </Box>
                <Typography variant="h5" align="center">
                  <Box fontWeight={500} mt={2}>
                    {values.email}
                  </Box>
                </Typography>
                {values.status ? (
                  <Box mt={1} textAlign="center">
                    <Typography variant="p" paragraph={true}>
                      Status:{" "}
                      <Typography component="a">{values.status}</Typography>
                    </Typography>
                  </Box>
                ) : null}
              </CardContent>
              <CardActions>
                {(values.id || doctorCreated) && (
                  <Box fullWidth m={2}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id={PROFILE_IMAGE_INPUT_ID}
                      multiple
                      type="file"
                      fullWidth
                      onChange={() =>
                        handleFileSelect(
                          PROFILE_IMAGE_INPUT_ID,
                          PROFILE_IMAGE_PREVIEW_ID,
                          setProfileImage
                        )
                      }
                    />
                    <Button
                      variant="contained"
                      color="inherit"
                      component="span"
                      size="small"
                      fullWidth={true}
                      onClick={() => {
                        console.log("uploading");
                        dispatch(uploadProfilePicture(profileImage));
                      }}
                    >
                      Upload Image
                    </Button>
                  </Box>
                )}
              </CardActions>
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
                        name="firstName"
                        id="filled-name"
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        value={values.firstName}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="lastName"
                        id="filled-name"
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        value={values?.lastName?.replace('null','')}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="email"
                        id="Email"
                        label="Email Address"
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        value={values.email}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="contactNumber"
                        id="number"
                        label="Contact Number (0-xxxxxxxxxxx)"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={handleChange}
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber}
                        value={values.contactNumber}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="registrationNumber"
                        id="reg_num"
                        label="Registration Number"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={handleChange}
                        error={!!errors.registrationNumber}
                        helperText={errors.registrationNumber}
                        value={values.registrationNumber}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="specialization"
                        disableClearable
                        options={specializations}
                        getOptionLabel={(option) => option.label}
                        value={values.specialization}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Specialization"
                            variant="outlined"
                            required
                            error={!!errors.specialization}
                            helperText={errors.specialization}
                          />
                        )}
                        onChange={(e, value) =>
                          handleChange({
                            target: { name: "specialization", value },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="address"
                        id="address"
                        label="Address"
                        variant="outlined"
                        // value="Colombo" replace with auto complete component
                        fullWidth
                        required
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        value={values.address}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SearchLocationInput
                        country={
                          values.country ? values.country.countryCode : ""
                        }
                        value={values.city}
                        onChange={(value) => {
                          const { lat, lng, ...rem } = processLocationInput(
                            value,
                            true
                          );
                          updateAction({
                            ...values,
                            ...rem,
                            latitude: lat,
                            longitude: lng,
                          });
                        }}
                        error={!!errors.city}
                        disabled={
                          !values.country || !values.country.countryCode
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="country-select-demo"
                        style={{ width: 300 }}
                        disableClearable
                        options={countries}
                        classes={{
                          option: classes.option,
                        }}
                        autoHighlight
                        required
                        getOptionLabel={(option) => option.countryName}
                        onChange={(e, value) =>
                          handleChange({
                            target: { name: "country", value },
                          })
                        }
                        renderOption={(option) => (
                          <React.Fragment>
                            <span>{countryToFlag(option.countryCode)}</span>
                            {option.countryName} ({option.countryCode})
                          </React.Fragment>
                        )}
                        // defaultValue={values.country}
                        value={values.country}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            variant="outlined"
                            error={!!errors.country}
                            helperText={errors.country}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                            required
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                {isUpdate && (
                  <React.Fragment>
                    <Divider />
                    <Box display="flex" justifyContent="end" m={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={updatingStatus === "loading"}
                        onClick={() => {
                          dispatch(
                            updateDoctorProfileInfo({
                              docId: values.id,
                              firstName: values.firstName,
                              lastName: values.lastName,
                              email: values.email,
                              phone: values.contact,
                              regNo: values.registrationNumber,
                              specializationId: values.specializationId,
                              city: values.city,
                              address: values.address,
                            })
                          );
                        }}
                      >
                        {updatingStatus === "loading"
                          ? "Updating..."
                          : "Save Changes"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;

const specialization = [
  { title: "Community child health" },
  { title: "General Prediction" },
];

const country = [{ title: "Sri Lanka" }, { title: "India" }];
