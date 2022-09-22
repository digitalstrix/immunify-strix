import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

import { selectGrowthInputs, selectGrowthData, selectAllGrowthInfo } from "../selector";
import { updateGrowthInput } from "../growthSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function DialogContent() {
  const classes = useStyles();
  const inputs = useSelector(selectGrowthInputs);
  const growthData = useSelector(selectGrowthData);
  const originalGrowth = useSelector(selectAllGrowthInfo)
  const dispatch = useDispatch();

  // const [height, setHeightLocal] = React.useState(growthData.height);
  // const [weight, setWeightLocal] = React.useState(growthData.weight);
  // const [headc, setHeadcLocal] = React.useState(growthData.hcw);

  // const [height, setHeightLocal] = React.useState(originalGrowth?.HeightGrowth[originalGrowth?.HeightGrowth?.length - 1].height || null);
  // const [weight, setWeightLocal] = React.useState(originalGrowth?.WeightGrowth[originalGrowth?.WeightGrowth?.length - 1].weight || null);
  // const [headc, setHeadcLocal] = React.useState(originalGrowth?.HcwGrowth[originalGrowth?.HcwGrowth?.length - 1].hcw || null);

  const [height, setHeightLocal] = React.useState((originalGrowth && originalGrowth.HeightGrowth && originalGrowth.HeightGrowth.length > 0) ? originalGrowth.HeightGrowth[originalGrowth.HeightGrowth.length - 1].height : null);
  const [weight, setWeightLocal] = React.useState((originalGrowth && originalGrowth.WeightGrowth && originalGrowth.WeightGrowth.length > 0) ? originalGrowth.WeightGrowth[originalGrowth.WeightGrowth.length - 1].weight : null);
  const [headc, setHeadcLocal] = React.useState((originalGrowth && originalGrowth.HcwGrowth && originalGrowth.HcwGrowth.length > 0) ? originalGrowth.HcwGrowth[originalGrowth.HcwGrowth.length - 1].hcw : null);

  const setHeight = (value) => {
    dispatch(
      updateGrowthInput({
        ...inputs,
        height: value > 0 ? value : null,
      })
    );
    setHeightLocal(value);
  };
  const setWeight = (value) => {
    dispatch(
      updateGrowthInput({
        ...inputs,
        weight: value > 0 ? value : null,
      })
    );
    setWeightLocal(value);
  };
  const setHeadc = (value) => {
    dispatch(
      updateGrowthInput({
        ...inputs,
        hcw: value > 0 ? value : null,
      })
    );
    setHeadcLocal(value);
  };

  // height

  const handleSliderChangeHeight = (event, newValue) => {
    setHeight(newValue);
  };

  const handleBlurHeight = (event, newValue) => {

    let { value } = event.target;
    value = Number(value);
    if (value < 0) {
      setHeight(0);
    } else if (value > 200) {
      setHeight(200);
    } else {
      setHeight(value);
    }
  };

  // weight

  const handleSliderChangeWeight = (event, newValue1) => {
    setWeight(newValue1);
  };

  const handleBlurWeight = (event) => {
    let { value } = event.target;
    value = Number(value);
    if (value < 0) {
      setWeight(0);
    } else if (value > 200) {
      setWeight(200);
    } else {
      setWeight(value);
    }
  };

  // head circumference

  const handleSliderChangeHeadC = (event, newValue3) => {
    setHeadc(newValue3);
  };

  const handleBlurHeadC = (event) => {
    let { value } = event.target;
    value = Number(value);
    if (value < 0) {
      setHeadc(0);
    } else if (value > 200) {
      setHeadc(200);
    } else {
      setHeadc(value);
    }
  };

  const InputTextFieldHeight = () => (
    <TextField
      id="outlined-number-height"
      type="number"
      defaultValue={height}
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
      id="outlined-number-weight"
      type="number"
      defaultValue={weight}
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
      id="outlined-number-headc"
      type="number"
      defaultValue={headc}
      onBlur={handleBlurHeadC}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      size="small"
    />
  );

  return (
    <div className={classes.root}>
      <Box m={3}>
        <Grid container spacing={3}>
          {/* height */}
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
              />
            </Grid>
            <Grid item xs={4}>
              <InputBase
                endAdornment="cm"
                defaultValue={height}
                inputComponent={InputTextFieldHeight}
                margin="dense"
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
          {/* weight */}
          <>
            <Grid item xs={12}>
              <Typography id="input-slider" gutterBottom>
                Weight - (kg)
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider
                style={{}}
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
                defaultValue={weight}
                inputComponent={InputTextFieldWeight}
                margin="dense"
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
          {/* head circumference */}
          <>
            <Grid item xs={12}>
              <Typography id="input-slider" gutterBottom>
                Head Circumference - (cm)
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider
                style={{}}
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
                defaultValue={headc}
                inputComponent={InputTextFieldHeadc}
                margin="dense"
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
        </Grid>
      </Box>
    </div>
  );
}
