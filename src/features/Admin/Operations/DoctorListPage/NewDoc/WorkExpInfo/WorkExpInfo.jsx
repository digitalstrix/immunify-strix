import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
} from "../../../../../../common/components/Admin/Dialog";
import {
  validateWorkExpInput,
  validateWorkExpInputs,
  generateWorkExpPayloadErrors,
} from "../../../../../../utils/doctorListUtils";
import { updateDoctorWorkExperience } from "../../doctorListSlice";

const initInputs = (selected) => {
  if (selected) {
    const { hospital, address, startDate, endDate } = selected;
    return { hospital, address, startDate, endDate };
  }
  return { startDate: null, endDate: null };
};

const Index = ({
  updateAction,
  values,
  errorProps,
  updateErrorProps,
  setOpenDialog,
  selected,
  setSelected,
  isUpdate,
}) => {
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(initInputs(selected));

  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     if (isUpdate) {
  //       if (validateWorkExpInputs(inputs)) {
  //         dispatch(updateDoctorWorkExperience(inputs));
  //       }
  //     }
  //   };
  // }, [isUpdate, inputs, dispatch]);
  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateWorkExpInput({ name, value }),
    });
  };

  useEffect(() => {
    if (errorProps) {
      setErrors({
        ...errors,
        ...errorProps,
      });
      updateErrorProps(null);
    }
  }, [errorProps, errors, updateErrorProps]);

  useEffect(() => {
    return () => {
      if (selected) {
        setSelected(null);
      }
    };
  }, [selected, setSelected]);

  return (
    <form>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="Hospital/Clinic Name"
                  name="hospital"
                  label="Hospital/Clinic Name"
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.hospital}
                  helperText={errors.hospital}
                  value={inputs.hospital}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Hospital/Clinic Address"
                  name="address"
                  label="Hospital/Clinic Address"
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  value={inputs.address}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="From"
                    format="MM/dd/yyyy"
                    value={inputs.startDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(value) =>
                      handleChange({ target: { name: "startDate", value } })
                    }
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="To"
                    format="MM/dd/yyyy"
                    value={inputs.endDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(value) =>
                      handleChange({ target: { name: "endDate", value } })
                    }
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <Box display="flex" justifyContent="end">
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={
              inputs?.address &&
              inputs?.endDate &&
              inputs?.hospital &&
              inputs?.startDate
                ? false
                : true
            }
            onClick={() => {
              if (validateWorkExpInputs(inputs)) {
                if (isUpdate) {
                  dispatch(updateDoctorWorkExperience(inputs));
                } else {
                  if (selected) {
                    const updatedValues = [...values];
                    const index = selected.tableData.id;
                    updatedValues[index] = inputs;
                    updateAction(updatedValues);
                  } else {
                    updateAction([...values, inputs]);
                  }
                }
                setOpenDialog(false);
              } else {
                const validationErrors = generateWorkExpPayloadErrors(inputs);
                console.log(validationErrors);
                setErrors(validationErrors);
                console.log(errors);
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default Index;
