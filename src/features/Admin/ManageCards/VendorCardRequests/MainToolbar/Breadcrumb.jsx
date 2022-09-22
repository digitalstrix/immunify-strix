import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="#" onClick={() => props.history.push("/")}>
          Dashboard
        </Link>
        <Typography color="textPrimary">Vendor Card Requests</Typography>
      </Breadcrumbs>
      <Typography variant="h5">
        <Box fontWeight="fontWeightMedium">Vendor Card Requests</Box>
      </Typography>
    </div>
  );
};

export default withRouter(Breadcrumb);
