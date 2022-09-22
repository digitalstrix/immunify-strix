import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { uploadPrescription } from "../myPatientsSlice";
import {
  getLoggedInDoctorId,
  getPrescriptionUploadingStatus,
} from "./selector";
import { CloudUploadOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const Index = ({ data }) => {
  const classes = useStyles();

  const { childId, country, personId } = data;

  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState({
    base64URL: null,
    file: null,
  });

  const doctorId = useSelector(getLoggedInDoctorId);
  const isLoading = useSelector(getPrescriptionUploadingStatus);

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
      uploadPrescription({
        childId,
        doctorId,
        date: new Date(),
        images: [],
        attachmentType: "files",
        documentType: "PRESCRIPTION",
        patientCountryId: country ? country : "COUNTRY_NOT_RECEIVED",
        patientType: childId ? "CHILD" : "PARENT",
        patientImmId: childId || personId,
        parentIdOfChild: personId || "PARENT_ID_NOT_RECEIVED",
        selectedPdf: selectedFile?.base64URL || null,
      })
    );
  };

  return (
    <>
      <Divider />
      <form>
        <DialogContent>
          {selectedFile.file ? (
            <Box mx={4} my={2}>
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
            </Box>
          ) : (
            <Box my={2} align="center">
              <input
                type="file"
                name="file"
                accept="application/pdf"
                className={classes.input}
                id="contained-button-file"
                onChange={handleFileInputChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadOutlined />}
                >
                  Upload
                </Button>
              </label>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <Box display="flex" justifyContent="end">
          <DialogActions>
            <Button
              disabled={isLoading === "loading" ? true : false}
              variant="contained"
              color="primary"
              onClick={() => {
                handleUpdate();
              }}
            >
              {isLoading === "loading" ? "Loading.." : "Submit"}
            </Button>
          </DialogActions>
        </Box>
      </form>
    </>
  );
};

export default Index;
