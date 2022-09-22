import "date-fns";
import React from "react";
import {Grid, Box} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  //   KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const Datepicker = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Box m={2}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="From"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Box>
          <Box  m={2}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="To"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Box>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Datepicker;
