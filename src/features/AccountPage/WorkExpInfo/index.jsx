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
  Link,
  makeStyles,
  Paper,
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
import CloseIcon from "@material-ui/icons/Close";
import uploadImg from "../../../assets/img/upload_placeholder.svg";

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
  eduInfoList: {
    backgroundColor: "#F4F6F8",
    marginTop: "10px",
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
        <form action="#" noValidate autoComplete={false}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography variant="h6">Add Work Experience</Typography>
                </Box>
                <Divider />
                <Box p={3}>
                  <Grid container item spacing={3}>
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
                    <Grid item xs={12}>
                      {selectedFile.file ? (
                        <Paper variant="outlined">
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            px={2}
                          >
                            <Box>
                              <Typography variant="overline">
                                {selectedFile.file.name}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton
                                onClick={() => {
                                  setSelectedFile({
                                    base64URL: null,
                                    file: null,
                                  });
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      ) : (
                        <Paper my={2} p={3} variant="outlined" component={Box}>
                          <input
                            id="icon-button-file"
                            type="file"
                            name="file"
                            accept="application/pdf"
                            onChange={handleFileInputChange}
                            className={classes.input}
                          />
                          <label htmlFor="icon-button-file">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box>
                                <img
                                  src={uploadImg}
                                  alt="upload a file"
                                  width={100}
                                />
                              </Box>
                              <Box ml={2}>
                                <Typography variant="h6" component={Link}>
                                  Upload a Document
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      component={Link}
                                    >
                                      click here to upload any proof document
                                      you have.
                                    </Typography>
                                  </Box>
                                </Typography>
                              </Box>
                            </Box>
                          </label>
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="end" p={1}>
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
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography variant="h6">Work Experience's</Typography>
                </Box>
                <Divider />
                <Box p={2}>
                  <List dense={true}>
                    {workExpData.length > 0 ? (
                      workExpData.map((i) => {
                        return (
                          <Paper
                            elevation={0}
                            className={classes.eduInfoList}
                            p={3}
                            key={i.id}
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
                                      )} - ${moment(i.endDate).format(
                                        "YYYY-MM-DD"
                                      )}`}
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
                          </Paper>
                        );
                      })
                    ) : (
                      <h3>No Data</h3>
                    )}
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Index;
