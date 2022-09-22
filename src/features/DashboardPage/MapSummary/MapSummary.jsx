import React from "react";
import { Box } from "@material-ui/core";
import Map from "../../../common/components/Map";

const Mapsummary = () => {
  return (
    <div>
      <Box mt={3}>
        <Map zoom={9} />
      </Box>
    </div>
  );
};

export default Mapsummary;
