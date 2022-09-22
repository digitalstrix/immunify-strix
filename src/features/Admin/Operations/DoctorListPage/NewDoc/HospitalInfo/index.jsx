import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
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
  validateHospitalInput,
  validateHospitalPayload,
  generateHospitalPayloadValidationErrors
} from '../../../../../../utils/doctorListUtils';
import { updateDoctorHospital } from '../../doctorListSlice';



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

const Index = ({ updateAction, values, errorProps, updateErrorProps, isUpdate = false }) => {  
  const classes = useStyles();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const handleChange = ({ target: { name, value }}) => {
    updateAction({
      ...values,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: validateHospitalInput({ name, value })
    })
  };

  useEffect(() => {
    if (errorProps) {
      setErrors({
        ...errors,
        ...errorProps
      });
      updateErrorProps(null);
    }    
  }, [errorProps, errors, updateErrorProps]);

  return (
    <div className={classes.root}>
      <form>
        <Grid container justify="center">
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
                    name="hospital"
                    label="Hospital/Clinic Name"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    value={values.hospital||""}
                    error={!!errors.hospital}
                    helperText={errors.hospital}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Hospital/Clinic Address"
                    name="address"
                    label="Hospital/Clinic Address"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    value={values.address||""}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Hospital/Clinic Number"
                    name="phone"
                    label="Hospital/Clinic Contact Number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    value={values.phone||""}
                  />
                </Grid>
              </Grid>
            </CardContent>
            {
              isUpdate && (
                <React.Fragment>
                  <Divider />
                  <Box display="flex" justifyContent="end" m={2}>
                    <Button variant="contained" color="primary"
                      onClick={() => {
                        const { hospital, address, phone } = values;
                        const payload = { hospital, address, phone };
                        if (validateHospitalPayload(payload)) {
                          dispatch(updateDoctorHospital(values));
                        } else {
                          const validationErrors = generateHospitalPayloadValidationErrors(payload);
                          setErrors(validationErrors);
                        }  
                      }}  
                    >
                      Save Changes
                    </Button>
                  </Box>
                </React.Fragment>
              )
            }
          </Card>
        </Grid>
      </form>
    </div>
  );
};

export default Index;
