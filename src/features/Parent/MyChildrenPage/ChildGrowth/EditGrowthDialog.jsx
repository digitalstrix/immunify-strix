import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InputBase,
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

const EditGrowthdialog = ({ measurement, selectedChildData, selectedDataObject }) => {
  const { BirthInformation: {dateOfBirth} } = selectedChildData
  const dispatch = useDispatch();
  const [selectedDate, handleDateChange] = useState(selectedDataObject?.date ? new Date(selectedDataObject?.date) : new Date());
  const [height, setHeight] = useState(selectedDataObject?.height || 0);
  const [weight, setWeight] = useState(selectedDataObject?.weight || 0);
  const [headc, setHeadc] = useState(selectedDataObject?.hcw || 0);
  const loadingState = useSelector(selectAddGrowthStatus);
  const handleSliderChangeHeight = (event, newValue) => {
    setHeight(newValue);
  };
  const handleInputChangeHeight = (event) => {
    setHeight(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurHeight = () => {
    if (height < 0) {
      setHeight(0);
    } else if (height > 200) {
      setHeight(200);
    }
  };

  // weight
  const handleSliderChangeWeight = (event, newValue1) => {
    setWeight(newValue1);
  };

  const handleInputChangeWeight = (event) => {
    setWeight(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurWeight = () => {
    if (weight < 0) {
      setWeight(0);
    } else if (weight > 200) {
      setWeight(200);
    }
  };

  // head circumference
  const handleSliderChangeHeadC = (event, newValue3) => {
    setHeadc(newValue3);
  };

  const handleInputChangeHeadC = (event) => {
    setHeadc(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurHeadC = () => {
    if (headc < 0) {
      setHeight(0);
    } else if (headc > 200) {
      setHeight(200);
    }
  };

  const InputTextFieldHeight = () => (
    <TextField
      id="outlined-number"
      type="number"
      value={height}
      onChange={handleInputChangeHeight}
      onBlur={handleBlurHeight}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      size="small"
    />
  );

  const InputTextFieldWeight = () => (
    <TextField
      id="outlined-number"
      type="number"
      value={weight}
      onChange={handleInputChangeWeight}
      onBlur={handleBlurWeight}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      size="small"
    />
  );

  const InputTextFieldHeadc = () => (
    <TextField
      id="outlined-number"
      type="number"
      value={headc}
      onChange={handleInputChangeHeadC}
      onBlur={handleBlurHeadC}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      size="small"
    />
  );

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
                      <InputBase
                        endAdornment="cm"
                        value={height}
                        inputComponent={InputTextFieldHeight}
                        margin="dense"
                        onChange={handleInputChangeHeight}
                        onBlur={handleBlurHeight}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 200,
                          type: "number",
                          "aria-labelledby": "input-slider",
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
                      <InputBase
                        endAdornment="Kg"
                        value={weight}
                        inputComponent={InputTextFieldWeight}
                        margin="dense"
                        onChange={handleInputChangeWeight}
                        onBlur={handleBlurWeight}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 200,
                          type: "number",
                          "aria-labelledby": "input-slider",
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
                      <InputBase
                        endAdornment="cm"
                        value={headc}
                        inputComponent={InputTextFieldHeadc}
                        margin="dense"
                        onChange={handleInputChangeHeadC}
                        onBlur={handleBlurHeadC}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 200,
                          type: "number",
                          "aria-labelledby": "input-slider",
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
                      disabled={loadingState === "loading"}
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

export default EditGrowthdialog;
