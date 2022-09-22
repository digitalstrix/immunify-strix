import React, { useState, useEffect, useRef } from "react";
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
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";

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
import EditEducation from "./EditEducationInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  getEducationInfo,
  addEducationInfo,
  deleteEducationInfo,
} from "./educationInfoSlice";
import {
  selectDoctorEducationData,
  getLoggedInDoctorId,
  selectDoctorCountry,
  selectAddingEducationError,
  selectAddingEducationStatus,
  selectDeletingEducationError,
  selectDeletingEducationStatus,
} from "./selector";
import moment from "moment";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import uploadImg from "../../../assets/img/upload_placeholder.svg";

const useStyles = makeStyles((theme) => ({
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
  const uploadInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const doctorId = useSelector(getLoggedInDoctorId);
  const doctorCountry = useSelector(selectDoctorCountry);

  const educationAddingStatus = useSelector(selectAddingEducationStatus);
  const educationAddingError = useSelector(selectAddingEducationError);

  const educationDeletingStatus = useSelector(selectDeletingEducationStatus);
  const educationDeletingError = useSelector(selectDeletingEducationError);

  const [updatingData, setUpdatingData] = useState(null);
  const [degree, setDegree] = useState(null);
  const [university, setUniversity] = useState(null);
  const [passingDate, setPassingDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });

  useEffect(() => {
    dispatch(getEducationInfo({ immId: doctorId }));
  }, [dispatch, educationDeletingStatus]);

  const ADD_EDUCATION_SUCCEESFUL_MSG = "Education Record Updated Successfully!";
  const ADD_EDUCATION_FAILURE_MSG = "Education Record Updated Failed!";

  const DELETE_EDUCATION_SUCCEESFUL_MSG =
    "Education Record Deleted Successfully!";
  const DELETE_EDUCATION_FAILURE_MSG = "Education Record Deleting Failed!";

  useEffect(() => {
    if (educationDeletingStatus === "succeeded") {
      notify(enqueueSnackbar, DELETE_EDUCATION_SUCCEESFUL_MSG);
    } else if (educationDeletingStatus === "failed") {
      notify(enqueueSnackbar, DELETE_EDUCATION_FAILURE_MSG, "error");
    }
    dispatch(getEducationInfo({ immId: doctorId }));
  }, [educationDeletingStatus, educationDeletingError, enqueueSnackbar]);

  useEffect(() => {
    if (educationAddingStatus === "succeeded") {
      setOpenDialog(false);
      notify(enqueueSnackbar, ADD_EDUCATION_SUCCEESFUL_MSG);
    } else if (educationAddingStatus === "failed") {
      notify(enqueueSnackbar, ADD_EDUCATION_FAILURE_MSG, "danger");
    }
    dispatch(getEducationInfo({ immId: doctorId }));
  }, [educationAddingStatus, educationAddingError, enqueueSnackbar]);

  const educationData = useSelector(selectDoctorEducationData);

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
    dispatch(deleteEducationInfo(i.id));
  };

  return (
    <>
      <Box m={3}>
        <Dialog
          tooltip="Edit Education Info"
          dialogtitle="Edit Education Info"
          dialogcontent={
            <EditEducation
              data={{ ...updatingData, doctorCountry, doctorId }}
            />
          }
          maxWidth="sm"
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleOpen={() => setOpenDialog(true)}
        />
        <form action="#" noValidate autoComplete={false}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography variant="h6">Add Education</Typography>
                </Box>
                <Divider />
                <Box p={3}>
                  <TextField
                    id="Degree"
                    label="Degree"
                    required
                    variant="outlined"
                    value={degree}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setDegree(e.target.value)}
                  />
                  <TextField
                    id="University"
                    label="University"
                    required
                    variant="outlined"
                    value={university}
                    margin="normal"
                    onChange={(e) => setUniversity(e.target.value)}
                    fullWidth
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      fullWidth
                      placeholder="select a Date"
                      inputVariant="outlined"
                      label="Passing Date"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={passingDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => setPassingDate(date)}
                      clearable
                      maxDate={new Date()}
                    />
                  </MuiPickersUtilsProvider>
                  <Box mt={2}>
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
                          ref={uploadInputRef}
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
                            justifyContent="space-around"
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
                                    click here to upload any proof document you
                                    have.
                                  </Typography>
                                </Box>
                              </Typography>
                            </Box>
                          </Box>
                        </label>
                      </Paper>
                    )}
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="end" p={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      educationAddingStatus === "loading" ||
                      degree === "" ||
                      degree === null ||
                      university === null ||
                      university === "" ||
                      passingDate === null ||
                      passingDate === ""
                    }
                    onClick={() => {
                      dispatch(
                        addEducationInfo({
                          degree,
                          college: university,
                          passingDate,
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
                    {educationAddingStatus === "loading"
                      ? "Loading.."
                      : "Submit"}
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Paper elevation={2} square={false}>
                <Box p={2}>
                  <Typography variant="h6">
                    Education Qualification's
                  </Typography>
                </Box>
                <Divider />
                <Box p={2}>
                  <List dense={true}>
                    {educationData.length > 0 ? (
                      educationData.map((i) => {
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
                                primary={"Degree: " + i.digree}
                                secondary={
                                  <div>
                                    <div>University: {i.university}</div>
                                    <div>
                                      PassingDate:{" "}
                                      {moment(i.parsingDate).format(
                                        "YYYY-MM-DD"
                                      )}
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
      </Box>
    </>
  );
};

export default Index;
