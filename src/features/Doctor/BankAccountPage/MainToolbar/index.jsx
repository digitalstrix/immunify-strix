import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Breadcrumbs,
  Grid,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

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
          <Breadcrumbs>
            <Link
              color="inherit"
              href="#"
              onClick={() => props.history.push("/")}
            >
              DashboardPage
            </Link>
            <Typography color="textPrimary">Bank Account</Typography>
          </Breadcrumbs>
        </Box>
        {/* <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Add Bank Account
          </Button>
        </Box> */}
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default withRouter(Index);
