import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid } from "@material-ui/core";
import AddNewIcon from "@material-ui/icons/GroupAddOutlined";

import Breadcrumb from "./Breadcrumb";
import { withRouter } from "react-router";

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
          <Breadcrumb />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddNewIcon />}
            onClick={() => {
              props.history.push("/addnew-doctor");
            }}
          >
            Add New Doctor
          </Button>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default withRouter(Index);
