import React from "react";
import PropTypes from "prop-types";
import { Box, Breadcrumbs, Grid, Typography, Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Index = ({ history, path }) => {
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
            <Link color="inherit" href="#" onClick={() => history.push("/")}>
              DashboardPage
            </Link>
            <Link
              color="inherit"
              href="#"
              onClick={() => history.push("/my-appointments")}
            >
              My Appointments
            </Link>

            {path === "patientInfo" && (
              <Typography color="textPrimary">Patient Info</Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default withRouter(Index);
