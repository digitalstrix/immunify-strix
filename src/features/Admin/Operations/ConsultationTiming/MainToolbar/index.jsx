import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";

const Index = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <Breadcrumb />
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
