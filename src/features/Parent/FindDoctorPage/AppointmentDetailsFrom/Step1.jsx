import React, { useState } from "react";
//material
import {
  Avatar,
  Grid,
  Paper,
  Card,
  Box,
  Typography,
  Button,
  makeStyles,
  Divider,
  styled,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";

//icons
import {
  Event as EventIcon,
  ChildCare as ChildCareIcon,
  LocalHospital as SpecializationIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@material-ui/icons";

//redux
import { useDispatch, useSelector } from "react-redux";

//
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
import Dialog from "../../../../common/components/Admin/Dialog";
import useAvatar from "../../../../assets/img/userAvatar.png";
import { Autocomplete } from "@material-ui/lab";

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
  specilization: {
    fontWeight: "bold",
  },
  listTitle: {
    color: "#637381",
    fontWeight: "bold",
  },
  heading: {
    fontWeight: "bold",
  },
  consPlanPrice: {
    fontWeight: "bold",
  },
});

const CustomListItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});
const ConsultaionPlanCard = styled(Card)({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  marginRight: 20,
});

function Step1({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
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
  return (
    <>
      <Dialog
        tooltip="More Info.."
        dialogtitle="More Info"
        dialogcontent={<DoctorMoreInfoDialog data={docData} />}
        maxWidth="sm"
        open={moreInfoState}
        handleClose={() => handleClose()}
        handleOpen={() => handleOpen()}
      />
      <form action="#" autoComplete={false} noValidate>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper elevation={4}>
              <Box p={3} align="center">
                <Box>
                  {profilePicture !== "" ? (
                    <img
                      src={profilePicture}
                      onError={(e) => (e.target.src = useAvatar)}
                      style={{
                        width: 100,
                        height: "auto",
                        borderRadius: "50%",
                      }}
                      alt="avatar"
                    />
                  ) : (
                    <Avatar style={{ width: 150, height: 150, fontSize: 100 }}>
                      {firstName?.charAt(0)}
                    </Avatar>
                  )}
                </Box>

                <Typography variant="h5">
                  {`Dr. ${firstName || ""} ${lastName || ""}`}
                </Typography>
                <Box p={2}>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Specilaization:
                    </Typography>
                    <Typography variant="h6" className={classes.specilization}>
                      {specializationName}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      State:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {docData?.basicDetails?.state || ""}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Degree:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {!docData?.additionalData?.education.length ? (
                        <Box component="span" style={{ color: "#ccc" }}>
                          Not Added
                        </Box>
                      ) : (
                        docData?.additionalData?.education[0].digree +
                        " - " +
                        docData?.additionalData?.education[0].university
                      )}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Hospital:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {docData?.additionalData?.hospitalClinic || "Not Added"}
                    </Typography>
                  </CustomListItem>
                  <CustomListItem>
                    <Typography
                      variant="overline"
                      className={classes.listTitle}
                    >
                      Experience:
                    </Typography>
                    <Typography variant="p" className={classes.value}>
                      {!docData?.additionalData?.experiance ||
                      docData?.additionalData?.experiance === undefined ||
                      !docData?.additionalData?.experiance.length
                        ? " Not Added"
                        : docData?.additionalData?.experiance[0].hospitalClinic}
                    </Typography>
                  </CustomListItem>
                </Box>
                <Button
                  startIcon={<InfoOutlinedIcon />}
                  variant="outlined"
                  size="small"
                  className={classes.infoBtn}
                  onClick={() => handleOpen()}
                >
                  More Info...
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={8} xs={12}>
            <Paper elevation={4}>
              <Box p={3}>
                <Typography variant="h6" className={classes.heading}>
                  Consultation Plans
                </Typography>
                <Box display="flex" my={2}>
                  {doctorAppointmentTypes.map((item) => {
                    return (
                      <ConsultaionPlanCard variant="outlined">
                        <Typography className={classes.listTitle}>
                          {item.appoinmentType}:
                        </Typography>
                        <Typography
                          color="primary"
                          className={classes.consPlanPrice}
                          variant="h4"
                        >
                          ₹ {item.amount}
                        </Typography>
                      </ConsultaionPlanCard>
                    );
                  })}
                </Box>
              </Box>
            </Paper>
            <Box mt={5}>
              <Paper elevation={4}>
                <Box p={3}>
                  <Typography variant="h6" className={classes.heading}>
                    Select a Plan
                  </Typography>
                  <Box my={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Autocomplete
                          id="item"
                          options={availableAppointmentTypes}
                          getOptionLabel={(option) => option.appoinmentType}
                          fullWidth
                          size="small"
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="item"
                          options={dates}
                          getOptionLabel={(option) => option.date}
                          fullWidth
                          size="small"
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          id="item"
                          options={times}
                          getOptionLabel={(option) => option.time}
                          fullWidth
                          size="small"
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
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Box>
            <Box mt={5}>
              <Paper elevation={4}>
                <Box p={3}>
                  <FormGroup row>
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
                  <Collapse in={isFreeState || isForChild}>
                    <Box p={2}>
                      <Autocomplete
                        id="item"
                        options={!isFreeState ? myAllChidrenList : freeChildren}
                        getOptionLabel={(option) => option.fullName}
                        fullWidth
                        size="small"
                        onChange={(e, x) => dispatch(setSelectedChild(x))}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Your Child"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Step1;
