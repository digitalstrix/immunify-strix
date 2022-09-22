import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
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
import { addHealthFile } from "./healthFilesSlice";
import { selectAddingStatus } from "./selector";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const NewPrescription = ({ data }) => {
  const { id, parentId, country, dateOfBirth } = data;
  const status = useSelector(selectAddingStatus);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [name, setName] = useState(null);
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
    <div>
      <form action="">
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
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
                <Grid item md={12} xs={12}>
                  <TextField
                    id="drname"
                    label="Doctor Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
            size="small"
            color="primary"
            disabled={status === "loading" ? true : false}
            onClick={() => {
              dispatch(
                addHealthFile({
                  attachmentType: "files",
                  documentType: "PRESCRIPTION_BY_PARENT",
                  images: [],
                  parentIdOfChild: parentId,
                  patientCountryId: country || "COUNTRY_NOT_RECEIVED",
                  patientImmId: id,
                  patientType: "CHILD",
                  prescriptionDate: selectedDate,
                  prescriptionName: name,
                  selectedPdf: selectedFile.base64URL
                    ? selectedFile?.base64URL || null
                    : null,
                  title: "Prescriptions",
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

export default NewPrescription;
