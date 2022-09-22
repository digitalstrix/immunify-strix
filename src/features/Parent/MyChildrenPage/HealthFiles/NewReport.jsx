import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import {
  Card,
  TextField,
  Button,
  Grid,
  CardContent,
  Divider,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { addHealthFile } from "./healthFilesSlice";
import { selectAddingStatus } from "./selector";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const NewReport = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useSelector(selectAddingStatus);
  const { id, parentId, country, dateOfBirth } = data;
  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, setName] = useState(null);
  const [type, setType] = useState({ label: null, value: null });
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });
  const types = [
    { label: "Blood report", value: "Blood report" },
    { label: "Surgical report", value: "Surgical report" },
    { label: "Pathology report", value: "Pathology report" },
    { label: "Other", value: "Other" },
  ];

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
    <div>
      <form action="">
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="dsfilter"
                    options={types}
                    getOptionLabel={(option) => option.value}
                    size="small"
                    onChange={(e, value) => setType(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Status"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="reportName"
                    label="Report Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      fullWidth
                      size="small"
                      label="Select Date"
                      format="MM/dd/yy"
                      minDate={dateOfBirth||null}
                      maxDate={new Date()}
                      value={selectedDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item md={6} xs={9}>
                  <input
                    id="contained-button-file"
                    type="file"
                    name="file"
                    accept="application/pdf"
                    onChange={handleFileInputChange}
                    className={classes.input}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      fullWidth
                      color={
                        selectedFile.file === null ? "primary" : "secondary"
                      }
                      component="span"
                    >
                      {selectedFile.file === null
                        ? "Select File"
                        : "Change File"}
                    </Button>
                  </label>
                </Grid>
                <Grid item md={6} xs={3} style={{marginTop:7}}>
                {selectedFile&&<label >{selectedFile?.file?.name}</label>}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            disabled={status === "loading" ? true : false}
            size="small"
            color="primary"
            onClick={() => {
              dispatch(
                addHealthFile({
                  attachmentType: "files",
                  documentType: "LAB_REPORT",
                  images: [],
                  parentIdOfChild: parentId,
                  patientCountryId: country || "COUNTRY_NOT_RECEIVED",
                  patientImmId: id,
                  patientType: "CHILD",
                  reportDate: selectedDate,
                  reportName: name,
                  reportType: type.value,
                  selectedPdf: selectedFile.base64URL
                    ? selectedFile?.base64URL || null
                    : null,
                  title: "Lab Reports",
                })
              );
            }}
          >
            {status === "loading" ? "Uploading.." : "Add"}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default NewReport;
