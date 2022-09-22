import { Box, Breadcrumbs, Grid, Link, Typography } from "@material-ui/core";
import React from "react";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Index = ({ breadcrumb }) => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              DashboardPage
            </Link>
            <Typography color="textPrimary">Reports</Typography>
            <Typography color="textPrimary">{breadcrumb}</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
    </div>
  );
};

export default Index;
