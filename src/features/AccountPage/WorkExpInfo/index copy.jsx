import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SchoolIcon from "@material-ui/icons/School";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Dialog from "../../../common/components/Admin/Dialog";
import EditWorkExp from "./EditWorkExp";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkExperienceInfo,
  addWorkExperienceInfo,
  deleteWorkExperienceInfo,
} from "./workExperienceInfoSlice";
import {
  selectDoctorWorkExpData,
  getLoggedInDoctorId,
  selectDoctorCountry,
  selectAddingWorkExpError,
  selectAddingWorkExpStatus,
  selectDeletingWorkExpError,
  selectDeletingWorkExpStatus,
} from "./selector";
import moment from "moment";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

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

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const doctorId = useSelector(getLoggedInDoctorId);
  const doctorCountry = useSelector(selectDoctorCountry);

  const workExpAddingStatus = useSelector(selectAddingWorkExpStatus);
  const workExpAddingError = useSelector(selectAddingWorkExpError);

  const workExpDeletingStatus = useSelector(selectDeletingWorkExpStatus);
  const workExpDeletingError = useSelector(selectDeletingWorkExpError);

  const [updatingData, setUpdatingData] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [address, setAddress] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });

  useEffect(() => {
    dispatch(getWorkExperienceInfo(doctorId));
  }, [dispatch, workExpDeletingStatus]);

  const ADD_WORK_EXP_SUCCEESFUL_MSG =
    "Work Experience Record Updated Successfully!";
  const ADD_WORK_EXP_FAILURE_MSG = "Work Experience  Record Updated Failed!";

  const DELETE_WORK_EXP_SUCCEESFUL_MSG =
    "Work Experience Record Deleted Successfully!";
  const DELETE_WORK_EXP_FAILURE_MSG = "Work Experience Record Deleting Failed!";

  useEffect(() => {
    if (workExpDeletingStatus === "succeeded") {
      notify(enqueueSnackbar, DELETE_WORK_EXP_SUCCEESFUL_MSG);
    } else if (workExpDeletingStatus === "failed") {
      notify(enqueueSnackbar, DELETE_WORK_EXP_FAILURE_MSG, "danger");
    }
    dispatch(getWorkExperienceInfo(doctorId));
  }, [workExpDeletingStatus, workExpDeletingError, enqueueSnackbar]);

  useEffect(() => {
    if (workExpAddingStatus === "succeeded") {
      setOpenDialog(false);
      notify(enqueueSnackbar, ADD_WORK_EXP_SUCCEESFUL_MSG);
    } else if (workExpAddingStatus === "failed") {
      notify(enqueueSnackbar, ADD_WORK_EXP_FAILURE_MSG, "error");
    }
    dispatch(getWorkExperienceInfo(doctorId));
  }, [workExpAddingStatus, workExpAddingError, enqueueSnackbar]);

  const workExpData = useSelector(selectDoctorWorkExpData);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let { file } = selectedFile;
    file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setSelectedFile({
          base64URL: result.split(",")[1],
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedFile({
      file: e.target.files[0],
    });
  };

  const handleDelete = (i) => {
    dispatch(deleteWorkExperienceInfo(i.id));
  };

  return (
    <div>
      <div className={classes.root}>
        <Dialog
          tooltip="Edit Work Experience Info"
          dialogtitle="Edit Work Experience Info"
          dialogcontent={
            <EditWorkExp data={{ ...updatingData, doctorCountry, doctorId }} />
          }
          maxWidth="sm"
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleOpen={() => setOpenDialog(true)}
        />
        <form>
          <Grid container justify="center">
            <Grid item xs={12} md={8}>
              <Card className={classes.card} mt={3}>
                <CardHeader
                  title="Work Experience"
                  titleTypographyProps={{
                    variant: "h6",
                  }}
                />
                <Divider />
                <CardContent>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="Hospital"
                        label="Hospital / Clinic Name"
                        required
                        variant="outlined"
                        value={hospital}
                        margin="normal"
                        fullWidth
                        onChange={(e) => setHospital(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="address"
                        label="Hospital / Clinic Address"
                        required
                        variant="outlined"
                        value={address}
                        margin="normal"
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          variant="inline"
                          inputVariant="outlined"
                          label="Start Date"
                          placeholder="Pick a starting date"
                          fullWidth
                          format="MM/dd/yyyy"
                          value={startDate}
                          InputAdornmentProps={{ position: "start" }}
                          onChange={(date) => setStartDate(date)}
                          clearable
                          maxDate={new Date()}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          variant="inline"
                          inputVariant="outlined"
                          label="End Date"
                          placeholder="Pick a End date"
                          fullWidth
                          format="MM/dd/yyyy"
                          value={endDate}
                          InputAdornmentProps={{ position: "start" }}
                          onChange={(date) => setEndDate(date)}
                          clearable
                          maxDate={new Date()}
                          minDate={startDate || null}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <input
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={handleFileInputChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="end" m={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      workExpAddingStatus === "loading" ||
                      hospital === "" ||
                      hospital === null ||
                      address === null ||
                      address === "" ||
                      startDate === null ||
                      startDate === "" ||
                      endDate === null ||
                      endDate === ""
                    }
                    onClick={() => {
                      dispatch(
                        addWorkExperienceInfo({
                          address,
                          startDate,
                          endDate,
                          hospital,
                          documentType: selectedFile?.base64URL
                            ? "files"
                            : null,
                          selectedPdf: selectedFile.base64URL
                            ? selectedFile?.base64URL || null
                            : null,
                          docCountry: doctorCountry,
                          immId: doctorId,
                        })
                      );
                    }}
                  >
                    {workExpAddingStatus === "loading" ? "Loading.." : "Submit"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="">
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <List dense={true}>
              {workExpData.length > 0 ? (
                workExpData.map((i) => {
                  return (
                    <Card
                      key={i.id}
                      className={classes.card}
                      style={{ width: "500px", marginBottom: "10px" }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <SchoolIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Hospital: " + i.hospitalClinic}
                          secondary={
                            <div>
                              <div>Address: {i.address}</div>
                              <div>
                                Service Period:{" "}
                                {`${moment(i.startDate).format(
                                  "YYYY-MM-DD"
                                )} - ${moment(i.endDate).format("YYYY-MM-DD")}`}
                              </div>
                            </div>
                          }
                        />

                        <ListItemSecondaryAction>
                          {i.url && (
                            <IconButton
                              edge="end"
                              onClick={() => {
                                window.open(
                                  i.url,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                              aria-label="preview"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => {
                              setUpdatingData(i);
                              setOpenDialog(true);
                            }}
                            edge="end"
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(i)}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                  );
                })
              ) : (
                <h3>No Data</h3>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Index;
