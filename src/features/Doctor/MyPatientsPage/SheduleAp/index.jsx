import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInDoctorUserName } from "./selector";
import { scheduleAppointment } from "../myPatientsSlice";

const Index = ({ data }) => {
  const dispatch = useDispatch();
  const doctorUserName = useSelector(getLoggedInDoctorUserName);
  const { id, childId, personId } = data;
  const [scheduleIn, setScheduleIn] = useState(null);

  return (
    <>
      <Divider />
      <DialogContent>
        <Box align="center" my={1}>
          <form action="">
            <FormControl component="fieldset">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Select a date"
                  format="MM/dd/yyyy"
                  value={scheduleIn}
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setScheduleIn(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </form>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          autoFocus
          disabled={!scheduleIn}
          color="primary"
          variant="contained"
          onClick={() =>
            dispatch(
              scheduleAppointment({
                id,
                doctorName: doctorUserName,
                patientId: childId || personId,
                scheduleIn,
              })
            )
          }
        >
          Request Shedule Appointment
        </Button>
      </DialogActions>
    </>
  );
};

export default Index;
