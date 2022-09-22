import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";

const Dialogcontent = () => {
  //   const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate, handleDateChange] = useState("");

  return (
    <div>
      <DialogContent>
        <Box px={3}>
          <Grid container spacing={3} row>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                label="Vaccine Name"
                variant="outlined"
                value="BCG"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="tradename"
                label="Trade Name"
                variant="outlined"
                value="HEXXA"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="against"
                label="Against"
                variant="outlined"
                value="loerem, lipsidh, sidz"
                disabled={true}
                multiline
                rows={2}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="catchUp"
                label="Catchup (From)"
                variant="outlined"
                value="03/04/2021"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="catchUp"
                label="Catchup (To)"
                variant="outlined"
                value="03/04/2021"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="dueDate"
                label="Due Date"
                variant="outlined"
                value="03/04/2021"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="status"
                label="Vaccination Status"
                variant="outlined"
                value="DUE"
                disabled={true}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="doseNo"
                label="Dose No"
                variant="outlined"
                disabled
                value="1"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  label="Vac Date"
                  placeholder="Set Date"
                  format="MM/dd/yy"
                  size="small"
                  value={selectedDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </DialogContent>
    </div>
  );
};

export default Dialogcontent;
