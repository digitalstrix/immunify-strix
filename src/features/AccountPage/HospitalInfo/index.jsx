import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorHospitalInfo,
  addDoctorHospitalInfo,
} from "./doctorHospitalSlice";
import {
  getLoggedInDoctorId,
  selectDoctorHospitalInfo,
  getRetrievingHospitalInfoStatus,
  getRetrievingHospitalInfoError,
  getUpdatingHospitalInfoStatus,
  getUpdatingHospitalInfoError,
} from "./selector";
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
  useEffect(() => {
    dispatch(getDoctorHospitalInfo({ immId: doctorId }));
  }, [dispatch]);

  const doctorId = useSelector(getLoggedInDoctorId);
  const doctorHospital = useSelector(selectDoctorHospitalInfo);

  const getHospitalStatus = useSelector(getRetrievingHospitalInfoStatus);
  const getHospitalError = useSelector(getRetrievingHospitalInfoError);

  const updateHospitalStatus = useSelector(getUpdatingHospitalInfoStatus);
  const updateHospitalError = useSelector(getUpdatingHospitalInfoError);

  const UPDATE_HOSPITAL_SUCCEESFUL_MSG = "Hospital Info Updated Successfully!";
  const UPDATE_HOSPITAL_FAILURE_MSG = "Hospital Info Updated Failed!";

  useEffect(() => {
    if (updateHospitalStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_HOSPITAL_SUCCEESFUL_MSG);
    } else if (updateHospitalStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_HOSPITAL_FAILURE_MSG, "danger");
    }
  }, [updateHospitalStatus, updateHospitalError, enqueueSnackbar]);

  const GET_HOSPITAL_INFO_FAILURE_MSG = "Hospital Info Retrieving Failed!";

  useEffect(() => {
    if (getHospitalStatus === "failed") {
      notify(enqueueSnackbar, GET_HOSPITAL_INFO_FAILURE_MSG, "danger");
    }
  }, [getHospitalStatus, getHospitalError, enqueueSnackbar]);

  const [address, setAddress] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    setAddress(doctorHospital.address);
    setHospital(doctorHospital.hospitalName);
    setPhone(doctorHospital.phoneNumber);
  }, [getHospitalStatus]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form>
        <Container maxWidth="sm">
          <Card className={classes.card} mt={3}>
            <CardHeader
              title="Hospital Info"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="Hospital/Clinic Name"
                    label="Hospital/Clinic Name"
                    variant="outlined"
                    value={hospital||""}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setHospital(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Hospital/Clinic Address"
                    label="Hospital/Clinic Address"
                    variant="outlined"
                    value={address||""}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Hospital/Clinic Number"
                    label="Hospital/Clinic Contact Number"
                    variant="outlined"
                    value={phone||""}
                    margin="normal"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="end" m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(
                    addDoctorHospitalInfo({
                      immId: doctorId,
                      hospital,
                      phone,
                      address,
                    })
                  );
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default Index;
