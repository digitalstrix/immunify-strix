import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Button } from "@material-ui/core";

const Index = (props) => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          {props.breadcrumb}
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
