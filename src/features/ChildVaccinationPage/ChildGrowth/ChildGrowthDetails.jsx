import React, { useState, useMemo } from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import Chart from "../../../common/components/Chart";
import ChildGrowthToolbar from "./ChildGrowthToolbar";
import { generateGrowthDatasets, generateLabels } from '../../../utils/growthUtils';
const Childgrowthdetails = ({ stdGraphs, heightInfo, weightInfo, hcwInfo }) => {

  const [measurement, setMeasurement] = useState('height');
  const datasetsHeight = useMemo(() => {
    const generated = generateGrowthDatasets(stdGraphs, heightInfo, measurement);
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();   
    }
    return generated;
  }, [stdGraphs, heightInfo, measurement]);
  const datasetsWeight = useMemo(() => {
    const generated = generateGrowthDatasets(stdGraphs, weightInfo, measurement);
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();   
    }
    return generated;
  }, [stdGraphs, weightInfo, measurement]);
  const datasetsHcw = useMemo(() => {
    const generated = generateGrowthDatasets(stdGraphs, hcwInfo, measurement);
    const childGrowth = generated[7];
    if (childGrowth && childGrowth.data) {
      childGrowth.data = childGrowth.data.slice();   
    }
    return generated;
  }, [stdGraphs, hcwInfo, measurement]);
  const labels = useMemo(() => generateLabels(stdGraphs, measurement), [stdGraphs, measurement]);

  const measurementReturnDataSet = (measurement) => {
    if (measurement === 'height') {
      return datasetsHeight;
    } else if (measurement === 'weight') {
      return datasetsWeight;
    } else {
      return datasetsHcw;
    }
  }
  return (
    <div>
      <Box m={3}>
        <ChildGrowthToolbar />
        <Box mt={3}>
          <RadioGroup
            row
            aria-label="measurement"
            name="measurement"
            value={measurement}
            onChange={({ target: { value }}) => { setMeasurement(value) }}
          >
            <FormControlLabel
              value="height"
              control={<Radio color="primary" />}
              label="Height"
            />
            <FormControlLabel
              value="weight"
              control={<Radio color="primary" />}
              label="Weight"
            />
            <FormControlLabel
              value="hcw"
              control={<Radio color="primary" />}
              label="Head Circumference"
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box m={2}>      
        <Chart
          graphtype={"Line"}
          labels={labels}
          datasets={measurementReturnDataSet(measurement)}
          options={{
            fill: false
          }}
        />
      </Box>
    </div>
  );
};

export default Childgrowthdetails;



// [
//   {
//     label: "#Height",
//     data: [12, 19, 3, 5, 2, 3],
//     backgroundColor: "#8fa0fd",
//     //   barThickness: "70",
//     borderWidth: "2",
//   },
//   // {
//   //   label: "#Weight",
//   //   data: [42, 39, 2, 15, 12, 13],
//   //   backgroundColor: "#95eeff",
//   //   //   barThickness: "70",
//   //   borderWidth: "2",
//   // },
//   // {
//   //   label: "#Head Circumference",
//   //   data: [22, 19, 12, 5, 42, 53],
//   //   backgroundColor: "#e6f895",
//   //   //   barThickness: "70",
//   //   borderWidth: "2",
//   // },
// ]