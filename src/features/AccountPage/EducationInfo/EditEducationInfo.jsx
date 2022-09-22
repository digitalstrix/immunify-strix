import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
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
import { addEducationInfo } from "./educationInfoSlice";
import { selectAddingEducationStatus } from "./selector";

const Index = ({ data }) => {
  const dispatch = useDispatch();
  const [degree, setDegree] = useState(data.digree || null);
  const [university, setUniversity] = useState(data.university || null);
  const [passingDate, setPassingDate] = useState(data.parsingDate || null);
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });

  const isLoading = useSelector(selectAddingEducationStatus);

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

  const handleUpdate = () => {
    dispatch(
      addEducationInfo({
        degree,
        college: university,
        passingDate,
        attachment: data.attachment,
        documentType: selectedFile?.base64URL ? "files" : null,
        selectedPdf: selectedFile.base64URL
          ? selectedFile?.base64URL || null
          : null,
        docCountry: data.doctorCountry,
        immId: data.doctorId,
        updateId: data.id,
      })
    );
  };

  return (
    <form>
      <Divider />
      <DialogContent>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleFileInputChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <Divider />
      <Box align="end">
        <DialogActions>
          <Button
            disabled={isLoading === "loading" ? true : false}
            variant="contained"
            color="primary"
            onClick={() => {
              handleUpdate();
            }}
          >
            {isLoading === "loading" ? "Loading.." : "Save Changes"}
          </Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default Index;
