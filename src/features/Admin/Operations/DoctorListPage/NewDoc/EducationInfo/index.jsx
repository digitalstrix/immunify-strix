import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SchoolIcon from "@material-ui/icons/School";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { notify } from "../../../../../../utils/commonUtils";
import Dialog from "../../../../../../common/components/Admin/Dialog";
import { useSnackbar } from "notistack";
import EditEducation from "./EditEducationInfo";
import {
  addEducationInfo,
  deleteEducationInfo,
  getEducationInfo,
} from "../../doctorListSlice";
import {
  getSelectedDoctorId,
  selectAddingEducationError,
  selectAddingEducationStatus,
  selectDeletingEducationError,
  selectDeletingEducationStatus,
  selectDoctorCountry,
  selectDoctorEducationData,
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
}));

const Index = ({
  updateAction,
  values,
  errorProps,
  updateErrorProps,
  isUpdate = false,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const doctorId = useSelector(getSelectedDoctorId);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
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

  const DELETE_EDUCATION_SUCCEESFUL_MSG = "Education Record Deleted Successfully!";
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
      setDegree(null);
      setUniversity(null);
      setPassingDate(null);
      setSelectedFile({
        base64URL: null,
        file: null,
      })
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
    <div>
      <div className={classes.root}>
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
        <form>
          <Grid container justify="center">
            <Card className={classes.card} mt={3}>
              <CardHeader
                title="Education"
                titleTypographyProps={{
                  variant: "h6",
                }}
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Passing Date"
                        fullWidth
                        format="MM/dd/yyyy"
                        value={passingDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(date) => setPassingDate(date)}
                        clearable
                        maxDate={new Date()}
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
                        documentType: selectedFile?.base64URL ? "files" : null,
                        selectedPdf: selectedFile.base64URL
                          ? selectedFile?.base64URL || null
                          : null,
                        docCountry: doctorCountry,
                        immId: doctorId,
                      })
                    );
                  }}
                >
                  {educationAddingStatus === "loading" ? "Loading.." : "Submit"}
                </Button>
              </Box>
            </Card>
          </Grid>
        </form>
      </div>
      <div className="">
        <Grid container justify="center">
          <List dense={true}>
            {educationData.length > 0 ? (
              educationData.map((i) => {
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
                        primary={"Degree: " + i.digree}
                        secondary={
                          <div>
                            <div>University: {i.university}</div>
                            <div>
                              PassingDate:{" "}
                              {moment(i.parsingDate).format("YYYY-MM-DD")}
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
      </div>
    </div>
  );
};

export default Index;
