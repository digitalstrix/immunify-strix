import React from "react";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Link,
  Typography,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import ChildSelectTable from "./ChildrenList";
import { DocInfoTable, DocImage, Price } from "./DocInfo";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SelectChildPage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <MainToolbar
          breadcrumb={
            <Breadcrumbs>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/")}
              >
                DashboardPage
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/docSearch")}
              >
                Doctor Search
              </Link>
              <Link
                color="inherit"
                href="#"
                onClick={() => props.history.push("/searchResult")}
              >
                Available Doctors
              </Link>
              <Typography color="textPrimary">Select Child</Typography>
            </Breadcrumbs>
          }
        />
        <Grid container mt={2} justify="flex-end">
          <Grid item xs={3}>
            <Price />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <DocImage />
            </Grid>
            <Grid item xs={12} md={8}>
              <DocInfoTable />
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <ChildSelectTable />
        </Box>

        <Grid container justify="flex-end">
          <Grid item xs={3}>
            <Box mt={3}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  props.history.push("/payment");
                }}
              >
                Continue
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(SelectChildPage);
