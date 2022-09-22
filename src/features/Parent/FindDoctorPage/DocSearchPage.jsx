import React from "react";
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Link,
  Typography,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import DocSearchForm from "./DocSearchForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
  },
}));

const DocSearchPage = (props) => {
  const classes = useStyles();
  return (
    <Container>
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
            <Typography color="textPrimary">Find a Doctor</Typography>
          </Breadcrumbs>
        }
      />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <DocSearchForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DocSearchPage;
