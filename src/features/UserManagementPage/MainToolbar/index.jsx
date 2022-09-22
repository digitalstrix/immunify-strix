import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import ActionBtn from "./ActionBtn";

const Index = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Breadcrumb />
        <Box display="flex">
          <Box>
            <ActionBtn />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
