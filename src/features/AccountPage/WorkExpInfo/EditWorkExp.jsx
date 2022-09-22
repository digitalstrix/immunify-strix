import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddingWorkExpStatus,
  getLoggedInDoctorId,
  selectDoctorCountry,
} from "./selector";
import { addWorkExperienceInfo } from "./workExperienceInfoSlice";

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

const Index = ({ data }) => {
  const dispatch = useDispatch();

  const doctorId = useSelector(getLoggedInDoctorId);
  const doctorCountry = useSelector(selectDoctorCountry);
  const workExpAddingStatus = useSelector(selectAddingWorkExpStatus);

  const classes = useStyles();
  const [hospital, setHospital] = useState(data.hospitalClinic || null);
  const [address, setAddress] = useState(data.address || null);
  const [startDate, setStartDate] = useState(data.startDate || null);
  const [endDate, setEndDate] = useState(data.endDate || null);
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });

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

  return (
    <form>
      <Divider />
      <DialogContent>
        <Box p={3}>
          <Grid container justify="center">
            <Grid container spacing={3}>
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
                    fullWidth
                    format="MM/dd/dddd"
                    value={startDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => setStartDate(date)}
                    clearable
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
                    fullWidth
                    format="MM/dd/dddd"
                    value={endDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => setEndDate(date)}
                    clearable
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
          </Grid>
        </Box>
      </DialogContent>
      <Divider />
      <Box align="end">
        <DialogActions>
          <Box display="flex" justifyContent="end" m={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={workExpAddingStatus === "loading" ? true : false}
              onClick={() => {
                dispatch(
                  addWorkExperienceInfo({
                    address,
                    startDate,
                    endDate,
                    hospital,
                    documentType: selectedFile?.base64URL ? "files" : null,
                    selectedPdf: selectedFile.base64URL
                      ? selectedFile?.base64URL || null
                      : null,
                    docCountry: doctorCountry,
                    immId: doctorId,
                    updateId: data.id,
                    attachment: data.attachment || null,
                  })
                );
              }}
            >
              {workExpAddingStatus === "loading" ? "Loading.." : "Submit"}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </form>
  );
};

export default Index;
