import React from "react";
import { withRouter } from "react-router-dom";
import { Box, Link, Typography, Breadcrumbs, Grid } from "@material-ui/core";
import Parentdatatable from "./ParentDataTable";
import Maintoolbar from "../Maintoolbar";

const Index = (props) => {
  return (
    <div>
      <Maintoolbar
        breadcrumb={
          <Breadcrumbs>
            <Link
              color="inherit"
              href="#"
              onClick={() => props.history.push("/")}
            >
              DashboardPage
            </Link>
            <Typography color="textPrimary">Child Vaccination</Typography>
          </Breadcrumbs>
        }
      />
      <Box mt={3}>
        <Parentdatatable />
      </Box>
    </div>
  );
};

export default withRouter(Index);
