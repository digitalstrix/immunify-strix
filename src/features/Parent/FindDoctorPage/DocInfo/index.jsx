import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Table from "../../../../common/components/Table";

import TimeIcon from "@material-ui/icons/ScheduleOutlined";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  avatarlarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export const DocImage = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.avatarlarge}
            />
          </Box>
          <Typography variant="h5" align="center">
            <Box fontWeight={500} mt={2}>
              Dr.Olivia
            </Box>
          </Typography>
          <Typography variant="h6" align="center">
            <Box fontWeight={500} mt={2}>
              Appointment No: 10
            </Box>
          </Typography>
          <Box
            component="span"
            display="flex"
            alignItems="center"
            margin
            mt={2}
          >
            <TextField
              id="selecteddate"
              label="Selected Date"
              value={"2021/03/21"}
              onChange={""}
              fullWidth
              size="small"
              variant="outlined"
              disabled
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                fullWidth
                size="small"
                label="Select Date"
                format="MM/dd/yy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider> */}
          </Box>
          <Box component="span" display="flex" alignItems="center" margin>
            <TextField
              id="selectedtime"
              label="Selected Time Slot"
              value={"18:30 - 21:42"}
              onChange={""}
              fullWidth
              size="small"
              variant="outlined"
              disabled
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                variant="inline"
                label="Select Time Slot"
                inputVariant="outlined"
                size="small"
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider> */}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const Price = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Box align="center">
            <Typography variant="overline" color="initial">
              <Box px={2}>Price</Box>
            </Typography>
            <Typography variant="h5">
              <Box fontWeight={600}> INR(₹) 399.00</Box>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const DocInfoTable = () => {
  return (
    <div>
      <Table
        title="Card Information"
        columns={[
          {
            field: "thead",
            headerStyle: { display: "none" },
            cellStyle: { fontWeight: "bold" },
          },
          { field: "tdata", headerStyle: { display: "none" } },
        ]}
        options={{
          search: false,
          pageSize: 8,
          paging: false,
          toolbar: false,
        }}
        data={[
          { thead: "Doctor Name", tdata: "olivia Serrin" },
          { thead: "Gender", tdata: "Female" },
          { thead: "Degree", tdata: "MBBS, lorem dermatologists" },
          { thead: "Location", tdata: "Kandy" },
          { thead: "Experience", tdata: "20 Years" },
          {
            thead: "Price",
            tdata: "INR 399",
          },
        ]}
      />
    </div>
  );
};
