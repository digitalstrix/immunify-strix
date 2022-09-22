import useAvatar from "../../../../assets/img/userAvatar.png";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "../../../../common/components/Admin/Dialog";
import {
  Event as EventIcon,
  ChildCare as ChildCareIcon,
  LocalHospital as SpecializationIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@material-ui/icons";
import {
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Typography,
  Paper,
  Box,
  TextField,
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  Collapse,
  Modal,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedDoctorAppointmentTypes,
  selectSelectedDoctorInfo,
  getSelectedAppointmentType,
  selectSelectedDoctorAppointmentTypeDates,
  getSelectedAppointmentDate,
  getLoggedInParentId,
  selectSelectedDoctorAppointmentTypeTimes,
  selectIsForChildState,
  selectIsFree,
  selectMyChildrenList,
  selectFreeChildren,
  selectSelectedDoctorSessions,
} from "./selector";
import {
  getAllChildrenHaveFreeQuaterAsync,
  getDoctorAppointmentTypesAsync,
  getSelectedAppointmentTypeDates,
  setSelectedAppointmentDate,
  setSelectedAppointmentType,
  setServiceId,
  getAvailableTimesAsync,
  setSelectedAppointmentTime,
  setForChild,
  setSelectedChild,
} from "../DocSearchForm/findADoctorSlice";
import DoctorMoreInfoDialog from "./DoctorMoreInfoDialog";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: 2,
  },
  infoBtn: {
    textTransform: "none",
    borderRadius: 50,
  },
});

const Step1 = ({ data }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const docData = useSelector(selectSelectedDoctorInfo) || {};
  const dates = useSelector(selectSelectedDoctorAppointmentTypeDates);
  const times = useSelector(selectSelectedDoctorAppointmentTypeTimes);
  const doctorAppointmentTypes = useSelector(
    selectSelectedDoctorAppointmentTypes
  );
  const doctorSessions = useSelector(selectSelectedDoctorSessions);
  const selectedAppointmentType = useSelector(getSelectedAppointmentType) || {};
  const selectedAppointmentDate = useSelector(getSelectedAppointmentDate) || {};
  const personId = useSelector(getLoggedInParentId);
  const isForChild = useSelector(selectIsForChildState);
  const isFreeState = useSelector(selectIsFree);
  const myAllChidrenList = useSelector(selectMyChildrenList);
  const freeChildren = useSelector(selectFreeChildren);
  const [moreInfoState, setMoreInfoState] = useState(false);

  const availableAppointmentTypes = doctorAppointmentTypes.filter((item) =>
    doctorSessions.find(
      (element) => element.appoinmentType === item.appoinmentType
    )
  );

  const handleOpen = () => setMoreInfoState(true);
  const handleClose = () => setMoreInfoState(false);

  const {
    firstName,
    lastName,
    contact,
    hospitalClinic,
    specializationName,
    consultationData,
    id,
    email,
    specialization,
    profilePicture,
    degree,
    isFree,
  } = data;

  useEffect(() => {
    dispatch(setServiceId(4));
    dispatch(getDoctorAppointmentTypesAsync({ doctorId: id }));
    return () => {
      // dispatch(setSelectedDoctorAppointmentTypes([]));
    };
  }, [dispatch]);

  return (
    <div>
      <Dialog
        tooltip="More Info.."
        dialogtitle="More Info"
        dialogcontent={<DoctorMoreInfoDialog data={docData} />}
        maxWidth="sm"
        open={moreInfoState}
        handleClose={() => handleClose()}
        handleOpen={() => handleOpen()}
      />
      <Card className={classes.root}>
        <Grid container row spacing={2}>
          <Grid item xs={4}>
            <CardContent>
              {profilePicture !== "" ? (
                <img
                  src={profilePicture}
                  onError={(e) => (e.target.src = useAvatar)}
                  style={{ width: 150, height: "auto", borderRadius: "50%" }}
                  alt="avatar"
                />
              ) : (
                <Avatar style={{ width: 150, height: 150, fontSize: 100 }}>
                  {firstName?.charAt(0)}
                </Avatar>
              )}
            </CardContent>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{
              marginRight: 10,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Grid item xs={4}>
            <Box>
              <Typography
                style={{ fontSize: 20, fontWeight: 10 }}
                display="block"
                gutterBottom
              >
                {`Dr. ${firstName || ""} ${lastName || ""}`}
              </Typography>
              <Button
                startIcon={<InfoOutlinedIcon />}
                variant="outlined"
                size="small"
                className={classes.infoBtn}
                onClick={() => handleOpen()}
              >
                More Info...
              </Button>
              <Box mt={3}>
                <Divider
                  dark
                  variant="full"
                  style={{ width: "100%", marginBottom: 10 }}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                <SpecializationIcon style={{ marginBottom: -7 }} />
                {specializationName}
              </Typography>
            </Box>
            <Box md={12}>
              <table>
                <tr>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      State
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {docData?.basicDetails?.state || ""}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      Degree
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {!docData?.additionalData?.education.length
                        ? " Not Added"
                        : docData?.additionalData?.education[0].digree +
                          " - " +
                          docData?.additionalData?.education[0].university}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      Hospital
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {docData?.additionalData?.hospitalClinic || "Not Added"}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      Experience
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption" display="block" gutterBottom>
                      {!docData?.additionalData?.experiance ||
                      docData?.additionalData?.experiance === undefined ||
                      !docData?.additionalData?.experiance.length
                        ? " Not Added"
                        : docData?.additionalData?.experiance[0].hospitalClinic}
                    </Typography>
                  </td>
                </tr>{" "}
              </table>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Card className={classes.root} style={{ marginTop: 20 }}>
        <Paper>
          <Box p={3}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <Grid md={6}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <Autocomplete
                        id="item"
                        options={availableAppointmentTypes}
                        getOptionLabel={(option) => option.appoinmentType}
                        fullWidth
                        onChange={(e, x) => {
                          dispatch(setSelectedAppointmentType(x));
                          dispatch(
                            getSelectedAppointmentTypeDates({
                              doctorId: id,
                              appoinmentType: x?.appoinmentType,
                              isFree: isFreeState,
                            })
                          );

                          if (x?.appoinmentType === "Telemedicine") {
                            setServiceId(4);
                          } else {
                            setServiceId(5);
                          }

                          dispatch(
                            getAllChildrenHaveFreeQuaterAsync({
                              parentImmId: personId,
                              serviceId:
                                x?.appoinmentType === "Telemedicine" ? 4 : 5,
                            })
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select a Plan"
                            variant="outlined"
                          />
                        )}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid md={6}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <Autocomplete
                        id="item"
                        options={dates}
                        getOptionLabel={(option) => option.date}
                        fullWidth
                        disabled={!selectedAppointmentType.appoinmentType}
                        onChange={(e, x) => {
                          dispatch(setSelectedAppointmentDate(x));
                          if (x?.appoinmentType === "Telemedicine") {
                            setServiceId(4);
                          } else {
                            setServiceId(5);
                          }

                          dispatch(
                            getAvailableTimesAsync({
                              id: id,
                              date: x?.date,
                              appoinmentType:
                                selectedAppointmentType?.appoinmentType,
                              isFree,
                            })
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Pick a date"
                            variant="outlined"
                          />
                        )}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid md={6}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                      <ListItemIcon>
                        <EventIcon />
                      </ListItemIcon>
                      <Autocomplete
                        id="item"
                        options={times}
                        getOptionLabel={(option) => option.time}
                        fullWidth
                        disabled={!selectedAppointmentDate.date}
                        onChange={(e, x) =>
                          dispatch(setSelectedAppointmentTime(x))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Pick a time slot"
                            variant="outlined"
                          />
                        )}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Card>

      <Card className={classes.root} style={{ marginTop: 20 }}>
        <Paper>
          <Box p={3}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="button">Consultation Plans</Typography>
              </Grid>
              <Divider
                dark
                variant="full"
                style={{ width: "100%", marginBottom: 10 }}
              />
              <Grid item xs={12}>
                <List dense={false}>
                  {doctorAppointmentTypes.map((item) => {
                    return (
                      <>
                        <ListItem>
                          <ListItemText primary={`${item.appoinmentType} :`} />
                          <ListItemText primary={"₹ " + item.amount} />
                        </ListItem>
                        <Divider variant="inset" />
                      </>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Card>

      <Card className={classes.root} style={{ marginTop: 20 }}>
        <Paper>
          <Box p={3}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={
                        <Switch
                          color="primary"
                          checked={isFreeState ? true : isForChild}
                          disabled={isFreeState}
                          onChange={() => {
                            dispatch(setForChild(!isForChild));
                            if (isForChild) {
                              dispatch(setSelectedChild(null));
                            }
                          }}
                        />
                      }
                      label="For Your Child? "
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Collapse in={isFreeState || isForChild}>
            <Box p={3}>
              <Divider
                dark
                variant="full"
                style={{ width: "100%", marginBottom: 10, marginTop: -20 }}
              />
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <Grid md={6}>
                    <List component="nav" aria-label="main mailbox folders">
                      <ListItem>
                        <ListItemIcon>
                          <ChildCareIcon />
                        </ListItemIcon>
                        <Autocomplete
                          id="item"
                          options={
                            !isFreeState ? myAllChidrenList : freeChildren
                          }
                          getOptionLabel={(option) => option.fullName}
                          fullWidth
                          onChange={(e, x) => dispatch(setSelectedChild(x))}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Your Child"
                              variant="outlined"
                            />
                          )}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Paper>
      </Card>
    </div>
  );
};

export default Step1;
