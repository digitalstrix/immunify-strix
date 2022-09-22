import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";
import {
  validateConsultationPlanInput,
  validateConsultationPlanPayload,
  generateConsultationPayloadValidationErrors,
} from "../../../../../../utils/doctorListUtils";
import { SESSION_TIME_OPTIONS } from "../../../../../../constants/doctorListConstants";
import {
  fetchSelectedDoctorInfo,
  updateDoctorConsultationPlan,
} from "../../doctorListSlice";
import { selectConsultationPlans, selectGeneralInfo } from "../../selector";

const initInputs = (selected) => {
  if (selected) {
    const { amount, appoinmentType, sessionTime } = selected;
    return {
      amount,
      appoinmentType,
      sessionTime,
    };
  }
  return {};
};

const DetailDialog = ({
  updateAction,
  values,
  errorProps,
  updateErrorProps,
  setOpenDialog,
  selected,
  setSelected,
  appointmentTypes,
  isUpdate,
  addedAppointmentData,
}) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initInputs(selected));
  const [errors, setErrors] = useState({});
  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
      "sessionTime": {label: "15", value: 15} // set default value because session time is required value
    });
    setErrors({
      ...errors,
      [name]: validateConsultationPlanInput({ name, value }),
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

  const myConsultationPlans = useSelector(selectConsultationPlans);
  const generalInfo = useSelector(selectGeneralInfo);
  appointmentTypes = [
    {label: "Telemedicine", value: 1},
    {label: "General", value: 2},
    {label: "Home Vaccination", value: 3},
  ]
  const getAvailableAppointmentTypes = () => {
    const result = appointmentTypes.filter((allTypes) =>
      myConsultationPlans?.every(
        (exsistingTypes) => exsistingTypes.appoinmentType !== allTypes.label
      )
    );
    return result;
  };

const removeAppointmentTypes = () => {
  if(addedAppointmentData.find(o=> o.appoinment === "Telemedicine")){
    appointmentTypes = appointmentTypes.filter(object => {
      return object.label !== 'Telemedicine';
    });
  }
  if(addedAppointmentData.find(o=> o.appoinment === "General")){
    appointmentTypes = appointmentTypes.filter(object => {
      return object.label !== 'General';
    });
  }
  if(addedAppointmentData.find(o=> o.appoinment === "Home Vaccination")){
    appointmentTypes = appointmentTypes.filter(object => {
      return object.label !== 'Home Vaccination';
    });
  }
  return appointmentTypes
}

  return (
    <div>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  id="combo-box-demo"
                  options={addedAppointmentData && addedAppointmentData.length > 0 ? removeAppointmentTypes() :appointmentTypes}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type of Appointment"
                      variant="outlined"
                      error={!!errors.appoinmentType}
                      helperText={errors.appoinmentType}
                    />
                  )}
                  onChange={(e, value) =>
                    handleChange({ target: { name: "appoinmentType", value } })
                  }
                  value={inputs.appoinmentType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount (INR)"
                  name="amount"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={inputs.amount}
                  error={!!errors.amount}
                  helperText={errors.amount}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          disabled={false}
          color="primary"
          variant="contained"
          onClick={() => {
            if (validateConsultationPlanPayload(inputs)) {
              if (isUpdate) {
                dispatch(updateDoctorConsultationPlan(inputs));
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
              dispatch(fetchSelectedDoctorInfo({ id: generalInfo?.id }));
              setOpenDialog(false);
            } else {
              const validationErrors =
                generateConsultationPayloadValidationErrors(inputs);
              setErrors(validationErrors);
            }
          }}
        >
          Add Plan
        </Button>
      </DialogActions>
    </div>
  );
};

export default DetailDialog;

// const appointmentType = [
//   { label: 'Telemedicine', value: 'Telemedicine' },
//   { label: 'Home Vaccination', value: 'Home' },
//   { label: 'General', value: 'General' },
// ];
