import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Checkbox,
  ListItemText,
  Input,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Search from "@material-ui/icons/SearchOutlined";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";
import {
  findDoctors,
  getAllChildrenHaveFreeQuaterAsync,
  getSpecializations,
  getSymptoms,
} from "./findADoctorSlice";
import {
  getFilteredDoctorList,
  getLoggedInUserId,
  selectSearchingDoctorStatus,
  selectSpecializationsList,
  selectSymptomsList,
} from "./selector";
import { selectFreeChildren } from "../AppointmentDetailsFrom/selector";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Index = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospital, setHospital] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const specializationOptions = useSelector(selectSpecializationsList) || [];
  const symptomsOptions = useSelector(selectSymptomsList) || [];
  const searchingStatus = useSelector(selectSearchingDoctorStatus);
  const doctorsFound = useSelector(getFilteredDoctorList);
  const freeChildren = useSelector(selectFreeChildren);
  const personId = useSelector(getLoggedInUserId);

  const NO_DOCTORS_FOUND = "No Doctors Found!";

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getSymptoms());
    dispatch(
      getAllChildrenHaveFreeQuaterAsync({ parentImmId: personId, serviceId: 4 })
    );
  }, [dispatch]);

  useEffect(() => {
    if (doctorsFound.length === 0 && searchingStatus === "succeeded") {
      notify(enqueueSnackbar, NO_DOCTORS_FOUND, "warning");
    } else if (searchingStatus === "succeeded" && doctorsFound.length > 0) {
      props.history.push("searchResult");
    }
  }, [searchingStatus, doctorsFound, enqueueSnackbar]);

  const handleChangeSpecializations = (event) => {
    setSelectedSpecializations(event.target.value);
  };

  const handleChangeSymptoms = (event) => {
    setSelectedSymptoms(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 100,
      },
    },
  };

  return (
    <>
      <form action="">
        <Paper>
          <Box p={3}>
            <Typography variant="h5" color="textPrimary" align="center">
              <Box fontWeight="bolder" my={2}>
                Find a Doctor
              </Box>
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="docName"
                  label="Doctor Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="hosName"
                  label="Hospital Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <label>Specializations</label>
                <Select
                  variant="outlined"
                  size="small"
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={selectedSpecializations}
                  onChange={handleChangeSpecializations}
                  input={<Input variant="outlined" size="small" fullWidth />}
                  renderValue={(selected) =>
                    selected.map((item) => item.name).join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {specializationOptions.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      <Checkbox
                        checked={
                          selectedSpecializations.find(
                            (item) => item.id === option.id
                          )
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (
                            selectedSpecializations.find(
                              (item) => item.id === option.id
                            )
                              ? true
                              : false
                          ) {
                            setSelectedSpecializations(
                              selectedSpecializations.filter(
                                (i) => i.id !== option.id
                              )
                            );
                          }
                        }}
                      />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    fullWidth
                    size="small"
                    label="Select Date"
                    value={selectedDate || null}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <label>Symptoms</label>
                <Select
                  variant="outlined"
                  size="small"
                  labelId="demo-mutiple-checkbox-label1"
                  id="demo-mutiple-checkbox1"
                  multiple
                  value={selectedSymptoms}
                  onChange={handleChangeSymptoms}
                  input={<Input variant="outlined" size="small" fullWidth />}
                  renderValue={(selected) =>
                    selected.map((item) => item.name).join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {symptomsOptions.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      <Checkbox
                        checked={
                          selectedSymptoms.find((item) => item.id === option.id)
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (
                            selectedSymptoms.find(
                              (item) => item.id === option.id
                            )
                              ? true
                              : false
                          ) {
                            setSelectedSymptoms(
                              selectedSymptoms.filter((i) => i.id !== option.id)
                            );
                          }
                        }}
                      />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} align="right">
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={
                        <Switch
                          disabled={freeChildren.length === 0}
                          color="primary"
                          checked={isFree}
                          onChange={() => setIsFree(!isFree)}
                        />
                      }
                      label="Free Consultation. (Only for subscribed users)"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    startIcon={<Search />}
                    variant="contained"
                    sie="small"
                    fullWidth
                    disabled={
                      searchingStatus === "loading" ||
                      ((doctorName === "" || !doctorName) &&
                        (hospital === "" || !hospital) &&
                        (selectedSpecializations.length === 0 ||
                          !selectedSpecializations) &&
                        (selectedDate === "" || !selectedDate) &&
                        (selectedSymptoms.length === 0 || !selectedSymptoms))
                    }
                    onClick={() => {
                      dispatch(
                        findDoctors({
                          date: selectedDate,
                          fullName: doctorName,
                          hospital,
                          isFree,
                          specialization: selectedSpecializations,
                          symptom: selectedSymptoms,
                        })
                      );
                    }}
                    color="primary"
                  >
                    {searchingStatus === "loading" ? "Searching..." : "Search"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </>
  );
};

export default withRouter(Index);
