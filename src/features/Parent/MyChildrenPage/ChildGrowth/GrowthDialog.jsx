import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addChildGrowthInfo } from "./ParentSideChildGrowthSlice";
import { selectAddGrowthStatus } from "./selector";

const Growthdialog = ({ measurement, selectedChildData }) => {
  const {
    BirthInformation: { dateOfBirth },
  } = selectedChildData;
  const dispatch = useDispatch();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [headc, setHeadc] = useState(0);
  const loadingState = useSelector(selectAddGrowthStatus);
  const handleSliderChangeHeight = (event, newValue) => {
    setHeight(newValue);
  };
  const handleInputChangeHeight = (event) => {
    setHeight(event.target.value === "" ? "" : Number(event.target.value));
  };

  // weight
  const handleSliderChangeWeight = (event, newValue1) => {
    setWeight(newValue1);
  };

  const handleInputChangeWeight = (event) => {
    setWeight(event.target.value === "" ? "" : Number(event.target.value));
  };

  // head circumference
  const handleSliderChangeHeadC = (event, newValue3) => {
    setHeadc(newValue3);
  };

  const handleInputChangeHeadC = (event) => {
    setHeadc(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleSubmit = () => {
    switch (measurement) {
      case "height":
        dispatch(
          addChildGrowthInfo({
            childId: selectedChildData?.id,
            date: moment(selectedDate).format("YYYY-MM-DD"),
            height,
          })
        );
        break;
      case "weight":
        dispatch(
          addChildGrowthInfo({
            childId: selectedChildData?.id,
            date: moment(selectedDate).format("YYYY-MM-DD"),
            weight,
          })
        );
        break;
      case "hcw":
        dispatch(
          addChildGrowthInfo({
            childId: selectedChildData?.id,
            date: moment(selectedDate).format("YYYY-MM-DD"),
            hcw: headc,
          })
        );
        break;
      default:
        break;
    }
  };

  const getSaveButtonStatue = () => {
    switch (measurement) {
      case "height":
        return height <= 0  || !height;
        break;
      case "weight":
        return weight <= 0  || !weight;
        break;

      case "hcw":
        return headc <= 0  || !headc;
        break;

      default:
        return false;
        break;
    }
  };

  return (
    <div>
      <Box mx={3}>
        <DialogContent>
          <Card>
            <form action="">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ marginTop: 10 }}
                      autoOk
                      variant="inline"
                      minDate={dateOfBirth || null}
                      maxDate={moment()}
                      inputVariant="outlined"
                      fullWidth
                      size="small"
                      label="Select Date"
                      format="MM/dd/yy"
                      value={selectedDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {measurement === "height" && (
                  <>
                    <Grid item xs={12}>
                      <Typography id="input-slider" gutterBottom>
                        Height - (cm)
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        value={typeof height === "number" ? height : 0}
                        onChange={handleSliderChangeHeight}
                        aria-labelledby="input-slider"
                        min={0}
                        max={200}
                        valueLabelDisplay="auto"
                        style={{ marginLeft: 20 }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="template_name"
                        label="Height (cm)"
                        variant="outlined"
                        name="templateName"
                        type="number"
                        value={height}
                        error={height <= 0 || !height}
                        helperText={
                          height <= 0  || !height
                            ? "Please Enter Valid Input"
                            : ""
                        }
                        onChange={handleInputChangeHeight}
                        required
                        style={{
                          margin: 10,
                          marginTop: -10,
                        }}
                      />
                    </Grid>
                  </>
                )}

                {measurement === "weight" && (
                  <>
                    <Grid item xs={12}>
                      <Typography id="input-slider" gutterBottom>
                        Weight - (kg)
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        style={{ marginLeft: 20 }}
                        value={typeof weight === "number" ? weight : 0}
                        onChange={handleSliderChangeWeight}
                        aria-labelledby="input-slider"
                        min={0}
                        max={200}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="template_name2"
                        label="Weight (Kg)"
                        variant="outlined"
                        name="templateName"
                        type="number"
                        value={weight}
                        error={weight <= 0  || !weight}
                        helperText={
                          weight <= 0  || !weight
                            ? "Please Enter Valid Input"
                            : ""
                        }
                        onChange={handleInputChangeWeight}
                        required
                        style={{
                          margin: 10,
                          marginTop: -10,
                        }}
                      />
                    </Grid>
                  </>
                )}

                {measurement === "hcw" && (
                  <>
                    <Grid item xs={12}>
                      <Typography id="input-slider" gutterBottom>
                        Head Circumference - (cm)
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        style={{ marginLeft: 20 }}
                        value={typeof headc === "number" ? headc : 0}
                        onChange={handleSliderChangeHeadC}
                        aria-labelledby="input-slider"
                        min={0}
                        max={200}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="template_name2"
                        label="Head Circumference (cm)"
                        variant="outlined"
                        name="templateName"
                        type="number"
                        value={headc}
                        error={headc <= 0  || !headc}
                        helperText={
                          headc <= 0  || !headc
                            ? "Please Enter Valid Input"
                            : ""
                        }
                        onChange={handleInputChangeHeadC}
                        required
                        style={{
                          margin: 10,
                          marginTop: -10,
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Box mt={2}>
                <Divider />
                <Grid item xs={12}>
                  <DialogActions>
                    <Button
                      disabled={loadingState === "loading"||getSaveButtonStatue()}
                      color="primary"
                      variant="contained"
                      onClick={() => handleSubmit()}
                    >
                      {loadingState === "loading"
                        ? "Updating..."
                        : "Save Changes"}
                    </Button>
                  </DialogActions>
                </Grid>
              </Box>
            </form>
          </Card>
        </DialogContent>
      </Box>
    </div>
  );
};

export default Growthdialog;
